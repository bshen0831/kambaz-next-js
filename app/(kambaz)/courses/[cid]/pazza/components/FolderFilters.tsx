import { DEFAULT_FOLDERS } from "../folders";

export default function FolderFilters() {
    const selectedFolder = ""; // skeleton: highlighted by hand, later decided by state

    return (
        <div id="wd-pazza-folder-filters" className="wd-pazza-folder-filters">
            {DEFAULT_FOLDERS.map((folder) => (
                <button
                    key={folder}
                    type="button"
                    className={`wd-pazza-folder ${folder === selectedFolder ? "wd-active" : ""}`}
                >
                    {folder}
                </button>
            ))}
        </div>
    );
}
