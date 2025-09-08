export const createCategory = async (name: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/categories", {
      method: "POST",
      body: JSON.stringify({
        name: name,
      }),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    // CATCH ERRORS HERE RELATED TO CODE STATUS
    //
    //
  } catch (error) {
    console.log(error);
  }
};

export const renameCategory = async (id: number, name: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/categories/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const res = await fetch("http://localhost:3000/api/categories/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
  }
};
