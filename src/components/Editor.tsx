
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMessages, setContractCode, setLoading, setPseudoCode } from "@/redux/slice";
import { startNewContract, systemRecord, updateSmartContract } from "@/ai/openai";


import brace from 'brace'
import 'brace/mode/rust';

export type EditorProps = {
  name: string;
  title: string;
  className: string;
  showAction?: boolean;
  padding?: number;
  themeName?: string;
  type: 'pseudo' | 'contract'
}

export const Editor = ({ type, name, title, padding, showAction, className }: EditorProps) => {

  const dispatch = useAppDispatch()
  const loading = useAppSelector((store) => store.code.loading)
  const pseudo = useAppSelector((store) => store.code.pseudoCode)
  const messages = useAppSelector((store) => store.code.messages)

  let text
  if (type == 'pseudo') {
    text = useAppSelector((store) => store.code.pseudoCode)
  } else {
    text = useAppSelector((store) => store.code.contractCode)
  }

  const contractCode = useAppSelector((store) => store.code.contractCode)

  const purpose = useAppSelector((store) => store.code.title)

  const updateText = (t: string) => {
    if (type == 'pseudo') {
      dispatch(setPseudoCode(t))
      return
    }
    dispatch(setContractCode(t))
  }

  const convertFurther = async () => {
    dispatch(setLoading(true))
    if (contractCode !== '') {
      // Do followups.
      const msgs = [...messages, {
        role: "user", content: pseudo
      }]

      console.log("here, folloups", msgs)
      const response = await updateSmartContract(messages)

      if (response) {
        dispatch(setLoading(false))

        dispatch(setContractCode(response))
        msgs.push({ role: 'assistant', content: response })
        dispatch(addMessages([{
          role: "user", content: pseudo
        }, { role: 'assistant', content: response }]))
      }
      return;
    }
    console.log("here, first time", purpose, pseudo)
    // generate first draft.
    const response = await startNewContract(purpose, pseudo)

    if (response) {
      dispatch(setLoading(false))
      dispatch(setContractCode(response))

      const messages = [{
        'role': 'system',
        'content': systemRecord
      }, {
        'role': 'user',
        'content': `here are my requirements ${pseudo}`
      }, {
        'role': 'user',
        'content': `I want to write a smart contract for ${purpose}. Your response should be just the contract itself, no explaination, titles or intro required.`
      }, {
        'role': 'assistant',
        'content': response
      }]

      dispatch(addMessages(messages))
    }
  }

  return (
    <div className="flex flex-1 w-full bg-red-200 flex-col mb-4" style={{ paddingRight: padding }}>
      <div className="flex flex-row w-full justify-between p-2">
        <h1 className="text-2xl p-2 font-bold">{title}</h1>
        {showAction && <button disabled={loading} onClick={convertFurther} className="btn btn-accent px-8">{loading ? 'Loading...' : '▶️ Convert'}</button>}
      </div>
      <AceEditor
        style={{ width: '100%' }}
        className={"bg-[#00E59A] flex flex-1 w-full " + className}
        value={text}
        mode="rust"
        fontSize={16}
        theme="solarized_light"
        onChange={updateText}
        showGutter
        wrapEnabled
        showPrintMargin={false}
        highlightActiveLine
        name={name}
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  )
}