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
  const [showModal, setShowModal] = useState(false);



    const aguinha = [
      {
        id:'renan@gmail.com',
        quantidade:300

      }
    ] 





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
                  iconSrc: "/src/assets/imagens/menos.svg",
                  altText: "Button Icon 1",
                },
                {
                  id: "calorias-mais",
                  iconSrc: "/src/assets/imagens/mais.svg",
                  altText: "Button Icon 2",
                },
                {
                  id: "calorias-escolha",
                  iconSrc: "/src/assets/imagens/escolha.svg",
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
                  iconSrc: "/src/assets/imagens/menos.svg",
                  altText: "Button Icon 4",
                },
                {
                  id: "agua-mais",
                  iconSrc: "/src/assets/imagens/mais.svg",
                  altText: "Button Icon 5",
                },
                {
                  id: "agua-escolha",
                  iconSrc: "/src/assets/imagens/escolha.svg",
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
              className="p-4 rounded-lg bg-gradient-to-r from-[#a8f748] to-[#05fa29] flex flex-col items-center w-full sm:w-40 md:w-48 lg:w-36 xl:w-40"
            >
              <div className="relative flex flex-col items-center justify-center w-20 h-20">
                <div className="absolute w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <Animação animationData={item.data} />
                </div>
              </div>
              <h2 className="font-bold text-black mt-2 text-center">
                {item.title}
              </h2>
              {item.buttons && <ButtonGroup buttons={item.buttons} />}
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






        {/* trabalhando no projeto agua*/}
          <div className="flex items-center justify-center bg-gradient-to-r from-[#97faf7] to-[#9dc3a2] p-4 rounded-lg  flex-col ">
                <h1 className=" flex ">Água</h1>

                <div>
                <input type="number" className=" rounded-md" />
                <button type="button" className="border-solid bg-teal-700  rounded-md  p-1"   >+</button>
                </div>
                
                {aguinha.map((aguinha) =>(

                    <div key={aguinha.id}>

                  <div> total: {aguinha.quantidade} ml</div>

                  </div>  
                 ))}

          </div>







        </div>
      </header>
      <footer>
        <NavigationButtons />
      </footer>
      {showModal && <ModalEscolha onClose={() => setShowModal(false)} />}
    </div>
  );
}
