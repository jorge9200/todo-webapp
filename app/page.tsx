import Link from "next/link";

export default function Home() {
  const logged = true;
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">This is a wonderful app made with Next.Js</p>
          <Link href="/login" className="btn btn-primary ">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
