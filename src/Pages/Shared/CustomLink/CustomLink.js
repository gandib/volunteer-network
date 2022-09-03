import React from 'react';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';

function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <div>
            <Link
                style={{ fontWeight: 'bold', color: match ? "red" : 'white', borderBottomColor: match ? "green" : "black", borderBottom: match ? '2px solid red' : '' }}
                to={to}
                {...props}
            >
                {children}
            </Link>

        </div >
    );
}

export default CustomLink;