import { ReactNode } from 'react';

interface IPropsButton {
  handleClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  children: ReactNode;
}

const Button = ({ handleClick, disabled, ariaLabel, children }: IPropsButton) => (
  <button
    disabled={disabled}
    aria-disabled={disabled}
    aria-label={ariaLabel}
    onClick={handleClick}
    className="font-bold rounded-lg text-sm px-4 py-2 bg-violet-600 text-gray-50 justify-center 
    hover:bg-violet-500 disabled:pointer-events-none disabled:opacity-10"
  >
    { children }
  </button>
)

export default Button;
