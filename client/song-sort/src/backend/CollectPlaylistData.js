export const getUserPlaylists = async (accessToken) => {
    var allPlaylists = [];
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
        allPlaylists = allPlaylists.concat(playlists);
        link = playlistsData.next;
    } else {
        // Handle errors
        console.error('Failed to fetch user playlists:', response.status, response.statusText);
    }
    } while (link)
    return allPlaylists;
}

