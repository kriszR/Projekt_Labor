import {prisma} from "@/lib/prisma";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {NextResponse} from "next/server";

export async function GET() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user || user == null || !user.id)
        throw new Error("something went wrong with authentication" + user);

    let dbUser = await prisma.users.findUnique({
        where: {kindeId: user.id}
    });

    if (!dbUser) {
        dbUser = await prisma.users.create({
            data: {
                kindeId: user.id,
                email: user.email ?? "" // Using nullish coalescing operator to provide a default empty string value
            }
        });
    }
    return NextResponse.redirect("http://localhost:3000/");
}