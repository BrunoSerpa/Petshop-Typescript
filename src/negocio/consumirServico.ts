import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Empresa from "../modelo/empresa";

import Pet from "../modelo/pet";
import Servico from "../modelo/servico";
import ServicoConsumido from "../modelo/servicoConsumidos";

import ListagemClientes from "./listagemClientes";
import ListagemServicos from "./listarServicos";

export default class ConsumirServico{
    private empresa: Empresa
    private entrada: Entrada

    private listaClientes
    private listarServicos

    private clienteEscolhido!: Cliente
    private petEscolhido!: Pet
    private servicoEscolhido!: Servico
    constructor(empresa: Empresa) {
        this.entrada = new Entrada()
        this.empresa = empresa
        this.listaClientes =  new ListagemClientes(this.empresa.getClientes)
        this.listarServicos =  new ListagemServicos(this.empresa.getServicos)
    }
    public get consumir(): Empresa{
        while (true){
            const clienteSelecionado= this.listaClientes.selecionarCliente
            if (clienteSelecionado){
                while (true){
                    let quantPets:number 
                    quantPets=clienteSelecionado.getPets.length
                    console.log(`Escolha o pet que fará o serviço`)
                    let numPets=[]
                    for (let i = 1; i < quantPets+1; i++) {
                        console.log(`${i} - ${i}º pet`)
                        numPets.push(i)
                    }
                    console.log(`0 - Cancelar`)
                    let petEscolhido = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                    if (numPets.includes(petEscolhido)){
                        this.petEscolhido = clienteSelecionado.getPets[petEscolhido -1]
                    }
                    else if (petEscolhido !== 0){
                        console.log(`Operação não entendida :(`)
                        continue
                    }
                    break
                }
                const servicoSelecionado= this.listarServicos.selecionarServico
                if (servicoSelecionado){
                    this.servicoEscolhido=servicoSelecionado
                } else {
                    break
                }
                if (this.clienteEscolhido && this.petEscolhido && this.servicoEscolhido){
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
        }
        return this.empresa
    }
}