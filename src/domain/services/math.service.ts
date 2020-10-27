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
                auth_pass:'K/5j67m6cNx7X1+UUAV92bxxQNP+KTWMKr48FIc7R1fv6vEz2/dDqJlbVtUNkLwOgQ6fyruRanSmAdqA'
            }
        });
    }

    public accumulate(data:number[]){
        console.log('abababababa');
        const pattern={cmd:'add'};
        return this.clientProxy.send<number,number[]>(pattern,data);
    }
}