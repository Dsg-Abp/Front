

interface ModalDetalhesDiaProps {
  diaSelecionado: { inicial: string; dia: string } | null;
  caloriasHoje: number | null; // Recebe calorias
  totalWater: number; // Recebe total de água
  fecharModal: () => void;
}

const ModalDetalhesDia: React.FC<ModalDetalhesDiaProps> = ({
  diaSelecionado,
  caloriasHoje,
  totalWater,
  fecharModal,
}) => {
  if (!diaSelecionado) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-70"></div>

      <div className="flex flex-col items-center w-[400px] mx-2 bg-white p-6 rounded-lg shadow-lg text-center relative text-gray-900">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">
          {diaSelecionado?.inicial} - {diaSelecionado?.dia}
        </h2>

        <div className="mb-6">
          {caloriasHoje !== null && (
            <>
              <h3 className="text-lg font-semibold mb-3">Calorias Consumidas Hoje:</h3>
              <p className="text-blue-600 text-2xl font-bold">{caloriasHoje} kcal</p>
            </>
          )}
          <h3 className="text-lg font-semibold mb-3 mt-4">Total de Água Consumida:</h3>
          <p className="text-blue-600 text-2xl font-bold">{totalWater} ml</p>
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
