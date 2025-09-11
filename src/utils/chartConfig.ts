// Chart configurations
export const getPieData = (summary: any) => {
  return {
    labels: summary?.expensesByCategory ? Object.keys(summary.expensesByCategory) : [],
    datasets: [
      {
        data: summary?.expensesByCategory ? Object.values(summary.expensesByCategory) : [],
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
          '#9966FF', '#FF9F40', '#C9CBCF', '#FF6384'
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };
};

export const getBarData = (summary: any) => {
  return {
    labels: summary?.monthlyTrend ? summary.monthlyTrend.map((item: any) => item.month) : [],
    datasets: [
      {
        label: 'Income',
        data: summary?.monthlyTrend ? summary.monthlyTrend.map((item: any) => item.income) : [],
        backgroundColor: '#4BC0C0',
      },
      {
        label: 'Expenses',
        data: summary?.monthlyTrend ? summary.monthlyTrend.map((item: any) => item.expense) : [],
        backgroundColor: '#FF6384',
      },
    ],
  };
};

export const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

export const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Amount (€)',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Months',
      },
    },
  },
};
