import axios from "axios";
import { useAppDispatch } from "../app/hooks";
import { useQueryClient, useMutation } from "react-query";
import { resetEditedTask, toggleCsrfState } from "../slices/appSlice";
import { Task } from "../types/types";
import { useHistory } from "react-router-dom";

export const UseMutateTask = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()

    // Taskからomitでidだけ取り除いたデータ型を定義
    const createTaskMutation = useMutation(
        (task: Omit<Task, 'id'>) =>
        // 受け取った引数のTaskをPOSTメソッドの第二引数としてデータを渡す。
            axios.post<Task>(`${process.env.REACT_APP_API_URL}/todo`, task, {
                withCredentials: true,
            }),
        {
            onSuccess: (res) => {
                // queryClient.getQueryData: キー('tasks')を指定し、既存のキャッシュデータの一覧を取得
                const previousTodos = queryClient.getQueryData<Task[]>('tasks')
                if (previousTodos) {
                    queryClient.setQueryData('tasks', [...previousTodos, res.data])
                }
                dispatch(resetEditedTask())
            },
            onError: (err: any) => {
                alert(`${err.response.data.detail}\n${err.message}`)
                if (
                    err.response.data.detail === 'The JWT has expired.' ||
                    err.response.data.detail === 'The CSRF token has expired.'
                ) {
                    // CSRFtokenを最後取得し、編集中のタスクをリセット、そしてLogin画面へ推移
                    dispatch(toggleCsrfState())
                    dispatch(resetEditedTask())
                    history.push('/')
                }
            },
        }
    )
    const updateTaskMutation = useMutation((task: Task) => 
            axios.put<Task>(
                `${process.env.REACT_APP_API_URL}/todo/${task.id}`,
                {
                    // axiosの第2引数としてtitle,descriptionをobjectの形で渡す。返り値はTask型
                    title: task.title,
                    description: task.description,
                },
                {
                    withCredentials: true,
                }
            ),
        {
            // 第1引数：axios.putの処理結果、　第2引数：useMutationの引数Task
            onSuccess: (res, variables) => {
                const previousTodos = queryClient.getQueryData<Task[]>('tasks')
                if (previousTodos) {
                    // setQueryDataでキャッシュの更新を行う。
                    queryClient.setQueryData<Task[]>(
                        'tasks',
                        // 既存のTask一覧をmapで展開する
                        previousTodos.map((task) => 
                            // variables.idと合致するtask.idのみres.idで更新後のデータに置き換え。それ以外はそのまま
                            task.id === variables.id ? res.data : task
                        )
                    )
                }
                dispatch(resetEditedTask())
            },
            onError: (err: any) => {
                alert(`${err.response.data.detail}\n${err.message}`)
                if (
                    err.response.data.detail === 'The JWT has expired.' ||
                    err.response.data.detail === 'The CSRF token has expired.'
                ) {
                    // CSRFtokenを最後取得し、編集中のタスクをリセット、そしてLogin画面へ推移
                    dispatch(toggleCsrfState())
                    dispatch(resetEditedTask())
                    history.push('/')
                }
            },
        }
    )
    const deleteTaskMutation = useMutation(
        (id: string) => 
            axios.delete(`${process.env.REACT_APP_API_URL}/todo/${id}`, {
                withCredentials: true,
            }),
        {
            onSuccess: (res, variables) => {
                const previousTodos = queryClient.getQueryData<Task[]>('tasks')
                if (previousTodos) {
                    queryClient.setQueryData<Task[]>(
                        'tasks',
                        // 既存のTask一覧に対してfilterをかけ、今削除したTask以外のTaskの要素を取り出し新たな配列を生成し、
                        // setQueryDataでキャッシュ内容を更新
                        previousTodos.filter((task) => task.id !== variables)
                    )
                }
                dispatch(resetEditedTask())
            },
            onError: (err: any) => {
                alert(`${err.response.data.detail}\n${err.message}`)
                if (
                    err.response.data.detail === 'The JWT has expired.' ||
                    err.response.data.detail === 'The CSRF token has expired.'
                ) {
                    // CSRFtokenを最後取得し、編集中のタスクをリセット、そしてLogin画面へ推移
                    dispatch(toggleCsrfState())
                    dispatch(resetEditedTask())
                    history.push('/')
                }
            },
        }
    )

    return {
        createTaskMutation,
        updateTaskMutation,
        deleteTaskMutation,
    }
}