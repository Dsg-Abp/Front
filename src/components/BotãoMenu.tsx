import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardProfile from "./CardProfile";

const NavigationButtons = () => {
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  return (
    <div className="flex gap-4 p-4 justify-center">
      <button
        onClick={() => navigate("/TelaInicial")}
        className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 transition-colors"
      >
        <img src="/imagens/home.svg" alt="Home" className="w-8 h-8" />
      </button>
      <button
        onClick={toggleProfileModal}
        className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600  rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-700 transition-colors"
      >
        <img
          src="/imagens/ajustes.svg"
          alt="Configurações"
          className="w-8 h-8"
        />
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("user");

          navigate("/", { replace: true });
        }}
        className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 transition-colors"
      >
        <img src="/imagens/sair.svg" alt="Sair" className="w-8 h-8" />
      </button>

      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center text-white">
          <div className="bg-[#3789e6] p-8 rounded-lg">
            <CardProfile />
            <button
              onClick={() => {
                toggleProfileModal();
                navigate("/TelaInicial", { replace: true });
                window.location.reload();
              }}
              className="bg-gradient-to-r from-[#fa7c7c] to-[#d30505] p-2 w-auto rounded-lg mt-4 text-white font-bold hover:from-[#df7e72] hover:to-[#d62727] transition-colors duration-200"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationButtons;
