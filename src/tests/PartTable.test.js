import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PartTable from '../components/PartTable';

beforeEach(() => {
  render(<PartTable customerId={1} />, { wrapper: MemoryRouter });
});

describe('Form elements are rendered', () => {
  test('part number label', async () => {
    const numberLabel = await screen.findByLabelText('Part Number');
    expect(numberLabel).toBeInTheDocument();
  });

  test('part number select', async () => {
    const numberSelect = await screen.findByText('Select...');
    expect(numberSelect).toBeInTheDocument();
  });

  test('quantity label', async () => {
    const quantityLabel = await screen.findByLabelText('Quantity');
    expect(quantityLabel).toBeInTheDocument();
  });

  test('quantity field', async () => {
    const quantityField = await screen.findByTestId('quantity');
    expect(quantityField).toBeInTheDocument();
  });

  test('bins label', async () => {
    const binsLabel = await screen.findByLabelText('Number of Bins');
    expect(binsLabel).toBeInTheDocument();
  });

  test('bins field', async () => {
    const binsField = await screen.findByTestId('bins');
    expect(binsField).toBeInTheDocument();
  });

  test('add part button', async () => {
    const addPartBtn = await screen.findByTestId('add-part-btn');
    expect(addPartBtn).toBeInTheDocument();
  });

  test('part select shows list of parts on click', async () => {
    const partSelect = await screen.findByText('Select...');
    userEvent.click(partSelect);

    // The part number '123-457' is coming from the mock server
    // See src/mocks/handlers for mocked response
    expect(await screen.findByText('123-457'));
  });
});

describe('Form validation', () => {
  test('error when part is not selected', async () => {
    const addPartBtn = await screen.findByTestId('add-part-btn');
    userEvent.click(addPartBtn);
    expect(screen.queryByText('Part number is required')).toBeInTheDocument();
  });

  test('error when quantity is not provided', async () => {
    const partSelect = await screen.findByText('Select...');
    userEvent.click(partSelect);
    const part = await screen.findByText('123-457');
    userEvent.click(part);

    const addPartBtn = await screen.findByTestId('add-part-btn');
    userEvent.click(addPartBtn);
    expect(screen.queryByText('Quantity value must be a number')).toBeInTheDocument();
  });

  test('error when quantity is not a number', async () => {
    const partSelect = await screen.findByText('Select...');
    userEvent.click(partSelect);
    const part = await screen.findByText('123-457');
    userEvent.click(part);
    const quantityField = await screen.findByTestId('quantity');
    userEvent.type(quantityField, 'Hello World');

    const addPartBtn = await screen.findByTestId('add-part-btn');
    userEvent.click(addPartBtn);
    expect(screen.queryByText('Quantity value must be a number')).toBeInTheDocument();
  });

  test('error when bins is not provided', async () => {
    const partSelect = await screen.findByText('Select...');
    userEvent.click(partSelect);
    const part = await screen.findByText('123-457');
    userEvent.click(part);
    const quantityField = await screen.findByTestId('quantity');
    userEvent.type(quantityField, '2');

    const addPartBtn = await screen.findByTestId('add-part-btn');
    userEvent.click(addPartBtn);
    expect(screen.queryByText('Bins value must be a number')).toBeInTheDocument();
  });

  test('error when bins is not a number', async () => {
    const partSelect = await screen.findByText('Select...');
    userEvent.click(partSelect);
    const part = await screen.findByText('123-457');
    userEvent.click(part);
    const quantityField = await screen.findByTestId('quantity');
    userEvent.type(quantityField, '2');
    const binsField = await screen.findByTestId('bins');
    userEvent.type(binsField, 'Not a number');

    const addPartBtn = await screen.findByTestId('add-part-btn');
    userEvent.click(addPartBtn);
    expect(screen.queryByText('Bins value must be a number')).toBeInTheDocument();
  });
});
