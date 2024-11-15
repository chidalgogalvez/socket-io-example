import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '../../config/logger/AppLogger';
import { WebsocketService } from './websocket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transport: ['websocket'],
  namespace: '/road',
})
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly websocketService: WebsocketService) { }

  private readonly users = new Map<string, Socket[]>();

  afterInit(server: Server) {
    Logger.info('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    Logger.info(`🔌 Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    Logger.info('❌ disconnected client:', client.id);
    this.users.forEach((sockets, room) => {
      this.users.set(
        room,
        sockets.filter((socket) => socket.id !== client.id),
      );
    });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    if (!this.users.has(room)) {
      this.users.set(room, []);
    }
    this.users.get(room).push(client);
    Logger.info(`Cliente ${client.id} se unió a la sala ${room}`);
  }

  @SubscribeMessage('updateCounter')
  handleUpdateCounter(
    client: Socket,
    @MessageBody()
    data: { room: string; counterType: string; value: any },
  ) {
    const { room, counterType, value } = data;

    Logger.info(`📈 updateCounter: ${counterType} room_: ${room}`, value);
    this.server.to(room).emit('updateCounter', { counterType, value });
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    Logger.info(`Cliente ${client.id} ha salido de la sala ${room} 👋 `);
  }

  @SubscribeMessage('deleteItem')
  async handleDeleteItem(
    client: Socket,
    payload: { room: string; actionType: string; itemId: string },
  ) {
    const { room, actionType, itemId } = payload;

    try {
      // Lógica para eliminar el elemento de la base de datos
      await this.websocketService.deleteItemById(itemId, actionType);

      // Obtener la lista actualizada de elementos para el tipo de acción especificado
      const updatedList =
        await this.websocketService.getItemsByActionType(actionType);

      // Emitir la lista actualizada a todos los clientes en la sala específica
      this.server
        .to(room)
        .emit('updateList', { actionType, items: updatedList });
    } catch (error) {
      console.error('Error al eliminar el objeto:', error);
      client.emit('error', { message: 'Error al eliminar el objeto' });
    }
  }
}
