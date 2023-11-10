import Pet from "./pet"
import Servico from "./servico"

export default class ServicoConsumido {
    public servicoConsumido: Servico
    public dataConsumo: Date
    public pet: Pet
    constructor(servicoConsumido: Servico, dataConsumo: Date, pet: Pet){
        this.servicoConsumido = servicoConsumido
        this.dataConsumo = dataConsumo
        this.pet= pet
    }
}