import { render, screen, fireEvent } from '@testing-library/react';

import Button from './'; 

const handleClick = jest.fn();

describe('Button Component', () => {
  it('renders the button with provided children', () => {
    render(<Button handleClick={handleClick}>Click Me</Button>);

    expect(screen.getByRole('button')).toHaveTextContent('Click Me');
  });

  it('calls handleClick when clicked', () => {
    render(<Button handleClick={handleClick}>Click Me</Button>);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    render(<Button handleClick={handleClick} disabled>Click Me</Button>);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not call handleClick when disabled', () => {
    render(<Button handleClick={handleClick} disabled>Click Me</Button>);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('sets the aria-label attribute correctly', () => {
    render(<Button handleClick={handleClick} ariaLabel="Click Me Button">Click Me</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Click Me Button');
  });
});
