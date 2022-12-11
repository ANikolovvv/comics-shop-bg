const url="http://localhost:3030/api/";

export const createOrder = async (data, token) => {
  const response = await fetch(`${url}data/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
export const deleteOrder = async (id, token) => {
  let res = await fetch(`${url}owner/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  });
  return res;
};
export const updateOrder = async (data, id, token) => {
  const response = await fetch(`${url}owner/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};
export async function getMyData(id) {
  const response = await fetch(`${url}owner/my-data/${id}`);

  return response.json();
}
export function getOwnerData(id) {
  return fetch(`${url}owner/${id}`).then((res) =>
    res.json()
  );
}
