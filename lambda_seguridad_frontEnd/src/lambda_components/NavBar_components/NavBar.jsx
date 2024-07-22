import { useState, useEffect} from 'react';

import '../../css/NavBar.css';
import '../../css/subMenu/subMenu.css';
// import usuario from'../../assets/img/usuario.png';
import menu from'../../assets/img/menu.png';
import SubMenuBranch from '../branches/SubMenuBranch.jsx';
import SubMenuBranchType from '../branchTypes/SubMenuBranchType.jsx';
import SubMenuCompany from '../companies/SubMenuCompany.jsx';
import SubMenuPerson from'../people/SubMenuPerson.jsx';
import SubMenuPersonType from'../personTypes/SubMenuPersonType.jsx';
import SubMenuUser from'../users/SubMenuUser.jsx';
import SubMenuRole from'../roles/SubMenuRole.jsx';
import SubMenuRoomState from '../roomStates/SubMenuRoomState.jsx';
import { NavBarUser } from './NavBarUser';
import { NavBarSuper } from './NavBarSuper';
import { NavBarAdmin } from './NavBarAdmin'
import { NavBarAdminSys } from './NavBarAdminSys';
import { UserProfile } from '../users/UserProfile';

export const NavBar = () => {
    
    //Handle menu states
    const [menuActive,      setMenuActive]      = useState(false);
    const [subMenuUser,     setSubMenuUser]     = useState(false);
    const [subMenuAdmin,    setSubMenuAdmin]    = useState(false);
    const [subMenuSecurity, setSubMenuSecurity] = useState(false);
    const [subMenuPerson,   setSubMenuPerson]   = useState(false);
    //Frame handlers
    const [userFrame,       setUserFrame]       = useState(0);
    const [personTypeFrame, setPersonTypeFrame] = useState(0);
    const [personFrame,     setPersonFrame]     = useState(0);
    const [profileFrame,    setProfileFrame]    = useState(0);
    const [companyFrame,    setCompanyFrame]    = useState(0);
    const [branchFrame,     setBranchFrame]     = useState(0);
    const [branchTypeFrame, setBranchTypeFrame] = useState(0);
    const [roleFrame,       setRoleFrame]       = useState(0);
    const [role,            setRole]            = useState(0);
    const [roomStateFrame,  setRoomStateFrame ] = useState(0);
    
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

    const subMenuTransactionVisibility = () => {
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
        setBranchTypeFrame(0);
        setPersonFrame(0);
        setPersonTypeFrame(0);
        setRoleFrame(0);
        setRoomStateFrame(0);
        showMenu();
    }

    const showUserFrame = ( ) => {
        setProfileFrame(0);
        setUserFrame(1);
        setCompanyFrame(0);
        setBranchFrame(0);
        setBranchTypeFrame(0);
        setPersonTypeFrame(0);
        setPersonFrame(0);
        setRoleFrame(0);
        setRoomStateFrame(0);
        showMenu();
    }

    const showCompanyFrame = ( ) => {
        setProfileFrame(0);
        setUserFrame(0);
        setCompanyFrame(1);
        setBranchFrame(0);
        setBranchTypeFrame(0);
        setPersonTypeFrame(0);
        setPersonFrame(0);
        setRoleFrame(0);
        setRoomStateFrame(0);
        showMenu();
    }
    
    const showBranchFrame = ( ) => {
        setProfileFrame(0);
        setUserFrame(0);
        setCompanyFrame(0);
        setBranchFrame(1);
        setBranchTypeFrame(0);
        setPersonTypeFrame(0);
        setPersonFrame(0);
        setRoleFrame(0);
        setRoomStateFrame(0);
        showMenu();
    }

    const showBranchTypeFrame = ( ) => {
        setProfileFrame(0);
        setUserFrame(0);
        setCompanyFrame(0);
        setBranchFrame(0);
        setBranchTypeFrame(1);
        setPersonTypeFrame(0);
        setPersonFrame(0);
        setRoleFrame(0);
        setRoomStateFrame(0);
        showMenu();
    }

    const showPersonTypeFrame = ( ) => {
        setProfileFrame(0);
        setUserFrame(0);
        setCompanyFrame(0);
        setBranchFrame(0);
        setBranchTypeFrame(0);
        setPersonTypeFrame(1);
        setPersonFrame(0);
        setRoleFrame(0);
        setRoomStateFrame(0);
        showMenu();
    }
    
    const showPersonFrame = ( ) => {
        setProfileFrame(0);
        setUserFrame(0);
        setCompanyFrame(0);
        setBranchFrame(0);
        setBranchTypeFrame(0);
        setPersonTypeFrame(0);
        setPersonFrame(1);
        setRoleFrame(0);
        setRoomStateFrame(0);
        showMenu();
    }

    const showRoleFrame = ( ) => {
        setProfileFrame(0);
        setUserFrame(0);
        setCompanyFrame(0);
        setBranchFrame(0);
        setBranchTypeFrame(0);
        setPersonTypeFrame(0);
        setPersonFrame(0);
        setRoleFrame(1);
        setRoomStateFrame(0);
        showMenu();
    }
    
    const showRoomStateFrame = ( ) => {
        setProfileFrame(0);
        setUserFrame(0);
        setCompanyFrame(0);
        setBranchFrame(0);
        setBranchTypeFrame(0);
        setPersonTypeFrame(0);
        setPersonFrame(0);
        setRoleFrame(0);
        setRoomStateFrame(1);
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
                    showPersonFrame={ showPersonFrame }
                    closeSession={ closeSession }  
                    />}

                { role == '2' && < NavBarAdmin
                    menuActive={ menuActive } 
                    showMenu={ showMenu }
                    subMenuUser={subMenuUser}
                    subMenuUserVisibility={subMenuUserVisibility}
                    subMenuSecurity={subMenuSecurity}
                    subMenuSecurityVisibility={subMenuSecurityVisibility}
                    closeSubMenus={closeSubMenus}
                    showUserFrame={showUserFrame} 
                    showProfileFrame={ showProfileFrame } 
                    showPersonFrame={ showPersonFrame }
                    closeSession={ closeSession } 
                />}

                { role == '1' && < NavBarAdminSys
                //handle if show or not the menu
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
                    //show the submenu frames
                    showUserFrame={showUserFrame} 
                    showProfileFrame={ showProfileFrame } 
                    showPersonTypeFrame={ showPersonTypeFrame }
                    showPersonFrame={ showPersonFrame }
                    showCompanyFrame={ showCompanyFrame }
                    showBranchFrame={ showBranchFrame }
                    showBranchTypeFrame={ showBranchTypeFrame }
                    showRoleFrame={ showRoleFrame }
                    showRoomStateFrame={ showRoomStateFrame }
                    closeSession={ closeSession } 

                />}

        </div>
        { userFrame         ===     1 && <SubMenuUser/>}
        { profileFrame      ===     1 && <UserProfile/>}
        { personTypeFrame   ===     1 && <SubMenuPersonType />}
        { personFrame       ===     1 && <SubMenuPerson />}
        { companyFrame      ===     1 && <SubMenuCompany />}
        { branchFrame       ===     1 && <SubMenuBranch />}
        { branchTypeFrame   ===     1 && <SubMenuBranchType />}
        { roleFrame         ===     1 && <SubMenuRole />}
        { roomStateFrame    ===     1 && <SubMenuRoomState />}
    </>
  )
}

// export default NavBar;