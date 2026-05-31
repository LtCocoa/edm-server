import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { JwtService } from "@nestjs/jwt";

export interface DocumentCreatedNotificationDto {
  recipientUserId: string;
  documentId: string;
}

export interface DocumentStatusChangeNotificationDto {
  recipientUserId: string;
  documentId: string;
  statusKey: string;
}

@WebSocketGateway({ namespace: 'documents' })
export class DocumentsGateway {
  constructor(private readonly jwtService: JwtService) {}

  @WebSocketServer()
  server!: Server;

  async handleConnection(socket: Socket) {
    const token = socket.handshake.query.token;
    try {
      const { user } = await this.jwtService.verify(token as string);
      console.log(user.id);
      socket.join(`user:${user.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  emitStatusChange(dto: DocumentStatusChangeNotificationDto) {
    this.server
      .to(`user:${dto.recipientUserId}`)
      .emit(`document-status-updated`, {
        id: dto.documentId,
        status: dto.statusKey,
      });
  }

  emitPendingDocument(dto: DocumentCreatedNotificationDto) {
    this.server
      .to(`user:${dto.recipientUserId}`)
      .emit('pending-document', {
        id: dto.documentId,
      })
  }
}
