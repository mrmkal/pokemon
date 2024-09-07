import { render, screen } from '@testing-library/react';

import Loading from './';

describe('Loading Component', () => {
  it('renders loading spinner with correct role', () => {
    render(<Loading />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('renders a hidden loading text for screen readers', () => {
    render(<Loading />);
    const srOnlyText = screen.getByText('Loading...');
    expect(srOnlyText).toHaveClass('sr-only');
    expect(srOnlyText).toBeInTheDocument();
  });
});
