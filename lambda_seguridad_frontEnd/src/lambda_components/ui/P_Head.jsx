import React from 'react'

export const P_Head = ({text, ...props}) => {
  return (
        <p {...props}>{text}</p>
  )
}

// export default P_Head