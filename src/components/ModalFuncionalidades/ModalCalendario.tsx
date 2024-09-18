import React from "react";

interface ModalDetalhesDiaProps {
  diaSelecionado: { inicial: string; dia: string } | null;
  fecharModal: () => void;
}

const ModalDetalhesDia: React.FC<ModalDetalhesDiaProps> = ({
  diaSelecionado,
  fecharModal,
}) => {
  if (!diaSelecionado) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Filtro de fundo */}
      <div className="fixed inset-0 bg-black opacity-70"></div>

      {/* Bloco centralizado */}
      <div className="flex flex-col items-center w-[400px] mx-2 bg-blue-900 p-6 rounded-lg shadow-lg text-center relative text-white">
        <h2 className="text-xl font-bold mb-4 text-white">
          {diaSelecionado.inicial} - {diaSelecionado.dia}
        </h2>
        <p className="mb-6">dados aqui.</p>
        <button
          onClick={fecharModal}
          className="bg-gradient-to-r from-[#979996] to-[#e41c09] hover:bg-gradient-to-r hover:from-[#000000] hover:to-[#979996] transition-colors text-white p-2 rounded"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalDetalhesDia;
