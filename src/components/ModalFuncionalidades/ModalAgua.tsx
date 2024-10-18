import React, { useState, useEffect } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import api from "../../services/api"; 
import { useWater } from "../../contexts/WaterContext"; // Importando o contexto

interface ModalEscolhaProps {
  onClose: () => void;
}

const ModalEscolha: React.FC<ModalEscolhaProps> = ({ onClose }) => {
  const { setQuantidadeSelecionada } = useWater(); // Obtendo a função do contexto
  const [escolha, setEscolha] = useState("copo");
  const [quantidade, setQuantidade] = useState<number>(50); // Inicia com 50 ml para "copo"

  useEffect(() => {
    setQuantidadeSelecionada(quantidade); // Atualiza a quantidade selecionada ao abrir o modal
  }, [quantidade, setQuantidadeSelecionada]);

  const handleEscolhaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const novaEscolha = event.target.value;
    setEscolha(novaEscolha);

    if (novaEscolha === "copo") {
      setQuantidade(50);
    } else if (novaEscolha === "garrafa") {
      setQuantidade(300);
    }
  };

  const handleQuantidadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantidade = parseInt(event.target.value, 10);
    setQuantidade(newQuantidade);
  };

  const enviarDados = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const dataAtual = Number(new Date().toLocaleDateString("pt-BR").replace(/\//g, ""));
      const payload = {
        user: userId,
        date: dataAtual,
        somewater: quantidade,
      };

      const response = await api.post("/insert", payload);
      console.log("Dados enviados com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-gradient-to-r from-[#a8f748] to-[#05fa29] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-black">
          Escolha entre copo e garrafa
        </h2>
        <select
          value={escolha}
          onChange={handleEscolhaChange}
          className="mb-4 p-2 border border-gray-300 rounded-lg w-full text-black"
        >
          <option value="copo">Copo</option>
          <option value="garrafa">Garrafa</option>
        </select>
        {escolha === "copo" && (
          <select
            value={quantidade}
            onChange={handleQuantidadeChange}
            className="mb-4 p-2 border border-gray-300 rounded-lg w-full text-black"
          >
            {[50, 100, 150, 200, 250, 300, 350, 400, 450, 500].map((qtd) => (
              <option key={qtd} value={qtd}>
                {qtd} ml
              </option>
            ))}
          </select>
        )}
        {escolha === "garrafa" && (
          <select
            value={quantidade}
            onChange={handleQuantidadeChange}
            className="mb-4 p-2 border border-gray-300 rounded-lg w-full text-black"
          >
            {[300, 500, 1000, 2000].map((qtd) => (
              <option key={qtd} value={qtd}>
                {qtd} ml
              </option>
            ))}
          </select>
        )}

        <div className="mb-4">
          <Gauge
            value={quantidade}
            startAngle={-110}
            endAngle={110}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
                transform: "translate(0px, 0px)",
              },
            }}
            text={({ value, valueMax }) => `${value} / ${valueMax} ml`}
          />
        </div>

        <button
          onClick={enviarDados}
          className="w-full py-2 bg-gradient-to-r from-[#979996] to-[#000000] text-white rounded-lg hover:bg-gradient-to-r hover:from-[#000000] hover:to-[#979996] transition-colors"
        >
          Enviar e Fechar
        </button>

        <button
          onClick={onClose}
          className="w-full py-2 bg-gradient-to-r from-[#979996] to-[#000000] text-white rounded-lg hover:bg-gradient-to-r hover:from-[#000000] hover:to-[#979996] transition-colors mt-2"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalEscolha;
