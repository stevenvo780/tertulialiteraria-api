import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './entities/events.entity';
import { User } from '../user/entities/user.entity';
import { CreateEventsDto } from './dto/create-events.dto';
import { UpdateEventsDto } from './dto/update-events.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createEventsDto: CreateEventsDto, user: User) {
    const dataEvent = new Events();
    Object.assign(dataEvent, createEventsDto);
    dataEvent.author = user;
    const newEvents = this.eventsRepository.create(createEventsDto);
    return this.eventsRepository.save(newEvents);
  }

  findAll(user: User) {
    return this.eventsRepository.find({
      where: { author: { id: user.id } },
    });
  }

  findOne(id: number, user: User) {
    return this.eventsRepository.findOne({
      where: { id, author: { id: user.id } },
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
