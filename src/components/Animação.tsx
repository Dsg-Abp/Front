import lottie, { AnimationItem } from "lottie-web";
import { useEffect, useRef } from "react";

interface AnimacaoProps {
  animationData: object; // ou um tipo mais específico se você souber a estrutura do JSON
}

const Animação: React.FC<AnimacaoProps> = ({ animationData }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animation: AnimationItem | null = null;

    if (container.current) {
      animation = lottie.loadAnimation({
        container: container.current,
        animationData: animationData,
        renderer: "svg",
        loop: true,
        autoplay: true,
      });
    }

    return () => {
      if (animation) {
        animation.destroy();
      }
    };
  }, [animationData]);

  return <div ref={container} className="w-auto h-auto" />;
};

export default Animação;
