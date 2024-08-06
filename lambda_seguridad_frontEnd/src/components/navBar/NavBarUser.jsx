import React, {useContext} from 'react';

import usuario from'../../assets/img/usuario.png';
import SubMenuContext from '../../context/SubMenuContext';
import { FrameContext } from '../../context/FrameContext';

export const NavBarUser = (props) => {
  const {  
    menuActive,
    subMenuUser,
    subMenuPerson
     } = useContext(SubMenuContext);

const {
    showProfileFrame,
    showPersonFrame,
    closeSubMenus } = useContext(FrameContext);

  return (
    <>
        <ul id='menu' className={ menuActive ? 'showMenu': ''} onMouseLeave={closeSubMenus}>
            <li id='subMenuUser' onClick={props.subMenuUserVisibility}  onMouseLeave={closeSubMenus}>
                <img  id={'logoUsuario'} src={usuario} alt="" />
                <ul className={subMenuUser ? 'subMenuVisible' : 'subMenuHide' }>
                    <li><a href="#" onClick={showProfileFrame} >{sessionStorage.getItem('user-xL').toUpperCase()}</a></li>
                    <li><a href="/" onClick={props.closeSession} >Cerrar Sesion</a></li>
                </ul>
            </li>    
            <li id='subMenuPerson' onClick={props.subMenuPersonVisibility} onMouseLeave={closeSubMenus}>
                <a href="#"> Clientes</a>
                <ul className={subMenuPerson ? 'subMenuVisible' : 'subMenuHide' } >
                    <li><a href="#" onClick={showPersonFrame} >Personas</a></li>
                </ul>            
            </li>
        </ul>
    </>
  )
}