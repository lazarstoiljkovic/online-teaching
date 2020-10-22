import { Provider } from "@nestjs/common";
import { TermRepository } from "./term.repository";

export const TermRepoProvider:Provider={
    provide: 'TermRepo',
    useClass: TermRepository
}