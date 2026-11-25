import axios from "axios";
import type { User } from "../account/AccountContext";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

// Users returned for the People screen never include passwords
export type Person = Omit<User, "password"> & { password?: string };

export const findUsersForCourse = async (courseId: string): Promise<Person[]> => {
    const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
    return data;
};
export const createUserForCourse = async (
    courseId: string,
    user: Omit<Person, "_id">,
): Promise<Person> => {
    const { data } = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/users`,
        user,
    );
    return data;
};
export const updateUser = async (user: Partial<Person> & { _id: string }): Promise<Person> => {
    const { data } = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return data;
};
export const deleteUser = async (userId: string): Promise<void> => {
    await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
};
