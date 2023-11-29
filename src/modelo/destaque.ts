export default class Destaque {
    private nomeDestacado: string;
    private quantidadeDestacado: number;
    constructor(nomeDestacado:string, quantidadeDestacado:number) {
        this.nomeDestacado=nomeDestacado
        this.quantidadeDestacado=quantidadeDestacado
    }
    public set SomaQuantidadeDestacado (aumento: number){
        this.quantidadeDestacado+=aumento
    }
    public get getNome(): string {
        return this.nomeDestacado
    }
    public get getQuantidade(): number {
        return this.quantidadeDestacado
    }
}