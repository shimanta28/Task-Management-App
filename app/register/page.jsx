"use client";
import Link from "next/link";
import "./register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { ref, set } from "firebase/database";

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password } = e.target.elements;

    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);

        set(ref(db, "users/" + user.uid), {
          username: username.value,
          email: email.value,
          id: user.uid,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "80vh" }}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <h5 className="text-center">Register</h5>
        </div>
        <div className="my-4">
          <input
            type="text"
            className="form-control"
            id="exampleInputUserName1"
            aria-describedby="emailHelp"
            placeholder="Username"
            name="username"
          />
        </div>

        <div className="mb-4">
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
          Sign up
        </button>

        <div className="mt-3">
          Already have an account?
          <Link
            href={"/login"}
            className="ms-2"
            style={{
              color: "black",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
