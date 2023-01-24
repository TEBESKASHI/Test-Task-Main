import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';
import { EventTransportChannel } from './enum';
import { EventEntity } from './event.entity';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern(EventTransportChannel.EVENT_ALL)
  getAllEvents(): Promise<EventEntity[]> {
    return this.eventService.findAll();
  }

  @MessagePattern(EventTransportChannel.EVENT_BY_ID)
  getEventById(id: number): Promise<EventEntity> {
    return this.eventService.findById(id);
  }

  @EventPattern(EventTransportChannel.EVENT_CREATE)
  createNewEvent(event: CreateEventDto): Promise<boolean> {
    return this.eventService.create(event);
  }

  @EventPattern(EventTransportChannel.EVENT_DELETE)
  async deleteEvent(id: number): Promise<void> {
    return this.eventService.delete(id);
  }
}
