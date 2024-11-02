import { useState, useEffect, useReducer} from 'react';

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
import SubMenuService from '../services/SubMenuService.jsx';
import SubMenuPrice from '../prices/SubMenuPrice.jsx';
import SubMenuRoom from '../rooms/SubMenuRoom.jsx';
import { NavBarUser } from './NavBarUser';
import { NavBarSuper } from './NavBarSuper';
import { NavBarAdmin } from './NavBarAdmin'
import { NavBarAdminSys } from './NavBarAdminSys';
import { UserProfile } from '../users/UserProfile';
import { subMenuReducer } from './reducer/subMenuReducer.js';
import { frameReducer } from './reducer/frameReducer.js';

export const initialSubMenuState = {menuAdmin:      false, 
                                    menuUser:       false, 
                                    menuSecurity:   false, 
                                    menuPerson:     false};
export const initialFrameState = {  profileFrame:       false, 
                                    userFrame:          false, 
                                    companyFrame:       false, 
                                    branchFrame:        false,
                                    branchTypeFrame:    false,
                                    branchFrame:        false, 
                                    personTypeFrame:    false, 
                                    personFrame:        false,
                                    roleFrame:          false, 
                                    roomStateFrame:     false, 
                                    roomFrame:          false, 
                                    serviceFrame:       false, 
                                    priceFrame:         false,
                                    roomFrame:          true };


