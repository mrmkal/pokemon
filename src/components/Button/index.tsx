import { FC, ReactNode } from 'react';

interface IPropsButton {
  handleClick: () => void;
  children: ReactNode;
}

const Button: FC<IPropsButton> = ({ handleClick, children }) => {

  return (
    <button
      onClick={handleClick}
      className="font-bold rounded-lg text-sm px-4 py-2 bg-violet-600 text-gray-50 justify-center"
    >
      { children }
    </button>
  );
}

export default Button;
