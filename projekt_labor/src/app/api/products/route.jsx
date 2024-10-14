import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await prisma.products.findMany();
  return NextResponse.json(products);
}

export async function POST(request) {
  try {
    // { name, category, description, price, shop }
    const json = await request.json();

    const productData = {
      name: json.name,
      category: json.category,
      description: json.description,
    };

    const product = await prisma.products.create({
      data: productData,
    });

    const priceData = {
      product_id: product.id,
      price: json.price,
      currency: 'HUF',
      store: json.store,
    };

    const price = await prisma.prices.create({
      data: priceData,
    });

    return NextResponse.json(product);
  } catch (e) {
    throw Error(e.message);
  }
}
