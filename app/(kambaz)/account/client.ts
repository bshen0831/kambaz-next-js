import axios from "axios";
import type { Person } from "../users/client";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const signin = async (credentials: { username: string; password: string }) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
    return response.data;
};

export const signup = async (user: Record<string, string>) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
};



export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
};

export const profile = async () => {
    const response = await axiosWithCredentials.get(`${USERS_API}/profile`);
    return response.data;
};
export const findAllUsers = async () => {
    const response = await axiosWithCredentials.get(`${USERS_API}`);
    return response.data;
}
export const findUsersByRole = async (role: string) => {
    const response = await axiosWithCredentials.get(USERS_API, { params: { role } });
    return response.data;
};
export const findUsersByPartialName = async (name: string) => {
    const response = await axiosWithCredentials.get(USERS_API, { params: { name } });
    return response.data;
};
export const findUserById = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}`);
    return response.data;
}
export const deleteUser = async (userId: string) => {
    const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
    return response.data;
};
export const updateUser = async (user: Partial<Person> & { _id: string }) => {
    const response = await axiosWithCredentials.put(
        `${USERS_API}/${user._id}`,
        user,
    );
    return response.data;
};
// username and password are required; the server fills in _id
export const createUser = async (
    user: Partial<Omit<Person, "_id">> & { username: string; password: string },
) => {
    const response = await axiosWithCredentials.post(USERS_API, user);
    return response.data;
};