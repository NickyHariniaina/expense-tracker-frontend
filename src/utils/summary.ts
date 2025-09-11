import toast from "react-hot-toast";

export const getMonthlySummary = async (date: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/summary/monthly?month=${date}`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    if (res.status === 200) {
      toast.success("Monthly summary retrieved 📅", { id: "summary" });

      const data = await res.json();
      return data;
    } else if (res.status === 401) {
      toast.error("Unauthorized 🚫");
    } else if (res.status === 500) {
      toast.error("Internal Server Error 💥");
    } else {
      toast.error(`Unexpected status: ${res.status}`);
    }
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
    toast.error(data.message, {
      id: "alert",
    });
  } catch (error) {
    console.log(error);
  }
};
