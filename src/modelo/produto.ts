import ItemVenda from "./itemVenda";

export default class Produto extends ItemVenda {
    constructor(nome: string, preco: number) {
        super(nome, preco);
    }
}