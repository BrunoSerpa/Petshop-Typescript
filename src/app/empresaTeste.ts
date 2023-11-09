import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import Pet from "../modelo/pet";
import RG from "../modelo/rg";
import Telefone from "../modelo/telefone";

export default class EmpresaTeste {
    private clientes: Array<Cliente> = [];

    clientesEmpresaTeste() {
        const cliente1 = new Cliente('João da Silva', 'João', new CPF('12345678901', new Date(2000, 1, 1))); // Corrigi o mês (janeiro é 0)
        cliente1.getRgs.push(new RG('12345', new Date(2005, 1, 1)));
        cliente1.getTelefones.push(new Telefone('11', '987654321'));
        cliente1.getTelefones.push(new Telefone('11', '123456789'));
        cliente1.getPets.push(new Pet('Rex', 'Labrador', 'Macho', 'Cachorro'));
        cliente1.getPets.push(new Pet('Whiskers', 'Siamês', 'Fêmea', 'Gato'));
        this.clientes.push(cliente1);

        const cliente2 = new Cliente('Maria da Silva', 'Maria', new CPF('98765432109', new Date(2001, 2, 2))); // Corrigi o mês
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

        const cliente6 = new Cliente('André Souza', 'André', new CPF('44444444444', new Date(1975, 6, 18)));
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
}
