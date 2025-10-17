import { create } from "zustand";
import axios from "axios";

const URL = import.meta.env.VITE_REACT_APP_SERVER_API
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  isAuthenticated: false,
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
      set({ error: "Error signing up", isLoading: false });
      throw error;
    }
  },
  verify: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${URL}/verify`, { code });
      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      set({ error: "Error verifying user", isLoading: false });
      throw error;
    }
  },
  signin: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${URL}/signin`, { email, password });
      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
        error:null
      });
    } catch (error) {
      set({ error: "Error signing in", isLoading: false });
      throw error;
    }
  },
  logout:async()=>{
    set({isLoading:true , error:null})
    try {
      await axios.post(`${URL}/logout`)
      set({user:null,isLoading:false,isAuthenticated:false,error:null})
    } catch (error) {
      set({error:"Error logging out",isLoading:false}) 
      throw error    
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${URL}/auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
      throw error;
    }
  },
  forgot: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${URL}/forgot-password`, { email });
      set({
        message:response.data.message,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error sending link to email", isLoading: false });
      throw error;
    }
  },
  resetPass: async (password, token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${URL}/reset-password/${token}`, {
        password,
      });
      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      set({ error: "Error reset pass", isLoading: false });
      throw error;
    }
  },
}));
