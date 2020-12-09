import React, { useEffect } from 'react';
import Loading from '../../components/loading/Loading';

const prepareComponent = (Component, propsPrepare) => {
    const { awaits } = propsPrepare;

    return (props) => {
        let prepare = true;
        for (awaitvar of awaits) {
            if (!props[awaitvar]) {
                prepare = false;
            }
        }

        return prepare
            ? <Component {...props} />
            : <Loading text="..." />;
    };
}

export { prepareComponent };