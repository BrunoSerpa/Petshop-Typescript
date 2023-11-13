import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import Pet from "../modelo/pet";
import Produto from "../modelo/produto";
import RG from "../modelo/rg";
import Servico from "../modelo/servico";
import Telefone from "../modelo/telefone";
import ProdutoConsumido from "../modelo/produtoConsumidos";
import ServicoConsumido from "../modelo/servicoConsumidos";

export default class EmpresaTeste {
    private clientes: Array<Cliente> = [];
    private produtos: Array<Produto> = [];
    private servicos: Array<Servico> = [];
    clientesEmpresaTeste() {
        const cliente1 = new Cliente('Joao da Silva', 'Joao', new CPF('12345678901', new Date(2000, 1, 1))); // Corrigi o mês (janeiro e 0)
        cliente1.getRgs.push(new RG('12345', new Date(2005, 1, 1)));
        cliente1.getTelefones.push(new Telefone('11', '987654321'));
        cliente1.getTelefones.push(new Telefone('11', '123456789'));
        cliente1.getPets.push(new Pet('Rex', 'Labrador', 'Macho', 'Cachorro'));
        cliente1.getPets.push(new Pet('Whiskers', 'Siamês', 'Fêmea', 'Gato'));
        this.clientes.push(cliente1);

        const cliente2 = new Cliente('Maria Pereira', 'Maria', new CPF('98765432109', new Date(2001, 2, 2))); // Corrigi o mês
        cliente2.getRgs.push(new RG('98765', new Date(2006, 2, 2)));
        cliente2.getTelefones.push(new Telefone('11', '555555555'));
        cliente2.getPets.push(new Pet('Buddy', 'Golden Retriever', 'Macho', 'Cachorro'));
        this.clientes.push(cliente2);

        const cliente3 = new Cliente('Luiza Santos', 'Luiza', new CPF('11111111111', new Date(1990, 3, 15)));
        cliente3.getRgs.push(new RG('54321', new Date(1995, 4, 10)));
        cliente3.getTelefones.push(new Telefone('21', '987654321'));
        cliente3.getTelefones.push(new Telefone('21', '123456789'));
        cliente3.getPets.push(new Pet('Luna', 'Poodle', 'Fêmea', 'Cachorro'));
        cliente3.getPets.push(new Pet('Milo', 'Siamese', 'Macho', 'Gato'));
        this.clientes.push(cliente3);

        const cliente4 = new Cliente('Pedro Oliveira', 'Pedro', new CPF('22222222222', new Date(1985, 2, 25)));
        cliente4.getRgs.push(new RG('22222', new Date(1990, 3, 5)));
        cliente4.getTelefones.push(new Telefone('31', '555555555'));
        cliente4.getPets.push(new Pet('Rocky', 'Bulldog', 'Macho', 'Cachorro'));
        this.clientes.push(cliente4);

        const cliente5 = new Cliente('Juliana Rodrigues', 'Juliana', new CPF('33333333333', new Date(1980, 8, 12)));
        cliente5.getRgs.push(new RG('11111', new Date(1985, 9, 7)));
        cliente5.getTelefones.push(new Telefone('41', '777777777'));
        cliente5.getPets.push(new Pet('Bella', 'Labrador', 'Fêmea', 'Cachorro'));
        cliente5.getPets.push(new Pet('Simba', 'Maine Coon', 'Macho', 'Gato'));
        this.clientes.push(cliente5);

        const cliente6 = new Cliente('Andre Souza', 'Andre', new CPF('44444444444', new Date(1975, 6, 18)));
        cliente6.getRgs.push(new RG('77777', new Date(1980, 7, 30)));
        cliente6.getTelefones.push(new Telefone('51', '666666666'));
        cliente6.getPets.push(new Pet('Thor', 'Golden Retriever', 'Macho', 'Cachorro'));
        this.clientes.push(cliente6);

        const cliente7 = new Cliente('Larissa Santos', 'Larissa', new CPF('55555555555', new Date(1992, 10, 5)));
        cliente7.getRgs.push(new RG('44444', new Date(1997, 11, 15)));
        cliente7.getTelefones.push(new Telefone('21', '999999999'));
        cliente7.getPets.push(new Pet('Daisy', 'Pug', 'Fêmea', 'Cachorro'));
        this.clientes.push(cliente7);

        const cliente8 = new Cliente('Lucas Fernandes', 'Lucas', new CPF('66666666666', new Date(1978, 1, 20)));
        cliente8.getRgs.push(new RG('55555', new Date(1983, 2, 10)));
        cliente8.getTelefones.push(new Telefone('11', '888888888'));
        cliente8.getPets.push(new Pet('Max', 'Bulldog Francês', 'Macho', 'Cachorro'));
        this.clientes.push(cliente8);

        const cliente9 = new Cliente('Eduarda Lima', 'Eduarda', new CPF('77777777777', new Date(1991, 4, 8)));
        cliente9.getRgs.push(new RG('66666', new Date(1996, 5, 25)));
        cliente9.getTelefones.push(new Telefone('31', '666666666'));
        cliente9.getPets.push(new Pet('Misty', 'Siamês', 'Fêmea', 'Gato'));
        this.clientes.push(cliente9);

        const cliente10 = new Cliente('Bruno Pereira', 'Bruno', new CPF('88888888888', new Date(1987, 7, 17)));
        cliente10.getRgs.push(new RG('88888', new Date(1992, 8, 12)));
        cliente10.getTelefones.push(new Telefone('41', '888888888'));
        cliente10.getPets.push(new Pet('Lucky', 'Beagle', 'Macho', 'Cachorro'));
        this.clientes.push(cliente10);

        return this.clientes;
    }
    produtosEmpresaTeste(){
        const produto1 = new Produto("Shampoo", 10.00)
        this.produtos.push(produto1)
        
        const produto2 = new Produto("Condicionador",15.00)
        this.produtos.push(produto2)
        
        const produto3 = new Produto("Pente",12.00)
        this.produtos.push(produto3)
        
        const produto4 = new Produto("Petisco",5.00)
        this.produtos.push(produto4)
        
        const produto5 = new Produto("Gravata",5.50)
        this.produtos.push(produto5)

        const produto6 = new Produto("Coleira",50.00)
        this.produtos.push(produto6)
        return this.produtos
    }
    servicosEmpresaTeste(){
        const servico1 = new Servico("Banho e Tosa", 30.00);
        this.servicos.push(servico1);

        const servico2 = new Servico("Consulta Veterinária", 50.00);
        this.servicos.push(servico2);

        const servico3 = new Servico("Corte de Unhas", 15.00);
        this.servicos.push(servico3);

        const servico4 = new Servico("Hospedagem", 40.00);
        this.servicos.push(servico4);

        const servico5 = new Servico("Adestramento", 60.00);
        this.servicos.push(servico5);

        // Adicionando mais 5 serviços
        const servico6 = new Servico("Passeio com Pet", 20.00);
        this.servicos.push(servico6);

        const servico7 = new Servico("Limpeza de Orelhas", 10.00);
        this.servicos.push(servico7);

        const servico8 = new Servico("Escovaçao Dental", 25.00);
        this.servicos.push(servico8);

        const servico9 = new Servico("Massagem Relaxante", 35.00);
        this.servicos.push(servico9);

        const servico10 = new Servico("Treinamento para Filhotes", 55.00);
        this.servicos.push(servico10);

        return this.servicos;
    }

