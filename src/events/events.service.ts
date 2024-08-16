import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
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
    console.log('findUpcomingEvents');
    return this.eventsRepository.find({
      where: { startDate: MoreThan(new Date()) },
      order: { startDate: 'ASC' },
      take: limit,
    });
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
