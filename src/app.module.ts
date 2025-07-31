import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TasksModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'pass123',
    //   database: 'postgres',
    //   // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   autoLoadEntities: true,
    //   synchronize: true, // do not use in production, it can drop your database
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'pass123',
      database: process.env.DB_NAME || 'postgres',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production', // безопаснее для продакшена
      logging: process.env.NODE_ENV === 'development', // логирование SQL запросов в разработке
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
