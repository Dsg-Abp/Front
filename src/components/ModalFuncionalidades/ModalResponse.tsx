import React from "react";
import Modal from "react-modal";
import successJson from "../../assets/animacoes/sucess.json";
import error from "../../assets/animacoes/error.json";
import Animação from "../Animação";

interface ResponseModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  message: string;
  type: "success" | "error";
}

const ResponseModal: React.FC<ResponseModalProps> = ({
  isOpen,
  onRequestClose,
  message,
  type,
}) => {
  const animationData = type === "success" ? successJson : error;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex justify-center items-center fixed inset-0 z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      ariaHideApp={false}
    >
      <div className="bg-white rounded-lg p-6 w-[200px] h-[400px] shadow-lg flex flex-col items-center">
        <Animação animationData={animationData} />
        <h2
          className={`text-lg font-bold ${
            type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {type === "success" ? "Sucesso!" : "Erro!"}
        </h2>
        <p className="mt-2">{message}</p>
        <button
          onClick={onRequestClose}
          className="mt-4 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-2 px-4 rounded hover:bg-gradient-to-r hover:from-red-400 hover:to-red-600 transition duration-200"
        >
          Fechar
        </button>
      </div>
    </Modal>
  );
};

export default ResponseModal;
