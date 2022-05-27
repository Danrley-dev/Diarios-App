import { DocumentSnapshot } from "@angular/fire/firestore";

export interface Converter<T> {
    toFirestore(data: T): any; // conversão antes de enviar para o firestore
    fromFirestore(snapshot: DocumentSnapshot, opitions: any): T; // conversão quando recebe do firestore
}
