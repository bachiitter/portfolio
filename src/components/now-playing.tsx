import useSWR from "swr";
import type { NowPlayingResponse } from "~/utils/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function NowPlaying() {
  const currentPlayingQuery = useSWR<NowPlayingResponse>(
    `${import.meta.env.PUBLIC_API_SERVER_URL}/spotify/tracks/now-playing`,
    fetcher,
    {
      refreshInterval: 1000 * 6,
      revalidateOnFocus: false,
    },
  );

  if (currentPlayingQuery.isLoading ?? !currentPlayingQuery.data) {
    return (
      <span className="whitespace-nowrap small [font-feature-settings:'tnum']">
        Loading...
      </span>
    );
  }

  if (currentPlayingQuery.error) {
    return (
      <span className="whitespace-nowrap small [font-feature-settings:'tnum']">
        Something went wrong...
      </span>
    );
  }

  if (!currentPlayingQuery.data.is_playing) {
    return (
      <span className="whitespace-nowrap small [font-feature-settings:'tnum']">
        Offline
      </span>
    );
  }

  return (
    <span className="whitespace-nowrap small [font-feature-settings:'tnum']">
      Listening{" "}
      <a
        href={currentPlayingQuery.data?.item.external_urls.spotify}
        className="font-semibold"
      >
        {currentPlayingQuery.data?.item.name} -{" "}
        {currentPlayingQuery.data?.item.artists[0].name}
      </a>{" "}
    </span>
  );
}
export { NowPlaying };
