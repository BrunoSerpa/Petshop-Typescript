import ItemVenda from "./itemVenda";
import Pet from "./pet";

export default class ItemConsumo {
    public itemConsumido: ItemVenda;
    public dataConsumo: Date;
    public pet?: Pet;

    constructor(itemConsumido: ItemVenda, dataConsumo: Date, pet?: Pet) {
        this.itemConsumido = itemConsumido;
        this.dataConsumo = dataConsumo;
        this.pet = pet;
    }
}
