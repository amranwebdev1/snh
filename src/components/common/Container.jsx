import React from 'react'
import {cn} from "@/lib/utils"
const Container = ({children,className}) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 font-mono lg:px-8",className)}>
      {children}
    </div>
  )
}

export default Container