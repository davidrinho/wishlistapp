import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'
import Firebase from '../base';

const AddItem = () => {

    const addToList = () => {
        let itemInput = document.getElementById("itemInput");
        if(itemInput.value !== '') {
            Firebase.addItem(Firebase.auth.currentUser.displayName, itemInput.value);
        }
        let addIcon = document.getElementById("addItemGiftIcon");
        addIcon.classList.toggle('down')
        setTimeout(() => {
            addIcon.classList.toggle('down')
        }, 1000)
        

    } 


    return (
        <div className="bottomBar">          
            <div onClick={() => addToList()}>               
                <FontAwesomeIcon id="addItemGiftIcon" className="addItemIcon" color={"#014a13"} size="5x" icon={faGift} />
                <h3 id="addItemtext" style={{color: "#FFFFFF", marginTop: '0px'}}>Lägg till</h3>
            </div>
            <input id="itemInput" />
        </div> 
    )
}




export default AddItem;