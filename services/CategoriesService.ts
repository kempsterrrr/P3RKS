import perks from "../API/perks";

export const getCategories = async () => {
  const response = perks
    .get("/categories")
    .then((response) => response.data)
    .catch((error) => error.response.data);
  return response;
};
