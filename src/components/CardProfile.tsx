import React, { useState, useEffect } from "react";
import api from "../services/api";
import ResponseModal from "./ModalFuncionalidades/ModalResponse";

const ProfileModalContent: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [peso, setPeso] = useState<number | "">("");
  const [genero, setGenero] = useState<string>("X");
  const [altura, setAltura] = useState<number | "">("");
  const [imc, setImc] = useState<number | "">("");

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
    const userID = localStorage.getItem("userId");

    const profileData = {
      userID,
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
      <div>
        <label className="font-bold">Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="p-1 border rounded-md w-full"
        />
      </div>
      <div>
        <label className="font-bold">Data de Nascimento:</label>
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          className="p-1 border rounded-md w-full"
        />
      </div>
      <div>
        <label className="font-bold">Peso (kg):</label>
        <input
          type="number"
          value={peso}
          onChange={handlePesoChange}
          className="p-1 border rounded-md w-full"
          step="0.1"
        />
      </div>
      <div>
        <label className="font-bold">Gênero:</label>
        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          className="p-1 border rounded-md w-full"
        >
          <option value="X">X</option>
          <option value="Y">Y</option>
        </select>
      </div>
      <div>
        <label className="font-bold">Altura (m):</label>
        <input
          type="number"
          value={altura}
          onChange={handleAlturaChange}
          className="p-1 border rounded-md w-full"
          step="0.01"
        />
      </div>
      <div>
        <label className="font-bold">IMC:</label>
        <input
          type="number"
          value={imc}
          readOnly
          className="p-1 border rounded-md w-full"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-gradient-to-r from-[#7bdb6f] to-[#22610f] p-2 w-auto rounded-lg mt-4 text-white font-bold hover:from-[#5abc4c] hover:to-[#1e4f0d] transition-colors duration-200"
      >
        Salvar
      </button>
      <ResponseModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
};

export default ProfileModalContent;
