import Animação from "../components/Animação";
import aguaJson from "../assets/animacoes/agua.json";
import passoJson from "../assets/animacoes/passo.json";
import caloriasJson from "../assets/animacoes/calorias.json";
import NavigationButtons from "../components/BotãoMenu";
import Calendario from "../components/Calendario";
import ModalEscolha from "../components/ModalFuncionalidades/ModalAgua";
import ButtonGroup from "../components/ButtonAjuste";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TelaInicial() {
  const [passos, setPassos] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/sua-rota");
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
                  onClick: handleButtonClick,
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
            {
              data: passoJson,
              title: "Passos",
              inputValue: passos,
              onInputChange: setPassos,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-lg bg-gradient-to-r from-[#a8f748] to-[#05fa29] flex items-center w-full justify-between p-6"
            >
              <div className="relative flex flex-col items-center justify-center w-[70px] h-[70px]">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <Animação animationData={item.data} />
                </div>
              </div>
              <h2 className="font-bold text-black mt-2 text-center">
                {item.title}
              </h2>
              {item.buttons && <ButtonGroup buttons={item.buttons} />}
              {item.inputValue !== undefined && (
                <div className="mt-4 p-2 w-[30%] rounded-lg bg-white flex flex-col items-center">
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
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <ModalEscolha onClose={() => setShowModal(false)} />
        </div>
      )}
    </div>
  );
}
