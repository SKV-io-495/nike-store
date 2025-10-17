// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // You could add checks here later (e.g., database connection) if needed
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}