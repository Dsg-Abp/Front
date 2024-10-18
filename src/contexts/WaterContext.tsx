import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import { WaterDataItem, ApiResponse } from "../types/agua";

// Definindo a interface para o contexto
interface WaterContextType {
  totalWater: number;
  quantidadeSelecionada: number; // Adicionando a quantidade selecionada
  loadTotalWater: (date?: string) => void;
  handleAguaMais: () => void;
  handleAguaMenos: () => void;
  setQuantidadeSelecionada: (quantidade: number) => void; // Função para atualizar a quantidade selecionada
}

const WaterContext = createContext<WaterContextType | undefined>(undefined);

export const WaterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalWater, setTotalWater] = useState<number>(0);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState<number>(0); // Estado para a quantidade selecionada

  const loadTotalWater = (date?: string) => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      api
        .get<ApiResponse>("/teste")
        .then((response) => {
          const filteredData = response.data.findResult.filter((item: WaterDataItem) => {
            const itemDate = item.email.date.toString();
            const today = date || new Date().toLocaleDateString('pt-BR');
            const selectedDay = today.split("/").map(Number);
            const itemDay = parseInt(itemDate.slice(0, 2));
            const itemMonth = parseInt(itemDate.slice(2, 4));
            const isSameDay = selectedDay[0] === itemDay && selectedDay[1] === itemMonth;
            const isSameUser = item.email?.user === userId;
            return isSameUser && isSameDay;
          });

          const total = filteredData.reduce((acc: number, item: WaterDataItem) => {
            return acc + (item.email.somewater || 0);
          }, 0);

          setTotalWater(total);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  };

  const handleAguaMais = () => {
    setTotalWater(prevTotal => prevTotal + quantidadeSelecionada);
    console.log(`Adicionado ${quantidadeSelecionada} ml. Total agora: ${totalWater + quantidadeSelecionada} ml`);
};

const handleAguaMenos = () => {
    setTotalWater(prevTotal => Math.max(prevTotal - quantidadeSelecionada, 0)); // Não deixar total negativo
    console.log(`Subtraído ${quantidadeSelecionada} ml. Total agora: ${Math.max(totalWater - quantidadeSelecionada, 0)} ml`);
};


  useEffect(() => {
    loadTotalWater();
  }, []);

  return (
    <WaterContext.Provider value={{ 
      totalWater, 
      quantidadeSelecionada, 
      loadTotalWater, 
      handleAguaMais, 
      handleAguaMenos, 
      setQuantidadeSelecionada // Passando a função para o contexto
    }}>
      {children}
    </WaterContext.Provider>
  );
};

export const useWater = (): WaterContextType => {
  const context = useContext(WaterContext);
  if (!context) {
    throw new Error("useWater must be used within a WaterProvider");
  }
  return context;
};
