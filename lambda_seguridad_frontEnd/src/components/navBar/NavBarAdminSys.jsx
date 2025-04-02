import React, { useContext } from 'react';

import usuario from'../../assets/img/usuario.png';
import SubMenuContext from '../../context/SubMenuContext';
import { FrameContext } from '../../context/FrameContext';

export const NavBarAdminSys = (props) => {

  return (
    <>
        <ul id='menu' className={ props.menuActive ? 'showMenu': ''} onMouseLeave={props.showMenu}>
            <li id='subMenuUser' onClick={props.subMenuUserVisibility}  onMouseLeave={props.subMenuReset}>
                <img  id={'logoUsuario'} src={usuario} alt="" />
                <ul className={props.subMenuState.menuUser ? 'subMenuVisible' : 'subMenuHide' }>
                    <li><a href="#" onClick={props.showProfileFrame} >{sessionStorage.getItem('user-xL') ? sessionStorage.getItem('user-xL').toUpperCase() : ''}</a></li>
                    <li><a href="/" onClick={props.closeSession} >Cerrar Sesion</a></li>
                </ul>
            </li>    
            <li id='subMenuAdmin' onClick={props.subMenuAdminVisibility}  onMouseLeave={props.subMenuReset}>
                <a href="#" >Admin</a>
                <ul className={props.subMenuState.menuAdmin ? 'subMenuVisible' : 'subMenuHide' }>
                    <li><a href="#" onClick={props.showCompanyFrame} >Empresa</a></li>
                    <li><a href="#" onClick={props.showBranchFrame} >Sucursales</a></li>
                    <li><a href="#" onClick={props.showBranchTypeFrame} >Tipo de Sucursal</a></li>
                    <li><a href="#" onClick={props.showRoomStateFrame} >Estados de Habitación</a></li>
                    <li><a href="#" onClick={props.showServiceFrame} >Servicios</a></li>
                    <li><a href="#" onClick={props.showPriceFrame} >Precios</a></li>
                    <li><a href="#" onClick={props.showRoomFrame} >Habitaciones</a></li>
                </ul>
            </li>
            <li id='subMenuSecurity' onClick={props.subMenuSecurityVisibility}  onMouseLeave={props.subMenuReset}>
                <a href="#" >Seguridad</a>
                <ul className={props.subMenuState.menuSecurity ? 'subMenuVisible' : 'subMenuHide' }>
                    <li><a href="#" onClick={props.showUserFrame} >Usuarios</a></li>
                    <li><a href="#" onClick={props.showRoleFrame} >Roles</a></li>
                </ul>
            </li>
            <li id='subMenuPerson' onClick={props.subMenuPersonVisibility} onMouseLeave={props.subMenuReset}>
                <a href="#"> Clientes</a>
                <ul className={props.subMenuState.menuPerson ? 'subMenuVisible' : 'subMenuHide' } >
                    <li><a href="#" onClick={props.showPersonFrame} >Personas</a></li>
                    <li><a href="#" onClick={props.showPersonTypeFrame} >Tipos</a></li>
                </ul>            
            </li>
            <li id='subMenuOperation' onClick={props.subMenuOperationVisibility} onMouseLeave={props.subMenuReset}>
                <a href="#"> Operaciones</a>
                <ul className={props.subMenuState.menuOperation ? 'subMenuVisible' : 'subMenuHide' } >
                    <li><a href="#" onClick={props.showReservationFrame} >Reservaciones</a></li>
                    <li><a href="#"  >Entradas</a></li>
                    <li><a href="#"  >Pagos</a></li>
                </ul>            
            </li>
        </ul>
    </>
  )
}

