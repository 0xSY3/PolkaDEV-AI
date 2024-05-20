import { useEffect } from "react"
import { Editor } from "./Editor"
import { Header } from "./Header"
import { startNewContract, writeFirstPseudoCode } from "@/ai/openai"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setLoading, setPseudoCode } from "@/redux/slice"

export const CodeScreen = () => {

  const title = useAppSelector((state) => state.code.title)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const initPseudo = async () => {
      try {
        const response = await writeFirstPseudoCode(title)
        console.log(response)

        if (response['response']) {
          dispatch(setPseudoCode(response['response']))
          dispatch(setLoading(false))
        }
      } catch (e) {
        console.log(e)
      }
    }
    initPseudo()
  }, [])

  return <div className='flex flex-1 h-screen flex-col bg-red-100'>
    <Header />
    <div className='flex flex-1'>
      <Editor type="pseudo" showAction padding={8} className="mr-2" title={'Pseudo Code'} name={'writing-window'} />
      <Editor type="contract" className="bg-white" title={'Generated Contract'} name={'code-window'} />
    </div>
  </div>
}