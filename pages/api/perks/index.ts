import airtable from "../../../API/airtable";

export default async function perks(req: any, res: any) {
  if (req.method === "GET") {
    const response = await airtable
      .get("/Benefits?view=Grid%20view")
      .then((response) => response.data.records)
      .catch((error) => error.response.data);

    res.status(200).json(response);
  } else return res.status(405).json({ msg: "Method not implemented" });
}
