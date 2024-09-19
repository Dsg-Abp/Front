import React, { useState, useEffect } from "react";
import api from "../../services/api";
 // Certifique-se de ajustar o caminho para o arquivo correto

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
    <div className="fixed inset-0 z-50 flex items-center">
      <div className="fixed inset-0 bg-black opacity-70"></div>

      <div className=" w-full mx-2 relative bg-gradient-to-r from-[#a8f748] to-[#05fa29] p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4 text-black">
          {diaSelecionado.inicial} - {diaSelecionado.dia}
        </h2>
        
        <div>
          <h3 className="text-lg font-semibold text-black">Dados do backend:</h3>
          {dados.length > 0 ? (
            <ul>
              {dados.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          ) : (
            <p>Nenhum dado encontrado.</p>
          )}
        </div>

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
