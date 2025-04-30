import { IAction } from "./action";
import { IKata } from "./kata.model";
import { IQuote } from "./quote.model";
import { IStyle } from "./style.model";

export interface IJsonData {
    Styles: IStyle[];
    Katas: IKata[];
    Actions: IAction[];
    KobudoActions: IAction[];
    Quotes: IQuote[];
}