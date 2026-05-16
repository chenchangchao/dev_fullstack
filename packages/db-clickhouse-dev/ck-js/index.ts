import { createClient } from "@clickhouse/client"; // or '@clickhouse/client-web'
import 'dotenv/config' from 'dotenv';

const client = createClient({
  url: process.env.CK_URL,
  username: process.env.CK_USER,
  password: process.env.CK_PASSWORD,
  database: process.env.CK_DATABASE,
});

const resultSet = await client.query({
  query: "SELECT sum(number) FROM numbers(10)",
  format: "JSONEachRow",
});
const dataset = await resultSet.json(); // or `row.text` to avoid parsing JSON

console.log(dataset);

const resultSet2 = await client.query({
  query: "SHOW DATABASES",
  format: "JSONEachRow",
});
const dataset2 = await resultSet2.json(); // or `row.text` to avoid parsing JSON

console.log(dataset2);
