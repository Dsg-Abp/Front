import React, { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import api from "../services/api";
import ModalDetalhesDia from "./ModalFuncionalidades/ModalCalendario";

interface DiaDaSemana {
  inicial: string;
  dia: string;
  data: Date; // Adicionando um campo para armazenar a data real
}

const diasDaSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const Calendario: React.FC = () => {
  const [diaSelecionado, setDiaSelecionado] = useState<DiaDaSemana | null>(null);
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [semanaOffset, setSemanaOffset] = useState<number>(0);
  const [caloriasHoje, setCaloriasHoje] = useState<number | null>(null); // Estado para calorias
  const [totalWater, setTotalWater] = useState<number>(0); // Estado para total de água

  const hoje = new Date();
  const inicioDaSemana = addDays(
    startOfWeek(hoje, { weekStartsOn: 1 }),
    semanaOffset * 7
  );

  const diasSemana: DiaDaSemana[] = Array.from({ length: 7 }).map((_, index) => {
    const dia = addDays(inicioDaSemana, index);
    return {
      inicial: diasDaSemana[index],
      dia: format(dia, "dd/MM"),
      data: dia, // Armazena a data real
    };
  });

  const abrirModal = (dia: DiaDaSemana) => {
    setDiaSelecionado(dia); // Define o dia selecionado
    setModalAberto(true);
    buscarDados(dia.data); // Busca os dados assim que o modal é aberto
  };

  const fecharModal = () => {
    setModalAberto(false);
    setDiaSelecionado(null);
  };

  // Função para buscar dados de calorias e água
  const buscarDados = async (data: Date) => {
    const formattedDate = format(data, "yyyy-MM-dd"); // Formata a data para YYYY-MM-DD
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID não encontrado no Local Storage");
      return;
    }

    try {
      // Buscar dados de calorias
      const caloriasResponse = await api.get(`/alimentosData/${userId}`);
      const caloriasData = caloriasResponse.data.data;
      const caloriasHoje = caloriasData.find((item: any) => item._id === formattedDate);
      setCaloriasHoje(caloriasHoje ? caloriasHoje.totalCalorias : null);

      // Buscar dados de água (sem filtro)
      const waterResponse = await api.get("/findagua");
      const totalWater = waterResponse.data.findResult.reduce((acc: number, item: any) => {
        return acc + (item.email.somewater || 0);
      }, 0);
      setTotalWater(totalWater);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  // Funções para navegação
  const semanaAnterior = () => {
    setSemanaOffset(semanaOffset - 1);
  };

  const proximaSemana = () => {
    setSemanaOffset(semanaOffset + 1);
  };

  return (
    <>
      <div className="flex justify-between mb-4 my-7 items-center">
        <button className="p-2" onClick={semanaAnterior}>
          <FontAwesomeIcon icon={faAngleLeft} className="text-blue-900" />
        </button>

        <div className="flex justify-center gap-1">
          {diasSemana.map((item, index) => (
            <button
              key={index}
              className="flex flex-col items-center p-2 w-15 h-15 bg-[#212270] rounded-lg text-center text-white"
              onClick={() => abrirModal(item)} // Chama a função para abrir o modal com o dia selecionado
            >
              <div className="text-lg sm:text-2xl font-bold">
                {item.inicial}
              </div>
              <div className="text-xs sm:text-base">{item.dia}</div>
            </button>
          ))}
        </div>

        <button className="p-2" onClick={proximaSemana}>
          <FontAwesomeIcon icon={faAngleRight} className="text-blue-900" />
        </button>
      </div>

      {modalAberto && diaSelecionado && (
        <ModalDetalhesDia
          diaSelecionado={diaSelecionado}
          caloriasHoje={caloriasHoje} // Passa as calorias para o modal
          totalWater={totalWater} // Passa o total de água para o modal
          fecharModal={fecharModal} // Passa a função para fechar o modal
        />
      )}
    </>
  );
};

export default Calendario;
