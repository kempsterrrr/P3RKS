export default async function serverSideCall(req: any, res: any) {
  const response = await fetch(
    "https://api.airtable.com/v0/app9RFFTGwB7lUyRX/Benefits?maxRecords=3&view=Grid%20view",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        Accept: "application/json",
      },
    }
  );

  const jsonData = await response.json();
  res.status(200).json(jsonData.records);
}
