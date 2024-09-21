import Animação from "../components/Animação";
import aguaJson from "../assets/animacoes/agua.json";
import caloriasJson from "../assets/animacoes/calorias.json";
import NavigationButtons from "../components/BotãoMenu";
import Calendario from "../components/Calendario";
import ModalEscolha from "../components/ModalFuncionalidades/ModalAgua";
import ButtonGroup from "../components/ButtonAjuste";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TelaInicial() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/Alimento");
  };
  return (
    <div className="flex flex-col min-h-screen bg-custom-bg px-6">
      <header className="flex flex-col flex-grow items-center">
        <Calendario />
        <div className="grid grid-cols-1 gap-2 lg:gap-x-32">
          {[
            {
              data: caloriasJson,
              title: "Calorias",
              buttons: [
                {
                  id: "calorias-escolha",
                  iconSrc: "/imagens/escolha.svg",
                  altText: "Button Icon 3",
                  onClick: () => handleBack(),
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
                },
                {
                  id: "agua-mais",
                  iconSrc: "/imagens/mais.svg",
                  altText: "Button Icon 5",
                },
                {
                  id: "agua-escolha",
                  iconSrc: "/imagens/escolha.svg",
                  altText: "Button Icon 6",
                  onClick: () => setShowModal(true),
                },
              ],
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-lg bg-gradient-to-r from-[#212270] to-[#6efbe8] flex items-center w-full h-auto justify-between p-6"
            >
              <div className="relative flex flex-col items-center justify-center w-[70px] h-[70px]">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <Animação animationData={item.data} />
                </div>
              </div>
              <h2 className="font-bold mx-2 text-white mt-2 text-center">
                {item.title}
              </h2>
              {item.buttons && <ButtonGroup buttons={item.buttons} />}
            </div>
          ))}
        </div>
      </header>
      <footer>
        <NavigationButtons />
      </footer>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <ModalEscolha onClose={() => setShowModal(false)} />
        </div>
      )}
    </div>
  );
}
