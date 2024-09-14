import React, { createContext,useContext,useEffect,useMemo,useState } from "react"
import { INITIAL_USER } from "./INITIAL_USER"
import { IContexttype, IUser } from "@/types"
import { getCurrentUser } from "@/lib/appwrite/api"
import { useNavigate } from "react-router-dom"

const INITIAL_STATE={
    user:INITIAL_USER,
    isLoading:false,
    isAuthenticated:false,
    setUser:()=>{},
    setIsAuthenticated:()=>{},
    checkAuthUser:async()=> false as boolean,
}

const AuthContext = createContext<IContexttype>(INITIAL_STATE)

const AuthProvider = ({children}:{children:React.ReactNode}) => {

    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setisLoading] = useState(false);
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    const navigate=useNavigate();

    const checkAuthUser = async(): Promise<boolean> =>{
        try{
            const currentAccount = await getCurrentUser();

            if(currentAccount){
                setUser({
                    id:currentAccount.$id,
                    name:currentAccount.name,
                    username:currentAccount.username,
                    email:currentAccount.email,
                    imageUrl:currentAccount.imageUrl,
                    bio:currentAccount.bio
                })
                setIsAuthenticated(true);

                return true;
            }
            return false;
        }catch(err){
            console.log(err);
            return false
        }
        finally{
            setisLoading(false);
        }
    };

    useEffect(() => {
      setisLoading(true)
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (cookieFallback === "[]" || cookieFallback === null || cookieFallback === undefined)
          navigate("/sign-in");
    
        checkAuthUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const value = useMemo(() => ({
      user,
      setUser,
      isLoading,
      isAuthenticated,
      setIsAuthenticated,
      checkAuthUser
  }), [user, isLoading, isAuthenticated]);
  
    
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(AuthContext)
