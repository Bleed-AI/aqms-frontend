import React, { useRef, useState } from "react";
import ReportsType from "./ReportsType";
import { useDownloadExcel } from "react-export-table-to-excel";

export default function ReportsTable({
  reportsData,
  value,
  filterData,
  sortData,
  reportsPage,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = reportsData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(reportsData.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

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

  return (
    <div className="">
      {reportsPage && <ReportsType downloadFile={onDownload} data={reportsData} />}
      <div className="ml-9 mr-12 ">
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
              Showing {records.length} of {reportsData.length} entries
            </span>
          </div>
        </div>
        <div className="w-full overflow-x-scroll 3xl:overflow-auto">
        <table
       
          ref={tableRef}
          className="border border-[#E5E9EB] items-center rounded-md border-solid w-[1700px] 3xl:w-full  text-[13px]  mt-1"
        >
      
          <thead className="bg-[#EEEFF2] h-10 text-[#141516]">
            <tr className="  ">
              <th className=" text-left w-[8%] px-5">
                <span className="inline-block">Device Name</span>
                
                <img
                  className="  cursor-pointer inline-block float-right"
                  src="/images/pointers.svg"
                  onClick={() => sortData("Device_Name")}
                ></img>
              </th>

              <th className="content-between text-left w-[10%] px-4">
                Group
                <img
                  className=" inline-block float-right"
                  src="/images/pointers.svg"
                  onClick={() => sortData("Group")}
                />
              </th>

              <th className=" text-left w-[8%] px-4">
                <span className="inline-block">
                Serial Number
                </span>
                <img
                  className=" inline-block float-right"
                  src="/images/pointers.svg"
                  onClick={() => sortData("Serial_Number")}
                />
              </th>

              <th className=" text-left w-[5%]">
                Y-Budget
                <img
                  className=" my-[11px] inline-block pl-1.5"
                  src="/images/pointers.svg"
                  onClick={() => sortData("Y_Budget")}
                />
              </th>

              <th className=" text-left  w-[5%]">
                M-Budget
                <img
                  className=" inline-block pl-1.5 my-[11px] "
                  src="/images/pointers.svg"
                  onClick={() => sortData("M_Budget")}
                />
              </th>

              <th className=" text-left w-[10%] px-2">
                Last Top-Up Attempt
                <img
                  className="inline-block float-right "
                  src="/images/pointers.svg"
                  onClick={() => sortData("Last_Top_Up_Attempt")}
                />
              </th>

              <th className=" text-left  w-[8%] px-2">
                Last Top Up Status
                <img
                  className="inline-block float-right"
                  src="/images/pointers.svg"
                  onClick={() => sortData("Last_Top_Up_Status")}
                />
              </th>

              <th className=" text-left w-[8%] px-2">
                Last Top Up State
                <img
                  className="inline-block float-right "
                  src="/images/pointers.svg"
                  onClick={() => sortData("Last_Top_Up_State")}
                />
              </th>

              <th className=" text-left  w-[6%] px-2">
                TU INCR(GB)
                <img
                  className="inline-block float-right "
                  src="/images/pointers.svg"
                  onClick={() => sortData("GB")}
                />
              </th>

              <th className=" text-left  w-[5%] px-2">
                D-C STP
                <img
                  className="inline-block float-right"
                  src="/images/pointers.svg"
                  onClick={() => sortData("D_C_STP")}
                />
              </th>

              <th className=" text-left  w-[5%]">
                W-C STP
                <img
                  className="inline-block pl-3 my-[11px] "
                  src="/images/pointers.svg"
                  onClick={() => sortData("W_C-STP")}
                />
              </th>

              {/* <th className=" text-left   w-[4%] px-2">
                PLMN
                <img
                  className="inline-block float-right "
                  src="/images/pointers.svg"
                  onClick={() => sortData("PLMN")}
                />
              </th> */}

              <th className=" text-left mr-3 w-[6%] px-3">
                <span className="inline-block">
                Country
                </span>
                <img
                  className="inline-block  float-right"
                  src="/images/pointers.svg"
                  onClick={() => sortData("Country")}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((report, index) => (
              <tr key={index} className="  h-9 text-sm">
                <td className="pl-5 pr-2  text-left text-[#388FCD]  leading-6 font-medium">
                  {report.name}
                </td>
                <td className=" text-left text-[#141516] px-4 font-semibold  leading-6">
                  {report.group_name}
                </td>
                <td className=" text-left text-[#141516] px-3  font-semibold  leading-6">
                  {report.sn} 
                </td>
                <td className=" pr-2 text-left text-[#141516] px-2  font-semibold  leading-6">
                  {report.yearly_budget? "$"+report.yearly_budget : "$"+0}
                </td>
                <td className=" text-left text-[#141516] px-2 font-semibold  leading-6">
                  {report.monthly_budget? "$"+report.monthly_budget : "$"+0}
                </td>
                <td className=" text-left text-[#141516] px-2  font-semibold leading-6">
                  {report.lastTopupAttempt? report.lastTopupAttempt : "N/A"}
                </td>
                <td className=" pr-2 text-left text-[#141516] px-2  font-semibold  leading-6">
                  {report.lastTopupStatus? report.lastTopupStatus : "N/A"}
                </td>
                <td className=" text-left text-[#141516] px-2 font-semibold leading-6">
                  {report.lastTopupState? report.lastTopupState : "N/A"}
                </td>
                <td className=" text-left text-[#141516] px-2  font-semibold  leading-6">
                  {report.topup_mb? report.topup_mb : 0}
                </td>
                <td className=" pr-2 text-left text-[#141516] px-2  font-semibold  leading-6">
                  {report.dcStp? report.dcStp : 0}
                </td>
                <td className=" text-left text-[#141516] font-semibold px-2 leading-6">
                  {report.wcStp? report.wcStp : 0}
                </td>
                {/* <td className=" text-left text-[#141516]  font-semibold px-2 leading-6">
                  {report.PLMN}
                </td> */}
                <td className=" pr-2 text-left text-[#141516]  font-semibold px-2 leading-6">
                  {report.Country}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
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
    </div>
  );
}
