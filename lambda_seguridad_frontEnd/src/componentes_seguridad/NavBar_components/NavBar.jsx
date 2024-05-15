import { useState, useEffect} from 'react';

import '../css/NavBar.css'
import usuario from'../../assets/img/usuario.png';
import menu from'../../assets/img/menu.png';
import { ContainerUser } from'../users/ContainerUser';
import { ContainerPerson } from'../people/ContainerPerson.jsx';
import { NavBarUser } from './NavBarUser';
import { NavBarSuper } from './NavBarSuper';
import { NavBarAdmin } from './NavBarAdmin'
import { NavBarAdminSys } from './NavBarAdminSys';
import { UserProfile } from '../users/UserProfile';
import ContainerCompany from '../company/ContainerCompany';
import ContainerBranch from '../branches/ContainerBranch';

export const NavBar = () => {
    
    //Handle menu states
    const [menuActive, setMenuActive] = useState(false);
    const [subMenuUser, setSubMenuUser] = useState(false);
    const [subMenuAdmin, setSubMenuAdmin] = useState(false);
    const [subMenuSecurity, setSubMenuSecurity] = useState(false);
    const [subMenuPerson, setSubMenuPerson] = useState(false);

    //Frame handlers
    const [userFrame, setUserFrame] = useState(0);
    const [personFrame, setPersonFrame] = useState(0);
    const [profileFrame, setProfileFrame] = useState(0);
    const [companyFrame, setCompanyFrame] = useState(0);
    const [branchFrame, setBranchFrame] = useState(0);
    const [role, setRole] = useState(0);
    
    //subMenu user, close session
    const subMenuUserVisibility = () => {
        subMenuSecurity ? subMenuSecurityVisibility() : '';
        subMenuAdmin ? subMenuAdminVisibility() : '';
        subMenuPerson ? subMenuPersonVisibility() : '';
        setSubMenuUser(!subMenuUser);
    }
    //subMenu Admin
    const subMenuAdminVisibility = () => {
        subMenuUser ? subMenuUserVisibility() : '';
        subMenuSecurity ? subMenuSecurityVisibility() : '';
        subMenuPerson ? subMenuPersonVisibility() : '';
        setSubMenuAdmin(!subMenuAdmin);
    }
    //subMenu security
    const subMenuSecurityVisibility = () => {
        subMenuUser ? subMenuUserVisibility() : '';
        subMenuAdmin ? subMenuAdminVisibility() : '';
        subMenuPerson ? subMenuPersonVisibility() : '';
        setSubMenuSecurity(!subMenuSecurity);
    } 
    //subMenu Person
    const subMenuPersonVisibility = () => {
        subMenuSecurity ? subMenuSecurityVisibility() : '';
        subMenuAdmin ? subMenuAdminVisibility() : '';
        subMenuUser ? subMenuUserVisibility() : '';
        setSubMenuPerson(!subMenuPerson);
    }

    //close the subMenus
    const closeSubMenus = () => {
        setSubMenuAdmin(false);
        setSubMenuUser(false);
        setSubMenuSecurity(false);
        setSubMenuPerson(false);
    }
    //Close session
    const closeSession = () => {
        sessionStorage.removeItem('token-xL');
        sessionStorage.removeItem('user-xL');
        sessionStorage.removeItem('role-xL');
    }
    //show menu
    const showMenu = () => {
        setMenuActive(!menuActive);
        (menuActive == true) ? closeSubMenus() : '';//close the submenus when menu is pressed and menu is visible
    }


    //FRAME CONTAINERS
    const showProfileFrame = ( ) => {
        setProfileFrame(1);
        setUserFrame(0);
        setCompanyFrame(0);
        setBranchFrame(0);
        setPersonFrame(0);
        showMenu();
    }

    const showUserFrame = ( ) => {
        setProfileFrame(0);
        setUserFrame(1);
        setCompanyFrame(0);
        setBranchFrame(0);
        setPersonFrame(0);
        showMenu();
    }

    const showCompanyFrame = ( ) => {
        setProfileFrame(0);
        setUserFrame(0);
        setCompanyFrame(1);
        setBranchFrame(0);
        setPersonFrame(0);
        showMenu();
    }
    
    const showBranchFrame = ( ) => {
        setProfileFrame(0);
        setUserFrame(0);
        setCompanyFrame(0);
        setBranchFrame(1);
        setPersonFrame(0);
        showMenu();
    }

    const showPersonFrame = ( ) => {
        setProfileFrame(0);
        setUserFrame(0);
        setCompanyFrame(0);
        setBranchFrame(0);
        setPersonFrame(1);
        showMenu();
    }

    useEffect( () => {
        setRole(sessionStorage.getItem('role-xL'))
    }, [])

    return (
    <>
        <div id={'navBar'}>
            {/* show menu icon in mobile vetrsion */}
                <img id={'menu-icon'} src={menu} alt="" onClick={showMenu} />

                { role == '4' && < NavBarUser 
                    menuActive={ menuActive }
                    showMenu={ showMenu }
                    subMenuUser={subMenuUser}
                    showProfileFrame={ showProfileFrame }
                    showPersonFrame={ showPersonFrame }
                    subMenuUserVisibility={subMenuUserVisibility}
                    closeSubMenus={closeSubMenus}
                    closeSession={ closeSession } 

                />}
                { role == '3' && < NavBarSuper 
                    menuActive={ menuActive } 
                    showMenu={ showMenu }
                    subMenuUser={subMenuUser}
                    subMenuUserVisibility={subMenuUserVisibility}
                    subMenuSecurity={subMenuSecurity}
                    subMenuSecurityVisibility={subMenuSecurityVisibility}
                    closeSubMenus={closeSubMenus}
                    showUserFrame={showUserFrame} 
                    showProfileFrame={ showProfileFrame } 
                    subMenuSecurity={subMenuSecurity}
                    showPersonFrame={ showPersonFrame }
                    closeSession={ closeSession }  
                />}

                { role == '2' && < NavBarAdmin
                    menuActive={ menuActive } 
                    showMenu={ showMenu }
                    subMenuUser={subMenuUser}
                    subMenuUserVisibility={subMenuUserVisibility}
                    subMenuSecurityVisibility={subMenuSecurityVisibility}
                    closeSubMenus={closeSubMenus}
                    showUserFrame={showUserFrame} 
                    showProfileFrame={ showProfileFrame } 
                    showPersonFrame={ showPersonFrame }
                    closeSession={ closeSession } 
                />}

                { role == '1' && < NavBarAdminSys
                    menuActive={ menuActive } 
                    showMenu={ showMenu }
                    subMenuAdmin={subMenuAdmin}
                    subMenuAdminVisibility={subMenuAdminVisibility}
                    subMenuUser={subMenuUser}
                    subMenuUserVisibility={subMenuUserVisibility}
                    subMenuPerson={subMenuPerson}
                    subMenuPersonVisibility={subMenuPersonVisibility}
                    subMenuSecurity={subMenuSecurity}
                    subMenuSecurityVisibility={subMenuSecurityVisibility}
                    closeSubMenus={closeSubMenus}
                    showUserFrame={showUserFrame} 
                    showProfileFrame={ showProfileFrame } 
                    showPersonFrame={ showPersonFrame }
                    showCompanyFrame={ showCompanyFrame }
                    showBranchFrame={ showBranchFrame }
                    closeSession={ closeSession } 

                />}

        </div>
        { userFrame === 1 && <ContainerUser/>}
        { profileFrame === 1 && <UserProfile/>}
        { personFrame === 1 && <ContainerPerson />}
        { companyFrame === 1 && <ContainerCompany />}
        { branchFrame === 1 && <ContainerBranch />}
    </>
  )
}