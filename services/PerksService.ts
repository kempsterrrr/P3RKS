import airtable from "../API/airtable";

export const getPerks = async () => {
  const response = airtable
    .get("/Benefits?view=Grid%20view")
    .then((response) => response.data.records)
    .catch((error) => error.response.data);

  return response;
};

export const incrementPerkView = async ({ perkId, views }: any) => {
  const body = {
    fields: {
      Views: views,
    },
  };

  const response = await airtable
    .patch(`/Benefits/${perkId}`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return response;
};

export const getPerk = async (perkId: any) => {
  const response = airtable
    .get(`/Benefits/${perkId}`)
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return response;
};

export const incrementPerkUse = async ({ perkId, uses }: any) => {
  const body = {
    fields: {
      Uses: uses,
    },
  };

  const response = await airtable
    .patch(`/Benefits/${perkId}`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return response;
};
