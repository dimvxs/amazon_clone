export const USER_KEY = "http://localhost:5012/api/user/account";
///data/account-details.json
//http://localhost:5012/api/user/account/
export const fetcher = async (url: string) => {
    const res = await fetch(url, { credentials: 'include' });
    const data = await res.json();
    return data.result;
}
    
