import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';
import { CustomAxiosService } from '../../shared/http-request/axios-service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [WebsocketGateway, WebsocketService, CustomAxiosService],
})
export class WebsocketModule { }
