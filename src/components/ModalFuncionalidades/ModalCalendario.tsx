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
    <div className="fixed inset-0 z-50 flex items-center">
      <div className="fixed inset-0 bg-black opacity-70"></div>

      <div className=" w-full mx-2 relative bg-gradient-to-r from-[#a8f748] to-[#05fa29] p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4 text-black">
          {diaSelecionado.inicial} - {diaSelecionado.dia}
        </h2>
        <p>dados aqui.</p>
        <button
          onClick={fecharModal}
          className="mt-6 bg-gradient-to-r from-[#979996] to-[#000000] hover:bg-gradient-to-r hover:from-[#000000] hover:to-[#979996] transition-colors text-white p-2 rounded"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalDetalhesDia;
