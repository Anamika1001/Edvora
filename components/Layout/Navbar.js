import React from "react";
import Link from "next/link";

export default function Navbar({ user_data }) {
  return (
    <nav className="navbar text-white px-5 bg-black">
      <Link href="/" passHref={true}><h2 className="sfproFont my-auto" role="button">
        Edvora
      </h2></Link>
      <div className="d-flex">
        <p className="text-white m-auto pr-3 interFont" role="button">
          {user_data.name}
        </p>
        <div className="my-auto d-flex" role="button">
          <img
            src={user_data.url}
            alt="Avatar"
            width={25}
            height={25}
            className="rounded-circle"
          />
        </div>
      </div>
    </nav>
  );
}
