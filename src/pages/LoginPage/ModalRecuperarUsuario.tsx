import React, { useState } from "react";
import Modal from "react-modal";
import api from "../../services/api";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSuccess: (email: string) => void; // Notificar com o email
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onRequestClose,
  onSuccess, // Receba a prop onSuccess
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await api.post("/reset", { email });

      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        onSuccess(email); // Notifique com o email
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.error || "Erro ao recuperar senha");
      } else {
        setError("Erro ao recuperar senha");
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="relative bg-white opacity-90  rounded-full w-full max-w-md p-20 mx-4 overflow-y-auto max-h-[90%] outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
    >
      <div className="flex flex-col items-center">
        <h2 className="text-center text-2xl font-bold mb-4 text-white">
          Recuperar Senha
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <label htmlFor="forgot-email" className="block mb-2 text-center">
            Email:
          </label>
          <input
            type="email"
            id="forgot-email"
            value={email}
            onChange={handleEmailChange}
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
            Enviar Email de Recuperação
          </button>
        </form>
        <button className="mt-4 text-red-500" onClick={onRequestClose}>
          Fechar
        </button>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
