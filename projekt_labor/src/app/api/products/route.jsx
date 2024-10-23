import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    let products;
    if (search) {
      products = await prisma.products.findMany({
        where: {
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
        },
        include: {
          prices: {
            include: {
              stores: true,
            },
          },
        },
      });
    } else {
      products = await prisma.products.findMany({
        include: {
          prices: {
            include: {
              stores: true,
            },
          },
        },
      });
    }

    return NextResponse.json(products);
  } catch (err) {
    throw Error(err);
  }
}

export async function POST(request) {
  try {
    // { name, category, description, price, shop }
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
      price: json.price,
      currency: 'HUF',
      store_id: json.store_id,
    };

    const price = await prisma.prices.create({
      data: priceData,
    });

    return NextResponse.json(product);
  } catch (e) {
    throw Error(e.message);
  }
}
