import { ReceiverModule } from './modules/receiver/receiver.module';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot(), ReceiverModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
