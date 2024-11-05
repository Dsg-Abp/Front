import React from "react";

interface ModalDetalhesDiaProps {
  diaSelecionado: { inicial: string; dia: string } | null;
  fecharModal: () => void;
  caloriasHoje: number | null; // Pode ser null, então ajuste para aceitar
  someWaterToday: number | null; // Adicionando a propriedade para somewater
}

const ModalDetalhesDia: React.FC<ModalDetalhesDiaProps> = ({
  diaSelecionado,
  fecharModal,
  caloriasHoje, // Recebendo a propriedade de calorias
  someWaterToday, // Recebendo somewater do dia
}) => {
  if (!diaSelecionado) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-70"></div>

      <div className="flex flex-col items-center w-[400px] mx-2 bg-white p-6 rounded-lg shadow-lg text-center relative text-gray-900">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">
          {diaSelecionado.inicial} - {diaSelecionado.dia}
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Total de Calorias Consumidas:</h3>
          <p className="text-red-600 text-2xl font-bold">
            {caloriasHoje !== null && caloriasHoje > 0 ? `${caloriasHoje} kcal` : "Sem dados"}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Água do Dia Selecionado:</h3>
          <p className="text-green-600 text-2xl font-bold">
            {someWaterToday !== null ? `${someWaterToday} ml` : "Sem dados"}
          </p>
        </div>

        <button
          onClick={fecharModal}
          className="bg-gradient-to-r from-[#979996] to-[#000000] hover:bg-gradient-to-r hover:from-[#000000] hover:to-[#979996] transition-colors text-white p-2 rounded mt-4"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalDetalhesDia;
