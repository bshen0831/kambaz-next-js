import axios from "axios";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const TODOS_API = `${HTTP_SERVER}/lab6/todos`;

export type Todo = {
    _id: string;
    title: string;
    completed: boolean;
    description?: string;
};

export const findAllTodos = async (): Promise<Todo[]> => {
    const response = await axios.get(TODOS_API);
    return response.data;
};
export const findCompletedTodos = async (): Promise<Todo[]> => {
    const response = await axios.get(TODOS_API, { params: { completed: true } });
    return response.data;
};
export const createTodo = async (title: string, description: string): Promise<Todo> => {
    const response = await axios.post(TODOS_API, { title, description, completed: false });
    return response.data;
};
export const setTodoCompleted = async (todoId: string, completed: boolean): Promise<Todo> => {
    const response = await axios.put(`${TODOS_API}/${todoId}`, { completed });
    return response.data;
};
export const deleteTodo = async (todoId: string) => {
    await axios.delete(`${TODOS_API}/${todoId}`);
};

// ---- Users (uses the Kambaz users API; credentials send the session cookie) ----
const USERS_API = `${HTTP_SERVER}/api/users`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export type LabUser = {
    _id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role: string;
    section?: string;
    loginId?: string;
};

export const findUsers = async (filters: { role?: string; name?: string } = {}): Promise<LabUser[]> => {
    // axios leaves out params that are undefined
    const response = await axiosWithCredentials.get(USERS_API, {
        params: { role: filters.role || undefined, name: filters.name || undefined },
    });
    return response.data;
};
export const findUserById = async (userId: string): Promise<LabUser> => {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}`);
    return response.data;
};
export const createUser = async (
    user: Omit<LabUser, "_id"> & { password: string },
): Promise<LabUser> => {
    const response = await axiosWithCredentials.post(USERS_API, user);
    return response.data;
};
export const updateUser = async (user: Partial<LabUser> & { _id: string }) => {
    await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
};
export const deleteUser = async (userId: string) => {
    await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
};
