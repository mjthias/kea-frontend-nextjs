async function getHenry() {
  const res = await fetch("https://nice-dogs.vercel.app/api/dogs?slug=henry");
  return await res.json();
}

export default async function HenryPage() {
  const data = await getHenry();
  console.log(data);

  return (
    <main>
      <h1>{data.name}</h1>
    </main>
  );
}
