
import React, { useState } from 'react'

import usuario from'../../assets/img/usuario.png';

export const NavBarUser = (props) => {

  const [subMenuUser, setSubMenuUser] = useState(false);
  const [subMenuSecurity, setSubMenuSecurity] = useState(false);
  
  const subMenuVisible = () => {
      setSubMenuUser(true);
  }
  
  const subMenuNoVisible = () => {
      setSubMenuUser(false);
  }

  const subMenuSecurityVisible = () => {
      setSubMenuSecurity(true);
  }
  const subMenuSecurityNoVisible = () => {
    setSubMenuSecurity(false);
}
  return (
    <>
    <ul className={ props.menuActive ? 'showMenu': ''}>
        <li onMouseOver={subMenuVisible} onMouseOut={subMenuNoVisible}><img  id={'logoUsuario'} src={usuario} alt="" />
            <ul className={subMenuUser ? 'subMenuVisible' : 'subMenu' } >
                <li><a href="#" onClick={props.showProfileFrame} >{sessionStorage.getItem('user-xL').toUpperCase()}</a></li>
                <li><a href="/" onClick={props.closeSession} >Cerrar Sesion</a></li>
            </ul>
        </li>    
        <li onMouseOver={subMenuSecurityVisible} onMouseOut={subMenuSecurityNoVisible} ><a href="#" >Seguridad</a>
            <ul className={subMenuSecurity ? 'subMenuVisible' : 'subMenu' } >
                    <li><a href="#" onClick={props.showUsers} >Usuarios</a></li>
            </ul>
        </li>
        <li><a href="#" >Administracion</a></li>
    </ul>
</>
  )
}
