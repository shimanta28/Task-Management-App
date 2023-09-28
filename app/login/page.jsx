"use client";
import Link from "next/link";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;

    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center form"
      style={{ height: "80vh" }}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <h5 className="text-center">Login</h5>
        </div>
        <div className="my-4">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            name="email"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-dark mt-2">
          Sign in
        </button>

        <div className="mt-3">
          Don't have an account?
          <Link
            href={"/register"}
            className="ms-2"
            style={{
              color: "black",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
