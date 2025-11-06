import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "campaigns.json");

// ✅ Load all campaigns
async function loadAll() {
  const data = await readFile(filePath, "utf8");
  return data ? JSON.parse(data) : [];
}

// ✅ Save all campaigns
async function saveAll(rows: any[]) {
  await writeFile(filePath, JSON.stringify(rows, null, 2));
}

// ✅ GET /api/campaigns/[id]
export async function GET(req: Request, context: any) {
  const params = await context.params;     // ✅ FIX: unwrap params
  const id = Number(params.id);            // ✅ FIX: safe number conversion

  const rows = await loadAll();
  const campaign = rows.find((c: any) => c.id === id);

  if (!campaign) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(campaign);
}

// ✅ PATCH /api/campaigns/[id]
export async function PATCH(req: Request, context: any) {
  const params = await context.params; // ✅ FIX
  const id = Number(params.id);

  const body = await req.json();

  let rows = await loadAll();
  const index = rows.findIndex((c: any) => c.id === id);

  if (index === -1) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  rows[index] = { ...rows[index], ...body };
  await saveAll(rows);

  return NextResponse.json(rows[index]);
}

// ✅ DELETE /api/campaigns/[id]
export async function DELETE(req: Request, context: any) {
  const params = await context.params;  // ✅ FIX
  const id = Number(params.id);

  let rows = await loadAll();
  const filtered = rows.filter((c: any) => c.id !== id);

  await saveAll(filtered);

  return NextResponse.json({ message: "Deleted", id });
}
