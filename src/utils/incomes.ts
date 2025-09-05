export const createIncome = async (
  amount: number,
  date: Date,
  source: string,
  description: string | null,
) => {
  try {
    const res = await fetch("http://localhost:3000/api/incomes", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
        date: date,
        source: source,
        description: description,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    // CAN YOU PLEASE VERIFY EACH CASE WITH res.status ?
  } catch (error) {
    console.log(error);
  }
};
