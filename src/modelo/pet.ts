import { InPet } from "./Interfaces";

function Pet(pet: InPet) {
  let dataCadastro = new Date();

  const setNome = (novoNome: string) => {
    pet.nome = novoNome;
  };

  const setRaca = (novaRaca: string) => {
    pet.raca = novaRaca;
  };

  const setTipo = (novoTipo: string) => {
    pet.tipo = novoTipo;
  };

  const setGenero = (novoGenero: string) => {
    pet.genero = novoGenero;
  };

  const getNome = () => {
    return pet.nome;
  };

  const getRaca = () => {
    return pet.raca;
  };

  const getTipo = () => {
    return pet.tipo;
  };

  const getGenero = () => {
    return pet.genero;
  };

  const getDataCadastro = () => {
    return dataCadastro;
  };

  return {
    setNome,
    setRaca,
    setTipo,
    setGenero,
    getNome,
    getRaca,
    getTipo,
    getGenero,
    getDataCadastro,
    ...pet
  };
}

export default Pet;