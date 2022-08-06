import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders learn react link', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = screen.getByText(/Best Comics of 2022/i);
  expect(linkElement).toBeInTheDocument();
});
