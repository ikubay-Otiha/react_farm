// ReduxのSlice内容を作成

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { Task } from "../types/types";

// 型の定義
export interface AppState {
    // 以下2つのStateを管理
    editedTask: Task
    csrfTokenExp: boolean
}

// ReduxのStateの初期値を定義
const initialState: AppState = {
    // 以下、初期値
    editedTask: {
        id: '',
        title: '',
        description: '',
    },
    csrfTokenExp: false,
}

// Slice:ReducerとActionを組み合わせたもの を作成
export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        // アクションの定義
        // AppStateのeditedTaskのStateに値をセットするAction
        setEditedTask: (state, action: PayloadAction<Task>) => {
            state.editedTask = action.payload
        },
        // ReduxのeditedTaskのStateを初期値でリセット
        resetEditedTask: (state) => {
            state.editedTask = initialState.editedTask
        },
        // CSRFトークンのexpireStateのTrue or Falseを判定するアクション
        toggleCsrfState: (state) => {
            state.csrfTokenExp = !state.csrfTokenExp
        },
    },
})
// 上記3つのアクションがReactコンポーネントからDisaptch経由で実行できるようエクスポート
export const { setEditedTask, resetEditedTask, toggleCsrfState } =
    appSlice.actions

// editedTask, csrfTokenExpを返すStateを定義
export const selectTask = (state: RootState) => state.app.editedTask
export const selectCsrfState = (state: RootState) => state.app.csrfTokenExp

export default appSlice.reducer