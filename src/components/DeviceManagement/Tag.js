import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext/UserContext";
import { BASE_URL } from "../../config/constants";

export default function Tag({ selected, reload_devices }) {
  const { org_id } = useParams();
  const [addTagInput, setAddTagInput] = useState("");
  const [removeTagInput, setRemoveTagInput] = useState("");
  const { user } = useContext(UserContext);

  const handleAddTag = async () => {
    if (!org_id) return;

    for (let i = 0; i < selected.length; i++) {


      if (addTagInput === "") return alert("Please enter a tag name");
      if (selected[i].tags.includes(addTagInput)) return alert("Tag already exists")

      const response = await fetch(`${BASE_URL}/orgs/${org_id}/devices/${selected[i].id}/tags`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user["access_token"]}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify([addTagInput])
      });
      if (response.statusText === "OK") {
        alert("Tag added successfully");
        reload_devices();
      } else {
        alert("Something went wrong");
      }

      setAddTagInput("");
    }
  };


  const handleRemoveTag = async () => {
    if (!org_id) return;

    for (let i = 0; i < selected.length; i++) {
      if (removeTagInput === "") return alert("Please enter a tag name");
      if (!selected[i].tags.includes(removeTagInput)) return alert("Tag does not exist")

      const response = await fetch(`${BASE_URL}/orgs/${org_id}/devices/${selected[i].id}/tags`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${user["access_token"]}}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify([removeTagInput])
      });
      if (response.statusText === "OK") {
        alert("Tag removed successfully");
        reload_devices();
      } else {
        alert("Something went wrong");
      }
    }
  };





  return (
    <div className=" absolute bg-white  flex-col items-center justify-start  z-10 h-48 ml-6  shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] w-[425px]">
      <div className="mt-8 ">
        <div
          className=" font-semibold text-left  pl-8 text-sm leading-6">Add
        </div>
        <div className=" pl-8 flex justify-start w-full"  >
          <input
            type="text"
            placeholder="Choose existing tags or add new tag"
            className="focus:outline-none border-[3px] text-sm pl-[2px] border-[#DDE2E4] w-[280px] rounded-r-md "
            onChange={(e) => { setAddTagInput(e.target.value) }}
            value={addTagInput}
          />
          <button className="rounded-[3px] text-white font-normal px-3 py-1 bg-[#6AB2DD] ml-2"
            onClick={handleAddTag}>Add</button>
        </div>
      </div>
      <div className="mt-2.5 ">
        <div
          className=" font-semibold text-left pl-8 text-sm leading-6">Remove
        </div>
        <div className=" pl-8 flex justify-start w-full"  >
          <input
            type="text"
            placeholder="Choose tags to remove"
            className="focus:outline-none border-[3px] text-sm pl-[2px] border-[#DDE2E4] w-[280px] rounded-r-md "
            onChange={(e) => { setRemoveTagInput(e.target.value) }}
            value={removeTagInput}
          />
          <button className="rounded-[3px] text-white font-normal px-3 py-1 bg-[#6AB2DD] ml-2"
          onClick={handleRemoveTag}>Remove</button>
        </div>
      </div>
    </div>
  );
}
