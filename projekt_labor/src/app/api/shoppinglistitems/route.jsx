import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const shopping_list_id = parseInt(searchParams.get('id'));

    const items = await prisma.shoppingListItems.findMany({
      where: {
        shopping_list_id: shopping_list_id,
      },
      include: {
        products: true,
      },
    });

    return NextResponse.json(items);
  } catch (err) {
    throw Error(err);
  }
}

export async function POST(request) {
  try {
    const json = await request.json();

    const existingProduct = await prisma.shoppingListItems.findFirst({
      where: {
        product_id: json.product_id,
      },
    });

    let shoppingListItem;

    if (existingProduct) {
      shoppingListItem = await prisma.shoppingListItems.update({
        where: { id: existingProduct.id },
        data: { quantity: { increment: 1 } },
      });
    } else {
      shoppingListItem = await prisma.shoppingListItems.create({
        data: {
          shopping_list_id: json.shopping_list_id,
          product_id: json.product_id,
          quantity: 1,
        },
      });
    }

    return NextResponse.json(shoppingListItem);
  } catch (e) {
    throw Error(e.message);
  }
}

export async function DELETE(request) {
  try {
    const json = await request.json();

    const shoppingListItem = await prisma.shoppingListItems.delete({
      where: {
        id: json.id,
      },
    });

    return NextResponse.json(shoppingListItem);
  } catch (e) {
    throw Error(e.message);
  }
}
