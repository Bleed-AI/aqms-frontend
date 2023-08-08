import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Table({ org_id, data, filterData, value }) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const navigate = useNavigate();

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }


  const navigateToGroup = (id) => {
    navigate(`/organization/${org_id}/group/${id}`)
  }

  return (
    <div className="ml-6 mr-12">
      <div className="flex justify-start items-center mt-8">
        <div className="flex rounded-r-md justify-start items-center border border-solid border-[#DDE2E4]  w-72 h-10  ">
          <img className=" ml-2" src="/images/Search.svg" alt="" />
          <input
            className=" ml-2.5 focus:outline-none  "
            type="text"
            placeholder="Search"
            value={value}
            onChange={filterData}
          />
        </div>
        <div className=" ml-2">
          <span className="text-[#788188] font-normal text-base leading-6 ">
            Showing {records.length} of {data.length} entries
          </span>
        </div>
      </div>
      <table className="border border-[#E5E9EB] items-center rounded-md border-solid w-full   mt-1">
        <thead className="bg-[#EEEFF2] h-10 text-[#141516]">
          <tr className=" ">
            <th className=" text-left  pl-4 ">Name </th>
            <th className=" text-right  ">Online </th>
            <th className=" text-right  ">Offline </th>
            <th className=" text-right  pr-2 ">Total </th>
          </tr>
        </thead>
        <tbody className="  ">
          {records.map((group, index) => (
            <tr key={index} className="h-9 cursor-pointer" 
            onClick={()=>navigateToGroup(group.id)}>
              <td className="pl-4  text-left text-[#388FCD] text-base leading-6 font-medium">
                {group.name}
              </td>
              <td className=" text-right text-[#141516] font-semibold text-base leading-6">
                {group.online_device_count}
              </td>
              <td className=" text-right text-[#141516]  font-semibold text-base leading-6">
                {group.offline_device_count}
              </td>
              <td className=" pr-2 text-right text-[#141516]  font-semibold text-base leading-6">
                {group.online_device_count + group.offline_device_count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end itemts-center my-12">
        <div
          className={` ${
            currentPage > 1
              ? "border-[#DFE3E8] border"
              : "bg-[#919EAB] opacity-50"
          }  page-item w-8 h-8  cursor-pointer flex justify center items-center rounded mr-2`}
        >
          <img
            href="#"
            className=" p-2.5 page-link"
            onClick={prevPage}
            src="/images/previous.svg"
          ></img>
        </div>
        {numbers.map(
          (n, i) =>
            (i === currentPage - 1 || i === currentPage) && (
              <div
                className={` ${
                  n == currentPage
                    ? "border-[#4200FF] text-[#4200FF]"
                    : "text-[#212B36] border-[#DFE3E8]"
                } w-8 h-8 border  flex justify-center items-center text-center text-sm leading-5 font-bold page-item  rounded mr-2`}
                key={i}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCPage(n)}
                >
                  {n}
                </a>
              </div>
            )
        )}
        <div className="w-8 h-8 border-[#DFE3E8] rounded border flex justify-center items-center cursor-pointer page-item">
          <img
            href="#"
            className="page-link "
            onClick={nextPage}
            src="\images\next.svg"
          ></img>
        </div>
      </div>
    </div>
  );
}
