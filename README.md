# [Kafka](https://kafka.apache.org) with [NestJS](https://nestjs.com/)

![home](img/homr.jpg)

## Description

[Kafka](https://kafka.apache.org) is an open source, distributed,
[streaming](https://en.wikipedia.org/wiki/Stream_processing) platform, developed by LinkedIn in 2009 and maintained
since 2012 by the Apache Foundation.

It dedicated to **Publishing**, **subscribing**, **storing** and **processing** of **streams of records**

We will use the [NestJs Kafka module](https://docs.nestjs.com/microservices/kafka) to interact with a kafka cluster.

## Installation

```bash
npm install
```

## Start the Kafka cluster

```shell
docker-compose up
```

See [docker-compose.yml](/docker-compose.yml)

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev
```

## Required packages

```shell
npm npm i --save kafkajs

npm i @nest/microservices
```

## Kafka microservice config

````ts
{
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [
        'localhost:9092'
      ]
    }
  }
}
````

See [main.ts](/src/main.ts)

## Kafka client config

````ts
  @Client({
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'ping',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'ping-consumer',
    },
  },
})
client: ClientKafka;
````
To test the ping click here http://localhost:3000/ping 

See [app.controller.ts#24](/src/app.controller.ts)

## Publisher

````ts
...
this.client.emit<string>('topic-name', {...});
...
````

See [app.controller.ts#35](/src/app.controller.ts)

## Subscriber

````ts
...
@EventPattern('topic-name')
async handlePing(payload: any) {
  // handle posted message => payload
}
...
````

See [app.controller.ts#39](/src/app.controller.ts)

