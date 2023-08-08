import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import ClickAwayListener from "react-click-away-listener";
import ActionMenu from "./ActionMenu";
import BudgetModal from "../Common/BudgetModal";

export default function DevicesTable({
  group,
  tempData,
  sortData,
  value,
  filterData,
}) {
  const [showTag, setShowTag] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = tempData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(tempData.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  // const [justOnce, setJustOnce] = useState(true);
  const [action, setAction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [api, setApi] = useState("");
  const [paramName, setParamName] = useState("");


  const reload_devices = () => {
    window.location.reload();
  };

  console.log("tempData", tempData);
  const handleSelect = (device_data) => {
    // add device in selected
    if (!selected.includes(device_data)) {
      setSelected([...selected, device_data]);
    }
    // remove device from selected
    else {
      setSelected(selected.filter((item) => item !== device_data));
    }
  };


  useEffect(() => {
    if (action !== "") {
      setShowAction(false);

      if (action === "Daily Max STP"){
        setApi("/stp-info/daily");
        setParamName("max_stp");
      } 
      else if (action === "Weekly Max STP"){
        setApi("/stp-info/weekly");
        setParamName("max_stp");
      }
      else if (action === "Monthly Budget"){
        setApi("/budget-info/monthly")
        setParamName("budget");
      }
      else if (action === "Yearly Budget"){
        setApi("/budget-info/yearly")
        setParamName("budget");
      }
      else if (action === "Top Up Increaments in MB"){
        setApi("/topup-info");
        setParamName("topup_mb");
      } else if (action === "Yearly Budget Start Date"){
        setApi("/budget-start-info");
        setParamName("start_date");
      }

      setShowModal(true);
    }
  }, [action]);

  //for handleing Tag
  function handleClick() {
    setShowTag(!showTag);
  }
  function handleClickAway() {
    setShowTag(false);
  }
  //for handleing Action

  function handleAction() {
    setShowAction(!showAction);
  }
  function handleActionAway() {
    setShowAction(false);
  }
  //pagination
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
    <React.Fragment>
      {showModal && (
        <BudgetModal heading={action} api={api} paramName={paramName} setShowModal={setShowModal} reload_devices={reload_devices} />
      )}
      <div className="flex justify-start items-center mt-8">
        {!group && (
          <div className="ml-6" onClick={handleClick}>
            <button className="bg-[#A8B6BF] text-white px-[18px] py-2  ">
              Tag
              <img
                className={`inline-block ml-2 ${
                  showTag === true ? "rotate-180" : "rotate-0"
                }`}
                src="/images/uparrow.svg"
                alt="arrow svg"
              />
            </button>
          </div>
        )}
        {!group && (
          <div className="ml-2.5" onClick={handleAction}>
            <button className="bg-[#A8B6BF] text-white px-5 py-2">
              Actions
              <img
                className={`inline-block ml-2 ${
                  showAction === true ? "rotate-180" : "rotate-0"
                }`}
                src="/images/uparrow.svg"
                alt="arrow svg"
              />
            </button>
          </div>
        )}
        <div
          className={`${
            group === true ? "ml-6" : "ml-2"
          } flex rounded-r-md justify-start items-center border border-solid border-[#DDE2E4]  w-72 h-10  `}
        >
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
            Showing {records.length} of {tempData.length} entries
          </span>
        </div>
      </div>

      {showTag && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className="">
            <Tag selected={selected} reload_devices={reload_devices} />
          </div>
        </ClickAwayListener>
      )}
      {showAction && (
        <ClickAwayListener onClickAway={handleActionAway}>
          <div className="">
            <ActionMenu setAction={setAction} />
          </div>
        </ClickAwayListener>
      )}
      <div className="ml-6 mr-12">
        <div className="w-full overflow-x-scroll 3xl:overflow-auto">
          <table className="border border-[#E5E9EB] items-center rounded-md border-solid w-[2000px] 3xl:w-full text-sm mt-1">
            <thead className="bg-[#EEEFF2] h-10 text-[#141516]">
              <tr className="  ">
                {!group && <th className="w-[4%] px-4">Select</th>}
                {group && (
                  <th className="w-[5%] px-2 ">
                    Status{" "}
                    <img
                      className=" inline-block float-right cursor-pointer"
                      src="/images/pointers.svg"
                      alt="sort-data"
                      onClick={() => sortData("status")}
                    />
                  </th>
                )}
                <th className="  text-left w-[10%] px-4 ">
                  Device Name
                  <img
                    className=" inline-block float-right cursor-pointer"
                    src="/images/pointers.svg"
                    alt="sort-data"
                    onClick={() => sortData("name")}
                  ></img>
                </th>

                <th className=" text-left w-[10%] px-2">
                  Serial Number
                  <img
                    className="inline-block float-right cursor-pointer"
                    src="/images/pointers.svg"
                    alt="sort-data"
                    onClick={() => sortData("sn")}
                  />
                </th>
                <th className="  text-left w-[10%] px-2">
                  Tags
                  <img
                    className=" inline-block  float-right  cursor-pointer"
                    src="/images/pointers.svg"
                    alt="sort-data"
                    onClick={() => sortData("tags")}
                  />
                </th>

                <th className=" text-left w-[6%] px-2">
                  Y-Budget
                  <img
                    className="  inline-block  float-right  cursor-pointer"
                    src="/images/pointers.svg"
                    alt="sort-data"
                    onClick={() => sortData("yearly_budget")}
                  />
                </th>

                <th className=" text-left w-[6%] px-2 ">
                  M-Budget
                  <img
                    className=" inline-block float-right  cursor-pointer "
                    src="/images/pointers.svg"
                    alt="sort-data"
                    onClick={() => sortData("monthly_budget")}
                  />
                </th>

                <th className=" text-left w-[10%] px-2">
                  Last Top-Up Attempt
                  <img
                    className="inline-block float-right  cursor-pointer"
                    src="/images/pointers.svg"
                    alt="sort-data"
                    onClick={() => sortData("last_topup_attempt")}
                  />
                </th>

                <th className=" text-left w-[8%] px-2 ">
                  Last Top Up Status
                  <img
                    className="inline-block float-right  cursor-pointer"
                    src="/images/pointers.svg"
                    alt="sort-data"
                    onClick={() => sortData("last_topup_status")}
                  />
                </th>

                <th className=" text-left w-[8%] px-2">
                  Last Top Up State
                  <img
                    className="inline-block float-right  cursor-pointer"
                    src="/images/pointers.svg"
                    alt="sort-data"
                    onClick={() => sortData("last_topup_state")}
                  />
                </th>

                <th className=" text-left w-[7%] px-2 ">
                  TU INCR(MB)
                  <img
                    className="inline-block float-right  cursor-pointer"
                    src="/images/pointers.svg"
                    alt="sort-data"
                    onClick={() => sortData("topup_mb")}
                  />
                </th>
                {/* <th className=" text-left w-[8%] px-2  ">
                  MTD (GB) STP
                  <img
                    className="inline-block float-right  cursor-pointer "
                    src="/images/pointers.svg"
                    onClick={() => sortData("MTD_GB_STP")}
                  />
                </th> */}

                <th className=" text-left  w-[6%] px-2 ">
                  D-C STP
                  <img
                    className="inline-block float-right  cursor-pointer"
                    src="/images/pointers.svg"
                    alt="sort-data"
                    onClick={() => sortData("daily_stp")}
                  />
                </th>

                <th className=" text-left w-[6%] px-2 ">
                  W-C STP
                  <img
                    className="inline-block float-right  cursor-pointer "
                    src="/images/pointers.svg"
                    alt="sort-data"
                    onClick={() => sortData("weekly_stp")}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((device_data, index) => (
                <tr key={index} className="h-full">
                  {!group && (
                    <td className="text-center ">
                      <input
                        type="checkbox"
                        className="  h-4 w-4 rounded border-[#B0BABF] accent-black border "
                        onClick={() => handleSelect(device_data)}
                      />
                    </td>
                  )}
                  {group && (
                    <td className="text-center align-middle">
                      <div 
                        className={` ${
                          device_data.status === "online"
                            ? "bg-[#42FF00]"
                            : "bg-[#F90404]"
                        }  h-4 w-4 rounded border-[#B0BABF]  mx-auto`}
                      />
                    </td>
                  )}
                  <td className=" text-left text-[#388FCD]  px-4 text-base leading-6">
                    {device_data.name}
                  </td>
                  <td className=" text-left text-[#141516] px-2  text-base leading-6">
                    {device_data.sn}
                  </td>
                  <td className=" text-left text-[#141516] px-2   text-base leading-6">
                    {device_data.tags&& device_data.tags.join(", ")}
                  </td>
                  <td className=" pr-2 text-left text-[#141516] px-2  text-base leading-6">
                    {device_data.yearly_budget? "$" + device_data.yearly_budget : "$" + 0 }
                  </td>
                  <td className=" text-left text-[#141516]  px-2 text-base leading-6">
                    {device_data.monthly_budget? "$" + device_data.monthly_budget : "$" + 0}
                  </td>
                  <td className=" text-left text-[#141516] px-2  text-base leading-6">
                    {device_data.last_topup_attempt? new Date(device_data.last_topup_attempt).toDateString() + " " +
                     new Date(device_data.last_topup_attempt).toLocaleTimeString() : "N/A"}
                  </td>
                  <td className=" pr-2 text-left text-[#141516] px-2  text-base leading-6">
                    {device_data.last_topup_status? device_data.last_topup_status : "N/A"}
                  </td>
                  <td className=" text-left text-[#141516] px-2 text-base leading-6">
                    {device_data.last_topup_state? device_data.last_topup_state : "N/A"}
                  </td>
                  <td className=" text-left text-[#141516] px-2  text-base leading-6">
                    {device_data.topup_mb? device_data.topup_mb : 0}
                  </td>
                  {/* <td className=" text-left text-[#141516] px-2  text-base leading-6">
                    {device_data.MTD_GB_STP}
                  </td> */}
                  <td className=" pr-2 text-left text-[#141516] px-2  text-base leading-6">
                    {device_data.daily_stp? device_data.daily_stp : "0"}
                  </td>
                  <td className=" text-left text-[#141516] px-2  text-base leading-6">
                    {device_data.weekly_stp? device_data.weekly_stp : "0"}
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
              alt="previous"
              src="/images/previous.svg"
            ></img>
          </div>
          {numbers.map(
            (n, i) =>
              i < npage - 3 &&
              i > currentPage - 2 &&
              i < currentPage + 1 && (
                <div
                  className={` ${
                    n === currentPage
                      ? "border-[#4200FF] text-[#4200FF]"
                      : "text-[#212B36] border-[#DFE3E8]"
                  } w-8 h-8 border  flex justify-center items-center text-center text-sm leading-5 font-bold page-item  rounded mr-2`}
                  key={i}
                >
                  <span
                    className="page-link"                    
                    onClick={() => changeCPage(n)}
                  >
                    {n}
                  </span>
                </div>
              )
          )}
          {
            <div
              className="text-[#212B36] border-[#DFE3E8] w-8 h-8 border cursor-pointer  flex justify-center items-center text-center text-sm leading-5 font-bold page-item  rounded mr-2"
              onClick={() => changeCPage(1)}
            >
              ...
            </div>
          }

          {numbers.map(
            (n, i) =>
              i > npage - 3 && (
                <div
                  className={` ${
                    n === currentPage
                      ? "border-[#4200FF] text-[#4200FF]"
                      : "text-[#212B36] border-[#DFE3E8]"
                  } w-8 h-8 border  flex justify-center items-center text-center text-sm leading-5 font-bold page-item  rounded mr-2`}
                  key={i}
                >
                  <span
                    className="page-link"
                    onClick={() => changeCPage(n)}
                  >
                    {n}
                  </span>
                </div>
              )
          )}
          <div className="w-8 h-8 border-[#DFE3E8] rounded border flex justify-center items-center cursor-pointer page-item">
            <img
              className="page-link "
              onClick={nextPage}
              alt="next"
              src="\images\next.svg"
            ></img>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
