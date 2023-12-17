
class Playlist {
    constructor(id, name, image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }
};

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

export const getUserPlaylistsData = async (accessToken) => {
    try {
        const playlists = await getUserPlaylists(accessToken);
        let playlistsData = [];

        playlists.forEach((playlist) => {
            let id = playlist.id;
            let name = playlist.name;
            let image = playlist.images[0].url;

            playlistsData.push(new Playlist(id, name, image));
        });

        return playlistsData;
    } catch (error) {
        console.error('Error creating Playlist objs: ', error);
        throw error;
    }
};
