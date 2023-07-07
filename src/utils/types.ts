interface Sys {
  id: string;
  publishedAt: string;
  firstPublishedAt: string;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
  description: string;
}

interface PostItem {
  sys: Sys;
  title: string;
  description: string;
  thumbnail: Thumbnail;
  slug: string;
  featured: boolean;
}

export interface PostsResponse {
  data: {
    postCollection: {
      items: PostItem[];
    };
  };
}

interface PostItem {
  sys: Sys;
  title: string;
  description: string;
  thumbnail: Thumbnail;
  slug: string;
  featured: boolean;
  content: string;
}

export interface PostResponse {
  data: {
    postCollection: {
      items: PostItem[];
    };
  };
}

export interface NowPlayingResponse {
  is_playing: boolean;
  item: SpotifyItem;
}

interface SpotifyItem {
  name: string;
  external_urls: {
    spotify: string;
  };

  artists: {
    name: string;
  }[];
  duration: number;
  preview_url: string;
}
