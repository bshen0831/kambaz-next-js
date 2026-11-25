import type { Folder } from "../../../../store/pazzaStore";

// Folder picker used by New Post and by Edit Post. Keeps the selection in the folders' display order.
export default function FolderCheckboxes({
    folders,
    selected,
    onChange,
}: {
    folders: Folder[];
    selected: string[];
    onChange: (folderIds: string[]) => void;
}) {
    const toggle = (folderId: string, checked: boolean) =>
        onChange(
            folders
                .filter((f) => (f._id === folderId ? checked : selected.includes(f._id)))
                .map((f) => f._id),
        );

    if (folders.length === 0) {
        return <p className="wd-pazza-empty">This course has no folders yet.</p>;
    }

    return (
        <div className="wd-pazza-folder-options">
            {folders.map((folder) => (
                <label key={folder._id} className="wd-pazza-folder-option">
                    <input
                        type="checkbox"
                        name="wd-pazza-folders"
                        value={folder._id}
                        checked={selected.includes(folder._id)}
                        onChange={(event) => toggle(folder._id, event.target.checked)}
                    />
                    {folder.name}
                </label>
            ))}
        </div>
    );
}
