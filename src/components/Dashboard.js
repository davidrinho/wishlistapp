import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faGift, faCandyCane, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import Firebase from '../base';

import MyList from './MyList';
import OthersList from './OthersList';
import '../css/dashboard.css';



const Dashboard = (props) => {
    const [activeTab, setActiveTab] = useState('myListTab');
    const [myList, setMyList] = useState(null);
    const [otherLists, setOtherLists] = useState(null);


    const signOut = () => {
        Firebase.signOut();
        props.history.push('/');
    }

    const fetchData = async () => {
        Firebase.ref.on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let items = {...data};
            setOtherLists(items);
            setMyList(items[Firebase.auth.currentUser.displayName]);
        })
    }

    useEffect(() => {
        fetchData();      
    }, []);
    if(!Firebase.getCurrentUsername()) {
        //Not signed in
        alert("Please login first!");
        props.history.push('/');
    }
    if  (otherLists !== null && otherLists !== undefined) {
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
                    <button
                        style={{width: '20vw', margin: 0, fontSize: '0.5rem', position: 'absolute', right: '5%'}}
                        id="signOut"
                        onClick={() => signOut()}>
                        Logga ut
                    </button>
                </div>
                <div className="listViewer">
                    {activeTab === 'myListTab' ? <MyList listObject={myList} /> : <OthersList listObject={otherLists} />}
                </div>
            </div>
        )
    } else {
        return (
            <div><h1>Loading...</h1></div>
        )
    }
}



export default Dashboard;