import toast from "react-hot-toast";

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (res.status === 200) {
      toast.success("User logged in successfully.");
    } else if (res.status === 404) {
      toast.success("This user doesn't exist.");
    }
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while processing.");
  }
};

export const signup = async (email: string, password: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (res.status === 200) {
      toast.success("User created successfully");
    } else if (res.status === 409) {
      toast.error("This user already exists.");
    } else if (res.status === 500) {
      toast.error("Internal Server Error");
    }
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while processing.");
  }
};

export const refresh = async () => {
  try {
    const res = await fetch("http://loclahost:3000/api/auth/refresh", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (res.status === 401) {
      console.log("No refresh token");
    } else if (res.status === 200) {
      console.log("Refresh did work");
    } else if (res.status === 500) {
      console.log("Internal Server Error");
    }
  } catch (error) {
    console.log(error);
  }
};
