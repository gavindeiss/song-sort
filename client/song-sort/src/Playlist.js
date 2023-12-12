
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
    console.log(allPlaylists);
    return allPlaylists;
}

export const getUserPlaylistsData = async (accessToken) => {
    try {
        const playlistsData = await getUserPlaylists(accessToken);
        let playlists = [];

        playlistsData.forEach((playlist) => {
            let id = playlist.id;
            let name = playlist.name;
            let image = playlist.images[0].url;

            playlists.push(new Playlist(id, name, image));
        });

        console.log(playlists);
        return playlists;
    } catch (error) {
        console.error('Error creating Playlist objs: ', error);
        throw error;
    }
};