    produtosEServicosConsumidosTeste(){
        function getDataAleatoria(dataInicial:Date, dataFinal:Date): Date {
            const dataAleatoria = new Date(dataInicial.getTime() + Math.random() * (dataFinal.getTime() - dataInicial.getTime()));
            const timezoneOffset = dataAleatoria.getTimezoneOffset();
            dataAleatoria.setMinutes(dataAleatoria.getMinutes() - timezoneOffset);
            return dataAleatoria;
        }

        for (let i = 0; i < 50; i++) {
            let listaPets:Array<Pet> = []
            this.clientes.map(cliente => cliente.getPets.map(pet => listaPets.push(pet)));
            const petAleatorio:number = Math.floor(Math.random() * listaPets.length);
            const servicoAleatorio:number = Math.floor(Math.random() * this.servicos.length);
            const dataAleatoria = getDataAleatoria(new Date(2023,1,1), new Date())

            const compraServico = new ServicoConsumido(this.servicos[servicoAleatorio], dataAleatoria, listaPets[petAleatorio]);
            const clienteCompra = this.clientes.find(clienteData => clienteData.getPets.includes(listaPets[petAleatorio]));
            const servicoCompra = this.servicos.find(servicoData => servicoData === compraServico.servicoConsumido);
            if (clienteCompra && servicoCompra) { clienteCompra.getServicosConsumidos.push(compraServico) }
        }

        for (let i = 0; i < 50; i++) {
            let listaPets:Array<Pet> = []
            this.clientes.map(cliente => cliente.getPets.map(pet => listaPets.push(pet)));
            const petAleatorio:number = Math.floor(Math.random() * listaPets.length);
            const produtoAleatorio:number = Math.floor(Math.random() * this.produtos.length);
            const dataAleatoria = getDataAleatoria(new Date(2023,1,1), new Date())

            const compraProduto = new ProdutoConsumido(this.produtos[produtoAleatorio], dataAleatoria, listaPets[petAleatorio]);
            const clienteCompra = this.clientes.find(clienteData => clienteData.getPets.includes(listaPets[petAleatorio]));
            const produtoCompra = this.produtos.find(servicoData => servicoData === compraProduto.produtoConsumido);
            if (clienteCompra && produtoCompra) { clienteCompra.getProdutosConsumidos.push(compraProduto) }
        }
    }
}