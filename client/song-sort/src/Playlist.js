

export const getUsername = async (spotifyApi) => {
    await spotifyApi.getMe()
        .then(data => {
            return data.body.id;
        })
        .catch(error => {
            console.error('Error getting user information:', error);
            throw error;
        });
}

const getPlaylists = async (spotifyApi, username, accessToken) => {
    var allPlaylistIds = [];
    var nextLink = null;
    var offset = 0;

    try {
        do {
            const data = await spotifyApi.getUserPlaylists(username);
            const ids = data.body.items.map(playlist => {return playlist.id})
            console.log("IDsssss", ids)
            allPlaylistIds = allPlaylistIds.concat(ids);
            nextLink = data.body.next;
            offset += 20
            console.log("nextLink", nextLink)

            console.log("hail mary", accessToken)
            const response = await fetch(nextLink, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`, // Replace with your actual access token
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data2 = await response.json();
            console.log(data2);

        } while (nextLink);
        return allPlaylistIds;
    } catch (error) {
        console.log('Something went wrong!', error);
        throw error;
    }
};

const getPlaylistsVanillaJS = async (username, accessToken) => {
    var allPlaylistIds = [];
    var link = 'https://api.spotify.com/v1/me/playlists';

    do {
    // Make a GET request to the Spotify API endpoint to get user's playlists
    const response = await fetch(link, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const playlistsData = await response.json();
        const playlists = playlistsData.items;
        const ids = playlists.map(playlist => {return playlist.id})
        allPlaylistIds = allPlaylistIds.concat(ids);
        link = playlistsData.next;
    } else {
        // Handle errors
        console.error('Failed to fetch user playlists:', response.status, response.statusText);
    }
    } while (link)
    return allPlaylistIds;
}

export const getUserPlaylistIds = async (spotifyApi, username, accessToken) => {
    const playlistIds = await getPlaylistsVanillaJS(username, accessToken);
    console.log(playlistIds);
    return playlistIds;
}
