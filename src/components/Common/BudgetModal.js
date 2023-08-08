import React, { useContext, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener';
import RadioButton from './RadioButton';
import { UserContext } from '../../context/UserContext/UserContext';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../config/constants';


export default function BudgetModal({ heading, api, setShowModal, reload_devices }) {
  const [radioActive, setRadioActive] = useState(1);
  const [tags, setTags] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [valInput, setValInput] = useState("");
  const [prompt_input, setPromptInput] = useState(1);
  const { user } = useContext(UserContext);
  const { org_id, group_id } = useParams();

  const [config_date, setConfigDate] = useState();
  const [config_time, setConfigTime] = useState();


  const closeModal = () => {
    setShowModal(false);
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


  const handleSubmit = async () => {
    let data;
    if (heading === 'Monthly Budget' || heading === 'Yearly Budget') {
      data = {
        org_id: org_id,
        group_id: Number(group_id === undefined ? 0 : group_id),
        budget: Number(prompt_input),
        is_scheduled: radioActive === 1 ? false : true,
        config_time: radioActive === 1 ? new Date().toISOString() : new Date(`${config_date} ${config_time}`).toISOString(),
        device_selection_tags: [...tags.map((tag) => tag.value)]
      }
    } else if (heading === 'Daily Max STP' || heading === 'Weekly Max STP'){
      data = {
        org_id: org_id,
        group_id: Number(group_id === undefined ? 0 : group_id),
        max_stp: Number(prompt_input),
        is_scheduled: radioActive === 1 ? false : true,
        config_time: radioActive === 1 ? new Date().toISOString() : new Date(`${config_date} ${config_time}`).toISOString(),
        device_selection_tags: [...tags.map((tag) => tag.value)]
      }
    } else if (heading === 'Top Up Increaments in MB'){
      data = {
        org_id: org_id,
        group_id: Number(group_id === undefined ? 0 : group_id),
        topup_mb: Number(prompt_input),
        is_scheduled: radioActive === 1 ? false : true,
        config_time: radioActive === 1 ? new Date().toISOString() : new Date(`${config_date} ${config_time}`).toISOString(),
        device_selection_tags: [...tags.map((tag) => tag.value)]
      }
    } else{
      data = {
        org_id: org_id,
        group_id: Number(group_id === undefined ? 0 : group_id),
        start_date: Date(prompt_input),
        is_scheduled: radioActive === 1 ? false : true,
        config_time: radioActive === 1 ? new Date().toISOString() : new Date(`${config_date} ${config_time}`).toISOString(),
        device_selection_tags: [...tags.map((tag) => tag.value)]
      }
    }

    console.log(data);
    console.log(`${BASE_URL}${api}`);
    try {
      const response = await fetch(`${BASE_URL}${api}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user["access_token"]}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      console.log(response);
      closeModal();
      reload_devices();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    // closeModal();
  }

  const removeTag = (value) => {
    const filteredTags = tags.filter((tag) => tag.value !== value);

    setTags(filteredTags);
  };


  return (
    <div className='fixed top-0 w-screen h-screen flex justify-center items-center backdrop-blur-xl bg-black bg-opacity-20'>
      <div className="bg-white h-[556px] w-[707px] border-b-2  border-b-[#D9D9D9] border-opacity-30 flex flex-col justify-between">
        <div className="flex items-center ml-14 mt-16 justify-start">
          <span className="mr-8">{heading}</span>
          <div className="border-[#DDE2E4] py-2 w-80 border cursor-pointer font-normal  text-[#9AA6AC]  flex justify-start rounded-r-md ">
            <input
              id="text"
              type="number"
              value={prompt_input}
              onChange={(e) => setPromptInput(e.target.value)}
              className="w-80 focus:outline-none    cursor-pointer z-10 pl-2 text-[#18A0FB] placeholder:text-[#18A0FB]"
            />
          </div>
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
                    type='date'
                    onChange={(e) => setConfigDate(e.target.value)}
                    className="w-[92px] mt-2.5 ml-8 leading-6 text-xs text-[#9AA6AC]  focus:outline-none border pl-1.5 px-2 rounded-md border-[#DDE2E4]"
                  />
                  <input
                    type="time"
                    onChange={(e) => setConfigTime(e.target.value)}
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
              className="text-[#BFBFBF] focus:outline-none font-medium pl-3 cursor-pointer w-full"
              placeholder="With all of the following tags"
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
            onClick={handleSubmit}>
            Save
          </button>
          <button className="bg-[#A8B6BF] ml-3 text-white text-center h-9 rounded-md  px-8"
            onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
