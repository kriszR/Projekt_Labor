import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id)
    throw new Error('something went wrong with authentication' + user);

  let dbUser = await prisma.users.findUnique({
    where: { kindeId: user.id },
  });

  if (!dbUser) {
    dbUser = await prisma.users.create({
      data: {
        kindeId: user.id,
        firstName: user.given_name ?? '',
        email: user.email ?? '',
      },
    });

    await prisma.shoppingLists.create({
      data: {
        user_id: dbUser.id,
      },
    });
  }

  return NextResponse.redirect('http://localhost:3000/');
}
