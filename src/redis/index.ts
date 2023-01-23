import Redis from 'ioredis';

enum RedisChannels {
  EVENT_CREATED = 'event-created',
  EVENT_DELETED = 'event-deleted',
}

const publisher = new Redis({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

publisher.on('connect', () => {
  console.log('Subscriber connected');
});

export { publisher, RedisChannels };
