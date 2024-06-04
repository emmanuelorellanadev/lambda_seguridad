import React from 'react'

import "../../css/ui/input.css"

export const Input = ({lambdaClassInput, ...props}) => {
  if(props.type != 'checkbox'){
      return (
        <input  className={'form form-control input_container' + lambdaClassInput} {...props} />
      ) 
  }else{
    return (
      <input  className={'form input_checkbox' + lambdaClassInput} {...props} />
    )
  }
}
