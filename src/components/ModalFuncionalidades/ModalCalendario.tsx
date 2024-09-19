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
  const [dados, setDados] = useState<any[]>([]); // Estado para armazenar os dados retornados do backend

  useEffect(() => {
    // Faz a requisição ao backend ao carregar o componente
    if (diaSelecionado) {
      api
        .get("/teste") // A rota que você configurou no backend
        .then((response) => {
          setDados(response.data.findResult); // Armazena os dados retornados no estado
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  }, [diaSelecionado]);

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

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Dados do backend:</h3>
          {dados.length > 0 ? (
            <ul>
              {dados.map((item, index) => (
                <li key={index} className="mb-2">
                  {JSON.stringify(item)}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum dado encontrado.</p>
          )}
        </div>

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
