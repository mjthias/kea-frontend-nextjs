import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateStaticParams() {
  const res = await fetch("https://nice-dogs.vercel.app/api/dogs");
  const pages = await res.json();

  const paths = pages.map((page) => {
    return { slug: page.slug };
  });

  return paths;
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const url = `https://nice-dogs.vercel.app/api/dogs?slug=${slug}`;
  const res = await fetch(url);
  if (res.status !== 200) return notFound();
  const data = await res.json();

  return {
    title: data.name,
    description: `Here is ${data.name}`,
  };
}

export default async function DogPage({ params }) {
  const { slug } = params;

  const url = `https://nice-dogs.vercel.app/api/dogs?slug=${slug}`;
  const res = await fetch(url);

  // No dog in API - return 404
  if (res.status !== 200) return notFound();

  // Succes
  const data = await res.json();
  const { name, favouriteColor, age, image } = data;

  return (
    <main className="md:flex max-w-7xl mx-auto">
      <Image
        src={image.url}
        alt="A cute dog"
        width={image.width}
        height={image.height}
        priority={true}
        className="w-full md:w-1/2 xl:w-[600px]"
        sizes="(max-width: 768px) 100vw,
         (max-width: 1280px) 50vw,
         600px"
      />
      <div>
        <h1>{name}</h1>
        <p>
          {name} is {age} {age == "1" ? "year" : "years"} old
        </p>
        {favouriteColor && (
          <p>
            {name} likes {favouriteColor}
          </p>
        )}
      </div>
    </main>
  );
}
