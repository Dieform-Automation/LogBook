import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { MemoryRouter } from 'react-router-dom';

test('dropdown is hidden by default', () => {
  const { container } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  const dropdown = container.querySelector('#dropdown');
  expect(dropdown).toHaveClass('hidden');
});

test('dropdown opens when menu item is clicked', () => {
  const { container } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  const dropdownButton = container.querySelector('#dropdown-button');
  const dropdown = container.querySelector('#dropdown');
  // Open dropdown
  fireEvent.click(dropdownButton);
  expect(dropdown).toHaveClass('block');
});

test('dropdown closes when menu item is clicked', () => {
  const { container } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  const dropdownButton = container.querySelector('#dropdown-button');
  const dropdown = container.querySelector('#dropdown');
  // Open dropdown
  fireEvent.click(dropdownButton);
  expect(dropdown).toHaveClass('block');
  // Close dropdown
  fireEvent.click(dropdownButton);
  expect(dropdown).toHaveClass('hidden');
});

test('dropdown closes when overlay button is clicked', () => {
  const { container } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  const dropdownButton = container.querySelector('#dropdown-button');
  const overlayButton = container.querySelector('#overlay-button');
  const dropdown = container.querySelector('#dropdown');
  // Open dropdown
  fireEvent.click(dropdownButton);
  expect(dropdown).toHaveClass('block');
  // Close dropdown
  fireEvent.click(overlayButton);
  expect(dropdown).toHaveClass('hidden');
});
