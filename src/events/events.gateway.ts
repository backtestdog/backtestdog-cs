import {
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WebSocket } from 'ws';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  // 連線
  // handleConnection(client: any) {}

  // 中斷連線
  // handleDisconnect(client: any) {}

  // 訂閱事件
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    // @ConnectedSocket() client: Socket,
  ) {
    // Handle received message
    this.server.emit('message', data); // Broadcast the message to all connected clients
  }

  // 第二位使用者
  @SubscribeMessage('message2')
  hello2(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
    console.log('收到消息 client:', client);
    client.send(JSON.stringify({ event: 'tmp', data: '这里是个临时信息' }));
    return { event: 'hello2', data: data };
  }
}
