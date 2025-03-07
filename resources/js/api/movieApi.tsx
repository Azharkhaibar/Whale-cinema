const BASE_URL = "https://api.tvmaze.com";

export const getMoviesApi = async () => {
    const res = await fetch(`${BASE_URL}/search/shows?q=batman`)
    const data = await res.json()
    return data.map((item: any) => item.shows)
}

export const getMoviesDetail = async () => {
    const response = await fetch(`${BASE_URL}/search/shows?q=batman`);
    return response.json()
}
