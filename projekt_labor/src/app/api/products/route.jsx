import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const expirationDays = parseInt(searchParams.get('expirationDays')) || 30;

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() - expirationDays);

    let queryArgs = {
      where: {
        date: {
          gte: expirationDate
        }
      },
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
    };

    if (search) {
      queryArgs.where = {
        ...queryArgs.where,
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

    // Keressük meg, hogy létezik-e már a termék ugyanabban a boltban
    const existingProduct = await prisma.products.findFirst({
      where: {
        name: {
          equals: json.product_name,
          mode: 'insensitive'
        },
        prices: {
          some: {
            store_id: json.store_id // Csak akkor találjuk meg, ha ugyanabban a boltban van
          }
        }
      },
      include: {
        prices: {
          include: {
            stores: true
          },
          orderBy: {
            id: 'desc'
          },
          where: {
            store_id: json.store_id // Csak az adott bolt árait kérjük le
          }
        }
      }
    });

    if (existingProduct) {
      // Ha létezik a termék ugyanabban a boltban, frissítjük az árát
      const priceData = {
        product_id: existingProduct.id,
        user_id: json.user.id,
        price: json.price,
        currency: 'HUF',
        store_id: json.store_id,
      };

      // Frissítjük a termék leírását és dátumát is
      const updatedProduct = await prisma.products.update({
        where: {
          id: existingProduct.id
        },
        data: {
          description: json.description || existingProduct.description,
          date: json.longDate
        },
        include: {
          prices: {
            include: {
              stores: true
            },
            orderBy: {
              id: 'desc'
            }
          }
        }
      });

      const newPrice = await prisma.prices.create({
        data: priceData,
        include: {
          stores: true
        }
      });

      return NextResponse.json({ 
        success: true,
        product: updatedProduct,
        newPrice: newPrice,
        message: 'Product updated with new price'
      });
    }

    // Ha nem létezik még a termék az adott boltban, új terméket hozunk létre
    const productData = {
      name: json.product_name,
      date: json.longDate,
      description: json.description,
    };

    const product = await prisma.products.create({
      data: productData,
      include: {
        prices: true
      }
    });

    const priceData = {
      product_id: product.id,
      user_id: json.user.id,
      price: json.price,
      currency: 'HUF',
      store_id: json.store_id,
    };

    const price = await prisma.prices.create({
      data: priceData,
      include: {
        stores: true
      }
    });

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        prices: [price]
      },
      message: 'New product created'
    });

  } catch (e) {
    return NextResponse.json({
      success: false,
      error: e.message
    }, { status: 500 });
  }
}
