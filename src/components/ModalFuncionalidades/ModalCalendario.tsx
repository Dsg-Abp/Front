import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Certifique-se de ajustar o caminho para o arquivo correto

interface ModalDetalhesDiaProps {
  diaSelecionado: { inicial: string; dia: string } | null;
  fecharModal: () => void;
}

const ModalDetalhesDia: React.FC<ModalDetalhesDiaProps> = ({
  diaSelecionado,
  fecharModal,
}) => {
  const [dados, setDados] = useState<any[]>([]); // Estado para armazenar os dados filtrados
  const [totalWater, setTotalWater] = useState<number>(0); // Novo estado para armazenar a soma de somewater

  useEffect(() => {
    if (diaSelecionado) {
      const userId = localStorage.getItem("userId");

      api
        .get("/teste")
        .then((response) => {
          const filteredData = response.data.findResult.filter(
            (item: any) =>
              item.user === userId || item.email?.user === userId
          );
          setDados(filteredData);

          // Somar o valor de "somewater" para todos os itens filtrados
          const total = filteredData.reduce((acc: number, item: any) => {
            const water = item.somewater || item.email?.somewater || 0;
            return acc + water;
          }, 0);
          setTotalWater(total); // Armazena o total no estado
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  }, [diaSelecionado]);

  if (!diaSelecionado) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-70"></div>

      <div className="flex flex-col items-center w-[400px] mx-2 bg-white p-6 rounded-lg shadow-lg text-center relative text-gray-900">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">
          {diaSelecionado.inicial} - {diaSelecionado.dia}
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Total de Água Consumida:</h3>
          <p className="text-blue-600 text-2xl font-bold">{totalWater} ml</p>
        </div>

        <button
          onClick={fecharModal}
          className="bg-gradient-to-r from-[#979996] to-[#e41c09] hover:bg-gradient-to-r hover:from-[#000000] hover:to-[#979996] transition-colors text-white p-2 rounded mt-4"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalDetalhesDia;
