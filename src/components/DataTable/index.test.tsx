import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DataTable } from './';

describe('DataTable', () => {
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Age', accessor: 'age' },
  ];

  const data = [
    { name: 'John Doe', age: 28 },
    { name: 'Jane Smith', age: 34 },
  ];

  it('renders the table headers correctly', () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        offset={0}
      />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders the table data correctly', () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        offset={0}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('28')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('34')).toBeInTheDocument();
  });

  it('does not render pagination buttons if nextPage and previousPage are not provided', () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        offset={0}
      />
    );

    expect(screen.queryByText('Previous Page')).not.toBeInTheDocument();
    expect(screen.queryByText('Next Page')).not.toBeInTheDocument();
  });

  it('renders pagination buttons when nextPage and previousPage are provided', () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        offset={0}
        nextPage={jest.fn()}
        previousPage={jest.fn()}
      />
    );

    expect(screen.getByText('Previous Page')).toBeInTheDocument();
    expect(screen.getByText('Next Page')).toBeInTheDocument();
  });

  it('calls nextPage when the Next Page button is clicked', async () => {
    const nextPage = jest.fn();

    render(
      <DataTable
        data={data}
        columns={columns}
        offset={0}
        nextPage={nextPage}
        previousPage={jest.fn()}
      />
    );

    const nextPageButton = screen.getByText('Next Page');
    await userEvent.click(nextPageButton);

    expect(nextPage).toHaveBeenCalledTimes(1);
  });

  it('calls previousPage when the Previous Page button is clicked', async () => {
    const previousPage = jest.fn();

    render(
      <DataTable
        data={data}
        columns={columns}
        offset={10}
        nextPage={jest.fn()}
        previousPage={previousPage}
      />
    );

    const previousPageButton = screen.getByText('Previous Page');
    await userEvent.click(previousPageButton);

    expect(previousPage).toHaveBeenCalledTimes(1);
  });

  it('disables Previous Page button when offset is 0', () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        offset={0}
        nextPage={jest.fn()}
        previousPage={jest.fn()}
      />
    );

    const previousPageButton = screen.getByText('Previous Page');
    expect(previousPageButton).toBeDisabled();
  });
});
