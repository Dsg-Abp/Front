// formula para calcular o gasto calorico basal

//homens:
//GBC = (10 X PESO) + (6.25 X ALTURA) - (5 X IDADE) + 5;

//mulheres:
//GBC = (10 X PESO) + (6.25 X ALTURA) - (5 X IDADE) - 161

import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useEffect, useState } from "react";
import api from "../../services/api";

const getIMCCategory = (imc: number) => {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc >= 18.5 && imc < 25) return "Peso normal";
  if (imc >= 25 && imc < 30) return "Sobrepeso";
  if (imc >= 30 && imc < 35) return "Obesidade grau 1";
  if (imc >= 35 && imc < 40) return "Obesidade grau 2";
  return "Obesidade grau 3";
};

export default function ArcDesign() {
  const [imc, setImc] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await api.get(`profile/${userId}`);

        const imcValue = response.data.profile.imc;
        setImc(Number(imcValue));
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setError("Erro ao buscar IMC. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (imc === null) return <div></div>;

  const settings = {
    width: 120,
    height: 120,
    value: imc,
    min: 0,
    max: 50,
  };

  const category = getIMCCategory(imc);

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
            fill: "#d4600d",
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />
      <p className="text-sm font-bold text-slate-100"> {category}</p>
    </div>
  );
}
