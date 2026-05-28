import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Document } from "./entities/document.entity";
import { JwtService } from "@nestjs/jwt";

@WebSocketGateway({ namespace: 'documents' })
export class DocumentsGateway {
  constructor(private readonly jwtService: JwtService) {}

  @WebSocketServer()
  server!: Server;

  async handleConnection(socket: Socket) {
    const userId = socket.handshake.query.userId;
    const token = socket.handshake.query.token;
    socket.join(`user:${userId}`);
    try {
      const { user } = await this.jwtService.verify(token as string);
      if (user.role === 'manager') {
        socket.join('managers');
      }
    } catch (err) {
      console.log(err);
    }
  }

  emitStatusChange(document: Document, statusKey: string) {
    this.server
      .to(`user:${document.author.id}`)
      .emit(`document-status-updated`, {
        id: document.id,
        status: statusKey,
      });
  }

  emitPendingDocument(document: Document) {
    this.server
      .to('managers')
      .emit('pending-document', {
        id: document.id
      })
  }
}
