import React from 'react'
import BaseIcon from './BaseIcon';
import { Link } from 'react-router-dom';

const Menu = ({ icon, content, func, link }) => {

  return (
    <div>
      <Link to={link} onClick={func} className="flex items-center gap-2 p-2 hover:bg-[var(--hover-color)] hover:rounded-lg transition duration-150 ease-in-out">
        <BaseIcon icon={icon} background="var(--secondary-color)" />
        <input type="button" value={content} />
      </Link>
    </div>
  )
}

export default Menu;
