import { getAuthSession } from "@/lib/authOptions";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
