import { useNavigate } from "react-router-dom";
import moment from "moment";
const DataCard = (props) => {
  const doc = props.docs;
  const navigate = useNavigate();

  return (
    <div className="w-[999px] flex flex-wrap justify-center gap-10 p-6 ">
      {doc
        ? doc.map((row, rowIndex) => (
            <div
              key={rowIndex}
              onClick={() => navigate(`/document/${row._id}`)}
              className="w-40 h-60 bg-gray-100   flex flex-col justify-center p-2 cursor-pointer hover:border-blue-600"
            >
              <div className="w-36 h-48 bg-white   object-cover ">
                <img/>
              </div>
              <h4 className="text-center">{row.name}</h4>
              <p className="text-xs text-center">
                {moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </p>
            </div>
          ))
        : ""}
    </div>
  );
};

export default DataCard;
