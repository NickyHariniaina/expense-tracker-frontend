export interface UserData {
  email: string;
  start_date: Date;
}

export interface UserExpense {
  id: number;
  name: string | null;
  description: string;
  amount: number;
  type: boolean;
  date: Date;
  start_date: Date | null;
  end_date: Date | null;
  receipt: string | null;
  user_id: number;
  category_id: number;
}

export interface UserIncome {
  id: number;
  amount: number;
  date: Date;
  source: string;
  description: string;
  creation_date: Date;
  user_id: number;
}

export interface UserCategory {
  id: number;
  name: string;
  user_id: number;
}

export interface UserSummary {
  expense: number | null;
  income: number | null;
  balance: number | null;
}
