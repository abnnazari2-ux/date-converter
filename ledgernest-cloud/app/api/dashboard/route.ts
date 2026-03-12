import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    income: 124500,
    expenses: 68200,
    grossProfit: 56300,
    netProfit: 44120,
    receivables: 21500,
    payables: 16900
  });
}
