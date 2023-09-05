import React, { useContext, useEffect, useState } from "react";
import NavBar from "../Dashboard/NavBar";
import Footer from "../Dashboard/Footer";
import axios from "axios";
import { UserContext } from "../../context/UserContext/UserContext";
import { BASE_URL } from "../../config/constants";
import Middleware from "../../middleware/middleware";
import { useNavigate, useParams } from "react-router-dom";


export default function BaseLayout({ children, group, activeView, setActiveView, fileConfiguration }) {
  const { org_id } = useParams();
  const { user } = useContext(UserContext);
  const [active, setActive] = useState();
  const [organizations, setOrganization] = useState();
  const navigate = useNavigate();


  const getOrganizations = async () => {
    const response = await axios.get(`${BASE_URL}/orgs`, {
      headers: { "Authorization": `Bearer ${user["access_token"]}` }
    });
    const data = response.data;
    setOrganization(data);


    if (org_id === undefined) {
      setActive(data[0].name.split(".")[1]);
      navigate(`/dashboard/${data[0].id}`);
    } else {
      setActive(data.find((item) => item.id === org_id).name.split(".")[1]);
    }
  };

  useEffect(() => {
    if (user) {
      getOrganizations();
    }
  }, [user])

  return (
    <Middleware>
        {organizations ?
          <div className=" min-h-screen flex flex-col justify-between">
            <NavBar organizations={organizations} setActive={setActive} active={active} activeView={activeView} setActiveView={setActiveView} group={group} org_id={org_id} />
            <div className="min-h-[calc(100vh-300px)]">{children}</div>
              <Footer />
            </div> :
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FB9E00]"></div>
          </div>
        }
        
    </Middleware>
  );
}
