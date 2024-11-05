import React from "react";

interface ButtonProps {
  id: string;
  iconSrc: string;
  altText: string;
  onClick?: () => void;
}

interface ButtonGroupProps {
  buttons: ButtonProps[];
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons }) => {
  return (
    <div className="mt-4 flex mx-4 flex-wrap justify-center gap-2 sm:gap-3">
      {buttons.map((button) => (
        <button
          key={button.id}
          id={button.id}
          onClick={button.onClick}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#9fd883] to-[#1dd60cbb] rounded-full flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-[#91ecfc] hover:to-[#2765b6] transition-colors"
        >
          <img
            src={button.iconSrc}
            alt={button.altText}
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
