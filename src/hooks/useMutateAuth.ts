import axios from "axios";
import { useHistory } from "react-router-dom";
import { useMutation } from 'react-query';
import { useAppDispatch } from "../app/hooks";
import { resetEditedTask, toggleCsrfState } from "../slices/appSlice";
import { User } from '../types/types'

export const useMutateAuth = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()

    const loginMutation = useMutation(
        async (user: User) =>
            // FastAPIのloginメソッドにアクセスし、userにe-mail情報を格納
            await axios.post(`${process.env.REACT_APP_API_URL}/login`, user, {
                // trueにするとcookie付きの通信になる。
                withCredentials: true,
            }),
        {
            // アクセスに成功した場合、todoコンポーネントへ飛ぶ
            onSuccess: () => {
                history.push("/todo")
            },
            // アクセスに失敗した場合
            onError: (err: any) => {
                alert(`${err.response.data.detail}\n${err.message}`)
                if (err.response.data.detail === 'The CSRF token has expired.') {
                    // CSRFtokenの有効期限切れを判別するメソッド
                    dispatch(toggleCsrfState())
                }
            },

        }
    )
    const registerMutation = useMutation(
        async (user: User) =>
            await axios.post(`${process.env.REACT_APP_API_URL}/register`, user),
        {
            onError: (err: any) => {
                alert(`${err.response.data.detail}\n${err.message}`)
                if (err.response.data.detail === 'The CSRF token has expired.') {
                    dispatch(toggleCsrfState())
                }
            },
        }
    )
    const logoutMutation = useMutation(
        async () =>
            await axios.post(
                `${process.env.REACT_APP_API_URL}/logout`,
                {},
                {
                    withCredentials: true,
                }
            ),
        {
            onSuccess: () => {
                history.push('/')
            },
            onError: (err: any) => {
                alert(`${err.response.data.detail}\n${err.message}`)
                if (err.response.data.detail === 'The CSRF token has expoired.') {
                    dispatch(toggleCsrfState())
                    // ユーザーが編集中のTaskをリセットする。
                    dispatch(resetEditedTask())
                    history.push('/')
                }
            },
        }
    )

    return { loginMutation, registerMutation, logoutMutation }

}