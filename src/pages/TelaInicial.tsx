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
import ArcDesign from "../components/Graphics/imc";

export default function TelaInicial() {
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState("");
  const [peso, setPeso] = useState<number | null>(null);
  const [altura, setAltura] = useState<number | null>(null);
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      api
        .get(`/profile/${userId}`)
        .then((response) => {
          const profile = response.data.profile;
          setNome(profile.nome);
          setPeso(profile.peso);
          setAltura(profile.altura);
          setImageSrc(profile.image);
        })
        .catch((error) => {
          console.error("Erro ao buscar perfil:", error);
        });
    } else {
      console.error("User ID não encontrado no localStorage.");
    }
  }, []);

  const handleBack = () => {
    navigate("/Alimento");
  };

  return (
    <div className="flex flex-col min-h-screen bg-custom-bg md:px-40 px-10">
      <header className="flex flex-col flex-grow items-center w-full">
        <Calendario />
        <div className="w-full my-4 p-4 bg-gradient-to-r from-[#212270] to-[#6efbe8] text-white rounded-lg flex flex-col py-2 md:flex-row items-center">
          <div className="flex items-center mr-4 h-32">
            <div className="w-32 h-full bg-lime-200 rounded-lg border-2 border-white flex items-center justify-center">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Foto do usuário"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-black bg-lime-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14c-1.333 0-2.667 0-4 1.333C6.667 17.667 8 19 12 19s5.333-1.333 4-3.667C14.667 14 13.333 14 12 14z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 2C6.667 2 4 6.333 4 9.333c0 3.333 3.667 5 8 5s8-1.667 8-5C20 6.333 17.333 2 12 2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h.01M9 9h.01"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col w-auto py-2">
            <div className="flex border border-slate-200 p-3 bg-slate-600 rounded-lg h-full flex-1">
              <div className="flex-1 pt-5">
                <p className="text-lg font-bold">
                  {nome ? nome : "Carregando..."}
                </p>
                <h4 className="text-md">
                  Peso: {peso !== null ? peso : "Carregando..."} kg
                </h4>
                <h4 className="text-md">
                  Altura: {altura !== null ? altura : "Carregando..."} m
                </h4>
              </div>
              <div className="flex items-center justify-center ml-4">
                <ArcDesign />
              </div>
            </div>
          </div>
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
