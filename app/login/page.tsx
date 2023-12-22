"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    await removeAllToDos();

    router.push("/todo");
  };

  const removeAllToDos = async () => {
    await fetch("http://localhost:3000/api/todo", {
      method: "DELETE",
      body: JSON.stringify({}),
    });
  };

  return (
    <section className="flex flex-col justify-center items-center p-8 rounded-md">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your email?</span>
          </div>
          <input
            type="email"
            placeholder="test@test.com"
            name="email"
            className="input input-bordered w-full max-w-xs input-sm mb-2"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your password?</span>
          </div>
          <input
            type="password"
            placeholder="your password..."
            name="password"
            className="input input-bordered w-full max-w-xs input-sm mb-4"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button type="submit" className="btn btn-primary btn-sm">
          Login
        </button>
      </form>

      {errors.length > 0 && (
        <section role="alert" className="alert alert-error mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <ul className="mb-0">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
};
export default LoginPage;
