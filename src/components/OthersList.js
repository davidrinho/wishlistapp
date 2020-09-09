import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faGift } from '@fortawesome/free-solid-svg-icons'
import Firebase from '../base';


const OthersList = ({listObject}) => {

    const toggleExpanded = (element) => {
        // Animation on arrow
        element.classList.value.includes('clickedArrow') ?
            element.classList.remove('clickedArrow') : 
            element.classList.add('clickedArrow');

        // Expand Parents sibling element
        let body = element.parentElement.nextElementSibling;
        body.classList.value.includes('hidden') ?
            body.classList.remove('hidden') : 
            body.classList.add('hidden');
    }

    const updateBoughtBy = (element, person, item) => {
        if(element.innerHTML.includes('Köpt av')) {
            element.innerHTML = '';
            Firebase.removeBoughtBy(person, item);
        } else {
            element.innerHTML = 'Köpt av: ' + Firebase.auth.currentUser.displayName;
            Firebase.updateBoughtBy(person, item);
        }
    }

    const toggleDone = (person, item, element) => {

        if(element.classList.value.includes('done')) {
            Firebase.updateStatus(person, item, 'notdone');
            element.classList.remove('done');
        } else {
            Firebase.updateStatus(person, item, 'done');
            element.classList.add('done');
        }
        console.log(element.children[2]);
        updateBoughtBy(element.children[2], person, item);
    }

    return (
        <div>
            {Object.keys(listObject).map(person => {
                if(person !== Firebase.auth.currentUser.displayName) {
                    return (
                        <div className="listItem">
                            <div className="listHeader">
                                <span>{person}</span>
                                <FontAwesomeIcon 
                                    onClick={e => toggleExpanded(e.currentTarget)} 
                                    style={{float: "right"}} 
                                    icon={faChevronDown}
                                    size="1x"
                                    color="#FFFFFF"
                                    className="faIcon" />
                            </div>
                            <div className="listBody hidden">
                                <ul style={{marginTop: 10, listStyleType: 'none'}}>
                                {Object.keys(listObject[person]).map((item, index) => {
                                    console.log(listObject[person][item].status);
                                    return (
                                        <li
                                            className={listObject[person][item].status === 'done' ? 'done' : null}
                                            onClick={e => toggleDone(person, item, e.currentTarget)}
                                            key={person + item + index}>
                                                <FontAwesomeIcon
                                                    style={{marginRight: '20px'}}
                                                    size={"lg"}
                                                    icon={faGift}
                                                    color={"#E40010"} />
                                                {item}<br/>
                                                <span 
                                                    style={{}}
                                                    key={person+item+"_boughtBy"}>
                                                        {listObject[person][item].boughtBy !== undefined ?
                                                            "Köpt av: " + listObject[person][item].boughtBy : null}                                                   
                                                </span>
                                            </li>
                                    )                             
                                })}
                                </ul>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}


export default OthersList;