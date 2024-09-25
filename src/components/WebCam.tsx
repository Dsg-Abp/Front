import { useRef } from "react";
import Webcam from "react-webcam";

const MyCameraComponent = () => {
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
    } else {
      console.error("Webcam não está disponível.");
    }
  };

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Tirar Foto</button>
    </div>
  );
};

export default MyCameraComponent;
