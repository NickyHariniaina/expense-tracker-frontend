export interface UserData {
  email: string;
  start_date: Date;
}

export interface UserExpense {
  id: number;
  description: string;
  amount: number;
  type: boolean; // false = Onetime, true = Recurring
  date: Date | null;       // utilisé seulement si type === false
  start_date: Date | null; // utilisé seulement si type === true
  end_date: Date | null;   // utilisé seulement si type === true
  receipt: string | null;  // URL du reçu
  user_id: number;
  category_id: number;
  creation_date: Date;     // Changé de creationDate à creation_date
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