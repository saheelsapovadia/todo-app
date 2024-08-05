

export interface Todo {
    uid?:String;
    title:string;
    status:String;
    scheduledAt:Value;
    createdAt:Date;
}

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface User {

}

export interface Column{
    id: String;
    title:string;
    type:string;
}