import React from 'react';

import '../../css/ui/label.css'

export const Label = ({text, lambdaClassLabel, ...props}) => {
    return(
        <>
            <label className={"label_container" + lambdaClassLabel} {...props} >
                {text}
            </label>
        </>
    )
}

