import { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useMutateAuth } from '../hooks/useMutateAuth'

export const useProcessAuth = () => {
    const history = useHistory()
    const queryClient = useQueryClient()
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const { loginMutation, registerMutation, logoutMutation } = useMutateAuth()

    // submitボタンが押された時に実行される関数
    const processAuth = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isLogin) {
            loginMutation.mutate({
                email: email,
                password: pw,
            });
        } else {
            await registerMutation
            .mutateAsync({
                email: email,
                password: pw,
            })
            // 処理が成功した場合ログイン
            .then(() =>
                loginMutation.mutate({
                    email: email,
                    password: pw,
                })
            )
            // 処理が失敗した場合,e-mailとPWのstateを初期化
            .catch(() => {
                setPw('')
                setEmail('')
            })
        }
    }
    const logout = async () => {
        await logoutMutation.mutateAsync()
        queryClient.removeQueries('tasks')
        queryClient.removeQueries('user')
        queryClient.removeQueries('single')
        history.push('/')
    }

    return {
        email,
        setEmail,
        pw,
        setPw,
        isLogin,
        setIsLogin,
        processAuth,
        registerMutation,
        loginMutation,
        logout,
    }
}