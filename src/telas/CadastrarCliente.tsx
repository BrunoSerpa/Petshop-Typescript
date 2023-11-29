import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cliente from '../modelo/cliente';
import Telefone from '../modelo/telefone';
import FuncoesCliente from '../negocio/funcoesCliente';
import CPF from '../modelo/cpf';
import RG from '../modelo/rg';
import Pet from '../modelo/pet';

const CadastrarClienteComponent: React.FC<{ clientes: Array<Cliente> }> = ({ clientes }) => {
  /* Forms */
  const [nome, setNome] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [cpf, setCpf] = useState(new CPF("", new Date()));
  const [hasNomeSocial, setHasNomeSocial] = useState(false);
  const [listaRgs, setListaRgs] = useState([new RG("", new Date())]);
  const [listaTelefonica, setListaTelefonica] = useState([""]);
  const [listaPets, setListaPets] = useState([new Pet("", "", "", "")]);
  const handleNomeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNome(event.target.value);
};

const handleNomeSocialChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNomeSocial(event.target.value);
};

const handleToggleNomeSocial = (): void => {
    setHasNomeSocial((prevHasNomeSocial) => !prevHasNomeSocial);
};

const formatCPF = (cpf: string): string => {
    return cpf
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2");
};

const handlechangeCpf = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputCPF = event.target.value;
    const formattedCPF = formatCPF(inputCPF);
    setCpf((prevCpf) => new CPF(formattedCPF, prevCpf.getDataEmissao));
};

const handleDateChanceCpf = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputDate = event.target.value;
    const selectedDate = new Date(inputDate);
    setCpf((prevCpf) => new CPF(prevCpf.getValor, selectedDate));
};

const formatRG = (rg: string): string => {
    return rg
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1})/, "$1/$2");
};

const handlechangeRg = (index: number, event: ChangeEvent<HTMLInputElement>): void => {
    const inputRG = event.target.value;
    const formattedRG = formatRG(inputRG);
    setListaRgs((prevListaRgs) =>
        prevListaRgs.map((rg, i) => (i === index ? new RG(formattedRG, rg.getDataEmissao) : rg))
    );
};

const handleDateChangeRG = (index: number, event: ChangeEvent<HTMLInputElement>): void => {
    const inputDate = event.target.value;
    const selectedDate = new Date(inputDate);
    setListaRgs((prevListaRgs) =>
        prevListaRgs.map((rg, i) => (i === index ? new RG(rg.getValor, selectedDate) : rg))
    );
};

const adicionandoRg = (): void => {
    setListaRgs((prevListaRgs) => [...prevListaRgs, new RG("", new Date())]);
};

const removendoRg = (index: number): void => {
    const listaRgsAtualizada = [...listaRgs];
    listaRgsAtualizada.splice(index, 1);
    setListaRgs(listaRgsAtualizada);
};

const formatTelefone = (telefone: string): string => {
    return telefone.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4,5})(\d{4})/, "$1-$2");
};

const handlechangeTelefone = (index: number, event: ChangeEvent<HTMLInputElement>): void => {
    const inputTelefone = event.target.value;
    const formattedTelefone = formatTelefone(inputTelefone);

    setListaTelefonica((prevListaTelefonica) => {
        const listaTelefonicaAtualizada = [...prevListaTelefonica];
        listaTelefonicaAtualizada[index] = formattedTelefone;
        return listaTelefonicaAtualizada;
    });
};

const adicionandoTelefone = (): void => {
    setListaTelefonica((prevListaTelefonica) => [...prevListaTelefonica, ""]);
};

const removendoTelefone = (index: number): void => {
    const listaTelefonicaAtualizada = [...listaTelefonica];
    listaTelefonicaAtualizada.splice(index, 1);
    setListaTelefonica(listaTelefonicaAtualizada);
};

const handleAddPetField = (): void => {
    setListaPets((prevListaPets) => [...prevListaPets, new Pet("", "", "", "")]);
};

const handleRemovePetField = (index: number): void => {
    const updatedPetList = [...listaPets];
    updatedPetList.splice(index, 1);
    setListaPets(updatedPetList);
};

