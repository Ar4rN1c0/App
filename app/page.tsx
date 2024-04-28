import { getServerSession } from "next-auth";
import getUserInfo from "@/Actions/getUserInfo";

export default async function Home() {
  const user = await getUserInfo()
  return (
    <main>

      <h1>Users</h1>
      <section>
        E
      </section>
    </main>
  );
}
