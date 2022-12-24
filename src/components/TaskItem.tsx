import React, { VFC, memo } from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { Task } from "../types/types";
import { useAppDispatch } from "../app/hooks";
import { setEditedTask } from "../slices/appSlice";
import { UseMutateTask } from "../hooks/useMutateTasks";

// id, title, descripitonはprops
const TaskItemMemo: VFC<Task> = ({ id, title, description}) => {
    const dispatch = useAppDispatch();
    const { deleteTaskMutation } = UseMutateTask();
    return(
        <li>
            <span className="font-bold sursor-pointer">{title}</span>
            <div className="flex float-right ml-20">
                <PencilAltIcon
                    className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
                    onClick={() => {
                        dispatch(
                            // クリックされた時にsetEditedTaskが実行される。propsで受け取ったid, title, descriptionを渡す。
                            setEditedTask({
                                id: id,
                                title: title,
                                description: description,
                            })
                        )
                    }}
                />
                <TrashIcon
                    className="h-5 w-5 text-blue-500 cursor-pointer"
                    onClick={() => {
                        // ゴミ箱アイコンがクリックされた時、idを渡してあげて、対象のidを削除
                        deleteTaskMutation.mutate(id)
                    }}
                />
            </div>
        </li>
    )
}
export const TaskItem = memo(TaskItemMemo);