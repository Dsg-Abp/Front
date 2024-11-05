import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import { WaterDataItem, ApiResponse } from "../types/agua";

interface WaterContextType {
  totalWater: number;
  quantidadeSelecionada: number;
  loadTotalWater: (date?: string) => void;
  enviarDadosAguaMais: () => void;
  enviarDadosAguaMenos: () => void;
  setQuantidadeSelecionada: (quantidade: number) => void;
}

const WaterContext = createContext<WaterContextType | undefined>(undefined);

export const WaterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [totalWater, setTotalWater] = useState<number>(0);
  const [quantidadeSelecionada, setQuantidadeSelecionada] =
    useState<number>(50);

  const loadTotalWater = (date?: string) => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      api
        .get<ApiResponse>("/findagua")
        .then((response) => {
          const filteredData = response.data.findResult.filter(
            (item: WaterDataItem) => {
              const itemDate = item.email.date.toString();
              const today = date || new Date().toLocaleDateString("pt-BR");
              const selectedDay = today.split("/").map(Number);
              const itemDay = parseInt(itemDate.slice(0, 2));
              const itemMonth = parseInt(itemDate.slice(2, 4));
              const isSameDay =
                selectedDay[0] === itemDay && selectedDay[1] === itemMonth;
              const isSameUser = item.email?.user === userId;
              return isSameUser && isSameDay;
            }
          );

          const total = filteredData.reduce(
            (acc: number, item: WaterDataItem) => {
              return acc + (item.email.somewater || 0);
            },
            0
          );

          setTotalWater(total);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  };

  const enviarDadosAguaMais = async () => {
    const userId = localStorage.getItem("userId");
    const dataAtual = Number(
      new Date().toLocaleDateString("pt-BR").replace(/\//g, "")
    );

    if (userId) {
      try {
        const payload = {
          user: userId,
          date: dataAtual,
          somewater: quantidadeSelecionada,
        };
        const response = await api.post("/insert", payload);
        setTotalWater((prevTotal) => prevTotal + quantidadeSelecionada);
        console.log("Dados enviados com sucesso:", response.data);
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
      }
    }
  };

  const enviarDadosAguaMenos = async () => {
    const userId = localStorage.getItem("userId");
    const dataAtual = Number(
      new Date().toLocaleDateString("pt-BR").replace(/\//g, "")
    );

    if (userId) {
      try {
        const payload = {
          user: userId,
          date: dataAtual,
          somewater: -quantidadeSelecionada,
        };
        const response = await api.post("/insert", payload);
        setTotalWater((prevTotal) =>
          Math.max(prevTotal - quantidadeSelecionada, 0)
        );
        console.log("Dados enviados com sucesso:", response.data);
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
      }
    }
  };

  useEffect(() => {
    loadTotalWater();
  }, []);

  return (
    <WaterContext.Provider
      value={{
        totalWater,
        quantidadeSelecionada,
        loadTotalWater,
        enviarDadosAguaMais,
        enviarDadosAguaMenos,
        setQuantidadeSelecionada,
      }}
    >
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
