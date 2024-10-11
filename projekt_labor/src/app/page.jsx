import SearchBar from "@/components/SearchBar";
import { Calendar } from "@/components/ui/calendar";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  const users = await prisma.users.findMany();

  return (
    <main>
      <SearchBar />
      <div>
        {users.map((user, index) => (
          <div key={index}>
            <h3>{user.username}</h3>
          </div>
        ))}
      </div>
      <Calendar mode="single" />
    </main>
  );
}
