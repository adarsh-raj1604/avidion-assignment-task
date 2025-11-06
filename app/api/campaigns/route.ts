import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "campaigns.json");

async function loadAll() {
  const data = await readFile(filePath, "utf8").catch(() => "[]");
  return JSON.parse(data || "[]");
}

async function saveAll(rows: any[]) {
  await writeFile(filePath, JSON.stringify(rows, null, 2));
}

export async function GET() {
  const rows = await loadAll();
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  let rows = await loadAll();

  const newCampaign = {
    id: Date.now(),
    name: body.name,
    status: body.status,
    type: body.type,
    desc: body.desc,
    created: new Date().toISOString().split("T")[0],
  };

  rows.push(newCampaign);
  await saveAll(rows);

  return NextResponse.json(newCampaign, { status: 201 });
}
