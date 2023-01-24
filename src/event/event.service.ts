import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { EventEntity } from './event.entity';
import { publisher, RedisChannels } from '../redis';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async findAll(): Promise<EventEntity[]> {
    return this.eventRepository.find({});
  }

  findById(id: number): Promise<EventEntity> {
    return this.eventRepository.findOneBy({ id });
  }

  async create(event: CreateEventDto): Promise<boolean> {
    const { name, description, type } = event;
    try {
      await this.eventRepository.insert({ name, description, type });
      await publisher.publish(RedisChannels.EVENT_CREATED, type);
    } catch (e) {
      return false;
    }
    return true;
  }

  async delete(id: number): Promise<void> {
    const event = await this.findById(id);
    await this.eventRepository.delete({ id });
    await publisher.publish(RedisChannels.EVENT_DELETED, event.type);
    return;
  }
}
