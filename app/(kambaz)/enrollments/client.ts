import axios from "axios";
import type { Enrollment } from "../store/enrollmentsStore";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;

// userId may be a real id or "current" for the signed-in user
export const findEnrollmentsForUser = async (
    userId: string = "current",
): Promise<Enrollment[]> => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/${userId}/enrollments`);
    return data;
};
export const enrollIntoCourse = async (
    userId: string,
    courseId: string,
): Promise<Enrollment> => {
    const { data } = await axiosWithCredentials.post(
        `${USERS_API}/${userId}/courses/${courseId}`,
    );
    return data;
};
export const unenrollFromCourse = async (
    userId: string,
    courseId: string,
): Promise<void> => {
    await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
};
