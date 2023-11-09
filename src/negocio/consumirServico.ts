import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Servico from "../modelo/servico";
import ServicoConsumido from "../modelo/servicoConsumidos";

import Listagem from "./listagem";

export default class ConsumirServico extends Listagem {
    private clientes: Array<Cliente>
    private servicos: Array<Servico>
    private entrada: Entrada
    private clienteEscolhido!: Cliente
    private servicoEscolhido!: Servico
    constructor(clientes: Array<Cliente>, servicos: Array<Servico>) {
        super()
        this.entrada = new Entrada()
        this.clientes = clientes
        this.servicos = servicos
    }
    public listar(): void {
        let criterioCliente = this.entrada.receberTexto(`Informe o nome ou o número do cpf deste cliente:`)
        const clienteEncontrado = this.clientes.find(cliente =>
            cliente.nome.toLowerCase() === criterioCliente.toLowerCase() || cliente.getCpf.getValor === criterioCliente
        );
        if (clienteEncontrado){
            let criterioServico = this.entrada.receberTexto(`Informe o nomedo servico`)
            const servicoEncontrado = this.servicos.find(servico =>
                servico.nome.toLowerCase() === criterioServico.toLowerCase()
            );
            if (servicoEncontrado){
                this.servicoEscolhido=servicoEncontrado
                this.clienteEscolhido=clienteEncontrado
            }
            else(
                console.log(`Serviço não encontrado`)
            )
        }
        else(
            console.log(`Cliente não encontrado`)
        )
    }
    public consumir(): Array<Cliente>{
        while (true){
            this.listar()
            if (this.servicoEscolhido){
                let quantPets:number 
                quantPets=this.clienteEscolhido.getPets.length
                console.log(`Escolha o pet que fará o serviço`)
                let numPets=[]
                for (let i = 1; i < quantPets+1; i++) {
                    console.log(`${i} - ${i}º pet`)
                    numPets.push(i)
                }
                console.log(`0 - Cancelar`)
                let petEscolhido = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                if (petEscolhido === 0){
                    break
                }
                else if (numPets.includes(petEscolhido)){
                    let data = new Date()
                    let novoServicoConsumido = new ServicoConsumido(this.servicoEscolhido, data, this.clienteEscolhido.getPets[petEscolhido -1])
                    this.clienteEscolhido.getServicosConsumidos.push(novoServicoConsumido)
                }
                else {
                    console.log(`Operação Invalida :(`)
                }
            }
            let continuar = this.entrada.receberTexto(`Deseja adiconar mais algum consumo? (S/N)`)
            if (continuar.toUpperCase() === 'S') {
                continue
            }
            break
        }
        return this.clientes
    }
}