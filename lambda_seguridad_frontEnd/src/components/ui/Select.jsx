import React from "react";

import '../../css/ui/select.css'

export const Select = ({data, text, ...props}) => {
    return(
        <>
            <select className="form-select text-center select_container"{...props}>
                <option value='0'>{text}</option>
                {
                    data.map( d => {
                        let dataNames = Object.values(d);
                        return (<option key={dataNames[0]} value={dataNames[0]}>{dataNames[1]}</option>);
                    })
                }
            </select>
        </>
    )
}