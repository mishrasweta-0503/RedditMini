import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceAngry } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faIcons } from '@fortawesome/free-solid-svg-icons';
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar({isOpen,onClose}){
    const icons = [{name:"mildlyinfuriating",label: "r/mildlyinfuriating",icon:<FontAwesomeIcon icon={faFaceAngry} />},
        {name:"worldnews",label: "r/worldnews",icon:<FontAwesomeIcon icon={faGlobe} />},
        {name:"popculturechat",label: "r/popculturechat",icon:<FontAwesomeIcon icon={faIcons} />},
        {name:"learnprogramming",label: "r/learnprogramming",icon:<FontAwesomeIcon icon={faComputer} />},
        {name:"gameofthrones",label: "r/gameofthrones",icon:<FontAwesomeIcon icon={faCouch} />}
    ]
    return(
        <>
            <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
                    <aside>
                        <nav>
                            <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/" end>
                            <FontAwesomeIcon icon={faHouse}/> Home
                            </NavLink>
                            <h5>Communities</h5>
                            {icons.map((item) => (
                                <ul>
                                    <li key={item.name}>
                                        <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to={`/r/${item.name}`}>
                                        {item.icon} r/{item.name}
                                        </NavLink>
                                    </li>
                                </ul>
                                ))}
                        </nav>
                    </aside>

            </div>
        </>
    )
}