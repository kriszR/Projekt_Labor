import { prisma } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) return NextResponse.json(null);

  let dbUser = await prisma.users.findUnique({
    where: { kindeId: user.id },
    include: {
      shoppinglists: true,
    },
  });

  return NextResponse.json(dbUser);
}
