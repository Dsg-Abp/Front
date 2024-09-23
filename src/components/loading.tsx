import React from "react";
import Animação from "../components/Animação";
import loadingAnimation from "../assets/animacoes/loading.json";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <Animação animationData={loadingAnimation} />
    </div>
  );
};

export default LoadingSpinner;
