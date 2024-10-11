import React, { useState, useEffect } from "react";
import api from "../services/api";
import ResponseModal from "./ModalFuncionalidades/ModalResponse";
import WebcamCapture from "./ComponenteWeb";

const ProfileModalContent: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [peso, setPeso] = useState<number | "">("");
  const [genero, setGenero] = useState<string>("X");
  const [altura, setAltura] = useState<number | "">("");
  const [imc, setImc] = useState<number | "">("");

  const [nomeError, setNomeError] = useState<boolean>(false);
  const [dataNascimentoError, setDataNascimentoError] =
    useState<boolean>(false);
  const [pesoError, setPesoError] = useState<boolean>(false);
  const [generoError, setGeneroError] = useState<boolean>(false);
  const [alturaError, setAlturaError] = useState<boolean>(false);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const handlePesoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPeso(isNaN(value) ? "" : value);
  };

  const handleAlturaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAltura(isNaN(value) ? "" : value);
  };

  useEffect(() => {
    if (typeof peso === "number" && typeof altura === "number" && altura > 0) {
      const calculatedImc = peso / (altura * altura);
      setImc(Number(calculatedImc.toFixed(2)));
    } else {
      setImc("");
    }
  }, [peso, altura]);

  const handleSubmit = async () => {
    setNomeError(!nome);
    setDataNascimentoError(!dataNascimento);
    setPesoError(!peso);
    setGeneroError(genero === "X");
    setAlturaError(!altura);

    if (!nome || !dataNascimento || !peso || !altura || genero === "X") {
      setModalMessage("Preencha todos os campos obrigatórios.");
      setModalType("error");
      setModalIsOpen(true);
      return;
    }

    const userId = localStorage.getItem("userId");

    const profileData = {
      userId,
      nome,
      dataNascimento,
      peso,
      genero,
      altura,
      imc,
    };

    try {
      const response = await api.post("profile", profileData);
      console.log("Dados salvos:", response.data);
      setModalMessage("Perfil salvo com sucesso!");
      setModalType("success");
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
      setModalMessage("Erro ao salvar perfil. Tente novamente.");
      setModalType("error");
    } finally {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      <WebcamCapture />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div>
          <label className={`font-bold ${nomeError ? "text-red-500" : ""}`}>
            Nome:
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={`p-1 text-black border rounded-md w-full ${
              nomeError ? "border-red-500" : ""
            }`}
          />
        </div>
        <div>
          <label
            className={`font-bold ${dataNascimentoError ? "text-red-500" : ""}`}
          >
            Data de Nascimento:
          </label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className={`p-1 text-black border rounded-md w-full ${
              dataNascimentoError ? "border-red-500" : ""
            }`}
          />
        </div>
        <div>
          <label className={`font-bold ${pesoError ? "text-red-500" : ""}`}>
            Peso (kg):
          </label>
          <input
            type="number"
            value={peso}
            onChange={handlePesoChange}
            className={`p-1 text-black border rounded-md w-full ${
              pesoError ? "border-red-500" : ""
            }`}
            step="0.1"
          />
        </div>
        <div>
          <label className={`font-bold ${generoError ? "text-red-500" : ""}`}>
            Gênero:
          </label>
          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            className={`p-1 text-black border rounded-md w-full ${
              generoError ? "border-red-500" : ""
            }`}
          >
            <option value="X">Selecione o Gênero</option>
            <option value="Y">Masculino</option>
            <option value="Z">Feminino</option>
          </select>
        </div>
        <div>
          <label className={`font-bold ${alturaError ? "text-red-500" : ""}`}>
            Altura (m):
          </label>
          <input
            type="number"
            value={altura}
            onChange={handleAlturaChange}
            className={`p-1 text-black border rounded-md w-full ${
              alturaError ? "border-red-500" : ""
            }`}
            step="0.01"
          />
        </div>
        <div>
          <label className="font-bold">IMC:</label>
          <input
            type="number"
            value={imc}
            readOnly
            className="p-1 text-black border rounded-md w-full"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <ResponseModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          message={modalMessage}
          type={modalType}
        />
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-[#7bdb6f] to-[#22610f] p-2 rounded-lg text-white font-bold hover:from-[#5abc4c] hover:to-[#1e4f0d] transition-colors duration-200"
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

export default ProfileModalContent;
