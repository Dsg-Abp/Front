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

  useEffect(() => {
    if (diaSelecionado) {
      // Obtém o valor do userId do localStorage
      const userId = localStorage.getItem("userId");

      api
        .get("/teste") // A rota que você configurou no backend
        .then((response) => {
          // Filtra os dados com base no valor do userId do localStorage
          const filteredData = response.data.findResult.filter(
            (item: any) =>
              item.user === userId || item.email?.user === userId
          );
          setDados(filteredData); // Armazena os dados filtrados no estado
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  }, [diaSelecionado]);

  if (!diaSelecionado) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay de fundo */}
      <div className="fixed inset-0 bg-black opacity-70"></div>

      {/* Conteúdo do modal */}
      <div className="flex flex-col items-center w-[400px] mx-2 bg-white p-6 rounded-lg shadow-lg text-center relative text-gray-900">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">
          {diaSelecionado.inicial} - {diaSelecionado.dia}
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Dados do backend:</h3>

          {dados.length > 0 ? (
            <ul className="w-full text-left">
              {dados.map((item, index) => (
                <li
                  key={index}
                  className="mb-3 p-4 bg-blue-50 border border-blue-300 rounded-lg shadow-sm"
                >
                  <div className="font-semibold text-gray-800">
                    {item.email?.user || item.user}
                  </div>
                  <div className="text-gray-600">
                    Água consumida:{" "}
                    <span className="text-blue-600 font-semibold">
                      {item.somewater || item.email?.somewater} ml
                    </span>
                  </div>
                  <div className="text-gray-600">
                    Dia:{" "}
                    <span className="text-blue-600 font-semibold">
                      {item.day || item.email?.day}
                    </span>
                  </div>
                  <div className="text-gray-600">
                    Criado em:{" "}
                    <span className="text-blue-600 font-semibold">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-600">Nenhum dado encontrado.</p>
          )}
        </div>

        {/* Botão para fechar o modal */}
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
