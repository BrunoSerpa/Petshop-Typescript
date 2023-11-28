import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Empresa from "../modelo/empresa";

import Pet from "../modelo/pet";
import Servico from "../modelo/servico";
import ServicoConsumido from "../modelo/servicoConsumido";
import { buscarPet } from "./funcoesPet";
import { buscaServico } from "./funcoesServicos";


export default class ConsumirServico{
    private empresa: Empresa
    private entrada: Entrada
    private clienteEscolhido!: Cliente
    private petEscolhido!: Pet
    private servicoEscolhido!: Servico
    constructor(empresa: Empresa) {
        this.entrada = new Entrada()
        this.empresa = empresa
    }
    public get consumir(): Empresa{
        while (true){
            const clienteSelecionado= buscarPet(this.empresa.getClientes, this.entrada, true)
            if (clienteSelecionado instanceof Array){
                this.petEscolhido = clienteSelecionado[0]
                this.clienteEscolhido = clienteSelecionado[1]
                const servicoSelecionado= buscaServico(this.empresa.getServicos, this.entrada)
                if (servicoSelecionado){
                    this.servicoEscolhido = servicoSelecionado
                    let data = new Date()
                    const servicoConsumido = new ServicoConsumido(this.servicoEscolhido, data, this.petEscolhido)
                    this.clienteEscolhido.getServicosConsumidos.push(servicoConsumido)
                }
                let continuar = this.entrada.receberTexto(`Deseja adiconar mais algum consumo para este cliente? (S/N)`)
                if (continuar.toUpperCase() === 'S') {
                    continue
                }
            } else {
                break
            }
            let continuar = this.entrada.receberTexto(`Deseja adiconar mais algum consumo para outro cliente? (S/N)`)
            if (continuar.toUpperCase() === 'S') {
                continue
            }
            break
        }
        return this.empresa
    }
}