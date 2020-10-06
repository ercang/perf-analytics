import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
