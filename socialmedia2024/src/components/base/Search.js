import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Search = () => {
  return (
    <>
      <FontAwesomeIcon
        className="text-slate-400 group-hover:text-slate-400 group-focus:text-slate-600 absolute left-2 top-1/2 transform -translate-y-1/2"
        icon={faMagnifyingGlass}
      />
      <input
        style={{ background: "var(--secondary-color)" }}
        type="text"
        className="group-hover:border focus:border-neutral-400 focus:border focus:outline-none w-64 rounded-full p-2 pl-8"
      />
    </>
  );
};

export default Search;
