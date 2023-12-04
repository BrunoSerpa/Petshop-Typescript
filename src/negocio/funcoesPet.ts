import Cliente from "../modelo/cliente";
import Pet from "../modelo/pet";

function FuncoesPet(clientes: ReturnType<typeof Cliente>[]) {
  return {
    cadastrarPet: (novoPet: ReturnType<typeof Pet>, index: number) => {
      let dono = clientes[index];
      if (dono) {
        let novo = dono.getPets().find((pet) => pet.nome === novoPet.getGenero());
        if (!novo) {
          dono.setPets([...dono.getPets(), novoPet]);
        }
      }
      return clientes;
    },
    alterarPet: (petAlterado: ReturnType<typeof Pet>, posicaoCliente: number, posicaoPet: number) => {
      let petAntigo = clientes[posicaoCliente].getPets()[posicaoPet];
      if (petAntigo) {
        let novosPets = [...clientes[posicaoCliente].getPets()];
        novosPets[posicaoPet] = petAlterado;
        clientes[posicaoCliente].setPets(novosPets);
      }
      return clientes;
    },
    deletarPet: (posicaoCliente: number, posicaoPet: number) => {
      let clientesAntigos = clientes;
      clientes = [];
      clientesAntigos.forEach((cliente, index) => {
        if (index === posicaoCliente) {
          let novosPets = cliente.getPets().filter((pet, petIndex) => petIndex !== posicaoPet);
          cliente.setPets(novosPets);
        }
        clientes.push(cliente);
      });
      return clientes;
    },
  };
}

export default FuncoesPet;
