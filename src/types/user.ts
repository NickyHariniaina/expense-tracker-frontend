export interface UserData {
  email: string;
  startDate: Date;
}

export interface UserExpense {
  id: number;
  name: string | null;
  description: string;
  amount: number;
  type: boolean;
  date: Date;
  startDate: Date | null;
  endDate: Date | null;
  receipt: string | null;
  userId: number;
  categoryId: number;
}

export interface UserIncome {
  id: number;
  amount: number;
  date: Date;
  source: string;
  description: string;
  creationDate: Date;
  userId: number;
}

export interface UserCategory {
  id: number;
  name: string;
  userId: number;
}
