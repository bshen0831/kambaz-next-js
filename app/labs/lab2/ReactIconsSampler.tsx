import "@/app/labs/lab2/tailwind/utilities.css";
import { FaCalendar, FaEnvelopeOpenText, FaRegClock } from "react-icons/fa";
import { AiOutlineCopyright, AiOutlineDashboard, AiOutlinePaperClip } from "react-icons/ai";
import { FaBookBible } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";
import { MdNotifications } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";

export default function ReactIconsSampler() {
    return (
        <div id="wd-react-icons-sampler" className="mb-4 font-sans">
            <h2 className="text-lg font-semibold">React Icons Sampler</h2>
            <div className="flex gap-3 text-3xl">
                <VscAccount />
                <AiOutlineDashboard />
                <FaBookBible />
                <FaCalendar />
                <FaEnvelopeOpenText />
                <FaRegClock />
                <MdNotifications className="text-4xl text-blue-600" />
                <HiSparkles className="text-4xl text-blue-600" />
            </div>
            <div className="mt-4 personal-react-icons">
                <AiOutlineCopyright />
                <AiOutlinePaperClip />
            </div>
        </div>
    );
}