import React from 'react';
import { render } from '@testing-library/react';
import ReportLineChart from '../components/ReportLineChart';

jest.mock('react-chartjs-2', () => ({
  Line: (props) => (<div>{props.data.datasets[0].data}</div>)
}));

const report = [{performanceData: {ttfb: [0,1,2,3]}}]

test('renders learn react link', () => {
  const { getByText } = render(<ReportLineChart reportKey={"ttfb"} report={report} />);
  const linkElement = getByText(/0123/i);
  expect(linkElement).toBeInTheDocument();
  expect(true).toBe(true);
});
