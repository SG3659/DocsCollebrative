import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
const Card = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [docName, setDocName] = useState(" ");
  const id = uuidV4();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (docName.trim()) {
      localStorage.setItem(`document-name-for-${id}`, docName);
      navigate(`/document/${id}`); // Navigate after form submission
    } else {
      alert("Document name cannot be empty!");
    }
  };

  return (
    <>
      <div className=" flex flex-wrap justify-center  items-center gap-2">
        <div
          onClick={() => setToggle(!toggle)}
          className=" bg-white w-40 h-52 flex justify-center items-center rounded-md  hover:border-blue-600 cursor-pointer"
        >
          <TbPlus fontSize={50} />
        </div>

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          }  absolute top-60  h-56 rounded-3xl z-9999 flex-col justify-center items-center  bg-slate-300 p-2 `}
        >
          <h1 className="font-bold text-xl">Create a new document</h1>
          <p>Enter a name for your document. Click create when you're done.</p>

          <form
            onSubmit={handleSubmit}
            className="mt-3 flex justify-center items-center flex-col"
          >
            <input
              className=" focus:outline-none rounded-lg p-1"
              type="text"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
            />
            <button className=" mt-2  p-1 w-36 rounded-full  text-white bg-blue-600 ">
              Create
            </button>
          </form>
          <button
            onClick={() => setToggle(!toggle)}
            className=" mt-2  p-1 w-36 rounded-full  text-white bg-blue-600 "
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
