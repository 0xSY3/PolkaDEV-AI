import React, { useState } from "react";
import { Button, Tabs, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { SparklesCore } from "../components/sparkles";
import { TypewriterEffectSmooth } from "../components/typewriter-effect";
import { TypewriterEffectSmoothDemo } from "../components/navbar"
import Audit from "./DOTaudit";

function Home() {
  const navigate = useNavigate();
  const [clarityField, setClarityField] = useState("");



  return (


<div className="flex flex-row items-stretch justify-start h-screen text-center bg-black relative">
    
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-black border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
    <div className="flex w-full items-center justify-between">
          <a className="flex items-center space-x-2" href="/">
            <img src="/artificial.png" alt="OP Knows logo" className="h-12"/>
            <h1 className="text-3xl font-bold transition text-white">Dev AI</h1>
            <div className="relative max-w-fit inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-7 text-small rounded-full bg-warning text-warning-foreground">
            </div>
          </a>
          <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small gap-unit-2 rounded-medium px-unit-0 !gap-unit-0 data-[pressed=true]:scale-[0.97] transition-transform-colors motion-reduce:transition-none bg-transparent text-default-foreground data-[hover=true]:bg-default/40 min-w-unit-10 w-unit-10 h-unit-10 group" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-content3 transition-colors dark:group-hover:text-white group-hover:text-gray-800">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
              <path d="M9 3v18"></path>
              <path d="m16 15-3-3 3-3"></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="-mx-3 space-y-6 ">
                <div className="space-y-3 ">
                <a className="flex items-center px-6 py-3 text-white transition-colors duration-300 transform rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-gray-500"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>                        
                <span className="mx-2 text-lg font-medium">Homepage</span>
                    </a>

                <a className="flex items-center px-6 py-3 text-white transition-colors duration-300 transform rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" onClick={() => navigate(`/chat`)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-blue-500"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                        <span className="mx-2 text-lg font-medium">DevAI Assistant</span>
                    </a>
                    <a className="flex items-center px-6 py-3 text-white transition-colors duration-300 transform rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" onClick={() => navigate(`/ClarityAudit`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-emerald-500"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>                        
                    <span className="mx-2 text-lg font-medium">DOT Audit</span>
                    </a>
                    <a className="flex items-center px-6 py-3 text-white transition-colors duration-300 transform rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" onClick={() => navigate(`/EcoLearnCompanion`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-teal-500"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" x2="12" y1="22.08" y2="12"></line></svg>
                        <span className="mx-2 text-lg font-medium">Ink Craft</span>
                    </a>
                    <a className="flex items-center px-6 py-3 text-white transition-colors duration-300 transform rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" onClick={() => navigate(`/TransactionWizard`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-purple-500"><circle cx="12" cy="12" r="3"></circle><circle cx="19" cy="5" r="2"></circle><circle cx="5" cy="19" r="2"></circle><path d="M10.4 21.9a10 10 0 0 0 9.941-15.416"></path><path d="M13.5 2.1a10 10 0 0 0-9.841 15.416"></path></svg>
                        <span className="mx-2 text-lg font-medium">Txn Decoder</span>
                    </a>
                    <a className="flex items-center px-6 py-3 text-white transition-colors duration-300 transform rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-amber-500"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path><path d="M12 2v2"></path><path d="M12 22v-2"></path><path d="m17 20.66-1-1.73"></path><path d="M11 10.27 7 3.34"></path><path d="m20.66 17-1.73-1"></path><path d="m3.34 7 1.73 1"></path><path d="M14 12h8"></path><path d="M2 12h2"></path><path d="m20.66 7-1.73 1"></path><path d="m3.34 17 1.73-1"></path><path d="m17 3.34-1 1.73"></path><path d="m11 13.73-4 6.93"></path></svg>
                        <span className="mx-2 text-lg font-medium">Setting</span>
                    </a>

                  
                    <hr className="my-6 border-gray-200 dark:border-gray-600" />
                    
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-bold text-white rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white  focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Connect Wallet
</span>

</button>
            

            </div>
        </nav>
    </div>
</aside>


    
     
        {/* Cards */}
        <main className="flex-grow p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Empower Your Polkadot Journey</h1>
          <p className="text-xl text-white mb-8">Discover the Future of Blockchain Development with Dev AI: Your On-Chain Development Companion.</p>
        </div>
        <div className="flex flex-col items-center space-y-4 mx-auto">

        <div className="relative flex w-full p-5 flex-auto flex-col place-content-inherit align-items-inherit break-words text-left overflow-y-auto subpixel-antialiased bg-black text-white dark:bg-gray-900 dark:text-white shadow-lg rounded-lg max-w-2xl mx-auto border border-gray-600 max-h-[120px] overflow-hidden">
 <div className="flex items-center space-x-4">
    <div className="rounded-lg p-2 md:p-4 bg-blue-500">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white h-6 w-6">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    </div>
    <div className="flex flex-col">
      <h3 className="text-sm md:text-xl font-bold">DevAI Assistant</h3>
      <h3 className="hidden text-gray-400 md:block">Your On-Chain Development Companion.</h3>
    </div>
    <div className="grow"></div>
    <button type="button" className="text-white bg-green hover:bg-blue-800  focus:outline-none focus:ring-green font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"onClick={() => navigate(`/chat`)}>
<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
<span className="sr-only">Icon description</span>
</button>
 </div>
 </div>
 <div className="relative flex w-full p-5 flex-auto flex-col place-content-inherit align-items-inherit break-words text-left overflow-y-auto subpixel-antialiased bg-black text-white dark:bg-gray-900 dark:text-white shadow-lg rounded-lg max-w-2xl mx-auto border border-gray-600 max-h-[120px] overflow-hidden" >
    <div className="flex items-center space-x-4">
      <div className="rounded-lg p-2 md:p-4" style={{backgroundColor: 'rgb(6, 95, 70)'}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-emerald-500 h-6 w-6"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
      </div>
      <div className="flex flex-col">
      <h3 className="text-sm md:text-xl font-bold">AI AuditDot</h3>
        <h3 className="hidden text-gray-400 md:block">Audit your smart contracts with AI</h3>
      </div>
      <div className="grow" ></div>
      <button type="button" className="text-white bg-green hover:bg-blue-800  focus:outline-none focus:ring-green font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"onClick={() => navigate(`/ClarityAudit`)}>
<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
<span className="sr-only">Icon description</span>
</button>
    </div>
 </div>
 <div className="relative flex w-full p-5 flex-auto flex-col place-content-inherit align-items-inherit break-words text-left overflow-y-auto subpixel-antialiased bg-black text-white dark:bg-gray-900 dark:text-white shadow-lg rounded-lg max-w-2xl mx-auto border border-gray-600 max-h-[120px] overflow-hidden">
    <div className="flex items-center space-x-4">
      <div className="rounded-lg p-2 md:p-4" style={{backgroundColor: 'rgb(17, 94, 89)'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500 h-6 w-6">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
          <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
          <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" x2="12" y1="22.08" y2="12"></line>
        </svg>
      </div>
      <div className="flex flex-col">
      <h3 className="text-sm md:text-xl font-bold">Ink Craft</h3>
        <h3 className="hidden text-gray-400 md:block">Effortless Smart Contract Development with AI-Powered InkCraft</h3>
      </div>
      <div className="grow"></div>
      <button type="button" className="text-white bg-green hover:bg-blue-800  focus:outline-none focus:ring-green font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"onClick={() => navigate(`/EcoLearnCompanion`)}>
<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
<span className="sr-only">Icon description</span>
</button>
    </div>
 </div>

 <div className="relative flex w-full p-5 flex-auto flex-col place-content-inherit align-items-inherit break-words text-left overflow-y-auto subpixel-antialiased bg-black text-white dark:bg-gray-900 dark:text-white shadow-lg rounded-lg max-w-2xl mx-auto border border-gray-600 max-h-[120px] overflow-hidden">
    <div className="flex items-center space-x-4">
      <div className="rounded-lg p-2 md:p-4" style={{backgroundColor: 'rgb(107, 33, 168)'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 h-6 w-6">
          <circle cx="12" cy="12" r="3"></circle>
          <circle cx="19" cy="5" r="2"></circle>
          <circle cx="5" cy="19" r="2"></circle>
          <path d="M10.4 21.9a10 10 0 0 0 9.941-15.416"></path>
          <path d="M13.5 2.1a10 10 0 0 0-9.841 15.416"></path>
        </svg>
      </div>
      <div className="flex flex-col">
      <h3 className="text-sm md:text-xl font-bold">Transaction Decoder</h3>
        <h3 className="hidden text-gray-400 md:block">Decode On-Chain Interactions into Human-Readable Format</h3>
      </div>
      <div className="grow"></div>
      <button type="button" className="text-white bg-green hover:bg-blue-800  focus:outline-none focus:ring-green font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"onClick={() => navigate(`/TransactionWizard`)}>
<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
<span className="sr-only">Icon description</span>
</button>
    </div>
 </div>
</div>

 
</main>



    </div>


  );
}

export default Home;

