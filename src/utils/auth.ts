import toast from "react-hot-toast";
import { useUserStore } from "../store/user";

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 200) {
      toast.success("User logged in successfully.");
      return { success: true, status: res.status };
    } else if (res.status === 404) {
      toast.error("User not found.");
      return { success: false, status: res.status };
    } else if (res.status === 401) {
      toast.error("Password doesn't match.");
      return { success: false, status: res.status };
    } else if (res.status === 500) {
      toast.error("Internal Server Error.");
      return { success: false, status: res.status };
    } else {
      toast.error("Unexpected error.");
      return { success: false, status: res.status };
    }
  } catch (error) {
    console.error(error);
    toast.error("Network error.");
    return { success: false, status: 0 };
  }
};

export const signup = async (email: string, password: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 201) {
      toast.success("User created successfully.");
      window.location.href = "/dashboard";
    } else if (res.status === 409) {
      toast.error("You cannot create account twice.");
    } else if (res.status === 500) {
      toast.error("Internal Server Error.");
    } else {
      toast.error("Unexpected error.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Network error.");
  }
};

export const refresh = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/refresh", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });

    if (res.status === 200) {
      console.log("Access token refreshed");
    } else if (res.status === 401) {
      console.log("No refresh token");
    } else if (res.status === 500) {
      console.log("Internal Server Error");
    } else {
      console.log("Unexpected error");
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });

    const { resetUserStore } = useUserStore.getState();
    if (res.status === 200) {
      resetUserStore();
      toast.success("User logged out successfully.");
    } else if (res.status === 500) {
      toast.error("Internal Server Error");
    }
  } catch (error) {
    toast.error("Network Error.");
    console.log(error);
  }
};
