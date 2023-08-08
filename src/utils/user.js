import { useContext, useEffect, useState } from "react"
import { BASE_URL } from "../config/constants"
import axios from "axios"
import { UserContext } from "../context/UserContext/UserContext"

export function useUser() {
    const [users, setUsers] = useState()
    const { user } = useContext(UserContext)

    useEffect(() => {
        // Fetch user from backend

        const fetchUser = async () => {
            const users = await axios.get(`${BASE_URL}/users`, {
                headers: { "Authorization": `Bearer ${user["access_token"]}` }
            });
            setUsers(users.data)
        }
        if (user) {
            fetchUser()
        }
    }, [user])

    return users
}


export const addUser = async (user) => {
    const url = BASE_URL + "/users/create";
    
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: user,
      url,
    };
    const response = await axios(options);
    return response.data
}



export const deleteUser = async (id) => {
    const url = BASE_URL + `/users/${id}`;
    const user = JSON.parse(localStorage.getItem("user"));
    const options = {
        method: "DELETE",
        headers: { "content-type": "application/json","Authorization": `Bearer ${user["access_token"]}` },
        url,
    };

    const response = await axios(options);
    return response.data
}




export function makePassowrd(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.!?@#$%^&*()_+';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}