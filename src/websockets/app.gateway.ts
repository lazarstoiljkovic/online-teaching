import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Socket,Server} from 'socket.io'

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    @SubscribeMessage('msgToServer')
    handleMessage(clinet:Socket, payload:string):void{
        this.server.emit('msgToClient',payload);
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }
    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client disconnected: ${client}`);
    }
    handleDisconnect(client: Socket) {
        this.logger.log(`Client connected: ${client}`);
    }

}