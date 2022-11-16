import api, { getRequestError } from "./axiosConfig.js";

export const signup = async (payload) => {
  console.log(payload, "payload in signup function");
  return await api({
    url: "/signup",
    method: "post",
    data: { ...payload },
  });
};

export const login = async (payload) => {
  console.log(payload, "payload in login function");
  return await api({
    url: "/login",
    method: "post",
    data: { ...payload },
  });
};

export const saveNewBook = async (params, payload) => {
  return await api({
    url: `/dashboard/${params}/library`,
    method: "post",
    data: { ...payload },
  });
};

export const fetchLibrary = async (params) => {
  return await api({
    url: `/dashboard/${params}/library`,
    method: "get",
  });
};

export const lendOutBook = async (params, payload) => {
  const { user_id, book_id } = params;
  return await api({
    url: `/dashboard/${user_id}/library/${book_id}/lend`,
    method: "patch",
    data: { ...payload },
  });
};

export const markBookAsRead = async (params, payload) => {
  const { user_id, book_id } = params;
  return await api({
    url: `/dashboard/${user_id}/library/${book_id}/read`,
    method: "patch",
    data: { ...payload },
  });
};

export const deleteBook = async (params) => {
  const { user_id, book_id } = params;
  return await api({
    url: `/dashboard/${user_id}/library/${book_id}`,
    method: "delete",
  });
};
