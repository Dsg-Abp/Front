import Animação from "../components/Animação";
import aguaJson from "../assets/animacoes/agua.json";
import caloriasJson from "../assets/animacoes/calorias.json";
import Calendario from "../components/Calendario";
import ModalEscolha from "../components/ModalFuncionalidades/ModalAgua";
import ButtonGroup from "../components/ButtonAjuste";
import { useState, useEffect, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useWater } from "../contexts/WaterContext";
import NavigationButtons from "../components/BotãoMenu";
import ArcDesignGCB from "../components/Graphics/calorias";

const ArcDesign = lazy(() => import("../components/Graphics/imc"));
const ArcDesignAgua = lazy(() => import("../components/Graphics/agua"));

export default function TelaInicial() {
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState("");
  const [peso, setPeso] = useState<number | null>(null);
  const [altura, setAltura] = useState<number | null>(null);
  const [imc, setImc] = useState<string | null>(null);
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [caloriasHoje, setCaloriasHoje] = useState<number | null>(null);

  const { totalWater, enviarDadosAguaMais, enviarDadosAguaMenos } = useWater();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID não encontrado no Local Storage");
      return;
    }

    const hoje = new Date();
    const horaAtual = hoje.getHours();
    const dataParaConsulta =
      horaAtual >= 0 && horaAtual < 24
        ? hoje.toISOString().split("T")[0]
        : new Date(hoje.setDate(hoje.getDate() - 1))
            .toISOString()
            .split("T")[0];

    api
      .get(`/alimentosData/${userId}`)
      .then((response) => {
        const data = response.data.data;
        const dadosHoje = data.find(
          (item: any) => item._id === dataParaConsulta
        );
        if (dadosHoje) {
          setCaloriasHoje(dadosHoje.totalCalorias);
        } else {
          setCaloriasHoje(0);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados", error);
      });
  }, []);

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
          setImc(profile.imc);
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
    <div className="flex flex-col bg-custom-pattern bg-cover bg-center h-screen">
      <div className="px-[500px]">
        <Calendario />
      </div>
      <header className="flex w-full h-screen justify-center gap-4">
        <div className="p-4 bg-gradient-to-r from-[#212270] to-[#1550bd] text-white rounded-lg ">
          <div className="flex items-center justify-center h-40">
            <div className="w-[150px] h-[150px] flex items-center justify-center bg-gray-200 rounded-full overflow-hidden">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Foto do usuário"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <span className="text-sm font-medium text-black">
                    Adicione sua foto aqui
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-10">
            <div className=" border-slate-200  bg-gray-200 rounded-lg p-2 ">
              <div className="">
                <p className="text-lg text-blue-900 font-bold">
                  {nome ? nome : "Carregando..."}
                </p>
                <h4 className="text-md text-blue-900">
                  Peso: {peso !== null ? peso : "Carregando..."} kg
                </h4>
                <h4 className="text-md text-blue-900">
                  Altura: {altura !== null ? altura : "Carregando..."} m
                </h4>
                <h4 className="text-md text-blue-900">
                  IMC: {imc !== null ? imc : "Carregando..."}
                </h4>
              </div>

              <Suspense fallback={<div>Carregando gráfico...</div>}>
                <ArcDesign />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gradient-to-r from-[#212270] to-[#1550bd] flex flex-col items-center justify-start p-4">
          <div className="w-[150px] h-[150px] flex items-center justify-center">
            <div className="bg-white rounded-full flex items-center justify-center ">
              <Animação animationData={caloriasJson} />
            </div>
          </div>
          <div className="items-center text-white font-bold text-center pt-5">
            <Suspense
              fallback={<div className="text-white">Carregando gráfico...</div>}
            >
              <ArcDesignGCB />
            </Suspense>
            <h3>Calorias Consumidas Hoje:</h3>
            {caloriasHoje !== null ? (
              <p>{caloriasHoje} kcal</p>
            ) : (
              <p>Carregando...</p>
            )}
          </div>
          <div className="pt-4">
            <ButtonGroup
              buttons={[
                {
                  id: "calorias-escolha",
                  iconSrc: "/imagens/escolha.svg",
                  altText: "Button Icon 3",
                  onClick: () => handleBack(),
                },
              ]}
            />
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-r from-[#212270] to-[#1550bd] flex flex-col items-center justify-start p-4">
          <div className="flex items-center justify-center w-[150px] h-[150px]">
            <div className="bg-white rounded-full flex items-center justify-center overflow-hidden">
              <Animação animationData={aguaJson} />
            </div>
          </div>
          <div className="items-center text-white font-bold text-center pt-5">
            <Suspense fallback={<div>Carregando gráfico...</div>}>
              <ArcDesignAgua />
            </Suspense>
            <h2 className="font-bold">Total consumido hoje: {totalWater} ml</h2>
          </div>
          <div className="pt-4">
            <ButtonGroup
              buttons={[
                {
                  id: "agua-menos",
                  iconSrc: "/imagens/menos.svg",
                  altText: "Button Icon 4",
                  onClick: enviarDadosAguaMenos,
                },
                {
                  id: "agua-mais",
                  iconSrc: "/imagens/mais.svg",
                  altText: "Button Icon 5",
                  onClick: enviarDadosAguaMais,
                },
                {
                  id: "agua-escolha",
                  iconSrc: "/imagens/escolha.svg",
                  altText: "Button Icon 6",
                  onClick: () => setShowModal(true),
                },
              ]}
            />
          </div>
        </div>
      </header>
      <NavigationButtons />
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <ModalEscolha onClose={() => setShowModal(false)} />
        </div>
      )}
    </div>
  );
}
