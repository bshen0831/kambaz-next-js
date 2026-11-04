"use client";

import { create } from "zustand";
import usersJson from "../database/users.json";
import type { User } from "../account/AccountContext";

type UsersStore = {
  users: User[];
  addUser: (user: Omit<User, "_id">) => string;
};

export const useUsersStore = create<UsersStore>((set) => ({
  users: usersJson,
  addUser: (user) => {
    const _id = crypto.randomUUID();
    set((state) => ({ users: [...state.users, { ...user, _id }] }));
    return _id;
  },
}));
