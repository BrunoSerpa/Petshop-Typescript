import Cliente from "../modelo/cliente"
import Destaque from "../modelo/destaque"

export default class DestacarItens {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    private somaItensSeparados(listaItensSeparados: Array<Destaque>): Array<Destaque> {
        const listaProdutosDestaques: Array<Destaque> = []
        listaItensSeparados.forEach(destaque => {
            const destaqueExistente = listaProdutosDestaques.find(destaquesExistentes =>
                destaquesExistentes.getNome === destaque.getNome
            )
            if (destaqueExistente) {
                destaqueExistente.SomaQuantidadeDestacado = 1
            } else {
                listaProdutosDestaques.push(destaque)
            }
        })
        return listaProdutosDestaques
    }
    public get produtoTipo(): Array<Destaque> {
        const listaItensSeparados: Array<Destaque> = []
        this.clientes.forEach(cliente =>
            cliente.getProdutosConsumidos.forEach(consumo =>
                consumo.itemConsumido.getNome && consumo.pet.getTipo &&
                listaItensSeparados.push(new Destaque(
                    `${consumo.itemConsumido.getNome} (${consumo.pet.getTipo})`,
                    1
                ))
            )
        )
        const listaProdutosDestaques = this.somaItensSeparados(listaItensSeparados)
        const listaOrdenada = this.listaOrdenada(listaProdutosDestaques)
        return listaOrdenada
    }
    public get produtoRaca(): Array<Destaque> {
        const listaItensSeparados: Array<Destaque> = []
        this.clientes.forEach(cliente =>
            cliente.getProdutosConsumidos.forEach(consumo =>
                consumo.itemConsumido.getNome && consumo.pet.getRaca &&
                listaItensSeparados.push(new Destaque(
                    `${consumo.itemConsumido.getNome} (${consumo.pet.getRaca})`,
                    1
                ))
            )
        )
        const listaProdutosDestaques = this.somaItensSeparados(listaItensSeparados)
        const listaOrdenada = this.listaOrdenada(listaProdutosDestaques)
        return listaOrdenada
    }
    public get servicoTipo(): Array<Destaque> {
        const listaItensSeparados: Array<Destaque> = []
        this.clientes.forEach(cliente =>
            cliente.getServicosConsumidos.forEach(consumo =>
                consumo.itemConsumido.getNome && consumo.pet.getTipo &&
                listaItensSeparados.push(new Destaque(
                    `${consumo.itemConsumido.getNome} (${consumo.pet.getTipo})`,
                    1
                ))
            )
        )
        const listaServicosDestaques = this.somaItensSeparados(listaItensSeparados)
        const listaOrdenada = this.listaOrdenada(listaServicosDestaques)
        return listaOrdenada
    }
    public get servicoRaca(): Array<Destaque> {
        const listaItensSeparados: Array<Destaque> = []
        this.clientes.forEach(cliente =>
            cliente.getServicosConsumidos.forEach(consumo =>
                consumo.itemConsumido.getNome && consumo.pet.getRaca &&
                listaItensSeparados.push(new Destaque(
                    `${consumo.itemConsumido.getNome} (${consumo.pet.getRaca})`,
                    1
                ))
            )
        )
        const listaServicosDestaques = this.somaItensSeparados(listaItensSeparados)
        const listaOrdenada = this.listaOrdenada(listaServicosDestaques)
        return listaOrdenada
    }
    public listaOrdenada(listaSelecionada: Array<Destaque>): Array<Destaque> {
        let lista: Array<Destaque>;
        lista = listaSelecionada;
        let listaOrdenada: Array<Destaque> = [];
        const mapped = lista.map((v, i) => {
            return { i, value: v.getQuantidade };
        });
        mapped.sort((a, b) => {
            if (a.value < b.value) {
                return 1;
            }
            if (a.value > b.value) {
                return -1;
            }
            return 0;
        });
        listaOrdenada = mapped.map((v) => lista[v.i]);
        listaSelecionada = [];
        let count: number = 0;
        listaOrdenada.forEach((cliente) => {
            listaSelecionada.push(cliente);
            count++;
        });
        return listaSelecionada;
    }
}