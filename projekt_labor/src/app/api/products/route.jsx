import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    let queryArgs = {
      include: {
        prices: {
          include: {
            stores: true,
          },
        },
      },
    };

    if (search) {
      queryArgs.where = {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    const products = await prisma.products.findMany(queryArgs);

    return NextResponse.json(products);
  } catch (err) {
    throw Error(err);
  }
}

export async function POST(request) {
  try {
    const json = await request.json();

    const productData = {
      name: json.product_name,
      date: json.longDate,
      description: json.description,
    };

    const product = await prisma.products.create({
      data: productData,
    });

    const priceData = {
      product_id: product.id,
      user_id: json.user.id,
      price: json.price,
      currency: 'HUF',
      store_id: json.store_id,
    };

    await prisma.prices.create({
      data: priceData,
    });

    return NextResponse.json(product);
  } catch (e) {
    throw Error(e.message);
  }
}
