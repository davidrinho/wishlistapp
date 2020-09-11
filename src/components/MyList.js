import React from 'react';
import AddItem from './AddItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCandyCane, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Firebase from '../base';

const MyList = ({listObject}) => {
    const removeItem = (element) => {
        let item = element.previousSibling.nodeValue;
        Firebase.removeItem(Firebase.auth.currentUser.displayName, item);
    }

    if (listObject !== undefined && listObject !== null){
        return (
            <div className="myListContainer" style={{alignContent: 'center', marginTop: '20px'}}>
                <div className="listBody">
                <ul>
                {Object.keys(listObject).map((item, index) => {
                    return (
                        <li                      
                        key={item + "_" + index}>
                            <FontAwesomeIcon
                                key={item + "_Gifticon_" + index}
                                style={{marginRight: '20px'}}
                                size={"lg"}
                                icon={faCandyCane}
                                color={"#E40010"} />
                            {item}
                            <FontAwesomeIcon
                                className="removeIcon"
                                onClick={e => removeItem(e.currentTarget)}
                                key={item + "_Removeicon_" + index}
                                size={"1x"}
                                icon={faTimesCircle}
                                color={"#E40010"}
                                style={{float: "right", padding: "1px"}} />
                            </li>
                    )
                })}
                </ul>
                </div>

            <AddItem />
            </div>
        )
    } else {
        return (
            <div className="myListContainer" style={{alignContent: 'center', marginTop: '20px'}}>
                <h1 style={{textAlign: 'center'}}>Du har inte önskat dig något ännu :)</h1>
                <AddItem />
            </div>
        )
    }
}



export default MyList;