import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config/constants";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [viewPassword, setViewPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && location.pathname === "/"){
      navigate("/dashboard")
      return
    }
  },[])

  // This function login the user by calling the /token endpoint
  const login = async (e) => {
    // Prevents the submit button from reloading
    e.preventDefault();

    // Adds
    const url = BASE_URL + "/token";
    const data = { username: email, password: password };
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url,
    };

    try {
      const response = await axios(options);
      const expiryTime = new Date(new Date().getTime() + 40*60000);
      response.data["expiryTime"] = expiryTime;

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data))
        navigate("/dashboard")
        window.location.reload();
      }
    }
    catch {
      alert("Invalid username or password!")
    }
  };

  return (
    <>
      <div className="mt-[15%] flex ">
        <div className="flex justify-center w-1/2 login ">
          <span className=" font-bold pt-4 leading-[77px] text-left text-6xl MRS-shadow  ">
            MRS Budget <br /> Management
          </span>
        </div>
        <div className=" w-1/2 flex justify-center ">
          <form className="login-form">
            <div className=" rounded-md shadow-sm ">
              <div className=" flex items-center justify-between w-[397.15px] h-[61.38px]  rounded-[10px]  px-5 bg-[#EAF0F7] text-[#4F555A] leading-[77px]">
                <input
                  name="email"
                  type="email"
                  value={email}
                  required
                  className=" bg-transparent tracking-[3px]  h-10 w-full focus:outline-none "
                  placeholder="Enter Email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <img className="ml-2 cursor-pointer" src="/images/x-icon.svg" alt=""
                 onClick={()=>setEmail("")} />
              </div>
              <div className=" flex items-center text-[26px]  mt-5 justify-between w-[397.15px] h-[61.38px]  rounded-[10px]  px-5 bg-[#EAF0F7] text-[#4F555A] leading-6">
                <input
                  name="password"
                  type={viewPassword ? "text" : "password"}
                  required
                  className=" bg-transparent h-10 w-full focus:outline-none "
                  placeholder=""
                  onChange={(event) => setPassword(event.target.value)}
                />
                <img
                  className="pl-2 cursor-pointer "
                  src="/images/hide.svg"
                  alt=""
                  onClick={() => setViewPassword(!viewPassword)}
                />
              </div>
            </div>

            <div className="text-sm leading-[77px] font-normal tracking-[3px] py-2 flex justify-end">
              <a
                href="#"
                className="font-medium text-[#C7C7C7] hover:text-[#FB9E00]"
              >
                Recover Password ?
              </a>
            </div>

            <div className="">
              <button
                type="submit"
                className="group relative h-[61.5px] flex w-full justify-center rounded-[10px]  bg-[#FB9E00] signin-shadow px-3 py-5 text-sm font-normal text-white"
                onClick={login}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
