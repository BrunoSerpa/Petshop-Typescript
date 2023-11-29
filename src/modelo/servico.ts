import ItemVenda from "./itemVenda";

export default class Servico extends ItemVenda {
    constructor(nome: string, preco: number) {
        super(nome, preco);
    }
}