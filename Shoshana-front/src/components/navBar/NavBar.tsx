import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CgMenu } from 'react-icons/cg'
import { GrClose } from 'react-icons/gr'


// TODO add path in navigate function

export default function navBar() {
    const navigate_To = useNavigate()

    const ulRef = useRef(null);

    // switching between is icons and open nav bar in mobile mode
    const [display_menu_icon, setDisplay_menu_icon] = useState("block");
    const [display_close_icon, setDisplay_close_icon] = useState("none");

    const onHamburgerClick = (e: any, ulRef: any) => {
        const divClass = e.currentTarget.getAttribute('class');
        const list = ulRef.current;

        if (divClass === "menu") {

            list.classList.add("top-[80px]");
            list.classList.add("opacity-100");
            setDisplay_menu_icon("none");
            setDisplay_close_icon("block");

        }
        else {
            list.classList.remove("top-[80px]")
            list.classList.remove("opacity-100")
            setDisplay_menu_icon("block");
            setDisplay_close_icon("none");

        }
    }



    return (
        <div className='sticky top-0 z-50' >
            <nav className='p-5 bg-white shadow md:flex md:items-center md:justify-between'>
                <div className='flex justify-between items-center '>
                    <span className='text-2xl font-bold'>
                        Shoshana
                    </span>
                    <span className='text-3xl cursor-pointer mx-2 md:hidden block'>
                        <div className='menu' onClick={(e) => onHamburgerClick(e, ulRef)} style={{ display: display_menu_icon }}>
                            <CgMenu />
                        </div>

                        <div className='close' onClick={(e) => onHamburgerClick(e, ulRef)} style={{ display: display_close_icon }}>
                            <GrClose />
                        </div>
                    </span>
                </div>


                <ul className={`md:flex md:items-center z-[-1] md:z-auto md:static absolute shadow 
                bg-white w-full left-0 md:w-auto
                md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500 `}
                    ref={ulRef}>

                    <li className='mx-4 my-6 md:my-0'>
                        <button className='text-x1 hover:text-cyan-500 duration-500'
                            onClick={() => navigate_To("/")}>
                            HOME
                        </button>
                    </li>

                    <li className='mx-4 my-6 md:my-0'>
                        <button className='text-x1 hover:text-cyan-500 duration-500'
                            onClick={() => navigate_To("/")}> 
                            ABOUT
                        </button>
                    </li>

                    <li className='mx-4 my-6 md:my-0'>
                        <button className='text-x1 hover:text-cyan-500 duration-500'
                            onClick={() => navigate_To("/")}>
                            SiGN OUT
                        </button>
                    </li>

                </ul>
            </nav>

        </div>
    )
}
