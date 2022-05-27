import { Converter } from "./converter";

export interface Diario {
    id?: string; // string aleatória/atribuido pelo firestore
    titulo: string;
    corpo: string;
    local: string;
    data: Date; // datada viagem realizada
    imagem?: string; // link da imagem
    // serão preenchidas programaticamente
    createAt: Date; // guarda quando o diário foi criado
    usuarioId?: string;
    usuarioNick?: string;
    usuarioName?: string;
    
}

export const DiarioConverter: Converter<Diario> = {
    toFirestore: (data) => data,
    fromFirestore: (snapshot, options) => {
        const obj= snapshot.data(options)!;

        return {
            ...obj,
            data: obj['data']?.date(),
            createAt: obj['data']?.date(),
        } as Diario;
    },
};