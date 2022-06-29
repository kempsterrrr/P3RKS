import Airtable from "airtable";
import { recoverAddress } from "ethers/lib/utils";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  `${process.env.AIRTABLE_BASE_ID}`
);

const table = base("Categories");

const getMinifiedRecords = (records) => {
  return records.map((record) => minifyRecord(record));
};

const minifyRecord = (record) => {
  return {
    id: record.id,
    fields: record.fields,
  };
};

export default async function getCategories() {
  const records = await table.select({}).all();
  const minifiedRecords = getMinifiedRecords(records);

  return minifiedRecords;
}
