import {create} from 'zustand'

const useUserStore=create((set)=>({
    username:null,
    setusername:(username)=>set({username}),
    clearusername:()=>set({username:null}),
}))

export default useUserStore