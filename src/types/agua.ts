// src/types/types.ts

// Definindo a interface para os itens retornados pela API
export interface WaterDataItem {
    email: {
      date: string;
      user: string;
      somewater?: number;
    };
  }
  
  // Definindo a interface para o formato da resposta da API
  export interface ApiResponse {
    findResult: WaterDataItem[];
  }
  