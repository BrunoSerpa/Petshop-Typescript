import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CPF from '../modelo/cpf';
import RG from '../modelo/rg';
import Cliente from '../modelo/cliente';
import FuncoesCliente from '../negocio/funcoesCliente';
import Telefone from '../modelo/telefone';
import Pet from '../modelo/pet';

const AlterarClienteComponent: React.FC<{ clientes: Array<Cliente>, clienteSelecionado: Cliente, posicaoCliente: number }> = ({ clientes, clienteSelecionado, posicaoCliente }) => {
  const [formData, setFormData] = useState({
    nome: clienteSelecionado.nome,
    nomeSocial: clienteSelecionado.nomeSocial,
    cpf: clienteSelecionado.getCpf,
    hasNomeSocial: false,
    listaRgs: [...clienteSelecionado.getRgs],
    listaTelefonica: clienteSelecionado.getTelefones.map(telefone => `${telefone.getDdd}${telefone.getNumero}`),
    listaPets: [...clienteSelecionado.getPets],
  });
  const formatCPF = (cpf: string): string => {
      return cpf
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2");
  };
  const formatRG = (rg: string): string => {
      return rg
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1})/, "$1/$2");
  };
  const formatTelefone = (telefone: string): string => {
      return telefone
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4,5})(\d{4})/, "$1-$2");
  };
  const handleInputChange = (field: string, value: any): void => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };
  const handleNomeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    handleInputChange('nome', event.target.value);
  };
  const handleNomeSocialChange = (event: ChangeEvent<HTMLInputElement>): void => {
    handleInputChange('nomeSocial', event.target.value);
  };
  const handlechangeCpf = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputCPF = event.target.value;
    const formattedCPF = formatCPF(inputCPF);
    handleInputChange('cpf', new CPF(formattedCPF, formData.cpf.getDataEmissao));
  };
  const handleDateChanceCpf = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputDate = event.target.value;
    const selectedDate = new Date(inputDate);
    handleInputChange('cpf', new CPF(formData.cpf.getValor, selectedDate));
  };
  const handlechangeRg = (index: number, event: ChangeEvent<HTMLInputElement>): void => {
    const inputRG = event.target.value;
    const formattedRG = formatRG(inputRG);
    handleInputChange('rgs', formData.listaRgs.map((rg, i) => (i === index ? new RG(formattedRG, rg.getDataEmissao) : rg)));
  };
  const handleDateChangeRG = (index: number, event: ChangeEvent<HTMLInputElement>): void => {
    const inputDate = event.target.value;
    const selectedDate = new Date(inputDate);
    handleInputChange('rgs', formData.listaRgs.map((rg, i) => (i === index ? new RG(rg.getValor, selectedDate) : rg)));
  };
  const adicionandoRg = (): void => {
    handleInputChange('rgs', [...formData.listaRgs, new RG("", new Date())]);
  };
  const removendoRg = (index: number): void => {
    const listaRgsAtualizada = [...formData.listaRgs];
    listaRgsAtualizada.splice(index, 1);
    handleInputChange('rgs', listaRgsAtualizada);
  };
  const handlechangeTelefone = (index: number, event: ChangeEvent<HTMLInputElement>): void => {
    const inputTelefone = event.target.value;
    const formattedTelefone = formatTelefone(inputTelefone);
    handleInputChange('listaTelefonica', formData.listaTelefonica.map((telefone, i)  => (i === index ? formattedTelefone : telefone)));
  };
  const adicionandoTelefone = (): void => {
    handleInputChange('listaTelefonica',[...formData.listaTelefonica,""]);
  };
  const removendoTelefone = (index: number): void => {
    const listaTelefonicaAtualizada = [...formData.listaTelefonica];
    listaTelefonicaAtualizada.splice(index, 1)
    handleInputChange('listaTelefonica',listaTelefonicaAtualizada);
  };
  const handleAddPetField = (): void => {
    handleInputChange('listaPets', [...formData.listaPets, new Pet("", "", "", "")]);
  };
  const handleRemovePetField = (index: number): void => {
    const updatedPetList = [...formData.listaPets];
    updatedPetList.splice(index, 1);
    handleInputChange('listaPets', updatedPetList);
  };
  const handlechangePetField = (index: number, field: keyof Pet, event: ChangeEvent<HTMLInputElement>): void => {
    handleInputChange('listaPets', formData.listaPets.map((pet, i) => (i === index ? { ...pet, [field]: event.target.value } as Pet : pet)));
  };
  const alterandoCliente = new FuncoesCliente(clientes);
  const navigate = useNavigate();
  const handleAlterarCliente = (event: FormEvent): void => {
    event.preventDefault();

    const dadosForm = new Cliente(
      formData.nome,
      formData.nomeSocial,
      formData.cpf
    );

    dadosForm.setRgs = formData.listaRgs;
    dadosForm.setTelefones = formData.listaTelefonica.map((telefone) => {
      const novoTelefone = parseFloat(telefone);
      const ddd = String(novoTelefone).substring(0, 2);
      const num = String(novoTelefone).substring(2);
      return new Telefone(ddd, num);
    });
    dadosForm.setPets = formData.listaPets;
    clientes = alterandoCliente.alterarCliente(dadosForm, clientes[posicaoCliente].getCpf.getValor);
    navigate('/clientes');
  };
  return (
    <div className="container-fluid">
      <form onSubmit={handleAlterarCliente}>
        {/* Seção do Nome */}
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
            value={formData.nome}
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="nomeSocial" className="input-group-text">
            Nome Social
          </label>
          <input
            aria-label="Nome social"
            aria-describedby="basic-addon1"
            className="form-control"
            type="text"
            value={formData.nomeSocial}
            onChange={handleNomeSocialChange}
            placeholder="Nome social"
          />
        </div>
        {/* Seção do CPF */}
        <div className="input-group mb-3">
          <label htmlFor="valorCPF" className="input-group-text">
            Número do CPF
          </label>
          <input
            aria-label="Cpf"
            aria-describedby="basic-addon1"
            className="form-control"
            maxLength={12}
            onChange={handlechangeCpf}
            value={formData.cpf.getValor}
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
            value={formData.cpf.getDataEmissao.toISOString().split("T")[0] || ""}
            onChange={handleDateChanceCpf}
            id="dataEmissaoCPF"
          />
        </div>
        {formData.listaRgs.map((rg, index) => (
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
        {formData.listaTelefonica.map((telefone, index) => (
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
        {formData.listaPets.map((pet, index) => (
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
        <div className="input-group mb-3">
          <button
            className="btn btn-outline-secondary  mb-3"
            type="button"
            onClick={() => handleAddPetField()}
          >
            Adicionar Pet
          </button>
        </div>
        <div className="input-group mb-3">
          <button type="submit" className="btn btn-outline-success">
            Alterar
          </button>
        </div>
      </form>
    </div>
  );
}
export default AlterarClienteComponent;