import React, { useRef } from 'react'

interface Props {
    title: string;
}

const Sidebar: React.FC<Props> = () => {

const test = useRef<HTMLInputElement>(null);

  return (
    <div>Sidebar</div>
  )
}

export default Sidebar