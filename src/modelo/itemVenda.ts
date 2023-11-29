export default class ItemVenda {
    private nome: string;
    private preco: number;

    constructor(nome: string, preco: number) {
        this.nome = nome;
        this.preco = preco;
    }

    get getNome(): string {
        return this.nome;
    }

    get getPreco(): number {
        return this.preco;
    }
    set setNome(nome: string) {
        this.nome=nome;
    }

    set setPreco(preco: number) {
        this.preco=preco;
    }
}