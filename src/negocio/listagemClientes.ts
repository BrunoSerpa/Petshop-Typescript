import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";

export default class ListagemClientes{
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    
    public get selecionarCliente(): Cliente|undefined {
        let clientesEncontrados: Array<Cliente> = []
        while (true){
            let criterio = this.entrada.receberTexto(`Informe o nome ou o número do cpf deste cliente:`)
            this.clientes.forEach(cliente =>{
                if (cliente.nome.toLowerCase() === criterio.toLowerCase() || cliente.getCpf.getValor === criterio){
                    clientesEncontrados.push(cliente)
                }
            })
            if (clientesEncontrados.length > 1){
                let count:number=1
                let opcoes: Array<number> = []
                
                console.log(`Mais de um cliente encontrado!`)
                console.log(`Qual cliente deseja alterar?`)
                clientesEncontrados.forEach(cliente =>{
                    console.log(`${count} - Cliente:`)
                    this.listarCliente= cliente
                    opcoes.push(count)
                    count++
                })
                console.log(`0 - Nenhum`)
                let clienteDesejado = this.entrada.receberNumero(`Por favor, informe uma das opções:`)
                if (opcoes.includes(clienteDesejado)){
                    return clientesEncontrados[clienteDesejado-1]
                } else if (clienteDesejado !== 0){
                    console.log(`Operação não entendida :(`)
                }
            } else if (clientesEncontrados.length === 1){
                console.log(`Cliente encontrado!`)
                return clientesEncontrados[0]
            } else{
                console.log('Cliente não encontrado :(');
            }
            let resposta = this.entrada.receberTexto(`Deseja procurar novamente? (S/N)`)
            if (resposta.toUpperCase() === 'S'){
                continue
            }
            break
        }
        return
    }

    public set listarCliente(clienteDesejado: Cliente){
        let count:number
        console.log("---------------------------------------")
        console.log(`Dados do cliente:\n`);
        console.log(`Nome: ${clienteDesejado.nomeSocial} (${clienteDesejado.nome})`)
        console.log(`CPF: ${clienteDesejado.getCpf.getValor}`);
        if (clienteDesejado.getRgs.length === 1){
            console.log(`RG: ${clienteDesejado.getRgs[0].getValor}`)
        } else {
            count=1
            clienteDesejado.getRgs.forEach(rgData => {
                console.log(`${count}º RG: ${rgData.getValor}`)
                count ++;
            })
        }
        if (clienteDesejado.getTelefones.length === 1){
            console.log(`Telefone: (${clienteDesejado.getTelefones[0].getDdd}) ${clienteDesejado.getTelefones[0].getNumero}`)
        } else {
            count=1
            clienteDesejado.getTelefones.forEach(telefoneData => {
                console.log(`${count}º Telefone: (${telefoneData.getDdd}) ${telefoneData.getNumero}`);
                count ++;
            })
        }
        if (clienteDesejado.getPets.length === 1){
            console.log(`Pet: ${clienteDesejado.getPets[0].getNome}`)
            console.log(`- Tipo: ${clienteDesejado.getPets[0].getTipo}`)
            console.log(`- Genero: ${clienteDesejado.getPets[0].getGenero}`)
            console.log(`- Raça: ${clienteDesejado.getPets[0].getRaca}`)
        } else {
            count=1
            clienteDesejado.getPets.forEach((petsData) => {
                console.log(`${count}º Pet: ${petsData.getNome}`)
                console.log(`- Tipo: ${petsData.getTipo}`)
                console.log(`- Genero: ${petsData.getGenero}`)
                console.log(`- Raça: ${petsData.getRaca}`)
                count++               
            })
        }
    }
    public listar(): void {
        let clienteEspecifico= this.entrada.receberTexto(`Gostaria de Procurar um cliente em específico? (S/N): `)
        switch (clienteEspecifico.toUpperCase()){
            case "S":
                const clienteEncontrado = this.selecionarCliente
                if (clienteEncontrado){
                    this.listarCliente=clienteEncontrado
                }
                break
            case "N":
                console.log(`\nLista de todos os clientes:`);
                this.clientes.forEach(clienteData => {
                    this.listarCliente=clienteData
                });
                break
            default:
                console.log(`Operação não entendida :(`)
                break
        }
    }
}