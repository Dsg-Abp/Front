import { useRef, useState, useEffect } from "react";
import { useAlimentoContext } from "../../contexts/AlimentoContext";
import { AlimentoDataType } from "../../types/alimentos";
import NavigationButtons from "../../components/BotãoMenu";
import Calendario from "../../components/Calendario";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ReactECharts from 'echarts-for-react';  // Importação do ECharts

const AlimentoSearchPage = () => {
  const { alimentos, searchAlimentos } = useAlimentoContext();
  const [descricao, setDescricao] = useState("");
  const [selectedAlimentos, setSelectedAlimentos] = useState<AlimentoDataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const buttonRef = useRef<HTMLButtonElement>(null);

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
      setCurrentPage(1);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlimentos = alimentos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(alimentos.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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

  // Configuração do gráfico ECharts
  const chartOptions = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'center',  // Centraliza verticalmente
      left: 'left',   // Coloca a legenda à esquerda
      orient: 'vertical',  // Alinha a legenda verticalmente ao lado esquerdo
      padding: 10  // Ajusta o espaçamento da legenda
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
          show: false, // Não mostra rótulos por padrão
          position: 'inside' // Posição padrão
        },
        emphasis: {
          label: {
            show: true, // Mostra o rótulo ao passar o mouse
            fontSize: 20,
            fontWeight: 'bold',
            position: 'inside' // Coloca o rótulo dentro da fatia
          }
        },
        labelLine: {
          show: false
        },
        data: pieData,
        left: '100px' // Adiciona uma margem esquerda de 20px ao gráfico
      }
    ]
  };
  
  

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-custom-bg">
      <div className="fixed top-0">
        <Calendario />
      </div>
      <div className="flex">
        <input
          className="border-2 rounded-lg border-black p-1"
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Busque o alimento aqui..."
        />
        <button
          className="text-white rounded-lg bg-[#212270] hover:bg-[#363769] p-1 ml-2"
          ref={buttonRef}
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>

      {alimentos.length > 0 && (
        <div className="flex mt-2 text-black">
          <div className="flex flex-col">
            <ul className="text-white p-2 rounded-lg max-h-96 overflow-y-auto">
              {currentAlimentos.map((alimento: AlimentoDataType) => (
                <li key={alimento._id}>
                  <strong>{alimento["Descrição do Alimento"]}</strong>
                  <input
                    className="ml-2"
                    type="checkbox"
                    checked={selectedAlimentos.includes(alimento)}
                    onChange={() => handleCheckboxChange(alimento)}
                  />
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-white font-bold rounded-l-lg ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {"<"}
              </button>
              <span className="px-4 py-1 text-white font-bold">
                {currentPage}/{totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 text-white font-bold rounded-r-lg ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedAlimentos.length > 0 && (
        <button
          className="fixed top-4 right-4 text-white bg-[#212270] hover:bg-[#363769] rounded-lg p-2"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      )}
      {isModalOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-green-100 p-6 rounded-lg">
            <h2 className="text-lg font-bold">Alimentos Selecionados:</h2>
            <ul>
              {selectedAlimentos.map((alimento) => (
                <li key={alimento._id}>
                  <strong>{alimento["Descrição do Alimento"]}</strong>
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => handleRemoveAlimento(alimento)}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <h2 className="text-lg font-bold mt-4">Soma dos Nutrientes:</h2>
              <p>Calorias: {somaNutrientes.calorias}</p>
              <p>Proteínas: {somaNutrientes.proteina}</p>
              <p>Carboidratos: {somaNutrientes.carboidrato}</p>
              <p>Magnésio: {somaNutrientes.magnesio}</p>
              <p>Ferro: {somaNutrientes.ferro}</p>
              <p>Sódio: {somaNutrientes.sodio}</p>
              <p>Potássio: {somaNutrientes.potassio}</p>
              <p>Zinco: {somaNutrientes.zinco}</p>
              <p>Vitamina C: {somaNutrientes.vitaminaC}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold mt-4">Distribuição dos Nutrientes:</h2>
              <ReactECharts option={chartOptions} style={{ width: 400, height: 300 }} />
            </div>
          <button
              className="flex justify-center items-center text-white bg-red-500 rounded-full p-2 hover:bg-red-300"
              onClick={() => setIsModalOpen(false)}
            >
              Voltar
            </button>
          </div>
        </div>
      )}
      <div className="fixed bottom-0">
        <NavigationButtons />
      </div>
    </div>
  );
};

export default AlimentoSearchPage;


// import { useRef, useState, useEffect } from "react";
// import { useAlimentoContext } from "../../contexts/AlimentoContext";
// import { AlimentoDataType } from "../../types/alimentos";
// import NavigationButtons from "../../components/BotãoMenu";
// import Calendario from "../../components/Calendario";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { PieChart } from '@mui/x-charts/PieChart';  // Importação do gráfico da MUI

// const AlimentoSearchPage = () => {
//   const { alimentos, searchAlimentos } = useAlimentoContext();
//   const [descricao, setDescricao] = useState("");
//   const [selectedAlimentos, setSelectedAlimentos] = useState<AlimentoDataType[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 10;
//   const buttonRef = useRef<HTMLButtonElement>(null);

//   const handleCheckboxChange = (alimento: AlimentoDataType) => {
//     setSelectedAlimentos((prevSelected) => {
//       if (prevSelected.includes(alimento)) {
//         return prevSelected.filter((item) => item !== alimento);
//       } else {
//         return [...prevSelected, alimento];
//       }
//     });
//   };

//   const handleKeyPress = (event: any) => {
//     if (event.key === "Enter" && buttonRef.current) {
//       buttonRef.current.click();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("keydown", handleKeyPress);
//     return () => {
//       document.removeEventListener("keydown", handleKeyPress);
//     };
//   }, []);

//   const handleSearch = async () => {
//     if (descricao) {
//       await searchAlimentos(descricao);
//       setCurrentPage(1);
//     }
//   };

//   const calcularSomaNutrientes = () => {
//     const total = {
//       calorias: 0,
//       proteina: 0,
//       colesterol: 0,
//       carboidrato: 0,
//       magnesio: 0,
//       ferro: 0,
//       sodio: 0,
//       potassio: 0,
//       zinco: 0,
//       vitaminaC: 0,
//     };

//     selectedAlimentos.forEach((alimento) => {
//       total.calorias += alimento["Energia(kcal)"] || 0;
//       total.proteina += alimento["Proteína(g)"] || 0;
//       total.colesterol += alimento["Colesterol(mg)"] || 0;
//       total.carboidrato += alimento["Carboidrato(g)"] || 0;
//       total.magnesio += alimento["Magnésio(mg)"] || 0;
//       total.ferro += alimento["Ferro(mg)"] || 0;
//       total.sodio += alimento["Sódio(mg)"] || 0;
//       total.potassio += alimento["Potássio(mg)"] || 0;
//       total.zinco += alimento["Zinco(mg)"] || 0;
//       total.vitaminaC += alimento["VitaminaC(mg)"] || 0;
//     });

//     return {
//       calorias: total.calorias.toFixed(2),
//       proteina: total.proteina.toFixed(2),
//       colesterol: total.colesterol.toFixed(2),
//       carboidrato: total.carboidrato.toFixed(2),
//       magnesio: total.magnesio.toFixed(2),
//       ferro: total.ferro.toFixed(2),
//       sodio: total.sodio.toFixed(2),
//       potassio: total.potassio.toFixed(2),
//       zinco: total.zinco.toFixed(2),
//       vitaminaC: total.vitaminaC.toFixed(2),
//     };
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentAlimentos = alimentos.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(alimentos.length / itemsPerPage);

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleRemoveAlimento = (alimentoToRemove: AlimentoDataType) => {
//     setSelectedAlimentos((prevSelected) => {
//       return prevSelected.filter((alimento) => alimento !== alimentoToRemove);
//     });
//   };

//   const somaNutrientes = calcularSomaNutrientes();

//   const pieData = [
//     { id: 'Calorias', value: parseFloat(somaNutrientes.calorias) },
//     { id: 'Proteínas', value: parseFloat(somaNutrientes.proteina) },
//     { id: 'Carboidratos', value: parseFloat(somaNutrientes.carboidrato) },
//     { id: 'Magnésio', value: parseFloat(somaNutrientes.magnesio) },
//     { id: 'Ferro', value: parseFloat(somaNutrientes.ferro) },
//     { id: 'Sódio', value: parseFloat(somaNutrientes.sodio) },
//     { id: 'Potássio', value: parseFloat(somaNutrientes.potassio) },
//     { id: 'Zinco', value: parseFloat(somaNutrientes.zinco) },
//     { id: 'Vitamina C', value: parseFloat(somaNutrientes.vitaminaC) },
//   ];

//   return (
//     <div className="h-screen flex flex-col justify-center items-center bg-custom-bg">
//       <div className="fixed top-0">
//         <Calendario />
//       </div>
//       <div className="flex">
//         <input
//           className="border-2 rounded-lg border-black p-1"
//           type="text"
//           value={descricao}
//           onChange={(e) => setDescricao(e.target.value)}
//           placeholder="Busque o alimento aqui..."
//         />
//         <button
//           className="text-white rounded-lg bg-[#212270] p-1 ml-2"
//           ref={buttonRef}
//           onClick={handleSearch}
//         >
//           Buscar
//         </button>
//       </div>

//       {alimentos.length > 0 && (
//         <div className="flex mt-2 text-black">
//           <div className="flex flex-col">
//             <ul className="text-white p-2 rounded-lg max-h-96 overflow-y-auto">
//               {currentAlimentos.map((alimento: AlimentoDataType) => (
//                 <li key={alimento._id}>
//                   <strong>{alimento["Descrição do Alimento"]}</strong>
//                   <input
//                     className="ml-2"
//                     type="checkbox"
//                     checked={selectedAlimentos.includes(alimento)}
//                     onChange={() => handleCheckboxChange(alimento)}
//                   />
//                 </li>
//               ))}
//             </ul>
//             <div className="flex justify-center mt-2">
//               <button
//                 onClick={prevPage}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-1 text-white font-bold rounded-l-lg ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
//               >
//                 {"<"}
//               </button>
//               <span className="px-4 py-1 text-white font-bold">
//                 {currentPage}/{totalPages}
//               </span>
//               <button
//                 onClick={nextPage}
//                 disabled={currentPage === totalPages}
//                 className={`px-3 py-1 text-white font-bold rounded-r-lg ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
//               >
//                 {">"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {selectedAlimentos.length > 0 && (
//         <button
//           className="fixed top-4 right-4 text-white bg-[#212270] rounded-lg p-2"
//           onClick={() => setIsModalOpen(true)}
//         >
//           Mostrar Alimentos <FontAwesomeIcon icon={faChevronDown} />
//         </button>
//       )}
//       {isModalOpen && (
//         <div className="fixed top-0 right-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <button onClick={() => setIsModalOpen(false)} className="float-right text-black">X</button>
//             <ul>
//               {selectedAlimentos.map((alimento) => (
//                 <li key={alimento._id}>
//                   {alimento["Descrição do Alimento"]}
//                   <button onClick={() => handleRemoveAlimento(alimento)} className="ml-2 text-red-500">Remover</button>
//                 </li>
//               ))}
//             </ul>
//             <div>
//               <h2 className="text-lg font-bold mt-4">Soma dos Nutrientes:</h2>
//               <p>Calorias: {somaNutrientes.calorias}</p>
//               <p>Proteínas: {somaNutrientes.proteina}</p>
//               <p>Carboidratos: {somaNutrientes.carboidrato}</p>
//               <p>Magnésio: {somaNutrientes.magnesio}</p>
//               <p>Ferro: {somaNutrientes.ferro}</p>
//               <p>Sódio: {somaNutrientes.sodio}</p>
//               <p>Potássio: {somaNutrientes.potassio}</p>
//               <p>Zinco: {somaNutrientes.zinco}</p>
//               <p>Vitamina C: {somaNutrientes.vitaminaC}</p>
//             </div>
//             <div>
//               <h2 className="text-lg font-bold mt-4">Distribuição dos Nutrientes:</h2>
//               <PieChart
//                 series={[
//                   {
//                     data: pieData,
//                   },
//                 ]}
//                 width={400}
//                 height={300}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="fixed bottom-0">
//         <NavigationButtons />
//       </div>
//     </div>
//   );
// };

// export default AlimentoSearchPage;
