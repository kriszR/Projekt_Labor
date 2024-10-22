import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stores = await prisma.stores.findMany({});
    return NextResponse.json(stores);
  } catch (err) {
    throw Error(err);
  }
}

export async function POST(request) {
  try {
    const json = await request.json();
    const storeData = {
      name: json.store_name,
    };

    const store = await prisma.stores.create({
      data: storeData,
    });

    return NextResponse.json(store);
  } catch (e) {
    throw Error(e.message);
  }
}
