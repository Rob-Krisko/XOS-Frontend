import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultImage from '../images/default.png';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 600px;
    margin: 50px auto;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
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

const BackButton = styled.button`
    background-color: #2d2d2d;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
        background-color: #1a1a1a;
    }
`;

const BASE_URL = process.env.NODE_ENV === 'production' ? 'production URL will go here when we launch real time' : 'http://localhost:5000';

const UserProfile = () => { 
    const { username } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [updatedBio, setUpdatedBio] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${BASE_URL}/profile/${username}`;
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get(url, config);
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error.response);
            }
        };
        fetchProfile();
    }, [username]);

    const handleEdit = () => {
        setUpdatedBio(profile.bio || '');
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${BASE_URL}/profile/${username}/update`;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.put(url, {
                bio: updatedBio
            }, config);
            
            if (response.status === 200) {
                setProfile(prev => ({ ...prev, bio: updatedBio }));
                setIsEditing(false);
            } else {
                console.error("Error updating profile. Response:", response.data);
            }
        } catch (error) {
            console.error("Error updating profile:", error.response);
        }
    };

    const navigateToDesktop = () => {
        navigate('/desktop');
    };

    return (
        <ProfileContainer>
            <UsernameHeader>{profile.userId?.username || username}'s Profile</UsernameHeader>
            <ProfileImage src={profile.profilePicture || defaultImage} alt="Profile" />
            <ProfileDetail>Email: {profile.userId?.email}</ProfileDetail>
            {isEditing ? (
                <div>
                    <textarea value={updatedBio} onChange={(e) => setUpdatedBio(e.target.value)} />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <>
                    <ProfileDetail>Bio: {profile.bio}</ProfileDetail>
                    <EditButton onClick={handleEdit}>Edit Bio</EditButton>
                </>
            )}
            <BackButton onClick={navigateToDesktop}>Back to Desktop</BackButton>
        </ProfileContainer>
    );
};

export default UserProfile;
