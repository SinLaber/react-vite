import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import '../styles/Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <NavLink to="/" activeClassName="active" exact>
                        <HomeOutlinedIcon className="icon" />
                        <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/code" activeClassName="active">
                        <CodeIcon className="icon" />
                        <span>Code</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/link" activeClassName="active">
                        <LinkIcon className="icon" />
                        <span>Link</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
