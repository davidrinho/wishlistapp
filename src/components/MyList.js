import React from 'react';
import AddItem from './AddItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift, faCandyCane } from '@fortawesome/free-solid-svg-icons'

const MyList = ({listObject}) => {
    if (listObject !== null){
        return (
            <div className="myListContainer" style={{alignContent: 'center', marginTop: '20px'}}>
                <div className="listBody">
                <ul>
                {Object.keys(listObject).map((item, index) => {
                    return (
                        <li                      
                        key={item + "_" + index}>
                            <FontAwesomeIcon
                                style={{marginRight: '20px'}}
                                size={"lg"}
                                icon={faCandyCane}
                                color={"#E40010"} />{
                            item}</li>
                    )
                })}
                </ul>
                </div>

            <AddItem />
            </div>
        )
    } else {
        return (
            <h1>Du har inte önskat dig något ännu :)</h1>
        )
    }
}



export default MyList;