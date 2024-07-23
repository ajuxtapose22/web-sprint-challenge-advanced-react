import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppFunctional from './AppFunctional';

test('sanity', () => {
  expect(true).toBe(true);
});

test('renders visible texts', () => {
  render(<AppFunctional />);
  expect(screen.getByText('Coordinates')).toBeInTheDocument();
  expect(screen.getByText(/You moved 0 times/)).toBeInTheDocument();
  expect(screen.getByText(/LEFT/)).toBeInTheDocument();
  expect(screen.getByText(/UP/)).toBeInTheDocument();
  expect(screen.getByText(/RIGHT/)).toBeInTheDocument();
  expect(screen.getByText(/DOWN/)).toBeInTheDocument();
  expect(screen.getByText(/reset/)).toBeInTheDocument();
});

test('typing in the input changes its value', () => {
  render(<AppFunctional />);
  const input = screen.getByPlaceholderText("type email");
  fireEvent.change(input, { target: { value: 'test@tester.com' } });
  expect(input.value).toBe('test@tester.com');
});

test('form submission with email', async () => {
  render(<AppFunctional />);
  const input = screen.getByPlaceholderText("type email")
  fireEvent.change(input)
});

test('B is in the correct initial position', () => {
  render(<AppFunctional />);
  const activeSquare = screen.getByText('B')
  expect(activeSquare).toHaveClass('square active');
});

test('B moves left when LEFT button is clicked', () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByText("LEFT"));
  const activeSquare = screen.getByText('B')
  expect(activeSquare).toHaveClass('active');
  expect(screen.getByText("Coordinates (1, 2)")).toBeInTheDocument();
});
