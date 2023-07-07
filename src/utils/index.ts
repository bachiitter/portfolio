export async function fetcher<T>(fn: () => Promise<unknown>) {
  try {
    return {
      data: (await fn()) as T,
    };
  } catch (error) {
    return { error };
  }
}

export function formatDate(date: string | number | Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
