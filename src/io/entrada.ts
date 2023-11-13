import promptSync from "prompt-sync";
export default class Entrada {
    private prompt = promptSync();
    public receberTexto(mensagem: string): string {
        return this.prompt(mensagem)
    }
    public receberNumero(mensagem: string): number {
        while (true){
            let valor = this.prompt(mensagem)
            let numero = parseFloat(valor)
            if (isNaN(numero)) {
                console.log('Insira um número!');
            } else {
                return numero;
            }
        }
    }
    public receberData(mensagem: string): Date {
        let dataEmissao: Date;
        while (true) {
            const data = this.prompt(mensagem);
            const partesData = data.split('/');
            if (partesData.length !== 3) {
                console.log('Formato de data inválido. Use dd/mm/yyyy.');
                continue;
            }
            const dia = parseInt(partesData[0], 10);
            const mes = parseInt(partesData[1], 10);
            const ano = parseInt(partesData[2], 10);
            if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
                console.log('Data inválida. Certifique-se de usar números para dia, mês e ano.');
                continue;
            }
            dataEmissao = new Date(ano, mes - 1, dia);
            if (!this.dataValida(dataEmissao)) {
                console.log('Data de emissão inválida. Verifique a data inserida.');
                continue;
            }
            break;
        }
        return dataEmissao;
    }
    private dataValida(data: Date): boolean {
        return !isNaN(data.getTime());
    }

    public receberCPF(mensagem: string): string {
        while (true) {
            const cpf = this.prompt(mensagem);
            const cpfNumerico = parseInt(cpf, 10);
            if (isNaN(cpfNumerico) || String(cpfNumerico).length === 11){
                return this.formatarCPF(cpfNumerico);
            } else {
                console.log('CPF inválido :(');
            }
        }
    }

    private formatarCPF(cpf: number): string {
        const cpfFormatado = cpf.toString()
        return `${cpfFormatado.substring(0, 3)}.${cpfFormatado.substring(3, 6)}.${cpfFormatado.substring(6, 9)}-${cpfFormatado.substring(9)}`;
    }

    public receberRG(mensagem: string): string {
        while (true) {
            const rg = this.prompt(mensagem);
            const rgNumerico = parseInt(rg, 10);
            if (!isNaN(rgNumerico) || String(rgNumerico).length === 9) {
                return this.formatarRG(rgNumerico);
            } else {
                console.log('RG inválido :(');
            }
        }
    }

    private formatarRG(rg: number): string {
        const rgFormatado = rg.toString()
        return `${rgFormatado.substring(0, 2)}.${rgFormatado.substring(2, 5)}.${rgFormatado.substring(5, 8)}/${rgFormatado.substring(8)}`;
    }
}