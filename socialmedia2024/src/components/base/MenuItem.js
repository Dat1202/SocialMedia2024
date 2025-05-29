import React from 'react'
import BaseIcon from './BaseIcon';
import { Link } from 'react-router-dom';

const MenuItem = ({ icon, content, func, link }) => {

  return (
    <Link to={link} onClick={func} role="menuitem" tabIndex={0}
      className="flex items-center gap-2 p-2 hover:bg-[var(--hover-color)]
        hover:rounded-lg transition duration-150 ease-in-out">
      <BaseIcon icon={icon} background="var(--secondary-color)" />
      <span className="cursor-pointer select-none">{content}</span>
    </Link>
  )
}

export default MenuItem;
