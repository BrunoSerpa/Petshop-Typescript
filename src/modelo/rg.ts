import Documento from "./documento";

export default class RG extends Documento {
    constructor(valor: string, dataEmissao: Date) {
        super(valor, dataEmissao);
    }
}
