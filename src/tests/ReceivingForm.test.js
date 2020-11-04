import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReceivingForm from '../components/ReceivingForm';

describe('Form elements are rendered', () => {
  test('date label', async () => {
    render(<ReceivingForm />);
    const dateLabel = await screen.findByText('Date');
    expect(dateLabel).toBeInTheDocument();
  });

  test('date field', async () => {
    render(<ReceivingForm />);
    const dateInput = await screen.findByTestId('date');
    expect(dateInput).toBeInTheDocument();
  });

  test('customer label', async () => {
    render(<ReceivingForm />);
    const customerLabel = await screen.findByText('Customer');
    expect(customerLabel).toBeInTheDocument();
  });

  test('customer select', async () => {
    render(<ReceivingForm />);
    const customerSelect = await screen.findByText('Select...');
    expect(customerSelect).toBeInTheDocument();
  });

  test('packing slip label', async () => {
    render(<ReceivingForm />);
    const packingSlipLabel = await screen.findByText('Customer Packing Slip');
    expect(packingSlipLabel).toBeInTheDocument();
  });

  test('packing slip field', async () => {
    render(<ReceivingForm />);
    const packingSlipInput = await screen.findByTestId('packing-slip');
    expect(packingSlipInput).toBeInTheDocument();
  });

  test('customer select shows list of customers on click', async () => {
    render(<ReceivingForm />);
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
    expect(screen.queryByText('Part Number')).not.toBeInTheDocument();
    expect(screen.queryByText('Quantity')).not.toBeInTheDocument();
    expect(screen.queryByText('Bins')).not.toBeInTheDocument();
  });

  test('part table fields are visible when customer is selected', async () => {
    render(<ReceivingForm />, { wrapper: MemoryRouter });
    const customerSelect = await screen.findByText('Select...');
    userEvent.click(customerSelect);
    const customer = await screen.findByText('Bob');
    userEvent.click(customer);

    expect(await screen.findAllByText('Part Number')).toHaveLength(2);
    expect(await screen.findAllByText('Quantity')).toHaveLength(2);
    expect(await screen.findAllByText(/Bins/)).toHaveLength(2);
  });
});
