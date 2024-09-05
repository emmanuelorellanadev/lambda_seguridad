import { useState, useEffect, useContext} from 'react';

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
import SubMenuContext from '../../context/SubMenuContext.jsx';
import { FrameContext } from '../../context/FrameContext.jsx';
import SubMenuService from '../services/SubMenuService.jsx';
import SubMenuPrice from '../prices/SubMenuPrice.jsx';

export const NavBar = () => {
    
    const {  
        subMenuUser, setSubMenuUser,
        subMenuAdmin, setSubMenuAdmin,
        subMenuSecurity, setSubMenuSecurity,
        subMenuPerson, setSubMenuPerson,
        } = useContext(SubMenuContext);

    const {
        userFrame,
        personTypeFrame,
        personFrame,
        profileFrame,
        companyFrame,
        branchFrame,
        branchTypeFrame,
        roleFrame,
        roomStateFrame,
        serviceFrame, 
        priceFrame, showMenu } = useContext(FrameContext)

    const [role,            setRole]            = useState(0);
    
    //subMenu user, close session
    const subMenuUserVisibility = () => {
        setSubMenuUser(!subMenuUser);
    }
    //subMenu Admin
    const subMenuAdminVisibility = () => {
        setSubMenuAdmin(!subMenuAdmin);
    }
    //subMenu security
    const subMenuSecurityVisibility = () => {
        setSubMenuSecurity(!subMenuSecurity);
    } 
    //subMenu Person
    const subMenuPersonVisibility = () => {
        setSubMenuPerson(!subMenuPerson);
    }

    //Close session
    const closeSession = () => {
        sessionStorage.removeItem('token-xL');
        sessionStorage.removeItem('user-xL');
        sessionStorage.removeItem('role-xL');
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
                        subMenuAdminVisibility={subMenuAdminVisibility}
                        subMenuUserVisibility={subMenuUserVisibility}
                        subMenuPersonVisibility={subMenuPersonVisibility}
                        subMenuSecurityVisibility={subMenuSecurityVisibility}
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
        { serviceFrame      ===     1 && <SubMenuService />}
        { priceFrame        ===     1 && <SubMenuPrice />}
    </>
  )
}

// export default NavBar;