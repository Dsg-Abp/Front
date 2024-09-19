import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AlimentoDataType } from '../types/alimentos';
import api from '../services/api';

// Interface do contexto
interface AlimentoContextType {
  alimentos: AlimentoDataType[];
  setAlimentos: React.Dispatch<React.SetStateAction<AlimentoDataType[]>>;
  searchAlimentos: (descricao: string) => Promise<void>;
}

// Criação do contexto
const AlimentoContext = createContext<AlimentoContextType | undefined>(undefined);

// Provider
export const AlimentoProvider = ({ children }: { children: ReactNode }) => {
  const [alimentos, setAlimentos] = useState<AlimentoDataType[]>([]);

  // Função para buscar alimentos pela descrição usando Axios
  const searchAlimentos = async (descricao: string) => {
    try {
      const response = await api.post('/buscar-alimento', { descricao });
      setAlimentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar alimentos:', error);
    }
  };

  return (
    <AlimentoContext.Provider value={{ alimentos, setAlimentos, searchAlimentos }}>
      {children}
    </AlimentoContext.Provider>
  );
};

// Hook para usar o contexto
export const useAlimentoContext = () => {
  const context = useContext(AlimentoContext);
  if (!context) {
    throw new Error('useAlimentoContext must be used within a AlimentoProvider');
  }
  return context;
};
