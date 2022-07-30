import { NextApiRequest, NextApiResponse } from "next";
import airtable from "../../../API/airtable";

export default async function categories(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const response = await airtable
      .get("/Categories?view=Grid%20view")
      .then((response) => response.data.records)
      .catch((error) => error.response.data);

    res.status(200).json(response);
  } else return res.status(405).json({ msg: "Method not implemented" });
}
