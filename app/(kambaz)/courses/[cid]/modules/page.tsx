"use client";

import { useParams } from "next/navigation";
import Module from "./Module";
import Lesson from "./Lesson";
import ModulesControls from "./ModulesControls";
import {
    useModulesStore,
    type CourseModule,
} from "../../../store/modulesStore";
import { useEffect } from "react";
import * as client from "../../client";


export default function Modules() {
    const { cid } = useParams<{ cid: string }>();
    const modules = useModulesStore((state) => state.modules).filter(
        (module) => module.course === cid
    );
    const setModules = useModulesStore((state) => state.setModules);
    const addModule = useModulesStore((state) => state.addModule);
    const deleteModule = useModulesStore((state) => state.deleteModule);
    const updateModule = useModulesStore((state) => state.updateModule);
    useEffect(() => {
        const load = async () => {
            setModules(await client.findModulesForCourse(cid));
        };
        load();
    }, [cid, setModules]);
    const onAddModule = async (moduleName: string) => {
        const created = await client.createModuleForCourse(cid, {
            name: moduleName,
        });
        addModule(created);
    };
    const onRemoveModule = async (moduleId: string) => {
        await client.deleteModule(moduleId);
        deleteModule(moduleId);
    };

    const onUpdateModule = async (module: CourseModule) => {
        // "editing" is UI-only state; don't persist it to the server
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { editing, ...moduleToSave } = module;
        const saved = await client.updateModule(moduleToSave);
        updateModule(saved);
    };


    return (
        <div>
            <ModulesControls onAddModule={onAddModule} />
            <ul id="wd-modules" className="m-0 list-none p-0">
                {modules.map((module) => (
                    <Module
                        key={module._id}
                        module={module}
                        onUpdateModule={onUpdateModule}
                        onRemoveModule={onRemoveModule}
                    >
                        {module.lessons?.map((lesson) => (
                            <Lesson key={lesson._id} title={lesson.name} />
                        ))}
                    </Module>
                ))}
            </ul>
        </div>
    );
}
