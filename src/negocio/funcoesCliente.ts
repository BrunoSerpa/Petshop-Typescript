import { InCliente } from "../modelo/Interfaces";

function FuncoesCliente(clientes: InCliente[]): {
  cadastrarCliente: (novoCliente: InCliente) => InCliente[];
  alterarCliente: (clienteAlterado: InCliente, cpfValor: string) => InCliente[];
  deletarCliente: (cpfCliente: string) => InCliente[];
} {
  return {
    cadastrarCliente: (novoCliente: InCliente) => {
      const clienteExistente = clientes.find(
        (cliente) => cliente.cpf.valor === novoCliente.cpf.valor
      );
      if (!clienteExistente) {
        clientes.push(novoCliente);
      }
      return clientes;
    },
    alterarCliente: (clienteAlterado: InCliente, cpfValor: string) => {
      clientes.forEach((cliente, index) => {
        if (cliente.cpf.valor === cpfValor) {
          clientes[index] = clienteAlterado;
        }
      });
      return clientes;
    },
    deletarCliente: (cpfCliente: string) => {
      clientes = clientes.filter((cliente) => cliente.cpf.valor !== cpfCliente);
      return clientes;
    },
  };
}

export default FuncoesCliente;
