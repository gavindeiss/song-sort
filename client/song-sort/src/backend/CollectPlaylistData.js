export const getUserPlaylists = async (accessToken) => {
    var allPlaylists = [];
    var link = 'https://api.spotify.com/v1/me/playlists';
    let count = 0

    do {
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
            console.error('Failed to fetch user playlists:', response.status, response.statusText);
        }
        count = count + 1;
    } while (link && count < 5)
    return allPlaylists;
}

export const getUserTracklist = async (accessToken, tracksLink) => {
    var allTracks = [];
    //console.log("Trackslink", tracksLink);

    do {
        // Make a GET request to the Spotify API endpoint to get user's playlists
        const response = await fetch(tracksLink, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const tracksData = await response.json();
            const tracks = tracksData.items;
            allTracks = allTracks.concat(tracks);
            tracksLink = tracksData.next;
        } else {
            console.error('Failed to fetch user playlists:', response.status, response.statusText);
        }
    } while (tracksLink)
    return allTracks;
}
