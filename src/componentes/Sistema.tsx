import React from 'react';
import '../StyleGeneral/Sistema.css'

interface SistemaProps {
  children: React.ReactNode;
  className?: string;
}

const Sistema: React.FC<SistemaProps> = ({children}) => {
  return (
    <div className={'sistema ${className || ""}'}>
      {children}
    </div>
  )
}

export default Sistema;