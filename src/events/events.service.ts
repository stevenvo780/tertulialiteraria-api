import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, Not } from 'typeorm';
import { Events } from './entities/events.entity';
import { User } from '../user/entities/user.entity';
import { CreateEventsDto } from './dto/create-events.dto';
import { UpdateEventsDto } from './dto/update-events.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,
  ) {}

  async create(createEventsDto: CreateEventsDto, user: User) {
    const baseEvent = new Events();
    Object.assign(baseEvent, createEventsDto);
    baseEvent.author = user;

    return this.eventsRepository.save(baseEvent);
  }

  findAll() {
    return this.eventsRepository.find();
  }

  findOne(id: number) {
    return this.eventsRepository.findOne({
      where: { id },
    });
  }

  async findUpcomingEvents(limit: number): Promise<Events[]> {
    const now = new Date();
    const events = await this.eventsRepository.find({
      where: [
        { startDate: MoreThan(now) },
        { repetition: 'weekly' },
        { repetition: 'monthly' },
        { repetition: 'yearly' },
        { repetition: Not(null) },
      ],
      order: { startDate: 'ASC' },
      take: limit,
    });

    const upcomingEvents = events.flatMap((event) =>
      this.calculateUpcomingOccurrences(event, now),
    );

    upcomingEvents.sort(
      (a, b) => a.nextOccurrence.getTime() - b.nextOccurrence.getTime(),
    );

    return events;
  }

  async findUniqueEvents(limit: number) {
    const events = await this.eventsRepository.find({
      where: { repetition: null },
      order: { startDate: 'ASC' },
      take: limit,
    });

    return events;
  }

  private calculateUpcomingOccurrences(event: Events, referenceDate: Date) {
    const occurrences = [];
    let nextDate = new Date(event.startDate);

    while (nextDate < referenceDate) {
      nextDate = this.calculateNextOccurrence(nextDate, event.repetition);
    }

    if (nextDate >= referenceDate) {
      occurrences.push({ event, nextOccurrence: nextDate });
    }

    return occurrences;
  }

  private calculateNextOccurrence(currentDate: Date, repetition: string): Date {
    const nextDate = new Date(currentDate);

    switch (repetition) {
      case 'weekly':
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case 'monthly':
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case 'yearly':
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
    }

    return nextDate;
  }

  async update(id: number, updateEventsDto: UpdateEventsDto) {
    const events = await this.eventsRepository.findOne({ where: { id } });
    Object.assign(events, updateEventsDto);
    return this.eventsRepository.save(events);
  }

  remove(id: number) {
    return this.eventsRepository.delete(id);
  }
}
