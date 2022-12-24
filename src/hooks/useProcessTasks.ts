import { FormEvent } from "react";
import { useAppSelector } from "../app/hooks";
import { UseMutateTask } from "./useMutateTasks";
import { selectTask } from "../slices/appSlice";

export const useProcessTask = () => {
    const editedTask = useAppSelector(selectTask)
    const { createTaskMutation, updateTaskMutation } = UseMutateTask()
    const processTask = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // idが空の場合はcreate
        if (editedTask.id === '')
            createTaskMutation.mutate({
                // editedTaskのstateにtitle,descriptionを渡す
                title: editedTask.title,
                description: editedTask.description,
            })
        // idに値がある場合はupdate
        else {
            updateTaskMutation.mutate(editedTask)
        }
    }
    return { processTask }
}