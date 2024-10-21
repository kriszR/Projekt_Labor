import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const items = await prisma.shoppingListItems.findMany({
      where: {
        shopping_list_id: 1,
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
    const data = {
      shopping_list_id: 1,
      product_id: json.product_id,
    };

    const shoppingListItem = await prisma.shoppingListItems.create({
      data: data,
    });

    return NextResponse.json(shoppingListItem);
  } catch (e) {
    throw Error(e.message);
  }
}

export async function DELETE(request) {
  try {
    const json = await request.json();

    console.log(json)
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
