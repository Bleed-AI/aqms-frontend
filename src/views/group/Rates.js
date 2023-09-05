import React, { useContext, useState } from "react";
import FileConfiguration from "../../components/Rates/FileConfiguration";
import axios from "axios";
import { BASE_URL } from '../../config/constants';
import { UserContext } from "../../context/UserContext/UserContext";


export default function Rates({ files, loading }) {
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext);

  const navigateFileConfigScreen = () => {
    setShowModal(true);
  };

  const downloadFile = async (file_id) => {

  try {
    const response = await axios.get(`${BASE_URL}/ratelists/${file_id}`, {
      responseType: 'blob', // Setting the response type to 'blob' to handle binary data
      headers: {
        "Authorization": `Bearer ${user["access_token"]}`,
      },
    });

    // Check if the 'content-disposition' header exists in the response
    const contentDisposition = response.headers['content-disposition'];
    let filename;

    if (contentDisposition) {
      filename = contentDisposition.split('filename=')[1];
    } else {
      // Set a default filename if 'content-disposition' header is missing
      filename = `ratelist_${file_id}.xlsx`; // You can adjust the filename as needed
    }

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    console.log('File downloaded successfully!');
  } catch (error) {
    // Handle any errors that occurred during the download process
    console.error('Error downloading the file:', error);
  }
  }

  const deleteFile = async (file_id) => {
    console.log(user)
    const res = window.confirm("Are you sure you want to delete this file?", "Delete File")
    
    if(res){
      await axios.delete(`${BASE_URL}/ratelists/${file_id}`, {
        headers: {
          "Authorization": `Bearer ${user["access_token"]}`,
        },
      });
      alert("File Deleted")
      window.location.reload()
    }
  }

  console.log(files)

  return (
    <div className="my-10">
      {showModal &&
        <FileConfiguration setShowModal={setShowModal} />
      }
      <div className=" flex-col items-center justify-start ml-6">
        <div className=" flex justify-start ">
          <button
            className="font-normal text-white rounded-3xl h-10 px-4  bg-[#6AB2DD]"
            onClick={navigateFileConfigScreen}
          >
            Upload Rate Sheet (excel)
          </button>
        </div>

        <div className="mr-14 leading-6 mt-10 h-full border border-[#E5E9EB] rounded-md border-solid">
          <table className=" w-full  ">
            <thead className="bg-[#EEEFF2] text-[#141516] h-10 font-bold text-left ">
              <tr className=" ">
                <th className="  pl-4 pr-12 ">File Name </th>
                <th className=" ">Schedule</th>
                <th className="  pr-10 ">Devices</th>
                <th className=" ">Status</th>
                <th className=" text-center pr-2 ">Actions </th>
              </tr>
            </thead>
            {loading ?
              <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FB9E00]"></div>
              </div> :
              <tbody className="  ">
                {files && files.map((file) => (
                  <tr key={file.id} className="  h-20 text-left">
                    <td className="pl-4 text-[#388FCD] text-base leading-6 font-medium">
                      {file.file_name}
                    </td>
                    <td className="  text-[#141516] font-semibold text-base leading-6">
                      {new Date(file.config_time).toLocaleString()}
                    </td>
                    <td className="  text-[#141516]  font-semibold text-base leading-6">
                    
                      With all tags:
                      <br /> {
                         
                        JSON.parse(file.tags).map((tag, index) => (
                          tag? 
                          <span key={index} className="font-medium text-[#388FCD]">{tag}, </span>
                          : "On All Devices"
                        ))
                      }
                    </td>
                    <td className="  text-[#141516]  font-semibold text-base leading-6">
                      {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                    </td>
                    <td className=" pr-8 mt-6 flex items-center justify-center">
                    <button onClick={()=>downloadFile(file.id)}>
                      <img className="ml-6" src="/images/download.svg " alt="" />{" "}
                      </button>

                      <button onClick={()=>deleteFile(file.id)}>
                      <img className="ml-5" src="/images/delete.svg" alt="" />
                      </button>
                    </td>
                  </tr>))}
              </tbody>}
          </table>
        </div>
      </div>
    </div>
  );
}
