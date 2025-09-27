import { create } from "zustand";
import axios from "axios";

const URL = "http://localhost:3000";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },
  verify: async(code)=>{
    set({isLoading:false,isAuthenticated:false,error:null})
    try {
      const response = await axios.post(`${URL}/verify`,{code})
      set({user:response.data.user,isAuthenticated:true,isLoading:false})
    } catch (error) {
      
    }
  }
}));
