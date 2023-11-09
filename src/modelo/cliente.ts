import CPF from "./cpf"
import Pet from "./pet"
import Produto from "./produto"
import ProdutoConsumido from "./produtoConsumidos"
import RG from "./rg"
import ServicoConsumido from "./servicoConsumidos"
import Telefone from "./telefone"

export default class Cliente {
    public nome: string
    public nomeSocial: string
    private cpf: CPF
    private rgs: Array<RG>
    private dataCadastro: Date
    private telefones: Array<Telefone>
    private produtosConsumidos: Array<ProdutoConsumido>
    private servicosConsumidos: Array<ServicoConsumido>
    private pets: Array<Pet>
    constructor(nome: string, nomeSocial: string, cpf: CPF) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.cpf = cpf
        this.rgs = []
        this.dataCadastro = new Date()
        this.telefones = []
        this.produtosConsumidos = []
        this.servicosConsumidos = []
        this.pets = []
    }
    setCPF(novoCPF: CPF): void{
        this.cpf=novoCPF
    }
    setRg(novoRG: RG, localRg: number): void{
        this.rgs[localRg]=novoRG
    }
    setTelefone(novoTelefone: Telefone, localTelefone: number): void{
        this.telefones[localTelefone]=novoTelefone
    }
    setPet(novoPet: Pet, localPet: number): void{
        this.pets[localPet]=novoPet
    }
    setRgs(novoRg: Array<RG>): void{
        this.rgs=novoRg
    }
    setTelefones(novoTelefone: Array<Telefone>): void{
        this.telefones=novoTelefone
    }
    setPets(novoPet: Array<Pet>): void{
        this.pets=novoPet
    }
    setProdutosConsumidos(novoRegistro: Array<ProdutoConsumido>): void{
        this.produtosConsumidos=novoRegistro
    }
    setServicosConsumidos(novoRegistro: Array<ServicoConsumido>): void{
        this.servicosConsumidos=novoRegistro
    }
    public get getCpf(): CPF {
        return this.cpf
    }
    public get getRgs(): Array<RG> {
        return this.rgs
    }
    public get getDataCadastro(): Date {
        return this.dataCadastro
    }
    public get getTelefones(): Array<Telefone> {
        return this.telefones
    }
    public get getProdutosConsumidos(): Array<ProdutoConsumido> {
        return this.produtosConsumidos
    }
    public get getServicosConsumidos(): Array<ServicoConsumido> {
        return this.servicosConsumidos
    }
    public get getPets(): Array<Pet>{
        return this.pets
    }
}