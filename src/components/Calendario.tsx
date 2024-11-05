import React, { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import api from "../services/api";
import ModalDetalhesDia from "./ModalFuncionalidades/ModalCalendario";

interface DiaDaSemana {
  inicial: string;
  dia: string;
  data: Date;
}

const diasDaSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const Calendario: React.FC = () => {
  const [diaSelecionado, setDiaSelecionado] = useState<DiaDaSemana | null>(
    null
  );
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [semanaOffset, setSemanaOffset] = useState<number>(0);
  const [caloriasHoje, setCaloriasHoje] = useState<number | null>(null);
  const [someWaterToday, setSomeWaterToday] = useState<number | null>(null);

  const hoje = new Date();
  const inicioDaSemana = addDays(
    startOfWeek(hoje, { weekStartsOn: 1 }),
    semanaOffset * 7
  );

  const diasSemana: DiaDaSemana[] = Array.from({ length: 7 }).map(
    (_, index) => {
      const dia = addDays(inicioDaSemana, index);
      return {
        inicial: diasDaSemana[index],
        dia: format(dia, "dd/MM"),
        data: dia,
      };
    }
  );

  const abrirModal = (dia: DiaDaSemana) => {
    setDiaSelecionado(dia);
    setModalAberto(true);
    buscarDados(dia.data);
    console.log("Dia selecionado:", dia);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setDiaSelecionado(null);
  };

  const buscarDados = async (data: Date) => {
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
      const caloriasHoje = caloriasData.find(
        (item: any) => item._id === formattedDate
      );
      setCaloriasHoje(caloriasHoje ? caloriasHoje.totalCalorias : null);
      console.log("Calorias do dia:", caloriasHoje);

      const aguaResponse = await api.get(`/findagua`);
      const aguaData = aguaResponse.data.findResult;

      const dateParts = formattedDate.split("-");
      const formattedWaterDate = `${dateParts[2]}${dateParts[1]}${dateParts[0]}`;

      const aguaHoje = aguaData.find((item: any) => {
        const aguaDate = item.email.date;
        return (
          aguaDate === Number(formattedWaterDate) && item.email.user === userId
        );
      });

      console.log("Dados de água encontrados:", aguaHoje);
      setSomeWaterToday(aguaHoje ? aguaHoje.email.somewater : null);
      console.log(
        "Quantidade de água para o dia:",
        aguaHoje ? aguaHoje.email.somewater : "Nenhum dado"
      );
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

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
              onClick={() => abrirModal(item)}
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
          caloriasHoje={caloriasHoje}
          someWaterToday={someWaterToday}
          fecharModal={fecharModal}
        />
      )}
    </>
  );
};

export default Calendario;
