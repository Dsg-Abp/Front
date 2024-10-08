import { useRef, useState, useEffect } from "react";
import { useAlimentoContext } from "../../contexts/AlimentoContext";
import { AlimentoDataType } from "../../types/alimentos";
import NavigationButtons from "../../components/BotãoMenu";
import Calendario from "../../components/Calendario";
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faList, faSearch, faTrash, } from '@fortawesome/free-solid-svg-icons';

const AlimentoSearchPage = () => {
  const { alimentos, searchAlimentos } = useAlimentoContext();
  const [descricao, setDescricao] = useState("");
  const [selectedAlimentos, setSelectedAlimentos] = useState<AlimentoDataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const buttonRef = useRef<HTMLButtonElement>(null);

  const totalPages = Math.ceil(alimentos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAlimentos = alimentos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCheckboxChange = (alimento: AlimentoDataType) => {
    setSelectedAlimentos((prevSelected) => {
      if (prevSelected.includes(alimento)) {
        return prevSelected.filter((item) => item !== alimento);
      } else {
        return [...prevSelected, alimento];
      }
    });
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && buttonRef.current) {
      buttonRef.current.click();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleSearch = async () => {
    if (descricao) {
      await searchAlimentos(descricao);
    }
  };

  const calcularSomaNutrientes = () => {
    const total = {
      calorias: 0,
      proteina: 0,
      colesterol: 0,
      carboidrato: 0,
      magnesio: 0,
      ferro: 0,
      sodio: 0,
      potassio: 0,
      zinco: 0,
      vitaminaC: 0,
    };

    selectedAlimentos.forEach((alimento) => {
      total.calorias += alimento["Energia(kcal)"] || 0;
      total.proteina += alimento["Proteína(g)"] || 0;
      total.colesterol += alimento["Colesterol(mg)"] || 0;
      total.carboidrato += alimento["Carboidrato(g)"] || 0;
      total.magnesio += alimento["Magnésio(mg)"] || 0;
      total.ferro += alimento["Ferro(mg)"] || 0;
      total.sodio += alimento["Sódio(mg)"] || 0;
      total.potassio += alimento["Potássio(mg)"] || 0;
      total.zinco += alimento["Zinco(mg)"] || 0;
      total.vitaminaC += alimento["VitaminaC(mg)"] || 0;
    });

    return {
      calorias: total.calorias.toFixed(2),
      proteina: total.proteina.toFixed(2),
      colesterol: total.colesterol.toFixed(2),
      carboidrato: total.carboidrato.toFixed(2),
      magnesio: total.magnesio.toFixed(2),
      ferro: total.ferro.toFixed(2),
      sodio: total.sodio.toFixed(2),
      potassio: total.potassio.toFixed(2),
      zinco: total.zinco.toFixed(2),
      vitaminaC: total.vitaminaC.toFixed(2),
    };
  };

  const handleRemoveAlimento = (alimentoToRemove: AlimentoDataType) => {
    setSelectedAlimentos((prevSelected) => {
      return prevSelected.filter((alimento) => alimento !== alimentoToRemove);
    });
  };

  const somaNutrientes = calcularSomaNutrientes();

  const pieData = [
    { value: parseFloat(somaNutrientes.calorias), name: 'Calorias' },
    { value: parseFloat(somaNutrientes.proteina), name: 'Proteínas' },
    { value: parseFloat(somaNutrientes.carboidrato), name: 'Carboidratos' },
    { value: parseFloat(somaNutrientes.magnesio), name: 'Magnésio' },
    { value: parseFloat(somaNutrientes.ferro), name: 'Ferro' },
    { value: parseFloat(somaNutrientes.sodio), name: 'Sódio' },
    { value: parseFloat(somaNutrientes.potassio), name: 'Potássio' },
    { value: parseFloat(somaNutrientes.zinco), name: 'Zinco' },
    { value: parseFloat(somaNutrientes.vitaminaC), name: 'Vitamina C' },
  ];

  const chartOptions = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'center',
      left: 'left',
      orient: 'vertical',
      padding: 10
    },
    series: [
      {
        name: 'Nutrientes',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#dcfce7',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'inside'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            position: 'inside'
          }
        },
        labelLine: {
          show: false
        },
        data: pieData,
        left: '100px'
      }
    ]
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowX = 'hidden';
    } else {
      document.body.style.overflowX = 'auto';
    }
  }, [isModalOpen]);

  const modalVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: "100vh", transition: { duration: 0.5 } },
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-custom-bg">
      <div className="fixed top-0">
        <Calendario />
      </div>

      <h1 className="text-white text-2xl mb-10">Monte sua lista:</h1>

      <div className="flex ml-10 mb-5">
        <div className="flex justify-center">
          <input
            className="w-[300px] border-0 shadow-md shadow-gray-400 rounded-lg p-1"
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite aqui..."
          />
        </div>
        <div className="flex">
          <button
            className="text-white ml-2 shadow-sm"
            ref={buttonRef}
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faSearch} className=" p-2" />
          </button>
        </div>
      </div>
      {alimentos.length > 0 && (
        <div className="flex mt-2 text-black">
          <div className="flex flex-col">
            <ul className="flex flex-col text-black p-2 rounded-md h-[260px] w-[300px] bg-gray-100 max-h-96 overflow-y-auto justify-between shadow-md shadow-gray-400">
              {paginatedAlimentos.map((alimento: AlimentoDataType) => (
                <li
                  key={alimento._id}
                  className={`hover:text-blue-600 cursor-pointer ${selectedAlimentos.includes(alimento) ? 'text-green-500' : ''}`}
                  onClick={() => handleCheckboxChange(alimento)}
                >
                  <strong>{alimento["Descrição do Alimento"]}</strong>
                </li>
              ))}
            </ul>

            <div className="flex justify-center items-center mt-2 gap-4">
              <button
                className="p-2 font-bold text-white"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <span className="text-white font-bold">{currentPage}/{totalPages}</span>
              <button
                className="p-2 font-bold text-white"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
          </div>
        </div>
      )}


      {selectedAlimentos.length > 0 && (
        <button
          className="fixed top-4 right-4 text-white p-2"
          onClick={() => setIsModalOpen(true)}
        >
          <FontAwesomeIcon icon={faList} className="h-8" />
        </button>

      )}
      {isModalOpen && (
        <motion.div
          className="fixed top-0 right-1 h-screen w-[600px] bg-gray-100 shadow-lg z-10 overflow-hidden rounded-lg"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 rounded-lg flex-1 overflow-y-auto">
              <button
                className="absolute top-4 right-4 text-black text-lg hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                {"X"}
              </button>

              <h2 className="text-lg font-bold mb-4">Alimentos Selecionados:</h2>
              <ul className="space-y-2">
                {selectedAlimentos.map((alimento) => (
                  <li key={alimento._id} className="flex justify-between items-center">
                    <strong>{alimento["Descrição do Alimento"]}</strong>
                    <button
                      onClick={() => handleRemoveAlimento(alimento)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="h-3 bg-red-500 hover:bg-red-400 text-white p-2 rounded-md" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex flex-row justify-center items-center mt-6 border-t-2 border-b-2 border-black border-opacity-70">
                <div className="flex flex-col ">
                  <h2 className="text-lg font-bold">Nutrientes:</h2>
                  <div className="flex gap-2">
                    <p className="font-semibold">Calorias:</p>
                    <p>{somaNutrientes.calorias}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-semibold">Proteínas:</p>
                    <p>{somaNutrientes.proteina}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-semibold">Carboidratos:</p>
                    <p>{somaNutrientes.carboidrato}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-semibold">Magnésio:</p>
                    <p>{somaNutrientes.magnesio}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-semibold">Ferro:</p>
                    <p>{somaNutrientes.ferro}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-semibold">Sódio:</p>
                    <p>{somaNutrientes.sodio}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-semibold">Potássio:</p>
                    <p>{somaNutrientes.potassio}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-semibold">Zinco:</p>
                    <p>{somaNutrientes.zinco}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-semibold">Vitamina C:</p>
                    <p>{somaNutrientes.vitaminaC}</p>
                  </div>
                </div>

                <div className="ml-12 p-4 rounded-lg">
                  <ReactECharts option={chartOptions} style={{ width: 300, height: 300 }} />
                </div>
              </div>
            </div>

            {/* Botão Salvar na parte inferior */}
            <div className="p-4 bg-gray-100">
              <button className="bg-blue-600 hover:bg-blue-500 rounded-lg p-4 text-white w-full text-xl">
                Salvar
              </button>
            </div>
          </div>
        </motion.div>
      )}



      <div className="fixed bottom-0">
        <footer>
          <NavigationButtons />
        </footer>
      </div>
    </div>
  );
};

export default AlimentoSearchPage;