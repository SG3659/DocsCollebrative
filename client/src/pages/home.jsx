import { useEffect, useState } from "react";
import Header from "../components/HomeHeader/HomeHeader";
import Card from "../components/Card/Card";
import DataCard from "../components/HomeHeader/DataCard";
import DataTable from "../components/HomeHeader/DataTable";
import { FaTableCells } from "react-icons/fa6";
import { FaTableList } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/getUserSlice";
import getDocsApi from "../api/getDocsApi";
import getUserApi from "../api/getUserApi";
const home = () => {
  const [docs, setDocs] = useState();
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUser);
  const getData = async () => {
    const response = await getDocsApi(setDocs, search);
  };
  const userData = async () => {
    const response = await getUserApi(dispatch, setUser);
  };
  useEffect(() => {
    getData();
  }, [search]);
  useEffect(() => {
    if (!User) {
      userData();
    }
  }, [User]);
  return (
    <>
      <Header>
        <div className=" bg-gray-100 w-50% h-80 mt-20 rounded-2xl shadow-2xl ">
          <div className="p-4">
            <div className="w-fit font-google">
              <p className="font">Start a new document </p>
            </div>
          </div>
          <Card />
        </div>

        <div className="flex justify-center items-center flex-row mt-10 gap-3 ">
          <div>
            <input
              type="text"
              placeholder="Search...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" hover:outline-none w-52  bg-gray-300 rounded-lg  p-1 "
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <FaTableList fontSize={20} />
            ) : (
              <FaTableCells fontSize={20} />
            )}
          </div>
        </div>

        <div>
          <div className=" mt-5 p-3 flex justify-center ">
            {show ? <DataCard docs={docs} /> : <DataTable docs={docs} />}
          </div>
        </div>
      </Header>
    </>
  );
};

export default home;
