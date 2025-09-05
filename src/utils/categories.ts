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
