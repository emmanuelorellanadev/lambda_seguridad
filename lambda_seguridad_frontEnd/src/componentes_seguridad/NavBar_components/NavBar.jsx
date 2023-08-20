import React, { useState, useEffect} from 'react';
// import { NavLink } from 'react-router-dom';

import '../css/NavBar.css'
import usuario from'../../assets/img/usuario.png';
import menu from'../../assets/img/menu.png';
import { ContainerUser } from'../ContainerUser';
import { Admin } from'../Admin.jsx';
import { NavBarUser } from './NavBarUser';
import { NavBarSuper } from './NavBarSuper';
import { NavBarAdmin } from './NavBarAdmin'
import { UserProfile } from '../UserProfile';


export const NavBar = () => {
    
    const [menuActive, setMenuActive] = useState(false);
    const [userFrame, setUserFrame] = useState(0);
    const [adminFrame, setAdminFrame] = useState(0);
    const [profileFrame, setProfileFrame] = useState(0);
    const [role, setRole] = useState(0);
    const [subMenuUser, setSubMenuUser] = useState(false);
    const [subMenuSecurity, setSubMenuSecurity] = useState(false);
    
    const subMenuUserVisibility = () => {
        subMenuSecurity ? subMenuSecurityVisibility() : '';
        setSubMenuUser(!subMenuUser);
        // menuActive
    }
    const subMenuSecurityVisibility = () => {
        subMenuUser ? subMenuUserVisibility() : '';
        setSubMenuSecurity(!subMenuSecurity);
        // menuActive
    } 

    const closeSubMenus = () => {
        setSubMenuUser(false);
        setSubMenuSecurity(false);
    }
    
    const closeSession = () => {
        sessionStorage.removeItem('token-xL');
        sessionStorage.removeItem('user-xL');
        sessionStorage.removeItem('role-xL');
    }
    
    const showMenu = () => {
        setMenuActive(!menuActive);
        (menuActive == true) ? closeSubMenus() : '';//close the submenus when menu is pressed and menu is visible
    }

    const showUsersFrame = ( ) => {
        setUserFrame(1);
        setAdminFrame(0);
        setProfileFrame(0);
        showMenu();
    }

    const showInventoriesFrame = ( ) => {
        setUserFrame(0);
        setAdminFrame(1);
        setProfileFrame(0);
        showMenu();
    }

    const showProfileFrame = ( ) => {
        setUserFrame(0);
        setAdminFrame(0);
        setProfileFrame(1);
        showMenu();
    }

    useEffect( () => {
        setRole(sessionStorage.getItem('role-xL'))
    }, [])

    return (
    <>
        <div id={'navBar'}>
                <img id={'icono-menu'} src={menu} alt="" onClick={showMenu} />

                { role == '3' && < NavBarUser 
                    menuActive={ menuActive } 
                    showUsersFrame={ showUsersFrame } 
                    showProfileFrame={ showProfileFrame } 
                    closeSession={ closeSession } 
                />}
                { role == '2' && < NavBarSuper 
                    menuActive={menuActive} 
                    showUsersFrame={ showUsersFrame } 
                    showProfileFrame={ showProfileFrame }
                    closeSession={ closeSession } 
                />}
                { role == '1' && < NavBarAdmin 
                    menuActive={ menuActive } 
                    showMenu={ showMenu }
                    showUsersFrame={showUsersFrame} 
                    showProfileFrame={ showProfileFrame } 
                    showInventoriesFrame={ showInventoriesFrame }
                    closeSession={ closeSession } 
                    subMenuSecurityVisibility={subMenuSecurityVisibility}
                    subMenuUserVisibility={subMenuUserVisibility}
                    closeSubMenus={closeSubMenus}
                    subMenuUser={subMenuUser}
                    subMenuSecurity={subMenuSecurity}

                />}

        </div>
        { userFrame === 1 && <ContainerUser/>}
        { profileFrame === 1 && <UserProfile/>}
        { adminFrame === 1 && <Admin />}
    </>
  )
}
