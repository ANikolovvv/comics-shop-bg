export async function regUsers(option) {
  const url = `http://localhost:3030/api/auth/register`;
  const res = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(option),
  });
  try {
    if (res.ok) {
      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      const ress = await res.json();
      throw new Error(ress.message);
    }
  } catch (message) {
    console.log(message.message);
  }
  return res;
}
export async function resLogout(token) {
  console.log(token, "reslogaiuiuiu");
  const res = await fetch(`http://localhost:3030/api/auth/logout`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  });
  try {
    if (res.status === 401) {
      localStorage.clear();
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
  }

  localStorage.clear();
  return res;
}

export async function onLogin(data) {
  const u = `http://localhost:3030/api/auth/login`;

  const res = await fetch(u, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  try {
    if (res.status === 400) {
      const reds = await res.json();
      throw new Error(reds.message);
    }

    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    return error;
  }

  return res;
}



export async function getMyData(id) {
  const response = await fetch(`http://localhost:3030/api/owner/my-data/${id}`);

  return response.json();
}
export function getData(id) {
  return fetch(`http://localhost:3030/api/data/details/${id}`).then((res) =>
    res.json()
  );
}
export async function addLike(id, token) {
  console.log(token, "like");
  let data = { user: token._id, comics: id };
  const response = await fetch(`http://localhost:3030/api/data/like`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token.accessToken,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
export function getOwnerData(id) {
  return fetch(`http://localhost:3030/api/owner/${id}`).then((res) =>
    res.json()
  );
}


export async function searchData(data) {
  const response = await fetch(`http://localhost:3030/api/data/search`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}