export const NavBar = () => {


    const [ subMenuState, subMenuDispatch ] = useReducer(subMenuReducer, initialSubMenuState);
    const [ frameState, frameDispatch ] = useReducer(frameReducer, initialFrameState);
 
    const [role,            setRole]            = useState(0);
    const [menuActive,      setMenuActive]      = useState(false);

    //show menu
    const showMenu = () => {
        setMenuActive(!menuActive);
        (menuActive == true) ? setMenuActive(false) : '';//close the submenus when menu is pressed and menu is visible
    }
    //subMenu user, close session
    const subMenuUserVisibility = () => {
        // setSubMenuUser(!subMenuUser);
        subMenuDispatch({type: 'SUBMENUUSER'})
    }
    //subMenu Admin
    const subMenuAdminVisibility = () => {
        subMenuDispatch({type: 'SUBMENUADMIN'})
        // setSubMenuAdmin(!subMenuAdmin);
    }
    //subMenu security
    const subMenuSecurityVisibility = () => {
        subMenuDispatch({type: 'SUBMENUSECURITY'})
        // setSubMenuSecurity(!subMenuSecurity);
    } 
    //subMenu Person
    const subMenuPersonVisibility = () => {
        subMenuDispatch({type: 'SUBMENUPERSON'})
        // setSubMenuPerson(!subMenuPerson);
    }

    //subMenu Person
    const subMenuReset = () => {
        subMenuDispatch({type: 'SUBMENURESET'})
    }

    //Close session
    const closeSession = () => {
        sessionStorage.removeItem('token-xL');
        sessionStorage.removeItem('user-xL');
        sessionStorage.removeItem('role-xL');
    }


    //FRAME CONTROLLER
    const showProfileFrame = ( ) => {
        frameDispatch({type: 'RESET_FRAME'});
        frameDispatch({type: 'PROFILE_FRAME'});
    }

    const showUserFrame = ( ) => {
        frameDispatch({type: 'RESET_FRAME'});
        frameDispatch({type: 'USER_FRAME'});
    }

    const showCompanyFrame = ( ) => {
        frameDispatch({type: 'RESET_FRAME'});
        frameDispatch({type: 'COMPANY_FRAME'});
    }
    
    const showBranchFrame = ( ) => {
        frameDispatch({type: 'RESET_FRAME'});
        frameDispatch({type: 'BRANCH_FRAME'});
    }

    const showBranchTypeFrame = ( ) => {
        frameDispatch({type: 'RESET_FRAME'});
        frameDispatch({type: 'BRANCHTYPE_FRAME'});
    }

    const showPersonTypeFrame = ( ) => {
        frameDispatch({type: 'RESET_FRAME'});
        frameDispatch({type: 'PERSONTYPE_FRAME'});
    }
    
    const showPersonFrame = ( ) => {
        frameDispatch({type: 'RESET_FRAME'});
        frameDispatch({type: 'PERSON_FRAME'});
    }

    const showRoleFrame = ( ) => {
        frameDispatch({type: 'RESET_FRAME'});
        frameDispatch({type: 'ROLE_FRAME'});
    }
    
    const showRoomStateFrame = ( ) => {
        frameDispatch({type: 'RESET_FRAME'});
        frameDispatch({type: 'ROOMSTATE_FRAME'});
    }
    
    const showServiceFrame = ( ) => {
        frameDispatch({type: 'RESET_FRAME'});
        frameDispatch({type: 'SERVICE_FRAME'});
    }

    const showPriceFrame = ( ) => {
        frameDispatch({type: 'RESET_FRAME'});
        frameDispatch({type: 'PRICE_FRAME'});
    }

    const showRoomFrame = ( ) => {
        frameDispatch({type: 'RESET_FRAME'});
        frameDispatch({type: 'ROOM_FRAME'});
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
                        subMenuUserVisibility={subMenuUserVisibility}
                        subMenuPersonVisibility={subMenuPersonVisibility}
                        closeSession={ closeSession } 
                    />}
                    { role == '3' && < NavBarSuper 
                        subMenuAdminVisibility={subMenuAdminVisibility}
                        subMenuUserVisibility={subMenuUserVisibility}
                        subMenuPersonVisibility={subMenuPersonVisibility}
                        subMenuSecurityVisibility={subMenuSecurityVisibility}
                        closeSession={ closeSession } 
                        />}

                    { role == '2' && < NavBarAdmin
                        subMenuAdminVisibility={subMenuAdminVisibility}
                        subMenuUserVisibility={subMenuUserVisibility}
                        subMenuPersonVisibility={subMenuPersonVisibility}
                        subMenuSecurityVisibility={subMenuSecurityVisibility}
                        closeSession={ closeSession } 
                    />}

                    { role == '1' && < NavBarAdminSys 
                        showMenu={showMenu}
                        menuActive={menuActive}
                        setMenuActive={setMenuActive}
                        subMenuState={subMenuState}
                        subMenuAdminVisibility={subMenuAdminVisibility}
                        subMenuUserVisibility={subMenuUserVisibility}
                        subMenuPersonVisibility={subMenuPersonVisibility}
                        subMenuSecurityVisibility={subMenuSecurityVisibility}
                        subMenuReset={subMenuReset}
                        showProfileFrame={showProfileFrame}
                        showBranchFrame={showBranchFrame}
                        showUserFrame={showUserFrame}
                        showCompanyFrame={showCompanyFrame}
                        showBranchTypeFrame={showBranchTypeFrame}
                        showPersonTypeFrame={showPersonTypeFrame}
                        showPersonFrame={showPersonFrame}
                        showRoleFrame={showRoleFrame}
                        showRoomStateFrame={showRoomStateFrame}
                        showServiceFrame={showServiceFrame}
                        showPriceFrame={showPriceFrame}
                        showRoomFrame={showRoomFrame}
                        closeSession={ closeSession } 
                    />}

        </div>
        { frameState.userFrame       === true && <SubMenuUser/>}
        { frameState.profileFrame    === true && <UserProfile/>}
        { frameState.personTypeFrame === true && <SubMenuPersonType />}
        { frameState.personFrame     === true && <SubMenuPerson />}
        { frameState.companyFrame    === true && <SubMenuCompany />}
        { frameState.branchFrame     === true && <SubMenuBranch />}
        { frameState.branchTypeFrame === true && <SubMenuBranchType />}
        { frameState.roleFrame       === true && <SubMenuRole />}
        { frameState.roomStateFrame  === true && <SubMenuRoomState />}
        { frameState.serviceFrame    === true && <SubMenuService />}
        { frameState.priceFrame      === true && <SubMenuPrice />}
        { frameState.roomFrame       === true && <SubMenuRoom />}
    </>
  )
}