import ItemConsumo from "./itemConsumo";
import ItemVenda from "./itemVenda";
import Pet from "./pet";

export default class ServicoConsumido extends ItemConsumo {
    constructor(itemConsumido: ItemVenda, dataConsumo: Date, pet: Pet) {
        super(itemConsumido, dataConsumo, pet);
    }
}