// src/pages/TelaInicial.tsx
import Animação from "../components/Animação";
import aguaJson from "../assets/animacoes/agua.json";
import passoJson from "../assets/animacoes/passo.json";
import caloriasJson from "../assets/animacoes/calorias.json";
import tempoativoJson from "../assets/animacoes/tempoativo.json";
import NavigationButtons from "../components/BotãoMenu";
import { useState } from "react";
import Calendario from "../components/Calendario";
import ModalEscolha from "../components/ModalFuncionalidades/ModalAgua";

export default function TelaInicial() {
  const [tempoAtivo, setTempoAtivo] = useState("");
  const [passos, setPassos] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-custom-bg px-6">
      <header className="flex flex-col flex-grow items-center">
        <Calendario />
        <div className="grid grid-cols-2 gap-4 lg:gap-x-32">
          {[caloriasJson, tempoativoJson, aguaJson, passoJson].map(
            (animationData, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gradient-to-r from-[#a8f748] to-[#05fa29] flex flex-col items-center w-full sm:w-40 md:w-48 lg:w-36 xl:w-40"
              >
                <div className="relative flex flex-col items-center justify-center w-20 h-20">
                  <div className="absolute w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <Animação animationData={animationData} />
                  </div>
                </div>
                <h2 className="font-bold text-black mt-2 text-center">
                  {index === 0
                    ? "Calorias"
                    : index === 1
                    ? "Tempo Ativo"
                    : index === 2
                    ? "Água"
                    : "Passos"}
                </h2>
                {index === 0 && (
                  <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
                    <button
                      id="calorias-menos"
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#979996] to-[#000000] rounded-full flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-[#000000] hover:to-[#979996] transition-colors"
                    >
                      <img
                        src="/src/assets/imagens/menos.svg"
                        alt="Button Icon 1"
                        className="w-6 h-6 sm:w-8 sm:h-8"
                      />
                    </button>
                    <button
                      id="calorias mais"
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#979996] to-[#000000] rounded-full flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-[#000000] hover:to-[#979996] transition-colors"
                    >
                      <img
                        src="/src/assets/imagens/mais.svg"
                        alt="Button Icon 1"
                        className="w-6 h-6 sm:w-8 sm:h-8"
                      />
                    </button>
                    <button
                      id="calorias-escolha"
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#979996] to-[#000000] rounded-full flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-[#000000] hover:to-[#979996] transition-colors"
                    >
                      <img
                        src="/src/assets/imagens/escolha.svg"
                        alt="Button Icon 2"
                        className="w-6 h-6 sm:w-8 sm:h-8"
                      />
                    </button>
                  </div>
                )}
                {index === 2 && (
                  <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
                    <button
                      id="agua-menos"
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#979996] to-[#000000] rounded-full flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-[#000000] hover:to-[#979996] transition-colors"
                    >
                      <img
                        src="/src/assets/imagens/menos.svg"
                        alt="Button Icon 1"
                        className="w-6 h-6 sm:w-8 sm:h-8"
                      />
                    </button>
                    <button
                      id="agua-mais"
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#979996] to-[#000000] rounded-full flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-[#000000] hover:to-[#979996] transition-colors"
                    >
                      <img
                        src="/src/assets/imagens/mais.svg"
                        alt="Button Icon 1"
                        className="w-6 h-6 sm:w-8 sm:h-8"
                      />
                    </button>

                    <button
                      id="agua-escolha"
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#979996] to-[#000000] rounded-full flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-[#000000] hover:to-[#979996] transition-colors"
                      onClick={() => setShowModal(true)}
                    >
                      <img
                        src="/src/assets/imagens/escolha.svg"
                        alt="Button Icon 2"
                        className="w-6 h-6 sm:w-8 sm:h-8"
                      />
                    </button>
                  </div>
                )}
                {index === 1 && (
                  <div className="mt-4 p-2 w-[60%] rounded-lg bg-white flex flex-col items-center">
                    <input
                      id="tempo-ativo-input"
                      type="text"
                      value={tempoAtivo}
                      onChange={(e) => setTempoAtivo(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg w-full"
                    />
                  </div>
                )}
                {index === 3 && (
                  <div className="mt-4 p-2 w-[60%] rounded-lg bg-white flex flex-col items-center">
                    <input
                      id="passos-input"
                      type="text"
                      value={passos}
                      onChange={(e) => setPassos(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg w-full"
                    />
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </header>
      <footer>
        <NavigationButtons />
      </footer>
      {showModal && <ModalEscolha onClose={() => setShowModal(false)} />}{" "}
      {/* Exibir o modal */}
    </div>
  );
}
