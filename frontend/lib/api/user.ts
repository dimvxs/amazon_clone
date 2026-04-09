export const USER_KEY = "/data/account-details.json";

export const fetcher = (url: string) =>
  fetch(url).then((res) => res.json());