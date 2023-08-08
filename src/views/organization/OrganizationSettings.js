import React from "react";
import { addUser, deleteUser, makePassowrd } from "../../utils/user";
import { useNavigate } from "react-router-dom";



export default function OrganizationSettings({ users,org_id }) {
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(first_name === "" || last_name === "" || email === ""){
      alert("Please fill all the fields")
      return
    }

    const password = makePassowrd(16)
    const user = {
      "first_name":first_name,
      "last_name":last_name,
      "username":email,
      "password":password,
      "is_admin":false,
    };
    addUser(user);

    alert("User added successfully. Your password is " + password)
    setFirstName("")
    setLastName("")
    setEmail("")
    
    navigate(`/dashboard/${org_id}/Organizational Settings`)
    window.location.reload();
  };


  const handleDelete = async (id) => {
    const response = await deleteUser(id);
    alert(response.message)
    navigate(`/dashboard/${org_id}/Organizational Settings`)
    window.location.reload();
  }

  return (
    <React.Fragment>
      <div className=" flex-col  items-center">
        <div>
          <div className="flex justify-start items-center ">
            <p className=" font-bold text-sm ml-6 mt-2 ">Administration</p>
          </div>
          <div className="bg-[#BFC8CC] h-0.5 ml-6 mr-12"></div>
        </div>
        <div className=" mt-7 flex justify-center font-normal  leading-6 ">
          <span className=" text-sm mx-6 ">Organization Users</span>
          <table className="w-3/4">
            <thead className="bg-[#EEEFF2] h-10 text-left font-bold text-[#141516]">
              <tr className=" text-left">
                <th className="pl-2.5 w-1/4">First Name </th>
                <th className="  w-1/4">Last Name </th>
                <th className=" w-1/2">E-mail </th>
                <th className=" w-1/4 pr-28">Actions </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.__data__.id}>
                  <td className="pl-4 py-2  text-left text-[#252C32] text-base leading-6 font-medium">{user.__data__.first_name}</td>
                  <td className="pl-4 py-2 text-left text-[#252C32] text-base leading-6 font-medium">{user.__data__.last_name}</td>
                  <td className="pl-4 py-2 text-left text-[#252C32] text-base leading-6 font-medium">{user.__data__.username}</td>
                  <td className="pl-4 py-2 cursor-pointer text-[#252C32] text-base leading-6 font-medium">
                    <img src="/images/remove.svg" alt="remove-user" 
                    className="cursor-pointer" onClick={()=>handleDelete(user.__data__.id)} />
                  </td>
                </tr>))}
              <tr className="!bg-transparent">
                <td className="px-4 flex justify-start">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="border mt-4 pl-2 border-[#DDE2E4] h-8 focus:outline-none"
                    onChange={(e)=>setFirstName(e.target.value)}
                  />
                </td>
                <td className="px-4 text-left">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="border mt-4 pl-2  border-[#DDE2E4] h-8 focus:outline-none"
                    onChange={(e)=>setLastName(e.target.value)}
                  />
                </td>
                <td className="flex items-start px-4">
                  <input
                    type="email"
                    placeholder="E-mail"
                    className=" border mt-4  pl-2 border-[#DDE2E4] h-8 focus:outline-none"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </td>
                <td className="pl-4">
                  <img className="cursor-pointer" src="/images/add.svg" alt="add-user"
                  onClick={handleSubmit} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="leading-6 ">
          <div className="flex justify-start items-center ">
            <p className=" font-bold text-sm ml-6 mt-2 ">Security</p>
          </div>
          <div className="bg-[#BFC8CC] h-0.5 ml-6 mr-12"></div>
          <div className="flex items-center mt-10 justify-start text-sm font-normal cursor-pointer ml-10">
            <label className="  "> Two-Factor Authenticator</label>
            <input
              type="checkbox"
              className="  h-5 w-5 ml-5  border-[#B0BABF] accent-black border rounded-sm "
            />
          </div>
        </div>

        <div className=" mt-32">
          <div className="flex justify-start items-center ">
            <p className=" font-bold text-sm ml-6 mt-2 ">SMTP Settings</p>
          </div>

          <div className="bg-[#BFC8CC] h-0.5 ml-6 mr-12"></div>
          <div className="flex items-center mt-10 justify-start text-sm font-normal cursor-pointer ml-10">
            <label className="  "> Two-Factor Authenticator</label>
            <input
              type="checkbox"
              className="  h-5 w-5 ml-5  border-[#B0BABF] accent-black border rounded-sm "
            />
          </div>

        </div>
      </div>
    </React.Fragment>
  );
}
