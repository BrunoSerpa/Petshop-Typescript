import Entrada from "../io/entrada";
import Servico from "../modelo/servico";

class ListaServicos {
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public listarServico(servicoDesejado: Servico): void {
        console.log(`Nome: ${servicoDesejado.getNome}`);
        console.log(`Preço: R$${servicoDesejado.getPreco}`);
    }

    public listar(): void {
        let servicoEspecifico = this.entrada.receberTexto(`Gostaria de procurar um servico em específico? (S/N): `);
        switch (servicoEspecifico.toUpperCase()) {
            case "S":
                while (true) {
                    let servicoEncontrado = buscaServico(this.servicos, this.entrada);
                    if (servicoEncontrado) {
                        this.listarServico(servicoEncontrado);
                    }
                    let continuar = this.entrada.receberTexto(`Deseja listar mais algum servico? (S/N)`);
                    if (continuar.toUpperCase() === 'S') {
                        continue;
                    }
                    break;
                }
                break;
            case "N":
                this.servicos.forEach(servicoData => {
                    this.listarServico(servicoData);
                });
                break;
            default:
                console.log(`Operação não entendida :(`);
                break;
        }
    }
}

function buscaServico(servicos: Array<Servico>, entrada: Entrada): Servico | undefined {
    let servicosEncontrados: Array<Servico> = [];
    while (true) {
        let criterio = entrada.receberTexto(`Informe o nome do serviço:`);
        servicos.forEach(servico => {
            if (servico.getNome.toLowerCase() === criterio.toLowerCase()) {
                servicosEncontrados.push(servico);
            }
        });
        if (servicosEncontrados.length > 1) {
            let count: number = 1;
            let opcoes: Array<number> = [];

            console.log(`Mais de um servico encontrado!`);
            console.log(`Qual serviço deseja alterar?`);
            servicosEncontrados.forEach(servico => {
                console.log(`${count} - Servico:`);
                opcoes.push(count);
                count++;
            });
            console.log(`0 - Nenhum`);
            let servicoDesejado = entrada.receberNumero(`Por favor, informe uma das opções:`);
            if (opcoes.includes(servicoDesejado)) {
                return servicosEncontrados[servicoDesejado - 1];
            } else if (servicoDesejado !== 0) {
                console.log(`Operação não entendida :(`);
            }
        } else if (servicosEncontrados.length === 1) {
            console.log(`Serviço encontrado!`);
            return servicosEncontrados[0];
        } else {
            console.log('Serviço não encontrado :(');
        }
        let resposta = entrada.receberTexto(`Deseja procurar novamente? (S/N)`);
        if (resposta.toUpperCase() !== 'S') {
            break;
        }
    }
    return undefined;
}

class CadastroServico {
    private servicos: Array<Servico>;
    private servicoEscolhido!: Servico;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        while (true){
            console.log("---------------------------------------")
            console.log(`\nIníciando o cadastro de serviços`);
            const nome = this.entrada.receberTexto(`Por favor informe o nome do serviço: `)
            const preco = this.entrada.receberNumero(`Por favor informe o preço do serviço: R$`)
            this.servicos.push(new Servico(nome, preco))
            console.log(`\nCadastro concluído :)\n`)
            let continuar = this.entrada.receberTexto(`Deseja cadastrar mais algum serviço? (S/N)`)
            if (continuar.toUpperCase() === 'S'){
                continue
            }
            break
        }
    }
}

class AlteracaoServico {
    private servicos: Array<Servico>;
    private servicoEscolhido!: Servico;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public alterar(): void {
        while (true) {
            let servicoEscolhido = buscaServico(this.servicos, this.entrada);
            if (servicoEscolhido) {
                this.servicoEscolhido = servicoEscolhido;
            } else {
                break;
            }
            while (true) {
                console.log("---------------------------------------");
                console.log(`Dados do Serviço:\n`);
                new ListaServicos(this.servicos).listarServico(servicoEscolhido)
                console.log(`Informe o dado que deseja alterar:`);
                console.log("1 - Nome");
                console.log("2 - Preço");
                console.log("0 - Sair");
                let opcao = this.entrada.receberNumero(`Por favor, informe uma das opções:`);
                switch (opcao) {
                    case 1:
                        this.servicoEscolhido.setNome = this.entrada.receberTexto(`Por favor informe o novo nome do servico: `);
                        break;
                    case 2:
                        this.servicoEscolhido.setPreco = this.entrada.receberNumero(`Por favor informe o novo preço do servico: R$`);
                        break;
                    default:
                        console.log(`Operação não entendida :(`);
                        break;
                }
                let continuar = this.entrada.receberTexto(`Deseja alterar mais algum dado? (S/N)`)
                if (continuar.toUpperCase() === 'S'){
                    continue
                }
                break
            }
            let continuar = this.entrada.receberTexto(`Deseja alterar mais algum servico? (S/N):`);
            if (continuar.toUpperCase() === 'S'){
                continue
            }
            break
        }
    }
}

class ExclusaoServico {
    private servicos: Array<Servico>;
    private listarServicos: ListaServicos;
    private servicoEscolhido!: Servico;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        this.servicos = servicos;
        this.entrada = new Entrada();
        this.listarServicos = new ListaServicos(this.servicos);
    }

    public deletar(): void {
        while (true) {    
            console.log("---------------------------------------");
            console.log(`Dados do Serviço:\n`);
            let servicoEscolhido = buscaServico(this.servicos, this.entrada);
            if (servicoEscolhido) {
                this.servicoEscolhido = servicoEscolhido;
            } else {
                break;
            }
            if (this.servicoEscolhido) {
                this.listarServicos.listarServico(this.servicoEscolhido);
                let continuar = this.entrada.receberTexto(`Deseja excluir esse servico? (S/N)`)
                if (continuar.toUpperCase() === 'S') {
                    this.servicos = this.servicos.filter(servico => servico !== this.servicoEscolhido);
                }
            }
            let continuar = this.entrada.receberTexto(`Deseja excluir mais algum servico? (S/N):`);
            if (continuar.toUpperCase() === 'S') {
                continue;
            }
            break;
        }
    }
}

export { CadastroServico, AlteracaoServico, ExclusaoServico, ListaServicos, buscaServico };
