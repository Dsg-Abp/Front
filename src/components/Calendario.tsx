import React, { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import ModalDetalhesDia from "./ModalFuncionalidades/ModalCalendario";

interface DiaDaSemana {
  inicial: string;
  dia: string;
}

const diasDaSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const Calendario: React.FC = () => {
  const [diaSelecionado, setDiaSelecionado] = useState<DiaDaSemana | null>(null);
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [semanaOffset, setSemanaOffset] = useState<number>(0); // Estado para controle da semana

  const hoje = new Date();
  const inicioDaSemana = addDays(startOfWeek(hoje, { weekStartsOn: 1 }), semanaOffset * 7);

  const diasSemana: DiaDaSemana[] = Array.from({ length: 7 }).map((_, index) => {
    const dia = addDays(inicioDaSemana, index);
    return {
      inicial: diasDaSemana[index],
      dia: format(dia, "dd/MM"),
    };
  });

  const abrirModal = (dia: DiaDaSemana) => {
    setDiaSelecionado(dia);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setDiaSelecionado(null);
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
        {/* Botão para semana anterior */}
        <button
          className="p-2 px-4 bg-[#3498db] text-white rounded-full shadow-md hover:bg-[#2980b9] transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={semanaAnterior}
        >
          {"<"} Semana Anterior
        </button>

        {/* Dias da semana */}
        <div className="flex justify-center gap-1">
          {diasSemana.map((item, index) => (
            <button
              key={index}
              className="flex flex-col items-center p-2 w-15 h-15 bg-[#212270] rounded-lg text-center text-white"
              onClick={() => abrirModal(item)}
            >
              <div className="text-lg sm:text-2xl font-bold">{item.inicial}</div>
              <div className="text-xs sm:text-base">{item.dia}</div>
            </button>
          ))}
        </div>

        {/* Botão para próxima semana */}
        <button
          className="p-2 px-4 bg-[#3498db] text-white rounded-full shadow-md hover:bg-[#2980b9] transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={proximaSemana}
        >
          Próxima Semana {">"}
        </button>
      </div>

      {modalAberto && diaSelecionado && (
        <ModalDetalhesDia diaSelecionado={diaSelecionado} fecharModal={fecharModal} />
      )}
    </>
  );
};

export default Calendario;
