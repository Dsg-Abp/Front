import { useRef, useState, useEffect } from "react";
import { useAlimentoContext } from "../../contexts/AlimentoContext";
import { AlimentoDataType } from "../../types/alimentos";
import { useNavigate } from "react-router-dom";

const AlimentoSearchPage = () => {
  const { alimentos, searchAlimentos } = useAlimentoContext();
  const [descricao, setDescricao] = useState("");
  const [selectedAlimentos, setSelectedAlimentos] = useState<AlimentoDataType[]>([]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleCheckboxChange = (alimento: AlimentoDataType) => {
    setSelectedAlimentos((prevSelected) => {
      if (prevSelected.includes(alimento)) {
        // Remover o alimento da lista e subtrair seus nutrientes
        return prevSelected.filter((item) => item !== alimento);
      } else {
        // Adicionar o alimento à lista
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

  const handleBack = () => {
    navigate("/TelaInicial");
  };

  // Função para somar os nutrientes selecionados
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

  const somaNutrientes = calcularSomaNutrientes();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-custom-bg">
      <h1 className="text-white text-xl mb-6">Buscar Alimentos</h1>
      <div className="flex">
        <input
          className="border-2 rounded-lg border-black p-1"
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite aqui..."
        />
        <button
          className="text-white rounded-lg bg-blue-600 p-1 ml-2"
          ref={buttonRef}
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
      <div className="flex mt-2 text-black">
        <div className="flex flex-col">
          <ul className="text-black bg-gray-300 p-2 rounded-lg max-h-96 overflow-y-auto">
            {alimentos.map((alimento: AlimentoDataType) => (
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
        </div>
      </div>
      <button
        onClick={handleBack}
        className="text-white rounded-lg bg-red-600 p-1 mt-4"
      >
        Voltar
      </button>
      {/* Lista de alimentos selecionados no canto superior direito */}
      {selectedAlimentos.length > 0 && (
        <div
          className="fixed top-4 right-4 text-black bg-rose-100 rounded-lg p-2 max-w-sm"
        >
          <h2>Alimentos Selecionados:</h2>
          <ul>
            {selectedAlimentos.map((alimento) => (
              <li key={alimento._id}>
                {alimento["Descrição do Alimento"]}
                <button
                  className="ml-2 text-red-500"
                  onClick={() => handleCheckboxChange(alimento)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <h3 className="mt-4">Soma dos Nutrientes:</h3>
          <p>
            <strong>Calorias (kcal): {somaNutrientes.calorias}</strong>
          </p>
          <p>
            <strong>Proteínas (g): {somaNutrientes.proteina}</strong>
          </p>
          <p>
            <strong>Colesterol (mg): {somaNutrientes.colesterol}</strong>
          </p>
          <p>
            <strong>Carboidratos (g): {somaNutrientes.carboidrato}</strong>
          </p>
          <p>
            <strong>Magnésio (mg): {somaNutrientes.magnesio}</strong>
          </p>
          <p>
            <strong>Ferro (mg): {somaNutrientes.ferro}</strong>
          </p>
          <p>
            <strong>Sódio (mg): {somaNutrientes.sodio}</strong>
          </p>
          <p>
            <strong>Potássio (mg): {somaNutrientes.potassio}</strong>
          </p>
          <p>
            <strong>Zinco (mg): {somaNutrientes.zinco}</strong>
          </p>
          <p>
            <strong>Vitamina C (mg): {somaNutrientes.vitaminaC}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default AlimentoSearchPage;
