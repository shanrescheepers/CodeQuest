import React from 'react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Navigation from '../components/Navigation';

const AdminPage = () => {
    // const [loggedIn, setLoggedIn] = useState(true);
    let navigate = useNavigate();

    const getAdminPermission = (rankId) => {
        if (rankId === '1') {
            console.log("navigate true because rank is 1")
            return true;
        } else {
            navigate("/FeedPage", { replace: true });
            localStorage.clear();

            console.log("navigate false because rank admin permission is not 1")
            return false;
        }
    }
    // This manner will be used in the navigation side as well. 
    // security options: 1) session storage || 2) axios call that will check user's permission. Everytime page reloads, it will check user permission, along with using session storage but just to GET the User's ID.
    // ID= rank, based on rank, pull permissions through
    useEffect(() => {
        { getAdminPermission("1") }
        // 2)here we'll give rank through based on axios call. 1)Session == bad, hackers etc
    })

    return (
        <div>
        </div>
    );
};

export default AdminPage;