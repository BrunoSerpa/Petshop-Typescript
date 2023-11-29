import Documento from "./documento";

export default class CPF extends Documento {
    constructor(valor: string, dataEmissao: Date) {
        super(valor, dataEmissao);
    }
}