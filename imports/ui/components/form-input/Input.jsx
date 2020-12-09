import React, { useRef } from 'react';

import './InputStyle.css';

function Input(props) {
    const inputRef = useRef();
    const { label, name, ...rest } = props;

    return (
        <>
            <div className="input-content" >
                {label && <label htmlFor={name}>{label}</label>}
                <input
                    {...rest}
                    name={name}
                    ref={inputRef}
                />
            </div>
        </>
    );
}

export default Input;