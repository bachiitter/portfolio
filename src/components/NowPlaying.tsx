/* eslint-disable @next/next/no-img-element */
"use client";

import useSWR from "swr";

const blackSpotifyLogo = "/Spotify_Icon_RGB_Black.png";
const coloredSpotifyLogo = "/Spotify_Icon_RGB_Green.png";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const apiURL = process.env.NEXT_PUBLIC_API_SERVER_URL

export function NowPlaying() {
  const currentPlayingQuery = useSWR(`${apiURL}/spotify/tracks/now-playing`, fetcher, {
    refreshInterval: 1000 * 10,
    revalidateOnFocus: false,
  });
  const lastPlayedQuery = useSWR(`${apiURL}/spotify/tracks/last-played`, fetcher, {
    refreshInterval: 1000 * 30,
  });

  return (
    <>
      <img
        src={
          currentPlayingQuery.data?.is_playing
            ? coloredSpotifyLogo
            : blackSpotifyLogo
        }
        alt="Spotify Icon"
        width={20}
        height={20}
        className={`rounded-full ${
          currentPlayingQuery.data?.is_playing
            ? "animate-spin-slow"
            : "contrast-[0.35]"
        }`}
      />
      {currentPlayingQuery.data?.is_playing ? (
        <p className="line-clamp-1">
          {" "}
          Listening{" "}
          <a
            href={currentPlayingQuery.data?.item.external_urls.spotify}
            className="font-semibold">
            {currentPlayingQuery.data?.item.name} -{" "}
            {currentPlayingQuery.data?.item.artists[0].name}
          </a>{" "}
        </p>
      ) : (
        <p className="line-clamp-1">
          {" "}
          Last Played{" "}
          <a
            href={lastPlayedQuery.data?.items[0].track.external_urls.spotify}
            className="font-semibold">
            {lastPlayedQuery.data?.items[0].track.name} -{" "}
            {lastPlayedQuery.data?.items[0].track.artists[0].name}
          </a>{" "}
        </p>
      )}
    </>
  );
}
