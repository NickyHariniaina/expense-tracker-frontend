import type { ChartData } from 'chart.js';
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

export const getDoughnutData = (summary: MonthlySummary | null): ChartData => {
  return {
    labels: summary ? Object.keys(summary.expensesByCategory) : [],
    datasets: [
      {
        data: summary ? Object.values(summary.expensesByCategory) : [],
        backgroundColor: CHART_COLORS.primary,
        hoverBackgroundColor: CHART_COLORS.primary,
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };
};

export const getBarData = (summary: MonthlySummary | null): ChartData => {
  return {
    labels: ['Revenus', 'Dépenses', 'Balance'],
    datasets: [
      {
        data: summary ? [summary.totalIncome, summary.totalExpense, summary.balance] : [0, 0, 0],
        backgroundColor: [CHART_COLORS.income, CHART_COLORS.expense, CHART_COLORS.balance],
        hoverBackgroundColor: [CHART_COLORS.income, CHART_COLORS.expense, CHART_COLORS.balance],
        borderWidth: 1,
      },
    ],
  };
};

// Configuration for graphical tendance
export const getLineData = (summary: MonthlySummary | null) => {
  if (!summary?.monthlyTrend) {
    return {
      labels: [],
      datasets: [],
    };
  }

  return {
    labels: summary.monthlyTrend.map(item => item.month),
    datasets: [
      {
        label: 'Revenus',
        data: summary.monthlyTrend.map(item => item.income),
        borderColor: CHART_COLORS.income,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
      {
        label: 'Dépenses',
        data: summary.monthlyTrend.map(item => item.expense),
        borderColor: CHART_COLORS.expense,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
      },
    ],
  };
};

// Common options for all charts
export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return `${context.label}: ${context.raw.toFixed(2)} €`;
        }
      }
    }
  },
};
