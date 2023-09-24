import React from 'react';

import usuario from'../../assets/img/usuario.png';

export const NavBarAdminSys = (props) => {

  return (
    <>
        <ul id='menu' className={ props.menuActive ? 'showMenu': ''}>
            <li id='subMenuUser' onClick={props.subMenuUserVisibility} ><img  id={'logoUsuario'} src={usuario} alt="" />
                <ul className={props.subMenuUser ? 'subMenuVisible' : 'subMenu' } onMouseLeave={props.closeSubMenus}>
                    <li><a href="#" onClick={props.showProfileFrame} >{sessionStorage.getItem('user-xL').toUpperCase()}</a></li>
                    <li><a href="/" onClick={props.closeSession} >Cerrar Sesion</a></li>
                </ul>
            </li>    
            <li id='subMenuSecurity' onClick={props.subMenuSecurityVisibility} ><a href="#" >Seguridad</a>
                <ul className={props.subMenuSecurity ? 'subMenuVisible' : 'subMenu' } onMouseLeave={props.closeSubMenus}>
                    <li><a href="#" onClick={props.showUserFrame} >Usuarios</a></li>
                    <li><a href="#" onClick={props.showCompanyFrame} >Empresa</a></li>
                    <li><a href="#" onClick={props.showBranchFrame} >Sucursales</a></li>
                </ul>
            </li>
            <li><a href="#" onClick={props.showPersonFrame}>Personas</a></li>
        </ul>
    </>
  )
}

