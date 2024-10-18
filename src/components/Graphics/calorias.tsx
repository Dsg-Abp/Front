import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useEffect, useState } from "react";
import api from "../../services/api"; // Certifique-se de que o caminho do serviço de API esteja correto

const ArcDesignGCB: React.FC = () => {
  const [gcb, setGcb] = useState<number | null>(null);
  const [_imc, setImc] = useState<number | null>(null);
  const [altura, setAltura] = useState<number | null>(null);
  const [idade, setIdade] = useState<number | null>(null);
  const [genero, setGenero] = useState<string | null>(null);
  const [peso, setPeso] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Obtém o userId do localStorage
        if (!userId) throw new Error("User ID não encontrado");

        const response = await api.get(`Profile/${userId}`);
        const { peso, altura, genero, dataNascimento, imc } = response.data.profile;

        const idadeValue = new Date().getFullYear() - new Date(dataNascimento).getFullYear();

        setPeso(peso);
        setGenero(genero);
        setImc(imc);
        setAltura(altura);
        setIdade(idadeValue);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setError("Erro ao buscar os dados. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para calcular o GCB
  const calcularGCB = (genero: string, peso: number, altura: number, idade: number): number => {
    if (genero.toLowerCase() === 'y') { // "y" para homens
      return (10 * peso) + (6.25 * altura * 100) - (5 * idade) + 5;
    } else if (genero.toLowerCase() === 'x') { // "x" para mulheres
      return (10 * peso) + (6.25 * altura * 100) - (5 * idade) - 161;
    }
    return 0; // Valor padrão se o gênero não for válido
  };

  // Calcular o GCB após obter os dados
  useEffect(() => {
    if (peso !== null && altura !== null && idade !== null && genero !== null) {
      const calculatedGcb = calcularGCB(genero, peso, altura, idade);
      setGcb(calculatedGcb);
    }
  }, [peso, altura, idade, genero]);

  if (loading) return <div className="text-blue-900">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (gcb === null || altura === null) return <div></div>;

  // Definir o valor máximo do GCB com base no gênero
  const maxGCB = genero?.toLowerCase() === 'y' ? 3000 : 2500; // Ajuste o valor máximo conforme o gênero

  const settings = {
    width: 120,
    height: 120,
    value: gcb, // Use o GCB calculado como valor do gráfico
    min: 0,
    max: maxGCB, // Máximo definido com base no gênero
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
            fill: "#d4600d",
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />
     
    </div>
  );
};

export default ArcDesignGCB;
