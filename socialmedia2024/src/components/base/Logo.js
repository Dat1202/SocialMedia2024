import React from 'react'
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <>
      <Link to="/">
        <img
          className="w-full bg-cover	object-contain"
          src="/logo192.png"
          alt="logo"
        />
      </Link>
    </>
  );
}

export default Logo;
