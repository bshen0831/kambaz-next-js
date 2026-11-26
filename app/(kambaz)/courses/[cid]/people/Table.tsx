"use client";
import { FaUserCircle } from "react-icons/fa";
import type { Person } from "../../../users/client";
import { useState } from "react";
import PeopleDetails from "./Details";

export default function PeopleTable({
    users = [],
    fetchUsers,
}: {
    users?: Person[];
    fetchUsers: () => void;
}) {
    const [showDetails, setShowDetails] = useState(false);
    const [showUserId, setShowUserId] = useState<string | null>(null);
    return (
        <div id="wd-people-table" className="overflow-x-auto">
            {showDetails && (
                <PeopleDetails
                    key={showUserId}
                    uid={showUserId}
                    onClose={() => {
                        setShowDetails(false);
                        // refresh the list in case the user was edited while the panel was open
                        fetchUsers();
                    }}
                />
            )}
            <table className="w-full border-collapse text-left text-sm">
                <thead>
                    <tr className="border-b border-neutral-300">
                        <th className="p-2">Name</th>
                        <th className="p-2">Login ID</th>
                        <th className="p-2">Section</th>
                        <th className="p-2">Role</th>
                        <th className="p-2">Last Activity</th>
                        <th className="p-2">Total Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="odd:bg-neutral-50">
                            <td className="wd-full-name p-2 text-nowrap">
                                <button
                                    type="button"
                                    className="cursor-pointer border-0 bg-transparent p-0 text-red-700 hover:underline"
                                    onClick={() => {
                                        setShowDetails(true);
                                        setShowUserId(user._id);
                                    }}
                                >
                                    <FaUserCircle className="me-2 inline text-3xl text-neutral-500" />
                                    <span className="wd-first-name">{user.firstName}</span>{" "}
                                    <span className="wd-last-name">{user.lastName}</span>
                                </button>
                            </td>
                            <td className="wd-login-id p-2">{user.loginId}</td>
                            <td className="wd-section p-2">{user.section}</td>
                            <td className="wd-role p-2">{user.role}</td>
                            <td className="wd-last-activity p-2">{user.lastActivity}</td>
                            <td className="wd-total-activity p-2">{user.totalActivity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}