import React from 'react'

interface Props {
    children: React.ReactNode[];
    leftWidth: number;
    rightWidth: number;
}

const SplitScreen: React.FC<Props> = ({
    children,
    leftWidth, 
    rightWidth
}) => {

const [left, right] = children;
  return (
    <div style={{ display: 'flex' }}>
        <div className="left" style={{flex: leftWidth, background: 'red'}}>{left}</div>
        <div className="right" style={{flex: rightWidth, background: 'blue'}}>{right}</div>
    </div>
  )
}

export default SplitScreen