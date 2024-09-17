import { useRef, useState, useEffect } from 'react';
import { useAlimentoContext } from '../../contexts/AlimentoContext';
import { AlimentoDataType } from '../../types/alimentos';
import { useNavigate } from 'react-router-dom'; 

const AlimentoSearchPage = () => {
  const { alimentos, searchAlimentos } = useAlimentoContext();
  const [descricao, setDescricao] = useState('');
  const [selectedAlimentos, setSelectedAlimentos] = useState<AlimentoDataType[]>([]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleCheckboxChange = (alimento: AlimentoDataType) => {
    setSelectedAlimentos(prevSelected => {
      if (prevSelected.includes(alimento)) {
        return [];
      } else {
        return [alimento];
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
    navigate('/TelaInicial');
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-custom-bg'>
      <h1 className='text-white text-xl mb-6'>Buscar Alimentos</h1>
      <div className='flex'>
        <input
          className='border-2 rounded-lg border-black p-1'
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite aqui..."
        />
        <button
          className='text-white rounded-lg bg-blue-600 p-1 ml-2'
          ref={buttonRef}
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
      <div className='flex mt-2 text-black'>
        <div className='flex flex-col'>
          <ul className='text-black bg-gray-300 p-2 rounded-lg max-h-96 overflow-y-auto'>
            {alimentos.map((alimento: AlimentoDataType) => (
              <li key={alimento._id}>
                <strong>{alimento["Descrição do Alimento"]}</strong>
                <input
                  className='ml-2'
                  type='checkbox'
                  checked={selectedAlimentos.includes(alimento)}
                  onChange={() => handleCheckboxChange(alimento)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className='flex'>
          {selectedAlimentos.length > 0 && (
            <div className='text-black bg-rose-100 rounded-lg p-2'>
              {selectedAlimentos.map(alimento => (
                <div key={alimento._id}>
                  <p><strong>Calorias(kcal): {alimento["Energia(kcal)"]}</strong></p>
                  <div><strong>Proteínas(g): {alimento["Proteína(g)"]}</strong></div>
                  <div>{alimento["Colesterol(mg)"] != null ? (
                    <p><strong>Colesterol(mg): {alimento["Colesterol(mg)"]}</strong></p>
                  ) : (
                    <p><strong>Colesterol(mg): Não contém</strong></p>
                  )}</div>
                  <div><strong>Carboidratos(g): {alimento["Carboidrato(g)"]}</strong></div>
                  <div><strong>Magnésio(mg): {alimento["Magnésio(mg)"]}</strong></div>
                  <div><strong>Ferro(mg): {alimento["Ferro(mg)"]}</strong></div>
                  <div><strong>Sódio(mg): {alimento["Sódio(mg)"]}</strong></div>
                  <div><strong>Potássio(mg): {alimento["Potássio(mg)"]}</strong></div>
                  <div><strong>Zinco(mg): {alimento["Zinco(mg)"]}</strong></div>
                  <div>{alimento["VitaminaC(mg)"] != null ? (
                    <p><strong>Vitamina C(mg): {alimento["VitaminaC(mg)"]}</strong></p>
                  ) : (
                    <p><strong>Vitamina C(mg): Não contém</strong></p>
                  )}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <button onClick={handleBack} className='text-white rounded-lg bg-red-600 p-1 mt-4'>
          Voltar
        </button>
    </div>
  );
};

export default AlimentoSearchPage;
