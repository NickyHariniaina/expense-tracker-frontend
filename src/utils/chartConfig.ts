import type { MonthlySummary } from '../types/summary';

//types of configuration graphic
export interface chartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
    borderColor?: string[];
    borderWidth?: number;
  }
}

// reusable colors
export const CHART_COLORS = {
  primary: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'],
  income: '#4BC0C0',
  expense: '#FF6384',
  balance: '#36A2EB',
};
