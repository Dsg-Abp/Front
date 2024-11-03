import React, { useState, useEffect } from "react";
import api from "../../services/api";

interface ModalDetalhesDiaProps {
  diaSelecionado: { inicial: string; dia: string } | null;
  fecharModal: () => void;
}

const ModalDetalhesDia: React.FC<ModalDetalhesDiaProps> = ({
  diaSelecionado,
  fecharModal,
}) => {
  const [dados, setDados] = useState<any[]>([]);

  const [totalWater, setTotalWater] = useState<number>(0);

  useEffect(() => {
    if (diaSelecionado) {
      const userId = localStorage.getItem("userId");

      api
        .get("/findagua")
        .then((response) => {
          const filteredData = response.data.findResult.filter((item: any) => {
            // Extraindo o dia e o mês do diaSelecionado e do item.date
            const selectedDay = diaSelecionado.dia.split("/").map(Number); // [dia, mês]
            const itemDate = item.email.date.toString(); // Convertendo a data para string
            const itemDay = parseInt(itemDate.slice(0, 2)); // Pegando o dia do item
            const itemMonth = parseInt(itemDate.slice(2, 4)); // Pegando o mês do item

            // Comparando dia e mês com o dia selecionado
            const isSameDay =
              selectedDay[0] === itemDay && selectedDay[1] === itemMonth;
            const isSameUser = item.email?.user === userId;

            // console.log("Comparando:", itemDay, itemMonth, selectedDay, isSameDay);

            return isSameUser && isSameDay;
          });

          setDados(filteredData);

          // Log para depuração: verifique os dados filtrados
          // console.log("Dados filtrados:", filteredData);

          const total = filteredData.reduce((acc: number, item: any) => {
            return acc + (item.email.somewater || 0);
          }, 0);

          setTotalWater(total); // Armazena o total no estado

          // Log para depuração: verificar o total de água somado
          //console.log("Total de água consumida:", total);
        })
        .catch((error) => {
          //console.error("Erro ao buscar dados:", error);
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
          <h3 className="text-lg font-semibold mb-3">
            Total de Água Consumida:
          </h3>
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