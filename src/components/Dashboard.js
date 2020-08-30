import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faGift } from '@fortawesome/free-solid-svg-icons'
import Firebase from '../base';
import '../css/dashboard.css';


const MyList = (listObject) => {
    return (
        <h1>My</h1>
    )
}


const OthersList = ({listObject}) => {

    const toggleExpanded = (element) => {
        let body = element.parentElement.nextElementSibling;
        body.classList.value.includes('hidden') ?
            body.classList.remove('hidden') : 
            body.classList.add('hidden');
    }

    const toggleDone = (person, item, element) => {
        element.classList.value.includes('done') ? 
            Firebase.updateStatus(person, item, "notdone") &&
            element.classList.remove('done') :
            Firebase.updateStatus(person, item, "done") &&
            element.classList.add('done');

    }

    return (
        <div>
            {Object.keys(listObject).map(person => {
                return (
                    <div className="listItem">
                        <div className="listHeader">
                            <span>{person}</span>
                            <FontAwesomeIcon 
                                onClick={e => toggleExpanded(e.currentTarget)} 
                                style={{float: "right"}} 
                                icon={faChevronDown}
                                size="lg"
                                color="#4287f5"
                                className="faIcon" />
                        </div>
                        <div className="listBody hidden">
                            <ul style={{marginTop: 10, listStyleType: 'none'}}>
                            {Object.keys(listObject[person]).map((item, index) => {
                                return (
                                    <li
                                        onClick={e => toggleDone(person, item, e.currentTarget)}
                                        key={person + item + index}>
                                            <FontAwesomeIcon
                                                style={{marginRight: '20px'}}
                                                size={"lg"}
                                                icon={faGift}
                                                color={"#3e7329"} />
                                            {item}
                                        </li>
                                )                             
                            })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


const Dashboard = (props) => {
    const [activeTab, setActiveTab] = useState('myListTab');
    const [myList, setMyList] = useState(null);
    const [otherLists, setOtherLists] = useState(null);


    const fetchData = async () => {
        Firebase.ref.on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let items = {...data};
            setOtherLists(items);
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