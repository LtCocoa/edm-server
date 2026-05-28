import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Document } from "./entities/document.entity";

@WebSocketGateway({ namespace: 'documents' })
export class DocumentsGateway {
  @WebSocketServer()
  server!: Server;

  async handleConnection(socket: Socket) {
    const userId = socket.handshake.query.userId;
    socket.join(`user:${userId}`);
  }

  emitStatusChange(document: Document, statusKey: string) {
    this.server
      .to(`user:${document.author.id}`)
      .emit(`document-status-updated`, {
        id: document.id,
        status: statusKey,
      });
  }
}