import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './footer';

test('renders footer text', () => {
  render(<Footer />);
  const footerElement = screen.getByText(/clearpoint.digital/i);
  expect(footerElement).toBeInTheDocument();
});