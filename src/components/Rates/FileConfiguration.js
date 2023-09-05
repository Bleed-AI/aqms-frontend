import React, { useContext, useEffect, useRef, useState } from "react";
import RadioButton from "../Common/RadioButton";
import ClickAwayListener from "react-click-away-listener";
import "react-tagsinput/react-tagsinput.css";
import { BASE_URL } from '../../config/constants';
import { UserContext } from "../../context/UserContext/UserContext";
import axios from "axios";

export default function FileConfiguration({ setShowModal }) {
  const [radioActive, setRadioActive] = useState(1);
  const [tags, setTags] = useState([]);
  const [fileName, setFileName] = useState("File");
  const [config_time, setConfigTime] = useState("");
  const inputRef = useRef(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const [valInput, setValInput] = useState("");
  const { user } = useContext(UserContext);


  useEffect(() => {
    console.log(config_time)
  }, [config_time])


  const handleFileUpload = async () => {

    const scheduled = radioActive === 2 ? true : false;
    const body = new FormData();
    body.append("file", inputRef.current.files[0]);
    body.append("is_scheduled", scheduled);
    if (scheduled && config_time !== "") {
      const schedule_time = new Date(config_time).toISOString().slice(0, 19).replace('T', ' ');
      body.append("config_time", schedule_time);
    } else {
      const immediate_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
      body.append("config_time", immediate_time);
    }

    if (tags.length > 0){
    body.append("tags", [...tags.map((tag) => tag.value)])
    } else {

    }


    try {
      const response = await axios.post(`${BASE_URL}/ratelists`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${user["access_token"]}`,
        },
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
                    type='datetime-local'
                    className="w-[180px] mt-2.5 ml-8 leading-6 text-xs text-[#9AA6AC]  focus:outline-none border pl-1.5 px-2 rounded-md border-[#DDE2E4]"
                    onChange={(e) => setConfigTime(e.target.value)}
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
          <button className="bg-[#18A0FB] text-white text-center h-9 rounded-lg  px-8"
            onClick={handleFileUpload}>
            Save
          </button>
          <button className="bg-[#A8B6BF] ml-3 text-white text-center h-9 rounded-md  px-8"
            onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
