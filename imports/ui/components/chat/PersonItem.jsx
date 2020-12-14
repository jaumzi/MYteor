import React, { memo, } from 'react';
import EnumPresence from '../../../modules/user/util/EnumPresence';

//import './ChatItemStyle.css';

const PersonItem = (props) => {
    const { person, isRegistered , handleStartChat} = props;

    return (
        <div>
          <div className="avatar" />
          <div style={{'bgColor':'red'}, {'border':'1 px solid red'}}>
            <a onClick={handleStartChat}>{person.username}</a>
          </div>
        </div>
    );
};

export default memo(PersonItem);
