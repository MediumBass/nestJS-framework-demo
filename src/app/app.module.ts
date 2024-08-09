import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from "@nestjs/config";
import config from '../../configurations/index'
import {AuthModule} from "../auth/auth.module";
@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal:true,
    load: [config]
  }), UserModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
