import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await prisma.products.findMany();
  return NextResponse.json(products);
}

export async function POST(request) {
  try {
    const json = await request.json();

    const user = await prisma.products.create({
      data: json,
    });

    return NextResponse.json(user);
  } catch (e) {
    throw Error("Can't insert into Products, try again!");
  }
}
