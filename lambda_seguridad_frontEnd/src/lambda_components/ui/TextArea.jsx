import React from 'react'

import '../../css/ui/textArea.css'

export const TextArea = ({lambdaClassTextArea, ...props}) => {
  return (
    <textarea rows={'5'} className={lambdaClassTextArea + 'textArea_container text-justify'} {...props}></textarea>
  )
}