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
  const settings = {
    width: 120,
    height: 120,
    value: totalWater, // Use o total de água ingerida como valor do gráfico
    min: 0,
    max: aguaNecessaria, // Máximo baseado na quantidade necessária
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
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />
      <p className="text-sm font-bold text-blue-900">Água Necessária: {aguaNecessaria} ml</p>
      <p className="text-sm font-bold text-blue-900">Total Ingerido: {totalWater} ml</p>
    </div>
  );
};

export default ArcDesignAgua;
