import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setConfig, setLoading, setManifest, setNef } from "@/redux/slice"

import grill from '@subsocial/grill-widget'

export const Header = () => {

  const dispatch = useAppDispatch()
  const contract = useAppSelector((store) => store.code.contractCode)

  const loading = useAppSelector((store) => store.code.loading)

  return <div className="navbar bg-base-100">
    <div className="flex-1">
      <a className="btn btn-ghost normal-case text-xl">
        <h1 className='font-bold text-2xl flex flex-row items-center'><img src="/speedink-logo.png" className='h-12' /></h1>
      </a>
      fastest way to go live 🚀
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1 font-bold text-lg">
        <li><a onClick={() => {

          const config = {
            hub: { id: '' },
          }
          grill.init(config as any)
        }} className="font-normal mr-2 boder-2 hover:bg-white">Ask Chat</a></li>
        <li><a className="border-2 border-accent">{loading ? 'Loading..' : 'Compile'}</a></li>
      </ul>
    </div>
  </div>
}