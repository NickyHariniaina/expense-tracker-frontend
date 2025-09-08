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
      console.log("logged in");
    } else if (res.status === 404) {
      console.log("User not found");
    }
  } catch (error) {
    console.log(error);
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
      console.log("user created");
    } else if (res.status === 409) {
      console.log("User already exist");
    } else if (res.status === 500) {
      console.log("Server Error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const refresh = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/refresh", {
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
