import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faGift, faCandyCane } from '@fortawesome/free-solid-svg-icons'
import Firebase from '../base';

import MyList from './MyList';
import OthersList from './OthersList';
import '../css/dashboard.css';



const Dashboard = (props) => {
    const [activeTab, setActiveTab] = useState('myListTab');
    const [myList, setMyList] = useState(null);
    const [otherLists, setOtherLists] = useState(null);


    const fetchData = async () => {
        Firebase.ref.on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let items = {...data};
            setOtherLists(items);
            console.log(items);
            console.log(Firebase.auth.currentUser.displayName);
            setMyList(items[Firebase.auth.currentUser.displayName]);
        })
    }

    useEffect(() => {
        fetchData();      
    }, []);
    // if(!Firebase.getCurrentUsername()) {
    //     // Not signed in
    //     alert("Please login first!");
    //     props.history.push('/');
    // }

    return (
        <div>
            <div className="dashboardNav">
                <button 
                    id="myListTab"
                    onClick={e => setActiveTab(e.target.id)}
                    className={activeTab === 'myListTab' ? 'activeTab' : null}>
                    Min lista
                </button>
                <button 
                    id="othersListTab"
                    onClick={e => setActiveTab(e.target.id)}
                    className={activeTab === 'othersListTab' ? 'activeTab' : null}>
                    Andras listor
                </button>
            </div>
            <div className="listViewer">
                {activeTab === 'myListTab' ? <MyList listObject={myList} /> : <OthersList listObject={otherLists} />}
            </div>
        </div>
    )
}



export default Dashboard;