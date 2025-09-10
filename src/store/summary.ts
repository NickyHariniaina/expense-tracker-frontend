export interface MonthlySummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  expensesByCategory: { [key: string]: number };
  monthlyTrend: { month: string; income: number; expense: number }[];
}
