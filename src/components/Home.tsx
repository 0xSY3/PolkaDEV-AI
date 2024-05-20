import { useAppDispatch } from "@/redux/hooks"
import { useState } from "react"
import { setLoading, setTitle as setReduxTitle } from '@/redux/slice'

export const HomeView = () => {

  const [title, setTitle] = useState('')
  const dispatch = useAppDispatch()

  return (
    <div className='flex flex-1 flex-col h-screen justify-center items-center bg-white'>

      <h1 className='font-bold text-5xl flex flex-row items-center'><img src="/speedink-logo.png" className='h-24' /></h1>
      <p>the fastest way to go live with Ink! Contract 🚀</p>
      <div className='flex flex-row items-center justify-center mt-4'>
        <input onKeyDown={(k) => {
          if (k.key === 'Enter') {
            dispatch(setReduxTitle(title))
            dispatch(setLoading(true))
          }
        }} onChange={(e) => setTitle(e.currentTarget.value)} type="text" placeholder="What are you planning to build?" className="input input-bordered input-accent w-[40vw] max-w-[60vw] py-2" />
        <button onClick={() => {
          dispatch(setReduxTitle(title))

          dispatch(setLoading(true))
        }} className="btn btn-accent text-2xl ml-2">🚀</button>
      </div>
    </div>
  )
}