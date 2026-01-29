import { createServerFn } from "@tanstack/react-start";

export const getPhotos = async () => {
  const PHOTOS_API_URL = process.env.PHOTOS_API_URL;
  const PHOTOS_API_TOKEN = process.env.PHOTOS_API_TOKEN;

  if (!PHOTOS_API_URL || !PHOTOS_API_TOKEN) {
    throw new Error("Missing credentials (PHOTOS_API_URL or PHOTOS_API_TOKEN)");
  }

  function buildHeaders(etag?: string): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    headers.Authorization = `Bearer ${PHOTOS_API_TOKEN}`;

    if (etag) {
      headers["If-None-Match"] = etag;
    }

    return headers;
  }

  const allPhotos = [];
  let currentPage = 1;
  let hasMore = true;
  const limit = 100;

  while (hasMore) {
    const url = `${PHOTOS_API_URL}?page=${currentPage}&limit=${limit}&sort=desc`;
    const response = await fetch(url, {
      headers: buildHeaders(),
    });

    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    if (response.status === 401) {
      throw new Error("Unauthorized. Check your API token.");
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch photos: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.photos || !Array.isArray(data.photos)) {
      throw new Error("Invalid API response format");
    }

    allPhotos.push(...data.photos);

    hasMore = data.pagination?.hasNext || false;
    currentPage++;
  }

  return allPhotos;
};

export const getPhotosFn = createServerFn({ method: "GET" }).handler(getPhotos);
