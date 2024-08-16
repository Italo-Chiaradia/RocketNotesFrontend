import {createContext, useContext, useEffect, useState} from 'react';

import {api} from "../services";

export const AuthContext = createContext({});

function AuthProvider({children}) {
  const [data, setData] = useState({}); 

  async function signIn({email, password}) {
    try {
      const response = await api.post("/sessions", {email, password});
      const {user, token} = response.data;

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({user, token});
    } catch(error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar");
      }
    }
  }

  function signOut() {
    console.log("apsogn");
    localStorage.removeItem("@rocketnotes:user");
    localStorage.removeItem("@rocketnotes:token");
    
    setData({});
  }

  async function updateUser({user, avatarFile}) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put('/users', user);
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      
      setData({user, token: data.token});
      alert("Usuário atualizado com sucesso!");
    } catch(error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar");
      }
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("@rocketnotes:user");
    const token = localStorage.getItem("@rocketnotes:token");
    if (user && token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setData({user: JSON.parse(user), token});
    }
  }, [])

  return (
    <AuthContext.Provider value={{
        signIn,
        signOut, 
        updateUser,
        user: data.user
      }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const data = useContext(AuthContext);
  return data;
}

export {AuthProvider, useAuth};