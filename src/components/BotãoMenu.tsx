import { useNavigate } from "react-router-dom";

const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 p-4 justify-center">
      <button
        onClick={() => navigate("/home")}
        className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 transition-colors"
      >
        <img
          src="/src/assets/imagens/home.svg"
          alt="Home"
          className="w-8 h-8"
        />
      </button>
      <button
        onClick={() => navigate("/configuracoes")}
        className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 transition-colors"
      >
        <img
          src="/src/assets/imagens/ajustes.svg"
          alt="Configurações"
          className="w-8 h-8"
        />
      </button>
      <button
        onClick={() => navigate("/graficos")}
        className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600  rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-700 transition-colors"
      >
        <img
          src="/src/assets/imagens/graphic.svg"
          alt="Gráficos"
          className="w-8 h-8"
        />
      </button>
      <button
        onClick={() => navigate("/")}
        className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600  rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 transition-colors"
      >
        <img
          src="/src/assets/imagens/sair.svg"
          alt="Sair"
          className="w-8 h-8"
        />
      </button>
    </div>
  );
};

export default NavigationButtons;
