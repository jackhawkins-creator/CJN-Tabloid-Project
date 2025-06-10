const apiUrl = "/api/userprofile";

export const getAllUserProfiles = () => {
  return fetch(apiUrl).then((res) => res.json());
};