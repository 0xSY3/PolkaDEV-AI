import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface CounterState {
  selectedNetwork: string;
  manifest: string;
  nef: string;
  title: string;
  pseudoCode: string;
  contractCode: string;
  config: string;
  loading: boolean;
  messages: any[];
}

// Define the initial state using that type
const initialState: CounterState = {
  selectedNetwork: 'testnet',
  manifest: '',
  nef: '',
  title: '',
  pseudoCode: '',
  contractCode: '',
  config: '',
  loading: false,
  messages: []
}

export const counterSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    setSelectedNetwork: (state, action: PayloadAction<string>) => {
      state.selectedNetwork = action.payload
    },
    setManifest: (state, action: PayloadAction<string>) => {
      state.manifest = action.payload
    },
    setNef: (state, action: PayloadAction<string>) => {
      state.nef = action.payload
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    setPseudoCode: (state, action: PayloadAction<string>) => {
      state.pseudoCode = action.payload
    },
    setContractCode: (state, action: PayloadAction<string>) => {
      state.contractCode = action.payload
    },
    setConfig: (state, action: PayloadAction<string>) => {
      state.config = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    addMessages: (state, action: PayloadAction<any[]>) => {
      state.messages = [...state.messages, ...action.payload]
    }
  },
})

export const { setManifest, setNef, setSelectedNetwork, setTitle, setPseudoCode, setContractCode, setLoading, addMessages, setConfig } = counterSlice.actions

export default counterSlice.reducer