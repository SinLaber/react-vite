// src/components/Breadcrumbs.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import menu from '../config/sidebar';

const findBreadcrumbs = (menu, path) => {
    const stack = [];
    const traverse = (items, parent) => {
        for (const item of items) {
            stack.push(item);
            if (item.path === path) return true;
            if (item.children && traverse(item.children, item)) return true;
            stack.pop();
        }
        return false;
    };
    traverse(menu);
    return stack;
};

const Breadcrumbs = () => {
    const location = useLocation();
    const breadcrumbs = findBreadcrumbs(menu, location.pathname);

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {breadcrumbs.map((item, index) => (
                    <li key={item.path} className="breadcrumb-item">
                        {index === breadcrumbs.length - 1 ? (
                            <span>{item.name}</span>
                        ) : (
                            <Link to={item.path}>{item.name}</Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
