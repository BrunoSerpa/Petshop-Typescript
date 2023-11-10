import Pet from "./pet"
import Produto from "./produto"

export default class ProdutoConsumido {
    public produtoConsumido: Produto
    public dataConsumo: Date
    public pet: Pet
    constructor(produtoConsumido: Produto, dataConsumo: Date, pet: Pet){
        this.produtoConsumido = produtoConsumido
        this.dataConsumo = dataConsumo
        this.pet= pet
    }
}