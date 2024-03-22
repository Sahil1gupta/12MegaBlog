import React from "react";
import { Link, NavLink,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import  Container  from "../container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";



export default function Header() {
    const authStatus=useSelector((state)=>state.auth.status)
    const navigate=useNavigate();


    // In production application we create navbar like this we create array of ojbects in object we write nav item like its name and it's url on which if user clicks so where it should go and benifit of this Way of building navbar is when we want new nav item in our nav bar we will just add object of that nav itme in this array of nav items and bcoz it is mapped using .map so it will show us on web page

    // this active key is needed bcoz which nav item should be visible to already login user or user who is not login so will show the login button and signup button based on authstatus
    const navItems=[
        {
        name:"Home",
        url:"/",// slug 
        active:true
    },
    {
        name: "Login",
        url: "/login",
        active: !authStatus,
    },
    {
        name: "Signup",
        url: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        url: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        url: "/add-post",
        active: authStatus,
    },
    ]
   
   
    return (
        
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                       <Link to="/">
                            <Logo width='70px'  />
                       </Link>
                       <ul className='flex ml-auto'> {/* above is logo now from here will map navItems to show based on authStatus*/}
                        {navItems.map((item)=>(
                            item.active?(
                                <li key={item.name}>
                                    <button onClick={()=>navigate(item.url)}
                                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                    
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ):null
                        ))}

                        {/* here we are enabling logout button based on user is login or not and this status is getting from authStatus */}

                        {authStatus && (
                            <li>
                                <LogoutBtn/>
                            </li>
                        )}
                       </ul>
                    </div>
                </nav>
            </Container>
        </header>
    );
}

