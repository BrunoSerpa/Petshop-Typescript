import Pet from "./pet"
import Servico from "./servico"

export default class ServicoConsumido {
    public produtoConsumido: Servico
    public dataConsumo: Date
    public pet: Pet
    constructor(produtoConsumido: Servico, dataConsumo: Date, pet: Pet){
        this.produtoConsumido = produtoConsumido
        this.dataConsumo = dataConsumo
        this.pet= pet
    }
}