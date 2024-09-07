import { Link,NavLink,useLocation,useNavigate } from "react-router-dom"
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations"
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Button } from "../ui/button";

const LeftSidebar = () => {

    const {pathname} =useLocation()
    const { mutateAsync:signOut,isSuccess } = useSignOutAccount();
    const navigate=useNavigate();
    const {user}=useUserContext();
    
    useEffect(()=>{
        if(isSuccess){
            navigate(0);
        }
    },[isSuccess,navigate])
    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                <Link to='/' className='flex items-center gap-3'>
                    <img
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={170}
                        height={36}
                    />
                </Link>
                <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
                    <img
                        src={user.imageUrl}
                        alt="profile"
                        className="rounded-full w-14 h-14"
                    />
                    <div className="flex flex-col ">
                        <p className="body-bold">{user.name}</p>
                        <p className="small-regular text-light-3">@{user.username}</p>
                    </div>
                </Link>
                
                <ul className="flex flex-col gap-6">
                    {sidebarLinks.map((link:INavLink)=>{

                        const isActive = pathname === link.route;
                        
                        return(
                            <li key={link.label} 
                                className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}
                            >
                                <NavLink to={link.route} className="flex items-center gap-4 p-4">
                                    <img src={link.imgURL} alt={link.label} 
                                        className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                                    />
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <Button variant="ghost" className="shad-button_ghost" onClick={()=>signOut()}>
                <img
                    src="/assets/icons/logout.svg"
                    alt="logout"
                />
                <p className="small-medium lg:base-medium">Logout</p>
            </Button>
        </nav>
    )
    }

export default LeftSidebar
