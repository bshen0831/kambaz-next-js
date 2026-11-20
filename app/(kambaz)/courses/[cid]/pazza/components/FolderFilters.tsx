"use client";

import { useParams } from "next/navigation";
import { usePazzaStore } from "../../../../store/pazzaStore";

// Clicking a folder filters the list of posts; clicking it again clears the filter
export default function FolderFilters() {
    const { cid } = useParams<{ cid: string }>();
    const allFolders = usePazzaStore((state) => state.folders);
    const selectedFolder = usePazzaStore((state) => state.selectedFolder[cid] ?? null);
    const selectFolder = usePazzaStore((state) => state.selectFolder);
    const folders = allFolders.filter((folder) => folder.course === cid);

    return (
        <div id="wd-pazza-folder-filters" className="wd-pazza-folder-filters">
            {folders.length === 0 && <span className="wd-pazza-author">No folders yet</span>}
            {folders.map((folder) => {
                const active = folder._id === selectedFolder;
                return (
                    <button
                        key={folder._id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => selectFolder(cid, active ? null : folder._id)}
                        className={`wd-pazza-folder ${active ? "wd-active" : ""}`}
                    >
                        {folder.name}
                    </button>
                );
            })}
        </div>
    );
}
