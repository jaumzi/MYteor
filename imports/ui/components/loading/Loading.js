import React from 'react';

function Loading(props) {
    const { text, children } = props;
    return (
        <>
            <div>
                {text || children || 'Carregando ...'}
            </div>
        </>
    );
}

export default Loading;