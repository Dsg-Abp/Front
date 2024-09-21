import Animação from "../components/Animação";
import aguaJson from "../assets/animacoes/agua.json";
import caloriasJson from "../assets/animacoes/calorias.json";
import NavigationButtons from "../components/BotãoMenu";
import Calendario from "../components/Calendario";
import ModalEscolha from "../components/ModalFuncionalidades/ModalAgua";
import ButtonGroup from "../components/ButtonAjuste";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function TelaInicial() {
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/")
      .then((response) => {
        setNome(response.data.nome);
      })
      .catch((error) => {
        console.error("Erro ao buscar nome:", error);
      });
  }, []);

  const handleBack = () => {
    navigate("/Alimento");
  };

  return (
    <div className="flex flex-col min-h-screen bg-custom-bg md:px-40 px-10">
      <header className="flex flex-col flex-grow items-center w-full">
        <Calendario />

        <div className="w-full my-4 p-4 bg-gradient-to-r from-[#212270] to-[#6efbe8] text-white rounded-lg text-center">
          <h3 className="text-lg font-bold">Nome Recebido:</h3>
          <p className="text-md">{nome ? nome : "Carregando..."}</p>
        </div>

        <div className="grid grid-cols-1 gap-2 lg:gap-x-32 w-full">
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
              <h2 className="font-bold text-[20px] mx-2 text-white mt-2 text-center">
                {item.title}
              </h2>
              {item.buttons && <ButtonGroup buttons={item.buttons} />}
            </div>
          ))}
        </div>
      </header>
      <footer className="w-full">
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
