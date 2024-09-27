import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const Datatable = (props) => {
  const doc = props.docs;
  const navigate = useNavigate();
  return (
    <table className="border-collapse w-1/2 ">
      <tbody>
        {doc?.map((row, rowIndex) => (
          <tr
            className="cursor-pointer hover:bg-blue-200  "
            key={rowIndex}
            onClick={() => navigate(`/document/${row._id}`)}
          >
            <td className="p-2 text-left border-b border-gray-300  rounded-l-2xl font-light">
              {row.name}
            </td>
            <td className="p-2 text-right border-b border-gray-300  font-light">
              {moment(row.createdAt).format("YYYY-MM-DD")}
            </td>
            <td className="p-2 text-right border-b border-gray-300 rounded-r-2xl font-light">
              {moment(row.createdAt).format("HH:mm:ss")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Datatable;
