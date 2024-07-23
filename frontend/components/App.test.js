import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppFunctional from './AppFunctional'; // Adjust the path according to your file structure

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true);
});

test('renders visible texts', () => {
  render(<AppFunctional />);
  expect(screen.getByText(/Coordinates/)).toBeInTheDocument();
  expect(screen.getByText(/You moved 0 times/)).toBeInTheDocument();

  expect(screen.getByText(/LEFT/)).toBeInTheDocument();
  expect(screen.getByText(/UP/)).toBeInTheDocument();
  expect(screen.getByText(/RIGHT/)).toBeInTheDocument();
  expect(screen.getByText(/DOWN/)).toBeInTheDocument();
  expect(screen.getByText(/reset/)).toBeInTheDocument();
});

test('typing in the input changes its value', () => {
  render(<AppFunctional />);
  const input = screen.getByPlaceholderText(/type email/);
  
  fireEvent.change(input, { target: { value: 'test@tester.com' } });
  
  expect(input.value).toBe('test@tester.com');
});


// FAILED EXPECTED: "" 
test('form submission with email', () => {
  render(<AppFunctional />);

  const input = screen.getByPlaceholderText(/type email/);
  fireEvent.change(input, { target: { value: 'aaronjardin@example.com' } });
  const submitButton = screen.getByTestId('submit');
  fireEvent.click(submitButton);

  expect(input.value).toBe('aaronjardin@example.com');
});



// FAILED Expected the elment ot have class: active
test('B is in the correct initial position', () => {
  render(<AppFunctional />);

  // Select the active square
  const activeSquare = screen.getByText('B').parentElement;

  // Verify the active class
  expect(activeSquare).toHaveClass('active');
});



// FAILED Expected: active
test('B moves left when LEFT button is clicked', () => {
  render(<AppFunctional />);
  
  // Click the LEFT button
  fireEvent.click(screen.getByText(/LEFT/));

  // Verify the new position of B - 
  const activeSquare = screen.getByText('B').parentElement;
  expect(activeSquare).toHaveClass('active');
  expect(screen.getByText(/Coordinates \(2, 2\)/)).toBeInTheDocument();
});
