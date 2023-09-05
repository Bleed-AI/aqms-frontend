import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext/UserContext";
import { BASE_URL } from "../config/constants"

export const useGroups = (org_id) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const {user} = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${BASE_URL}/orgs/${org_id}/groups`, {
                headers: { "Authorization": `Bearer ${user["access_token"]}` }
            });
            setData(response.data);
            setLoading(false)
        };
        if (org_id !== undefined && user) {
            setLoading(true)
            fetchData();
        }
    }, [org_id, user])

    return [data, loading];
}


export const useDevices = (org_id) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const {user} = useContext(UserContext);

    useEffect(() => {
        
        const fetchData = async () => {
            const response = await axios.get(`${BASE_URL}/orgs/${org_id}/devices`, {
                headers: { "Authorization": `Bearer ${user["access_token"]}` }
            });
            setData(response.data);
            setLoading(false)
        }
        if (org_id !== undefined && user) {
            setLoading(true)
            fetchData();
        }
    }, [org_id, user])

    return [data, loading];
}


