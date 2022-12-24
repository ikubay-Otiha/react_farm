import { VFC } from 'react'
import { RefreshIcon } from "@heroicons/react/solid";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { useProcessAuth } from '../hooks/useProcessAuth';

export const Auth: VFC = () => {
  // stateと必要な関数をuseProcessAuthから呼び出し
  const {
    pw,
    setPw,
    email,
    setEmail,
    isLogin,
    setIsLogin,
    registerMutation,
    loginMutation,
    processAuth,
  } = useProcessAuth()

  // ローディング中の処理。Loadingと表示
  if (registerMutation.isLoading || loginMutation.isLoading) {
    return (
      <div className="flex justify-center items-center flex-col min-h-screen ">
        <h1 className="text-xl text-gray-600 font-mono">Loading...</h1>
      </div>
    )
  }

  return (
    <div className='flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono'>
      <div className='flex items-center'>
        <BadgeCheckIcon className='h-8 w-8 mr-2 text-blue-500' />
        <span className='text-center text-3xl font-extrabold'>
          FARM Stack web app
        </span>
      </div>
      {/* isLoginがTrueの場合はLoginと表示、FalseならばCreate a new account */}
      <h2 className='my-6'>{isLogin ? 'Login' : 'Create a new account'}</h2>
      
      {/* Submitがクリックされた時にprocessAuthが呼び出される */}
      <form onSubmit={processAuth}>
        <div>
          <input 
            className='mb-3 px-3 text-sm py-2 border boader-gray-300'
            name='email'
            type='email'
            autoFocus
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            className='mb-3 px-3 text-sm py-2 boader-gray-300'
            name='password'
            type="password"
            placeholder='Password'
            onChange={(e) => setPw(e.target.value)}
            value={pw}
          />
        </div>
        <div className="flex justify-center my-2">
          <button
            className='disabled:opacity-40 py-2 px-4 rounded text-white bg-indigo-600'

            // emailないしはpwが空の場合にはボタンが無効化される
            disabled={!email || !pw}
            type="submit"
          >
            {/* IsLoginのstateによってログインかサインアップになる。 */}
            {isLogin ? 'Login' :'Sign Up'}
          </button>
        </div>
      </form>
      {/* アイコンがクリックされた時にsetIsLoginの実行でisLoginのsteteを反転させる。 */}
      <RefreshIcon
        onClick={() => setIsLogin(!isLogin)}
        className="h-8 w-8 my-2 text-blue-500 cursor-pointer"
      />
    </div>
  )
}