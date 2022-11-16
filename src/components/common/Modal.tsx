import React from 'react';
import { useState } from 'react';

interface Props {
    children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ children }) => {

    const [shouldShow, setShouldShow] = useState<boolean>(false);

    return (
        <>
            <button onClick={() => setShouldShow(true)}>Show Modal</button>
            {
                shouldShow &&
                <div 
                    className="background" 
                    onClick={(e: React.SyntheticEvent) => {
                        console.log('Background Click!');
                        e.stopPropagation();
                        setShouldShow(false)
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'fixed',
                        zIndex: 1,
                        left: 0,
                        top: 0,
                        overflow: 'auto',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <button 
                        onClick={(e: React.SyntheticEvent) => {
                            console.log('Button Click!');
                            e.stopPropagation();
                            setShouldShow(false);
                        }}
                    >
                        Hide Modal
                    </button>
                    <div className="modal-body" style={{
                        backgroundColor: 'white',
                        margin: '10% auto',
                        padding: '20px',
                        width: '50%'
                    }}>
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

export default Modal