import { VFC } from 'react'
import { LogoutIcon } from '@heroicons/react/outline'
import { ShieldCheckIcon } from "@heroicons/react/solid"
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setEditedTask, selectTask } from '../slices/appSlice'
import { useProcessAuth } from '../hooks/useProcessAuth'
import { useProcessTask } from '../hooks/useProcessTasks'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { useQueryUser } from '../hooks/useQueryUser'
import { TaskItem } from './TaskItem'

export const Todo: VFC = () => {
  const { logout } = useProcessAuth()
  const { data: dataUser } = useQueryUser()
  const { data: dataTasks, isLoading: isLoadingTasks } = useQueryTasks()
  const { processTask } = useProcessTask();
  const dispatch = useAppDispatch();
  const editedTask = useAppSelector(selectTask);
  return(
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className='flex items-center'>
        <ShieldCheckIcon className='h-8 w-8 mr-3 text-green-500 cursor-pointer' />
        <span className='text-center text-3xl font-extrabold'>CRUD tasks</span>
      </div>
      <p className='my-3 text-sm'>{dataUser?.email}
      </p>
      <LogoutIcon
        onClick={logout}
        className="h-7 w-7 mt-1 mb-5 text-blue-500 cursor-pointer"
      />
      <form onSubmit={processTask}>
        <input
          className='mb-3 mr-3 px-3 py-2 border border-gray-300'
          placeholder='title ?'
          type='text'
          onChange={(e) => 
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }
          value={editedTask.title}
        />
        <input
          className='mb-3 px-3 py-2 border border-gray-300'
          placeholder='description ?'
          type='text'
          onChange={(e) =>
            dispatch(
              setEditedTask({ ...editedTask, description: e.target.value })
            )
          }
          value={editedTask.description}
        />
        <button
          className=' const editedTask: Task py-2 px-3 text-white bg-indigo-600 rounded'
          // editedTask???title or description??????????????????????????????????????????
          disabled={!editedTask.title || !editedTask.description}
        >
          {editedTask.id === '' ? 'Create' : 'Update'}
        </button>
      </form>
      {isLoadingTasks ? (
        // isLoadingTask???True???????????????????????????????????????
        <p>Loading...</p>
      ) : (
        // isLoadingTask???False???????????????????????????????????????????????????
        <ul className='my-5'>
          {/* dataTasks???????????????????????????map????????? */}
          {dataTasks?.map((task) => (
            // TaskItem????????????????????????props?????????id, title, description????????????????????????
            <TaskItem
             key={task.id}
             id={task.id}
             title={task.title}
             description={task.description}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
