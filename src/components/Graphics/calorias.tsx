import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "../../services/api";

const CaloriasGauge: React.FC = () => {
  const [caloriasHoje, setCaloriasHoje] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const buscarCalorias = async (data: Date) => {
    const formattedDate = format(data, "yyyy-MM-dd");
    console.log("Data formatada para busca:", formattedDate);

    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID não encontrado no Local Storage");
      return;
    }

    try {
      const caloriasResponse = await api.get(`/alimentosData/${userId}`);
      const caloriasData = caloriasResponse.data.data;
      const caloriasHojeData = caloriasData.find(
        (item: any) => item._id === formattedDate
      );
      setCaloriasHoje(caloriasHojeData ? caloriasHojeData.totalCalorias : 0);
      console.log("Calorias do dia:", caloriasHojeData);
    } catch (error) {
      console.error("Erro ao buscar calorias:", error);
      setError("Erro ao buscar calorias. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarCalorias(new Date());
  }, []);

  if (loading) return <div className="text-blue-900">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (caloriasHoje === null) return <div>Calorias do dia não disponíveis</div>;

  const maxCalorias = 2500;

  return (
    <div className="flex flex-col items-center relative">
      <Gauge
        value={caloriasHoje}
        valueMax={maxCalorias}
        width={120}
        height={120}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            display: "none",
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "#d4600d",
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />

      <div
        className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold"
        style={{ marginTop: "3%" }}
      >
        {caloriasHoje} kcal
      </div>
    </div>
  );
};

export default CaloriasGauge;
