import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import envConfig from './config/env.config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBConfigService } from './config/mongodb.config.service';
import mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [envConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongoDBConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  onModuleInit() {
    // Listening to MongoDB connection events
    mongoose.connection.on('connected', () => {
      this.logger.log('MongoDB connected successfully');
      console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      this.logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      this.logger.warn('MongoDB disconnected');
    });
  }
}
