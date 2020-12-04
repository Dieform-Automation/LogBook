import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReceivingForm from '../components/ReceivingForm';

describe('Form elements are rendered', () => {
  beforeEach(() => {
    render(<ReceivingForm />);
  });

  test('date label', async () => {
    const dateLabel = await screen.findByText('Date');
    expect(dateLabel).toBeInTheDocument();
  });

  test('date field', async () => {
    const dateInput = await screen.findByTestId('date');
    expect(dateInput).toBeInTheDocument();
  });

  test('customer label', async () => {
    const customerLabel = await screen.findByText('Customer');
    expect(customerLabel).toBeInTheDocument();
  });

  test('customer select', async () => {
    const customerSelect = await screen.findByText('Select...');
    expect(customerSelect).toBeInTheDocument();
  });

  test('packing slip label', async () => {
    const packingSlipLabel = await screen.findByText('Customer Packing Slip');
    expect(packingSlipLabel).toBeInTheDocument();
  });

  test('packing slip field', async () => {
    const packingSlipInput = await screen.findByTestId('packing-slip');
    expect(packingSlipInput).toBeInTheDocument();
  });

  test('customer select shows list of customers on click', async () => {
    const customerSelect = await screen.findByText('Select...');
    userEvent.click(customerSelect);

    // The customer 'Bob' is coming from the mock server
    // See src/mocks/handlers for mocked response
    expect(await screen.findByText('Bob')).toBeInTheDocument();
  });
});

describe('Form state', () => {
  test('part table fields are hidden when customer is not selected', async () => {
    render(<ReceivingForm />);
    await waitFor(() => {
      expect(screen.queryByText('Part Number')).not.toBeInTheDocument();
      expect(screen.queryByText('Quantity')).not.toBeInTheDocument();
      expect(screen.queryByText('Bins')).not.toBeInTheDocument();
    });
  });

  test('part table fields are visible when customer is selected', async () => {
    render(<ReceivingForm />, { wrapper: MemoryRouter });
    const customerSelect = await screen.findByText('Select...');
    userEvent.click(customerSelect);
    const customer = await screen.findByText('Bob');
    userEvent.click(customer);
    await waitFor(async () => {
      expect(await screen.findAllByText('Part Number')).toHaveLength(2);
      expect(await screen.findAllByText('Quantity')).toHaveLength(2);
      expect(await screen.findAllByText(/Bins/)).toHaveLength(2);
    });
  });
});
