export const USER_KEY = `${process.env.NEXT_PUBLIC_API_URL}/api/user/account/`;

export const fetcher = async (url: string) => {
    const res = await fetch(url, { credentials: 'include' });
    const data = await res.json();
    console.log(data.result);
    return data.result;
}
    
