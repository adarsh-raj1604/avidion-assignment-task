import { promises as fs } from "fs";
import path from "path";

const file = path.join(process.cwd(), "data", "campaigns.json");

export async function getAll() {
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data);
}

export async function saveAll(campaigns: any[]) {
  await fs.writeFile(file, JSON.stringify(campaigns, null, 2));
}

export async function nextId() {
  const rows = await getAll();
  return rows.length ? Math.max(...rows.map((x: any) => x.id)) + 1 : 1;
}
