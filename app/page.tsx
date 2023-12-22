import ToDos from "./components/ToDos";

export default function Home() {
  const logged = true;
  return (
    <main className="max-w-4xl mx-auto mt-4">{logged ? <ToDos /> : <></>}</main>
  );
}
