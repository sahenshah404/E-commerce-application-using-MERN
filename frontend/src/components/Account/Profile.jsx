import React, { useState, useEffect } from 'react';

function Profile() {

    const [profile, setProfile] = useState(false);

    useEffect(() => {
        (async () => {
            const data = await fetch("/account/profile");
            const profileData = await data.json();
            setProfile(profileData);
        })();
    }, []);

    return <>
        {profile && <div className="custom-container m-auto">
            <p className="h1">Profile</p>
            <table className="w-100">
                <tr className="h3">
                    <td className="w-50">name</td>
                    <td className="w-50">{profile.name}</td>
                </tr>
               
                <tr className="h3">
                    <td className="w-50">email</td>
                    <td className="w-50">{profile.email}</td>
                </tr>
               
                <tr className="h3">
                    <td className="w-50">mobile</td>
                    <td className="w-50">{profile.mobile}</td>
                </tr>
               
                <tr className="h3">
                    <td className="w-50">user Type</td>
                    <td className="w-50">{profile.userType}</td>
                </tr>
               
            </table>
        </div>
        }

    </>
};

export default Profile;