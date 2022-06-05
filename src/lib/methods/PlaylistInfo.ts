import { fetchText } from "../Util";

export default class PlaylistInfo {
    public async get(url: string) {
        const body = await fetchText(url);
        const json = JSON.parse(`{${body.split("{\"hydratable\":\"playlist\",")[1].split("];</script>")[0]}`);
        const meta = json.data;
        const tracksArr = [] as any[];
        // eslint-disable-next-line array-callback-return
        meta.tracks.map((x) => {
            tracksArr.push(x);
        });
        return {
            id: meta.id,
            title: meta.title,
            description: meta.description,
            image: meta.artwork_url,
            likesCount: meta.likes_count,
            genre: meta.genre || null,
            displayDate: meta.display_date,
            displayDateF: new Date(meta.display_date).toUTCString(),
            author: {
                name: body.split("<h1 itemprop=\"name\"><a itemprop=\"url\"")[1].split("by <a")[1].split(">")[1].replace("</a", ""),
                username: meta.user.username,
                avatarURL: meta.user.avatar_url,
                createdAt: meta.user.created_at,
                createdAtF: new Date(meta.user.created_at).toUTCString(),
                followersCount: meta.user.followers_count,
                followingsCount: meta.user.followings_count,
                groupsCount: meta.user.groups_count,
                firstName: meta.user.first_name || null,
                lastName: meta.user.last_name || null,
                fullName: meta.user.full_name || null,
                lastModified: meta.user.last_modified,
                lastModifiedF: new Date(meta.user.last_modified).toUTCString(),
                likesCount: meta.user.like_count,
                urn: meta.user.urn,
                verified: meta.user.badges.verified,
            },
            tracks: tracksArr,
        };
    }
}
