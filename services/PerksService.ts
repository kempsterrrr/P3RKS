import perks from "../API/perks";

export const getPerks = async () => {
  const response = perks
    .get("/perks")
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return response;
};

export const incrementPerkView = async (perkId, views) => {
  const body = {
    views,
  };

  const response = await perks
    .patch(`/perks/${perkId}`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return response;
};

export const getPerk = async (perkId) => {
  const response = perks
    .get(`/perks/${perkId}`)
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return response;
};

export const incrementPerkUse = async (perkId, uses) => {
  const body = {
    uses,
  };

  const response = await perks
    .patch(`/perks/${perkId}`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return response;
};
