import { format, startOfWeek, addDays } from "date-fns";

const diasDaSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const Calendario = () => {
  const hoje = new Date();

  const inicioDaSemana = startOfWeek(hoje, { weekStartsOn: 1 });

  const diasSemana = Array.from({ length: 7 }).map((_, index) => {
    const dia = addDays(inicioDaSemana, index);
    return {
      inicial: diasDaSemana[index],
      dia: format(dia, "dd/MM"),
    };
  });

  return (
    <div className="flex flex-wrap justify-center gap-1 mb-5 my-8 ">
      {diasSemana.map((item, index) => (
        <div
          key={index}
          className=" mx-[1px] flex flex-col items-center p-2 w-15 h-15 bg-gradient-to-r from-[#a8f748] to-[#05fa29]  rounded-lg text-center text-black"
        >
          <div className="text-lg sm:text-2xl font-bold">{item.inicial}</div>
          <div className="text-xs sm:text-base">{item.dia}</div>
        </div>
      ))}
    </div>
  );
};

export default Calendario;
