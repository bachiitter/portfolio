import { Text } from "reshaped";

export default function Home() {
  return (
    <main className="flex flex-col gap-6">
      <section className="flex flex-col">
        <Text as="h1" variant="title-6" className="!font-extrabold">
          Bachitter
        </Text>
        <Text as="p" color="neutral-faded">
          Product Engineer
        </Text>
      </section>
    </main>
  );
}
