import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useEffect, useState } from "react";
import api from "../../services/api"; // Ajuste o caminho do serviço de API
import { useWater } from "../../contexts/WaterContext"; // Ajuste o caminho do contexto

const ArcDesignAgua: React.FC = () => {
  const { totalWater } = useWater(); // Total de água ingerida do contexto
  const [peso, setPeso] = useState<number | null>(null); // Estado para peso
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Função para buscar dados do perfil
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID not found");
        }

        const response = await api.get(`profile/${userId}`);
        const pesoValue: number = response.data.profile.peso; // Supondo que o peso está neste endpoint
        setPeso(pesoValue);
        localStorage.setItem("peso", pesoValue.toString()); // Persistindo peso no localStorage
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setError("Erro ao buscar peso. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    // Tenta recuperar o peso do localStorage
    const storedPeso = localStorage.getItem("peso");
    if (storedPeso) {
      setPeso(Number(storedPeso)); // Usar o peso armazenado
      setLoading(false); // Define loading como falso já que temos dados
    } else {
      fetchData(); // Busca os dados da API se não estiverem no localStorage
    }
  }, []);

  if (loading) return <div className="text-blue-900">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (peso === null) return <div></div>;

  const aguaNecessaria = peso * 35; // Quantidade de água necessária por dia em ml
  const percentualConsumido = Math.floor((totalWater / aguaNecessaria) * 100); // Arredondando para o valor inteiro

  // Configurações do gráfico ajustadas para o valor em porcentagem
  const settings = {
    width: 140,
    height: 140,
    value: percentualConsumido, // Percentual de água consumida
    min: 0,
    max: 100, // Trabalhar com porcentagem
  };

  return (
    <div className="flex flex-col items-center relative">
      <Gauge
        {...settings}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "#0d5dd4",
            transition: "stroke-dashoffset 1s ease-in-out", // Suavizar animação
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
            transition: "stroke-dashoffset 1s ease-in-out", // Animação também no arco de referência
          },
          // Ocultar texto padrão do Gauge
          [`& .${gaugeClasses.valueText}`]: {
            display: "none", // Isso oculta o texto do valor
          },
        })}
      />
      {/* Texto centralizado sobre o Gauge */}
      <div
        className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold"
        style={{ marginTop: "-10%", marginLeft: "5px" }}
      >
        {percentualConsumido}%
      </div>
      <p>Água necessária: {aguaNecessaria} ml</p>
    </div>
  );
};

export default ArcDesignAgua;
