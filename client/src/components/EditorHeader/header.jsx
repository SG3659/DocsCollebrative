import React from "react";
import { useNavigate } from "react-router-dom";

const header = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex item-center  p-2 w-full z-20 fixed top-0  bg-white gap-1 shadow-2xl">
        <div>
          <img
          className="w-8 h-10 cursor-pointer "
          
            onClick={() => navigate("/")}
            src="data:image/jpeg;base64,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"
          />
        </div>
        <div className=" flex flex-col">
        <h1 className="font-light text-lg font-google ">Docs</h1>
        <ul className="flex gap-1 text-sm ">
            <li>File</li>
            <li>Insert</li>
            <li>View</li>
          </ul>
        </div>
      </nav>
      <div>{children}</div>
    </>
  );
};

export default header;
