import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultImage from '../images/default.png';
import styled from 'styled-components';

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 800px;
    margin: auto;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    @media (max-width: 768px) {
        max-width: 90%;
    }
`;

const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
`;

const ProfileDetail = styled.p`
    font-size: 18px;
    margin-bottom: 10px;
`;

const UsernameHeader = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

const EditButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    &:hover {
        background-color: #0056b3;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const UserProfile = () => {
    const username = localStorage.getItem('username');
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        bio: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (username) {
            const fetchProfile = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const url = `http://localhost:5000/profile/${username}`;
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    };
                    const response = await axios.get(url, config);
                    if (response.status === 200 && response.data && response.data.userId) {
                        const { username, email, bio } = response.data.userId;
                        setProfileData({ username, email, bio: response.data.bio });
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error.response);
                }
            };
            fetchProfile();
        } else {
            console.log("Username not found in local storage.");
        }
    }, [username]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `http://localhost:5000/profile/${username}/update`;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.put(url, {
                bio: profileData.bio
            }, config);
            
            if (response.status === 200) {
                setProfileData(prev => ({ ...prev, bio: response.data.bio }));
                setIsEditing(false);
            } else {
                console.error("Error updating profile. Response:", response.data);
            }
        } catch (error) {
            console.error("Error updating profile:", error.response);
        }
    };

    const handleChange = (e) => {
        setProfileData(prev => ({
            ...prev,
            bio: e.target.value
        }));
    };

    return (
        <ProfileContainer>
            <UsernameHeader>{profileData.username}'s Profile</UsernameHeader>
            <ProfileImage src={defaultImage} alt="Profile" />
            <ProfileDetail>Email: {profileData.email}</ProfileDetail>
            {isEditing ? (
                <div>
                    <TextArea 
                      value={profileData.bio} 
                      onChange={handleChange} 
                      rows="4"
                    />
                    <EditButton onClick={handleSave}>Save</EditButton>
                </div>
            ) : (
                <>
                    <ProfileDetail>Bio: {profileData.bio}</ProfileDetail>
                    <EditButton onClick={handleEdit}>Edit Bio</EditButton>
                </>
            )}
        </ProfileContainer>
    );
};

export default UserProfile;
