import { useQuery } from "react-query";
import axios from "axios";
import { Task } from "../types/types";

export const useQueryTasks = () => {
    const getTasks = async () => {
        // 返り値のデータはTask一覧が返ってくるのでTask型のデータ型を定義
        // axiosはFrontendとAPI間の通信ライブラリ
        const { data } = await axios.get<Task[]>(
            // GETmethodでバックエンドのtodoへアクセスする。
            `${process.env.REACT_APP_API_URL}/todo`,
            {
                // backendへJWTトークンを渡していくのでTrue
                withCredentials: true,
            }
        )
        return data
    }
    // userQueryを実行した結果を返す。
    return useQuery<Task[], Error>({
        queryKey: 'tasks',
        queryFn: getTasks,
        staleTime: Infinity,
    })
}