const handlechangePetField = (index: number, field: keyof Pet, event: ChangeEvent<HTMLInputElement>): void => {
setListaPets((prevListaPets) => {
    const updatedPetList = prevListaPets.map((pet, i) => {
    if (i === index) {
        return { ...pet, [field]: event.target.value } as Pet;
    }
    return pet;
    });

    return updatedPetList;
});
};
  const cadastrandoCliente = new FuncoesCliente(clientes);
  const navigate = useNavigate();


  const handleCadastrar = (event: FormEvent): void => {
    event.preventDefault();
    const dadosForm = new Cliente(nome, nomeSocial, cpf);
    dadosForm.setRgs = listaRgs;
    const listaFormatada: Array<Telefone> = []
    listaTelefonica.forEach((telefone) => {
      const numeroLimpo = telefone.replace(/\D/g, '');
      const ddd = String(numeroLimpo).substring(0, 2);
      const num = String(numeroLimpo).substring(2);
      listaFormatada.push(new Telefone(ddd, num));
    })
    dadosForm.setTelefones=listaFormatada
    dadosForm.setPets = listaPets;
    clientes = cadastrandoCliente.cadastrarCliente(dadosForm);
    navigate('/clientes');

  };

  return (
    <div className="container-fluid">
      <form onSubmit={handleCadastrar}>
        <div className="input-group mb-3">
          <label htmlFor="nome" className="input-group-text">
            Nome
          </label>
          <input
            aria-label="Nome"
            aria-describedby="basic-addon1"
            className="form-control"
            type="text"
            placeholder="Nome"
            onChange={handleNomeChange}
            value={nome}
          />
        </div>
        {hasNomeSocial ? (
          <div className="input-group mb-3">
            <label htmlFor="nomeSocial" className="input-group-text">
              Nome Social
            </label>
            <input
              aria-label="Nome social"
              aria-describedby="basic-addon1"
              className="form-control"
              type="text"
              value={nomeSocial}
              onChange={handleNomeSocialChange}
              placeholder="Nome social"
            />
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleToggleNomeSocial}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              onChange={handleToggleNomeSocial}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              Possui Nome Social?
            </label>
          </div>
        )}
        <div className="input-group mb-3">
          <label htmlFor="valorCPF" className="input-group-text">
            Número do CPF
          </label>
          <input
            aria-label="Cpf"
            aria-describedby="basic-addon1"
            className="form-control"
            maxLength={12}
            onChange={(e) => handlechangeCpf(e)}
            value={cpf.getValor}
            placeholder="CPF"
            required
            type="text"
          />
          <label htmlFor="dataEmissaoCPF" className="input-group-text">
            Data de Emissão
          </label>
          <input
            className="form-control"
            type="date"
            value={cpf.getDataEmissao.toISOString().split("T")[0] || ""}
            onChange={(e) => handleDateChanceCpf(e)}
            id="dataEmissaoCPF"
          />
        </div>
        {listaRgs.map((rg, index) => (
          <div key={index} className="input-group mb-3">
            <label htmlFor="valorCPF" className="input-group-text">
              Número do RG
            </label>
            <input
              aria-label={`RG ${index + 1}`}
              aria-describedby="basic-addon1"
              className="form-control"
              maxLength={12}
              onChange={(e) => handlechangeRg(index, e)}
              value={rg.getValor}
              placeholder={`RG ${index + 1}`}
              required
              type="text"
            />
            <label htmlFor="dataEmissaoCPF" className="input-group-text">
              Data de Emissão
            </label>
            <input
              className="form-control"
              type="date"
              value={rg.getDataEmissao.toISOString().split("T")[0] || ""}
              onChange={(e) => handleDateChangeRG(index, e)}
            />
            {index > 0 && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removendoRg(index)}
              >
                Remover RG
              </button>
            )}
          </div>
        ))}
        <div className="input-group mb-3">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => adicionandoRg()}
          >
            Adicionar RG
          </button>
        </div>
        {listaTelefonica.map((telefone, index) => (
          <div key={index} className="input-group mb-3">
            <label htmlFor="valorCPF" className="input-group-text">
              Número do Telefone
            </label>
            <input
              aria-label={`Telefone ${index + 1}`}
              aria-describedby="basic-addon1"
              className="form-control"
              maxLength={14}
              onChange={(e) => handlechangeTelefone(index, e)}
              placeholder={`Telefone ${index + 1}`}
              value={telefone}
              required
              type="text"
            />
            {index > 0 && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removendoTelefone(index)}
              >
                Remover Telefone
              </button>
            )}
          </div>
        ))}
        <div className="input-group mb-3">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => adicionandoTelefone()}
          >
            Adicionar Telefone
          </button>
        </div>
        {listaPets.map((pet, index) => (
          <div key={index} className="accordion mb-3" id={`petAccordion`}>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  aria-controls={`petPanel-${index}`}
                  data-bs-target={`#petPanel-${index}`}
                >
                  <button
                    aria-label="Close"
                    className="btn-close"
                    type="button"
                    onClick={() => handleRemovePetField(index)}
                  />
                  {index + 1} Pet: {pet.getNome}
                </button>
              </h2>
              <div
                className="accordion-collapse collapse"
                data-bs-parent="#petAccordion"
                id={`petPanel-${index}`}
              >
                <div className="input-group mb-3">
                  <input
                    aria-label={`Nome do Pet`}
                    aria-describedby="basic-addon1"
                    className="form-control"
                    type="text"
                    placeholder={`Nome do Pet`}
                    onChange={(e) => handlechangePetField(index, "getNome", e)}
                    value={pet.getNome}
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      id={`inlineRadio1-${index}`}
                      name={`inlineRadioOptions-${index}`}
                      type="radio"
                      value="Macho"
                      checked={pet.getGenero === "Macho"}
                      onChange={(e) => handlechangePetField(index, "getGenero", e)}
                    />
                    <label className="form-check-label" htmlFor={`inlineRadio1-${index}`}>
                      Macho
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      id={`inlineRadio2-${index}`}
                      name={`inlineRadioOptions-${index}`}
                      type="radio"
                      value="Fêmea"
                      checked={pet.getGenero === "Fêmea"}
                      onChange={(e) => handlechangePetField(index, "getGenero", e)}
                    />
                    <label className="form-check-label" htmlFor={`inlineRadio2-${index}`}>
                      Fêmea
                    </label>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    aria-label="pet-raca"
                    aria-describedby="basic-addon1"
                    className="form-control"
                    type="text"
                    placeholder="Raça do pet"
                    onChange={(e) => handlechangePetField(index, "getRaca", e)}
                    value={pet.getRaca}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    aria-label="pet-tipo"
                    aria-describedby="basic-addon1"
                    className="form-control"
                    type="text"
                    placeholder="Tipo do pet"
                    onChange={(e) => handlechangePetField(index, "getTipo", e)}
                    value={pet.getTipo}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          className="btn btn-outline-secondary  mb-3"
          type="button"
          onClick={() => handleAddPetField()}
        >
          Adicionar Pet
        </button>
        <div className="input-group mb-3">
          <button type="submit" className="btn btn-outline-success">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastrarClienteComponent;
