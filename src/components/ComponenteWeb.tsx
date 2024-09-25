import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import api from "../services/api";

const WebcamCapture: React.FC = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const capture = () => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      setImageSrc(image);
    }
  };

  const sendImage = async () => {
    if (!imageSrc) return;

    const userId = localStorage.getItem("userId");

    try {
      const response = await api.post("/web", {
        image: imageSrc,
        userId,
      });
      console.log("Imagem enviada com sucesso:", response.data);

      setImageSrc(null);
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {!isCameraOpen ? (
        <button
          onClick={() => setIsCameraOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Adicionar foto ao perfil
        </button>
      ) : (
        <>
          <div className="flex items-start space-x-4 mt-4">
            <div className="flex flex-col items-center pt-2 w-[400px]">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="border rounded-lg"
              />
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={capture}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                >
                  Tirar Foto
                </button>
                <button
                  onClick={() => setIsCameraOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                  Fechar Câmera
                </button>
              </div>
            </div>
            {imageSrc && (
              <div className="flex flex-col items-center w-[200px]">
                <img
                  src={imageSrc}
                  alt="Captura"
                  className="mt-2 border rounded-lg"
                />
                <button
                  onClick={sendImage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition mt-2"
                >
                  Enviar Foto
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WebcamCapture;
