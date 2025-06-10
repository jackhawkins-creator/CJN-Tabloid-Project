const apiUrl = "/api/tag";

export const GetTags = () => {
    return fetch(apiUrl).then((res) => res.json());
};