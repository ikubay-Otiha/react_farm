import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { Task } from "../types/types";

export interface AppState {
    editedTask: Task
    csrfTokenExp: boolean
}

// ReduxのStateの初期値を定義
const initialState: AppState = {
    editedTask: {
        id: '',
        title: '',
        description: '',
    },
    csrfTokenExp: false,
}

// Sliceを作成
export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        // アクションの定義
        setEditedTask: (state, action: PayloadAction<Task>) => {
            state.editedTask = action.payload
        },
        resetEditedTask: (state) => {
            state.editedTask = initialState.editedTask
        },
        toggleCsrfState: (state) => {
            state.csrfTokenExp = !state.csrfTokenExp
        },
    },
})