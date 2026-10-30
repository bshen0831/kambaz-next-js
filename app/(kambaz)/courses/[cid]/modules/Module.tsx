import { useState, type ReactNode } from "react";
import ModuleControlButtons from "./ModuleControlButtons";
import { useModulesStore, type CourseModule } from "../../../store/modulesStore";

export default function Module({
    module,
    children,
}: {
    module: CourseModule;
    children?: ReactNode;
}) {
    const updateModule = useModulesStore((state) => state.updateModule);
    const [draft, setDraft] = useState(module.name);
    const save = () => {
        const name = draft.trim();
        if (name) {
            updateModule({ ...module, name, editing: false });
        } else {
            cancel();
        }
    };
    const cancel = () => {
        setDraft(module.name);
        updateModule({ ...module, editing: false });
    };
    return (
        <li className="wd-module mb-5 overflow-hidden border border-neutral-400 p-0 text-xl">
            <div className="wd-title flex items-center justify-between bg-neutral-200 p-3 ps-2">
                {module.editing ? (
                    <input
                        className="mr-3 w-full rounded border border-neutral-300 bg-white px-2 py-1 text-base"
                        value={draft}
                        autoFocus
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") save();
                            if (e.key === "Escape") cancel();
                        }}
                    />
                ) : (
                    <span>{module.name}</span>
                )}
                <ModuleControlButtons moduleId={module._id} />
            </div>
            <ul className="wd-lessons m-0 list-none p-0">{children}</ul>
        </li>
    );
}
