import { createContext, useState } from 'react'

const SubMenuContext = createContext();

const SubMenuProvider = ({children}) => {
    const [menuActive,      setMenuActive]      = useState(false);
    const [subMenuUser,     setSubMenuUser]     = useState(false);
    const [subMenuAdmin,    setSubMenuAdmin]    = useState(false);
    const [subMenuSecurity, setSubMenuSecurity] = useState(false);
    const [subMenuPerson,   setSubMenuPerson]   = useState(false);
    const [subMenuOperation,   setSubMenuOperation]   = useState(false);

    //show menu
    const showMenu = () => {
        setMenuActive(!menuActive);
        (menuActive == true) ? closeSubMenus() : '';//close the submenus when menu is pressed and menu is visible
    }

    //close the subMenus
    const closeSubMenus = () => {
        setSubMenuAdmin(false);
        setSubMenuUser(false);
        setSubMenuSecurity(false);
        setSubMenuPerson(false);
        setSubMenuOperation(false);
    }

    const subMenuStates = {  
        menuActive, setMenuActive,
        subMenuUser, setSubMenuUser,
        subMenuAdmin, setSubMenuAdmin,
        subMenuSecurity, setSubMenuSecurity,
        subMenuPerson, setSubMenuPerson,
        subMenuOperation, setSubMenuOperation,
        closeSubMenus, showMenu
    }



    return <SubMenuContext.Provider value={subMenuStates}>{children}</SubMenuContext.Provider>;
}
export {SubMenuProvider};
export default SubMenuContext;