import React, { useContext, useState } from "react";
import Menu from "./Menu";
import ClickAwayListener from "react-click-away-listener";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext/UserContext";



export default function NavBar({ organizations, org_id, setActive, active, group, activeView, setActiveView }) {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  function handleClick() {
    setShowMenu(!showMenu);
  }
  function handleClickAway() {
    setShowMenu(false);
  }


  const handleTabChange = (tab) => {
    setActiveView(tab)
    if (group) {
      navigate(`/organization/${org_id}/group/${group.id}/${tab}`)
    } else {
      navigate(`/dashboard/${org_id}/${tab}`)
    }
  }

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/")
  }

  return (
    <>
      <div className="bg-[#282828]">
        <div className="  p-2  flex items-center  justify-end">
          <span className="text-white text-[10px]    "> {user.username}</span>
          <span className="text-white mx-2 font-bold  ">|</span>
          <div className="flex items-center cursor-pointer"
            onClick={logout}>
            <img src="/images/signout.svg" alt="" />
            <span className="text-white ml-1 text-[10px]">Sign Out</span>
          </div>
        </div>
        <div className=" bg-[#FB9E00] ml-60 flex justify-start py-[0.5px] items-center font-semibold rounded-tl-[30px]">
          {!group &&
            <div className=" ml-6 border rounded-[10px] px-4 text-white leading-5">
              Organization Level
            </div>
          }
          {group &&
            <div className=" ml-6 border rounded-[10px] px-4 text-white leading-5">
              Group Level
            </div>
          }
          <span className="text-[#464646] ml-11 ">{active} </span>
          <img className="ml-1" src="/images/arrow.svg" alt="arrow" />
          {group && (
            <div className="flex items-center">
              <span className="text-[#464646] font-semibold ml-4 leading-5">
                {group.name}
              </span>
              <img className="ml-1" src="/images/arrow.svg" alt="arrow" />
            </div>
          )}

          <span className=" text-[#EDEEA8] ml-4">Overview</span>
        </div>
        <div className="bg-[#464646] flex  items-center h-12 pl-6 w-full ">
          <div className="flex w-full items-center">
            <div
              onClick={() => handleTabChange("Dashboard")}
              className={`${activeView === "Dashboard" || location.pathname === "/group"
                ? "border-[#FB9E00] border-b-[3px]"
                : "border-none"
                } flex items-center justify-center h-12 cursor-pointer`}
            >
              <img
                className=" mt-2"
                src="/images/dashboard.svg"
                alt="computre"
              />
              <span className="text-white pl-1 ">Dashboard</span>
            </div>
            <div
              onClick={() => handleTabChange("Reports")}
              className={`${activeView === "Reports"
                ? "border-[#FB9E00]  border-b-[3px]"
                : "border-none"
                } ml-5 flex items-center h-12 justify-center cursor-pointer`}
            >
              <img className="" src="/images/reports.svg" alt="report" />
              <span className="text-white pl-1 ">Reports</span>
            </div>
            {group && (
              <div className={`${activeView === "Rates"
                ? "border-[#FB9E00]  border-b-[3px]"
                : "border-none"
                } ml-5 flex items-center h-12 justify-center cursor-pointer`}
                onClick={() => handleTabChange("Rates")}>
                <img className="" src="/images/Rates.svg" alt="" />
                <span className="text-white pl-1 ">Rates</span>
              </div>
            )}

            <div
              onClick={() => handleTabChange("Device Management")}
              className={`${activeView === "Device Management"
                ? "border-[#FB9E00]  border-b-[3px]"
                : "border-none"
                } ml-5 flex items-center h-12 justify-center cursor-pointer`}>
              <img
                className=""
                src="/images/device-management.svg"
                alt=""
              />
              <span className="text-white pl-1 ">Device Management</span>
            </div>

            {!group && (
              <div
                onClick={() => handleTabChange("Organizational Settings")}
                className={`${activeView === "Organizational Settings"
                  ? "border-[#FB9E00]  border-b-[3px]"
                  : "border-none"
                  } ml-5 flex items-center h-12 justify-center cursor-pointer`}>
                <img
                  className=""
                  src="/images/organizational settings.svg"
                  alt=""
                />
                <span className="text-white pl-1 ">
                  Organizational Settings
                </span>
              </div>
            )}

          </div>
          {group && (
            <div className="flex justify-end w-1/3 items-center mr-6">
              <span className="text-white font-normal">
                {group.name}
              </span>
              <span className="text-xl text-white ml-2">|</span>
            </div>
          )}

          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="flex cursor-pointer items-center min-w-fit text-base justify-end mr-12 ">
              <img
                src="/images/organization-one.svg"
                alt="Organization-one"
                onClick={handleClick}
              />
              <span className="text-white  px-[10.5px]" onClick={handleClick}>
                {active}
              </span>
            </div>
          </ClickAwayListener>
        </div>
      </div>
      {showMenu && (
        <div className="flex justify-end items-center w-full mt-32 absolute">
          <Menu organizations={organizations} setActive={setActive} />
        </div>
      )}
    </>
  );
}
