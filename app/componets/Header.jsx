import Link from "next/link";

export default function Header() {
  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: "#ddd" }}>
        <div className="container">
          <Link
            href={"/"}
            className="navbar-brand"
            style={{ fontWeight: "500", fontSize: "25px" }}
          >
            Task Management
          </Link>
          <Link
            href={"/login"}
            className="btn btn-dark"
            type="submit"
            style={{ borderRadius: "0" }}
          >
            Log in
          </Link>
        </div>
      </nav>
    </div>
  );
}
