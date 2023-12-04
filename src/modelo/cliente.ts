import { InCliente, InItemConsumo, InDocumento, InTelefone, InPet } from "./Interfaces"

function Cliente(cliente: InCliente) {
    let dataCadastro = new Date()
    const consumirProduto = (produtoConsumido: InItemConsumo) => {
        cliente.produtosConsumidos.push(produtoConsumido)
    }
    const consumirServico = (servicoConsumido: InItemConsumo) => {
        cliente.servicosConsumidos.push(servicoConsumido)
    }
    const setNome = (novoNome: string) => {
        cliente.nome = novoNome
    }
    const setNomeSocial = (
        novoNomeSocial: string
    ) => {
        cliente.nomeSocial = novoNomeSocial
    }
    const setCPF = (novoCPF: InDocumento) => {
        cliente.cpf = novoCPF
    }
    const setRg = (
        novoRG: InDocumento,
        localRg: number
    ) => {
        cliente.rgs[localRg] = novoRG
    }
    const setTelefone = (
        novoTelefone: InTelefone,
        localTelefone: number
    ) => {
        cliente.telefones[localTelefone] = novoTelefone
    }
    const setPet = (
        novoPet: InPet,
        localPet: number
    ) => {
        cliente.pets[localPet] = novoPet
    }
    const setRgs = (novosRgs: Array<InDocumento>) => {
        cliente.rgs = []
        novosRgs.forEach((rg) => cliente.rgs.push(rg))
    }
    const setTelefones = (novosTelefones: Array<InTelefone>) => {
        cliente.telefones = []
        novosTelefones.forEach((telefone) => cliente.telefones.push(telefone))
    }
    const setPets = (novosPets: Array<InPet>) => {
        cliente.pets = []
        novosPets.forEach((pet) => cliente.pets.push(pet))
    }
    const getNome = () => {
        return cliente.nome
    }
    const getNomeSocial = () => {
        return cliente.nomeSocial
    }
    const getCpf = () => {
        return cliente.cpf
    }
    const getRgs = () => {
        return cliente.rgs
    }
    const getDataCadastro = () => {
        return dataCadastro
    }
    const getTelefones = () => {
        return cliente.telefones
    }
    const getProdutosConsumidos = () => {
        return cliente.produtosConsumidos
    }
    const getServicosConsumidos = () => {
        return cliente.servicosConsumidos
    }
    const getPets = () => {
        return cliente.pets
    }
    return ({
        getDataCadastro,
        getNome,
        getNomeSocial,
        getCpf,
        getRgs,
        getTelefones,
        getProdutosConsumidos,
        getServicosConsumidos,
        getPets,
        setNome,
        setNomeSocial,
        setCPF,
        setRg,
        setTelefone,
        setPet,
        consumirProduto,
        consumirServico,
        setRgs,
        setTelefones,
        setPets
    })
}

export default Cliente