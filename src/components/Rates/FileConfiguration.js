import React, { useContext, useRef, useState } from "react";
import RadioButton from "../Common/RadioButton";
import ClickAwayListener from "react-click-away-listener";
import "react-tagsinput/react-tagsinput.css";
import { BASE_URL } from '../../config/constants';
import { UserContext } from "../../context/UserContext/UserContext";

export default function FileConfiguration({setShowModal}) {
  const [radioActive, setRadioActive] = useState(1);
  const [tags, setTags] = useState([]);
  const [fileName, setFileName] = useState("File");
  const inputRef = useRef(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const [valInput, setValInput] = useState("");
  const { user } = useContext(UserContext);

  const handleFileUpload = async () => {

    const body = new FormData();
    body.append("file", inputRef.current.files[0]);
    body.append("isScheduled", radioActive === 2 ? true : false);
    body.append("config_time", "2023-02-23 12:00:00");
    body.append("tags", [...tags.map((tag) => tag.value)])

    try {
      const response = await fetch(`${BASE_URL}/ratelists`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user["access_token"]}`,
          "Content-Type": "application/json"
        },
        body: body
      });

      console.log(response);
      setShowModal(false);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };


  function handleClick() {
    setShowSchedule(!showSchedule);
  }
  function handleClickAway() {
    setShowSchedule(false);
  }

  const handleChange = (e) => {
    setValInput(e.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      const newTag = {
        id: tags.length + 1,
        value: valInput,
      };

      setTags([...tags, newTag]);
      setValInput("");
    }
  };

  const removeTag = (value) => {
    const filteredTags = tags.filter((tag) => tag.value !== value);

    setTags(filteredTags);
  };

  const updateFileName = (e) => {
    setFileName(e.target.files[0].name);
  };

  const triggerInput = () => {
    inputRef.current.click();
  };

  return (
    <div className="fixed top-0 w-screen h-screen flex justify-center items-center bg-[#D9D9D9] bg-opacity-50 backdrop-blur-sm ">
      <div className="bg-white h-[556px] w-[707px] border-b-2  border-b-[#D9D9D9] border-opacity-30 absolute">
        <div className="flex items-center ml-14 mt-16 justify-start">
          <span className="mr-8">File Configuration </span>
          <div className="border-[#DDE2E4] py-2 w-80 border cursor-pointer font-normal  text-[#9AA6AC]  flex justify-start rounded-r-md ">
            <input
              ref={inputRef}
              id="file"
              type="file"
              placeholder="File"
              onChange={updateFileName}
              className="opacity-0 absolute w-80  cursor-pointer z-10"
            />
            {fileName && (
              <span
                className={`relative z-10 w-80 flex cursor-pointer justify-start pl-2.5 ${fileName === "File" ? "text-[#9AA6AC]" : "text-[#63BCFC]"
                  }`}
                onClick={triggerInput}
              >
                {fileName}
              </span>
            )}
          </div>
        </div>

        <div className="mt-2 flex justify-start ml-56">
          <button className="bg-[#18A0FB] text-white  rounded-md py-2.5 px-6 font-medium text-sm">
            Upload
          </button>
        </div>
        <div className="flex items-start ml-14 mt-14 justify-start">
          <span className="mr-8">Configuration Time</span>
          <div className="flex items-center">
            <RadioButton
              radioActive={radioActive}
              setRadioActive={setRadioActive}
              number={1}
            />
            <span className="ml-3">Immediately</span>
          </div>

          <div className="flex flex-col ml-14 justify-center">
            <div className="flex  items-center">
              <RadioButton
                onClick={handleClick}
                radioActive={radioActive}
                setRadioActive={setRadioActive}
                number={2}
              />
              <span className="ml-3">Scheduled</span>
            </div>
            {radioActive === 2 && (
              <ClickAwayListener onClickAway={handleClickAway}>
                <div className="absolute z-10 mt-12">
                  <input
                    type="date"
                    value={"2023-02-23"}
                    className="w-[92px] mt-2.5 ml-8 leading-6 text-xs text-[#9AA6AC]  focus:outline-none border pl-1.5 px-2 rounded-md border-[#DDE2E4]"
                  />
                  <input
                    type="time"
                    className=" w-[57px] mt-2.5 ml-2 leading-6 text-[#9AA6AC] focus:outline-none text-xs border pl-1 px-2 rounded-md border-[#DDE2E4]"
                  />
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>

        <div className="flex items-center ml-14 mt-14 justify-start">
          <span className=" mr-10">Device Selection</span>
          <div className="border-[#DDE2E4] text-left w-80 py-2 border">
            <input
              onChange={handleChange}
              onKeyDown={handleEnter}
              value={valInput}
              className="text-[#BFBFBF] focus:outline-none font-medium pl-3 cursor-pointer"
              placeholder="All devices in this group"
            />
          </div>
        </div>
        <div className="border-[#DDE2E4] mt-3 ml-[223px] flex gap-x-4 px-3 py-4 gap-y-4 flex-wrap h-20 overflow-y-scroll w-80 border">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="bg-[#BFBFBF] text-[#00000080] font-normal w-fit px-1 py-1 h-fit rounded-md"
            >
              {tag.value}{" "}
              <span
                onClick={() => removeTag(tag.value)}
                className="text-[#00000080] ml-2 cursor-pointer pr-2"
              >
                x
              </span>
            </div>
          ))}
        </div>
        <div className="bg-[#D9D9D9] py-6 mt-12  bg-opacity-30">
          <button className="bg-[#18A0FB] text-white text-center h-9 rounded-lg  px-8">
            Save
          </button>
          <button className="bg-[#A8B6BF] ml-3 text-white text-center h-9 rounded-md  px-8"
          onClick={()=>setShowModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
