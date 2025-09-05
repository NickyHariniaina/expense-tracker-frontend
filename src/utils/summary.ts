export const getMonthlySummary = async (date: Date) => {
  try {
    const res = await fetch(
      "http://localhost:3000/api/summary/monthly?month=" + date,
      {
        method: "GET",
        credentials: "include",
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAlert = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/summary/alerts", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
