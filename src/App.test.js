import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio introduction and selected projects', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Ideias bem pensadas/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Bloco Santo Pecado/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Clínica Divertin/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Jéssica & Felipe/i })).toBeInTheDocument();
});
