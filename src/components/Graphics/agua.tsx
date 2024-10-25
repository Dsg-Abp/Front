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
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID not found");
        }

        const response = await api.get(`profile/${userId}`);
        const pesoValue: number = response.data.profile.peso; // Supondo que o peso está neste endpoint
        setPeso(pesoValue);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setError("Erro ao buscar peso. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-blue-900">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (peso === null) return <div></div>;

  const aguaNecessaria = peso * 35; // Quantidade de água necessária por dia em ml
  const percentualConsumido = Math.floor((totalWater / aguaNecessaria) * 100); // Arredondando para o valor inteiro


  // Configurações do gráfico ajustadas para o valor em porcentagem
  const settings = {
    width: 120,
    height: 120,
    value: percentualConsumido, // Percentual de água consumida
    min: 0,
    max: 100, // Trabalhar com porcentagem
  };

  return (
    <div className="flex flex-col items-center">
      <Gauge
        {...settings}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 20,
            fill: "#FFFFFF",
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "#0d5dd4",
            transition: "stroke-dashoffset 1s ease-in-out", // Suavizar animação
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
            transition: "stroke-dashoffset 1s ease-in-out", // Animação também no arco de referência
          },
        })}
      />
      
      {/* <div>
        <p>Total consumido: {totalWater} ml</p> */}
        <p>Água necessária: {aguaNecessaria} ml</p>
        {/* <p>Percentual consumido: {percentualConsumido.toFixed(2)}%</p> */}
      {/* </div> */}
      
    </div>
  );
};

export default ArcDesignAgua;
