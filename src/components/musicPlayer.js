import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PlayerContainer = styled.div`
  background-color: #1db954;
  color: white;
  padding: 20px;
  text-align: center;
  width: auto;
  max-width: 100%;
  margin: auto;
`;

const SearchForm = styled.form`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
`;

const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 300px;
  overflow-y: auto;
`;

const TrackContainer = styled.div`
  margin-bottom: 15px;
  width: 300px;
  text-align: left;
`;

const TrackName = styled.h3`
  margin: 0;
`;

const TrackArtist = styled.p`
  margin: 0;
  font-style: italic;
`;

const PlaylistContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  max-height: 300px;
    overflow-y: auto;
`;

const Playlist = styled.div`
  width: 300px;
  padding: 10px;
  background: #fff;
  color: #000;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
`;

const CLIENT_ID = 'e0713a99e69e43e688b7d104b507efa1';
const CLIENT_SECRET = '32c189047149405dbb3bcfaaa265b30d';

const getAccessToken = async () => {
  const result = await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    },
    data: 'grant_type=client_credentials'
  });

  return result.data.access_token;
};

const Track = ({ track }) => {
  const embedUrl = `https://open.spotify.com/embed/track/${track.id}`;

  return (
    <TrackContainer>
      <TrackName>{track.name}</TrackName>
      <TrackArtist>{track.artists.map(artist => artist.name).join(', ')}</TrackArtist>
      <iframe src={embedUrl} width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </TrackContainer>
  );
};

const handlePlaylistClick = (playlistId) => {
    const url = `https://open.spotify.com/playlist/${playlistId}`;
    window.open(url, '_blank');
  };

const MusicPlayer = () => {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchFeaturedPlaylists();
  }, []);

  const fetchFeaturedPlaylists = async () => {
    const accessToken = await getAccessToken();
    const result = await axios.get(`https://api.spotify.com/v1/browse/featured-playlists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setPlaylists(result.data.playlists.items);
  };

  const searchTracks = async (query) => {
    const accessToken = await getAccessToken();

    const result = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: 'track',
      },
    });

    return result.data.tracks.items;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await searchTracks(query);
    setTracks(results);
  };

  return (
    <PlayerContainer>
      <h1>Spotify Music Player</h1>
      <SearchForm onSubmit={handleSearch}>
        <SearchInput type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </SearchForm>
      {tracks.length > 0 ? (
        <TrackList>
          {tracks.map(track => <Track key={track.id} track={track} />)}
        </TrackList>
      ) : (
        <PlaylistContainer>
          {playlists.map(playlist => (
            <Playlist key={playlist.id} onClick={() => handlePlaylistClick(playlist.id)}>
              <h3>{playlist.name}</h3>
            </Playlist>
          ))}
        </PlaylistContainer>
      )}
    </PlayerContainer>
  );
}

export default MusicPlayer;
