import React from 'react';

import usuario from'../../assets/img/usuario.png';

export const NavBarAdminSys = (props) => {

  return (
    <>
        <ul id='menu' className={ props.menuActive ? 'showMenu': ''} onMouseLeave={props.closeSubMenu}>
            <li id='subMenuUser' onClick={props.subMenuUserVisibility}  onMouseLeave={props.closeSubMenus}>
                <img  id={'logoUsuario'} src={usuario} alt="" />
                <ul className={props.subMenuUser ? 'subMenuVisible' : 'subMenuHide' }>
                    <li><a href="#" onClick={props.showProfileFrame} >{sessionStorage.getItem('user-xL').toUpperCase()}</a></li>
                    <li><a href="/" onClick={props.closeSession} >Cerrar Sesion</a></li>
                </ul>
            </li>    
            <li id='subMenuAdmin' onClick={props.subMenuAdminVisibility}  onMouseLeave={props.closeSubMenus}>
                <a href="#" >Admin</a>
                <ul className={props.subMenuAdmin ? 'subMenuVisible' : 'subMenuHide' }>
                    <li><a href="#" onClick={props.showCompanyFrame} >Empresa</a></li>
                    <li><a href="#" onClick={props.showBranchFrame} >Sucursales</a></li>
                    <li><a href="#" onClick={props.showBranchTypeFrame} >Tipo de Sucursal</a></li>
                    <li><a href="#" onClick={props.showRoomStateFrame} >Estado de Habitación</a></li>
                </ul>
            </li>
            <li id='subMenuSecurity' onClick={props.subMenuSecurityVisibility}  onMouseLeave={props.closeSubMenus}>
                <a href="#" >Seguridad</a>
                <ul className={props.subMenuSecurity ? 'subMenuVisible' : 'subMenuHide' }>
                    <li><a href="#" onClick={props.showUserFrame} >Usuarios</a></li>
                    <li><a href="#" onClick={props.showRoleFrame} >Roles</a></li>
                </ul>
            </li>
            <li id='subMenuPerson' onClick={props.subMenuPersonVisibility} onMouseLeave={props.closeSubMenus}>
                <a href="#"> Clientes</a>
                <ul className={props.subMenuPerson ? 'subMenuVisible' : 'subMenuHide' } >
                    <li><a href="#" onClick={props.showPersonFrame} >Personas</a></li>
                    <li><a href="#" onClick={props.showPersonTypeFrame} >Tipos</a></li>
                </ul>            
            </li>
        </ul>
    </>
  )
}

