export interface Profile {
    _pic?: string;
    id: number;
    iso_639_1: string
    iso_3166_1: string
    name: string
    include_adult: boolean
    username: string
    avatar: Avatar
}
interface Avatar {
    gravatar: { hash: string | undefined };
    tmdb: { avatar_path: string | undefined };
}
