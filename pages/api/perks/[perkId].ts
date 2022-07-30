import airtable from "../../../API/airtable";

export default async function serverSideCall(req: any, res: any) {
  const {
    method,
    query: { perkId },
    body,
  } = req;

  if (method === "GET") {
    const response = await airtable
      .get(`/Benefits/${perkId}`)
      .then((response) => response.data)
      .catch((error) => error.response.data);

    res.status(200).json(response);
  } else if (method === "PATCH") {
    const payload = {
      fields: {
        ...(body.views && { Views: body.views }),
        ...(body.uses && { Uses: body.uses }),
      },
    };

    const response = await airtable
      .patch(`/Benefits/${perkId}`, payload)
      .then((response) => response.data)
      .catch((error) => error.response.data);

    res.status(200).json(response);
  } else return res.status(405).json({ msg: "Method not implemented" });
}
