import React, { useState, createContext, useContext } from 'react'
import SubMenuContext from './SubMenuContext';

const FrameContext = createContext();

const FrameProvider = ({children}) => {

    //Frame handlers
    const [userFrame,       setUserFrame]       = useState(0);
    const [personTypeFrame, setPersonTypeFrame] = useState(0);
    const [personFrame,     setPersonFrame]     = useState(0);
    const [profileFrame,    setProfileFrame]    = useState(0);
    const [companyFrame,    setCompanyFrame]    = useState(0);
    const [branchFrame,     setBranchFrame]     = useState(0);
    const [branchTypeFrame, setBranchTypeFrame] = useState(0);
    const [roleFrame,       setRoleFrame]       = useState(0);
    const [roomStateFrame,  setRoomStateFrame ] = useState(0);

    const { menuActive, setMenuActive, closeSubMenus, showMenu } =useContext(SubMenuContext);

    const showProfileFrame = ( ) => {
        hideFrames()
        setProfileFrame(1);
    }

    const showUserFrame = ( ) => {
        hideFrames();
        setUserFrame(1);
    }

    const showCompanyFrame = ( ) => {
        hideFrames();
        setCompanyFrame(1);
    }
    
    const showBranchFrame = ( ) => {
        hideFrames();
        setBranchFrame(1);
    }

    const showBranchTypeFrame = ( ) => {
        hideFrames();
        setBranchTypeFrame(1);
    }

    const showPersonTypeFrame = ( ) => {
        hideFrames();
        setPersonTypeFrame(1);
    }
    
    const showPersonFrame = ( ) => {
        hideFrames();
        setPersonFrame(1);
    }

    const showRoleFrame = ( ) => {
        hideFrames();
        setRoleFrame(1);
    }
    
    const showRoomStateFrame = ( ) => {
        hideFrames();
        setRoomStateFrame(1);
    }


    const hideFrames = ( ) => {
        setProfileFrame(0);
        setUserFrame(0);
        setCompanyFrame(0);
        setBranchFrame(0);
        setBranchTypeFrame(0);
        setPersonTypeFrame(0);
        setPersonFrame(0);
        setRoleFrame(0);
        setRoomStateFrame();
        showMenu();
    }

    const frameStates = {
        menuActive, setMenuActive,
        userFrame, setUserFrame,
        personTypeFrame, setPersonTypeFrame,
        personFrame, setPersonFrame,
        profileFrame, setProfileFrame,
        companyFrame, setCompanyFrame,
        branchFrame, setBranchFrame,
        branchTypeFrame, setBranchTypeFrame,
        roleFrame, setRoleFrame,
        roomStateFrame, setRoomStateFrame,
        showProfileFrame, showUserFrame, showCompanyFrame,
        showBranchFrame, showBranchTypeFrame, showPersonTypeFrame,
        showPersonFrame, showRoleFrame, showRoomStateFrame, 
        closeSubMenus, showMenu

    }

    return <FrameContext.Provider value={frameStates}>{children}</FrameContext.Provider>
}

export {FrameContext};
export default FrameProvider;