import { createServerFn } from "@tanstack/react-start";

export async function getVisitors() {
  const apiToken = process.env.UMAMI_API_TOKEN;
  const websiteId = process.env.UMAMI_WEBSITE_ID;

  if (!apiToken || !websiteId) {
    throw new Error("Missing Umami credentials (UMAMI_API_TOKEN or UMAMI_WEBSITE_ID)");
  }

  const searchParams = new URLSearchParams({
    endAt: String(Date.now()),
    startAt: "0",
  });
  const endpoint = `https://api.umami.is/v1/websites/${websiteId}/stats?${searchParams.toString()}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    if (response.status === 401) {
      throw new Error("Authentication failed. Check your api token.");
    }

    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  console.log(result.visitors);

  return result.visitors;
}

export const getVisitorsFn = createServerFn({ method: "GET" }).handler(getVisitors);
