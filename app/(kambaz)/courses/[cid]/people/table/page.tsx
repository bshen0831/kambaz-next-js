import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
    return (
        <div id="wd-people-table" className="overflow-x-auto">
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
                    <tr className="odd:bg-neutral-50">
                        <td className="p-2 text-nowrap">
                            <FaUserCircle className="me-2 inline align-middle text-4xl text-neutral-500" />Tony Stark
                        </td>
                        <td className="p-2">001234561S</td>
                        <td className="p-2">S101</td>
                        <td className="p-2">STUDENT</td>
                        <td className="p-2">2020-10-01</td>
                        <td className="p-2">10:21:32</td>
                    </tr>

                    <tr className="odd:bg-neutral-50">
                        <td className="p-2 text-nowrap">
                            <FaUserCircle className="me-2 inline align-middle text-4xl text-neutral-500" />
                            Jane Sample
                        </td>
                        <td className="p-2">001234562S</td>
                        <td className="p-2">S103</td>
                        <td className="p-2">STUDENT</td>
                        <td className="p-2">2020-10-15</td>
                        <td className="p-2">8:45:21</td>
                    </tr>

                    <tr className="odd:bg-neutral-50">
                        <td className="p-2 text-nowrap">
                            <FaUserCircle className="me-2 inline align-middle text-4xl text-neutral-500" />
                            Alex Sample
                        </td>
                        <td className="p-2">001234563S</td>
                        <td className="p-2">S104</td>
                        <td className="p-2">STUDENT</td>
                        <td className="p-2">2020-10-20</td>
                        <td className="p-2">7:32:15</td>
                    </tr>

                    <tr className="odd:bg-neutral-50">
                        <td className="p-2 text-nowrap">
                            <FaUserCircle className="me-2 inline align-middle text-4xl text-neutral-500" />
                            Sam Sample
                        </td>
                        <td className="p-2">001234564S</td>
                        <td className="p-2">S105</td>
                        <td className="p-2">STUDENT</td>
                        <td className="p-2">2020-10-25</td>
                        <td className="p-2">9:15:48</td>
                    </tr>

                    <tr className="odd:bg-neutral-50">
                        <td className="p-2 text-nowrap">
                            <FaUserCircle className="me-2 inline align-middle text-4xl text-neutral-500" />
                            John Doe
                        </td>
                        <td className="p-2">123498ufasd</td>
                        <td className="p-2">S102</td>
                        <td className="p-2">STUDENT</td>
                        <td className="p-2">2020-12-02</td>
                        <td className="p-2">12:12:52</td>
                    </tr>
                    <tr className="odd:bg-neutral-50">
                        <td className="p-2 text-nowrap">
                            <FaUserCircle className="me-2 inline align-middle text-4xl text-neutral-500" />
                            Jane Doe
                        </td>
                        <td className="p-2">1394814</td>
                        <td className="p-2">S102</td>
                        <td className="p-2">STUDENT</td>
                        <td className="p-2">2022-12-21</td>
                        <td className="p-2">12:12:52</td>
                    </tr>
                    <tr className="odd:bg-neutral-50">
                        <td className="p-2 text-nowrap">
                            <FaUserCircle className="me-2 inline align-middle text-4xl text-neutral-500" />
                            Baby Doe
                        </td>
                        <td className="p-2">12fd4321</td>
                        <td className="p-2">S101</td>
                        <td className="p-2">STUDENT</td>
                        <td className="p-2">2022-11-19</td>
                        <td className="p-2">12:12:52</td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
}