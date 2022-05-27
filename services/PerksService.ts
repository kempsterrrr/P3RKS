import airtable from "../API/airtable";

export const getPerks = async () => {
  const response = airtable
    .get("/Benefits?view=Grid%20view")
    .then((response) => response.data.records)
    .catch((error) => error.response.data);

  return response;
};

export const incrementPerkView = async ({ perkId, views }) => {
  const body = {
    fields: {
      Views: views,
    },
  };

  const response = await airtable
    .patch(`Benefits/${perkId}`, body)
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return response;
};
