import React, { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import ModalDetalhesDia from "./ModalFuncionalidades/ModalCalendario";

interface DiaDaSemana {
  inicial: string;
  dia: string;
}

const diasDaSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const Calendario: React.FC = () => {
  const [diaSelecionado, setDiaSelecionado] = useState<DiaDaSemana | null>(
    null
  );
  const [modalAberto, setModalAberto] = useState<boolean>(false);

  const hoje = new Date();
  const inicioDaSemana = startOfWeek(hoje, { weekStartsOn: 1 });

  const diasSemana: DiaDaSemana[] = Array.from({ length: 7 }).map(
    (_, index) => {
      const dia = addDays(inicioDaSemana, index);
      return {
        inicial: diasDaSemana[index],
        dia: format(dia, "dd/MM"),
      };
    }
  );

  const abrirModal = (dia: DiaDaSemana) => {
    setDiaSelecionado(dia);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setDiaSelecionado(null);
  };

  return (
    <>
      <div className="flex justify-center gap-1 mb-4 my-7">
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

      {modalAberto && diaSelecionado && (
        <ModalDetalhesDia
          diaSelecionado={diaSelecionado}
          fecharModal={fecharModal}
        />
      )}
    </>
  );
};

export default Calendario;
