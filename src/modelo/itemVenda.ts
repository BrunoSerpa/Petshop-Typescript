import{InItemVenda} from "./Interfaces"
function ItemVenda(item:InItemVenda) {
    const getNome = (): string => {
        return item.nome;
    };
    const getPreco = (): number => {
        return item.valor;
    };
    const setNome = (novoNome: string) => {
        item.nome=novoNome
    }
    const setPreco = (novoPreco: number) => {
        item.valor=novoPreco
    }
    return ({
        getNome,
        getPreco,
        setNome,
        setPreco
    });
}

export default ItemVenda;