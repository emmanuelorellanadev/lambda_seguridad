import React, { useEffect, useState } from 'react';

import usuario from'../../assets/img/usuario.png';

export const NavBarAdmin = (props) => {
    
    // const [subMenuUser, setSubMenuUser] = useState(false);
    // const [subMenuSecurity, setSubMenuSecurity] = useState(false);
    
    // const subMenuUserVisibility = () => {
    //     subMenuSecurity ? subMenuSecurityVisibility() : '';
    //     setSubMenuUser(!subMenuUser);
    //     props.menuActive
    // }
    // const subMenuSecurityVisibility = () => {
    //     subMenuUser ? subMenuUserVisibility() : '';
    //     setSubMenuSecurity(!subMenuSecurity);
    //     props.menuActive
    // } 

    // const closeSubMenus = () => {
    //     setSubMenuUser(false);
    //     setSubMenuSecurity(false);
    // }

  return (
    <>
        <ul id='menu' className={ props.menuActive ? 'showMenu': ''}>
            <li  id='subMenuUser' onClick={props.subMenuUserVisibility}  ><img  id={'logoUsuario'} src={usuario} alt="" />
                <ul className={props.subMenuUser ? 'subMenuVisible' : 'subMenu' } onMouseLeave={props.closeSubMenus}>
                    <li><a href="#" onClick={props.showProfileFrame} >{sessionStorage.getItem('user-xL').toUpperCase()}</a></li>
                    <li><a href="/" onClick={props.closeSession} >Cerrar Sesion</a></li>
                </ul>
            </li>    
            <li id='subMenuSecurity' onClick={props.subMenuSecurityVisibility} ><a href="#" >Seguridad</a>
                <ul className={props.subMenuSecurity ? 'subMenuVisible' : 'subMenu' } onMouseLeave={props.closeSubMenus}>
                    <li><a href="#" >Roles</a></li>
                    <li><a href="#" onClick={props.showUsersFrame} >Usuarios</a></li>
                </ul>
            </li>
            <li><a href="#" onClick={props.showInventoriesFrame}>Inventarios</a></li>
        </ul>
    </>
  )
}

