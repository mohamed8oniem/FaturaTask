import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './_UserDropDown.scss'
import UserAvatar from '../../../assets/images/UserLogo.gif'
const UserDropDown = () => {
    return (
        <div className="user">
            <div className="user__wrapper">
                <img src={UserAvatar} alt="Avatar" />
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Mohamed Ghoniem
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Favorites</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}
export default UserDropDown;