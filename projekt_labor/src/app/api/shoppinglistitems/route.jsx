import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const shopping_list_id = parseInt(searchParams.get('id'));

    if (!shopping_list_id) {
      return NextResponse.json([], { status: 200 });
    }

    const items = await prisma.shoppingListItems.findMany({
      where: {
        shopping_list_id: shopping_list_id,
      },
      include: {
        products: {
          include: {
            prices: {
              include: {
                stores: true,
              },
              orderBy: {
                id: 'desc'
              }
            },
          },
        },
      },
    });

    return NextResponse.json(items || []);
  } catch (err) {
    console.error('Shopping list GET error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const json = await request.json();

    // Keressük meg az összes azonos nevű terméket
    const currentProduct = await prisma.products.findUnique({
      where: { id: json.product_id },
      include: {
        prices: {
          include: {
            stores: true,
          },
          orderBy: {
            id: 'desc',
          },
        },
      },
    });

    if (!currentProduct) {
      throw new Error('Product not found');
    }

    // Keressük meg az összes azonos nevű terméket
    const similarProducts = await prisma.products.findMany({
      where: {
        name: {
          equals: currentProduct.name,
          mode: 'insensitive'
        },
        NOT: {
          id: currentProduct.id
        }
      },
      include: {
        prices: {
          include: {
            stores: true,
          },
          orderBy: {
            id: 'desc',
          },
        },
      },
    });

    // Gyűjtsük össze az összes árat az összes termékből
    const allPrices = [
      ...currentProduct.prices,
      ...similarProducts.flatMap(p => p.prices)
    ];

    // Csoportosítsuk a legfrissebb árakat boltonként
    const latestPricesByStore = allPrices.reduce((acc, price) => {
      const key = price.stores.name;
      if (!acc[key] || acc[key].id < price.id) {
        acc[key] = price;
      }
      return acc;
    }, {});

    // Keressük meg az aktuális bolt árát
    const currentStorePrice = Object.values(latestPricesByStore).find(
      price => price.store_id === parseInt(json.store_id)
    );

    if (!currentStorePrice) {
      throw new Error('Current store price not found');
    }

    // Keressük meg az olcsóbb alternatívákat
    const cheaperOptions = Object.values(latestPricesByStore)
      .filter(price => 
        price.store_id !== parseInt(json.store_id) && 
        price.price < currentStorePrice.price
      )
      .map(price => ({
        store: price.stores.name,
        price: price.price,
        saving: currentStorePrice.price - price.price
      }));

    // Létező termék ellenőrzése a bevásárlólistában
    const existingProduct = await prisma.shoppingListItems.findFirst({
      where: {
        product_id: json.product_id,
        shopping_list_id: json.shopping_list_id,
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

    return NextResponse.json({
      item: shoppingListItem,
      cheaperOptions: cheaperOptions.length > 0 ? cheaperOptions : null
    });
  } catch (e) {
    console.error('Shopping list item error:', e);
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request) {
  try {
    const json = await request.json();
    
    if (!json.id) {
      return NextResponse.json(
        { error: 'Missing item id' },
        { status: 400 }
      );
    }

    const deletedItem = await prisma.shoppingListItems.delete({
      where: {
        id: json.id,
      },
    });

    return NextResponse.json(deletedItem);
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}