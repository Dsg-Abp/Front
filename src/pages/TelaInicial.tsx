import Animação from "../components/Animação";
import aguaJson from "../assets/animacoes/agua.json";
import passoJson from "../assets/animacoes/passo.json";
import caloriasJson from "../assets/animacoes/calorias.json";
import tempoativoJson from "../assets/animacoes/tempoativo.json";
import batimentosJson from "../assets/animacoes/batimentos.json";
import NavigationButtons from "../components/BotãoMenu";
import Calendario from "../components/Calendario";
import ModalEscolha from "../components/ModalFuncionalidades/ModalAgua";
import ButtonGroup from "../components/ButtonAjuste";
import { useState } from "react";

export default function TelaInicial() {
  const [tempoAtivo, setTempoAtivo] = useState("");
  const [passos, setPassos] = useState("");
  const [batimentos, setBatimentos] = useState("");
  const [quantidadeAgua, setQuantidadeAgua] = useState(0); // Estado para quantidade de copos de água
  const [showModal, setShowModal] = useState(false);

  const handleAguaClick = (action:any) => {
    setQuantidadeAgua(prev => {
      if (action === 'mais') return prev + 1;
      if (action === 'menos' && prev > 0) return prev - 1;
      return prev;
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-custom-bg px-6">
      <header className="flex flex-col flex-grow items-center">
        <Calendario />
        <div className="grid grid-cols-2 gap-4 lg:gap-x-32">
          {[
            {
              data: caloriasJson,
              title: "Calorias",
              buttons: [
                {
                  id: "calorias-menos",
                  iconSrc: "/imagens/menos.svg",
                  altText: "Button Icon 1",
                },
                {
                  id: "calorias-mais",
                  iconSrc: "/imagens/mais.svg",
                  altText: "Button Icon 2",
                },
                {
                  id: "calorias-escolha",
                  iconSrc: "/imagens/escolha.svg",
                  altText: "Button Icon 3",
                },
              ],
            },

            {
              data: aguaJson,
              title: "Água",
              buttons: [
                {
                  id: "agua-menos",
                  iconSrc: "/imagens/menos.svg",
                  altText: "Button Icon 4",
                  onClick: () => handleAguaClick('menos'),
                },
                {
                  id: "agua-mais",
                  iconSrc: "/imagens/mais.svg",
                  altText: "Button Icon 5",
                  onClick: () => handleAguaClick('mais'),
                },
                {
                  id: "agua-escolha",
                  iconSrc: "/imagens/escolha.svg",
                  altText: "Button Icon 6",
                  onClick: () => setShowModal(true),
                },
              ],
              quantityDisplay: (
                <div className="mt-4 p-2 w-[60%] rounded-lg bg-white flex flex-col items-center">
                  <p className="text-xl font-bold">Quantidade de Copos: {quantidadeAgua}</p>
                </div>
              ),
            },
            {
              data: passoJson,
              title: "Passos",
              inputValue: passos,
              onInputChange: setPassos,
            },
            {
              data: batimentosJson,
              title: "Batimentos Cardíacos",
              inputValue: batimentos,
              onInputChange: setBatimentos,
            },
            {
              data: tempoativoJson,
              title: "Tempo Ativo",
              inputValue: tempoAtivo,
              onInputChange: setTempoAtivo,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gradient-to-r from-[#a8f748] to-[#05fa29] flex flex-col items-center w-full sm:w-30 md:w-48 lg:w-36 xl:w-40"
            >
              <div className="relative flex flex-col items-center justify-center w-[60px] h-[60px]">
                <div className="absolute w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <Animação animationData={item.data} />
                </div>
              </div>
              <h2 className="font-bold text-black mt-2 text-center">
                {item.title}
              </h2>
              {item.buttons && <ButtonGroup buttons={item.buttons} />}
              {item.quantityDisplay}
              {item.inputValue !== undefined && (
                <div className="mt-4 p-2 w-[60%] rounded-lg bg-white flex flex-col items-center">
                  <input
                    type="text"
                    value={item.inputValue}
                    onChange={(e) => item.onInputChange?.(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg w-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </header>
      <footer>
        <NavigationButtons />
      </footer>
      {showModal && <ModalEscolha onClose={() => setShowModal(false)} />}
    </div>
  );
}
