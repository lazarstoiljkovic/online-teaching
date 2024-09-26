import {Injectable} from '@nestjs/common'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'

@Injectable()
export class MathService{
    private clientProxy:ClientProxy;

    constructor(){
        this.clientProxy=ClientProxyFactory.create({
            transport:Transport.REDIS,
            options:{
                url:'redis://localhost:6379',
                auth_pass:'ncoded1'
            }
        });
    }

    public accumulate(data:number[]){
        console.log('abababababa');
        const pattern={cmd:'add'};
        return this.clientProxy.send<number,number[]>(pattern,data);
    }
}