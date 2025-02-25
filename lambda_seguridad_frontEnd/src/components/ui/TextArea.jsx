import React from 'react'

import '../../css/ui/textArea.css'

export const TextArea = ({lambdaClassTextArea, ...props}) => {
  return (
    <textarea rows={'3'} className={lambdaClassTextArea + 'textArea_container text-justify form form-control input_container'} {...props}></textarea>
  )
}