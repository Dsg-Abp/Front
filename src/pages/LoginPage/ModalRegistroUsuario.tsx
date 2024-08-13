import React, { useState } from "react";
import Modal from "react-modal";
import api from "../../services/api";

interface RegisterModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await api.post("/register", { nome, email, senha });

      if (response.status === 201) {
        setSuccessMessage("Cadastro realizado com sucesso!");
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.error || "Erro ao registrar usuário");
      } else {
        setError("Erro ao registrar usuário");
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="relative bg-white opacity-90  rounded-full w-full max-w-md p-20 mx-10 max-h-[90%] "
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
    >
      <div className="flex flex-col items-center">
        <h2 className="text-center text-2xl font-bold mb-4">Cadastro</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <label htmlFor="register-nome" className="block mb-2 text-center">
            Nome:
          </label>
          <input
            type="text"
            id="register-nome"
            value={nome}
            onChange={handleNomeChange}
            className="w-full p-2 border mb-3 rounded text-center"
            required
          />
          <label htmlFor="register-email" className="block mb-2 text-center">
            Email:
          </label>
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-2 border mb-3 rounded text-center"
            required
          />
          <label htmlFor="register-senha" className="block mb-2 text-center">
            Senha:
          </label>
          <input
            type="password"
            id="register-senha"
            value={senha}
            onChange={handleSenhaChange}
            className="w-full p-2 border mb-3 rounded text-center"
            required
          />
          {error && (
            <div className="text-red-500 mb-2 text-center">{error}</div>
          )}
          {successMessage && (
            <div className="text-green-500 mb-2 text-center">
              {successMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-400 to-cyan-600 hover:from-teal-500 hover:to-cyan-700 text-white font-bold py-2 px-2 rounded-lg mb-2"
          >
            Registrar
          </button>
        </form>
        <button className="mt-4 text-red-500" onClick={onRequestClose}>
          Fechar
        </button>
      </div>
    </Modal>
  );
};

export default RegisterModal;
