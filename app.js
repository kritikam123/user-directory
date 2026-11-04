const loading = document.querySelector("#loading");
const userList = document.querySelector("#userList");
const searchInput = document.querySelector("#searchInput");

let allUsers = [];

async function getUsers() {
  loading.textContent = "Loading...";
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);

    if (!response.ok) {
      throw new Error("failed to fetch data");
    }

    const users = await response.json();

    return users;
  } catch (error) {
    loading.textContent = "Something went wrong";
    console.log(error);

    return null;
  }
}

function renderUsers(users) {
  userList.innerHTML = "";

  if (users.length === 0) {
    userList.textContent = "No users found";
    return;
  }

  users.forEach((user) => {
    const card = document.createElement("div");

    card.classList.add("user-card");

    card.innerHTML = `
        <h3>${user.name} </h3>
        <p>${user.email}</p>
        <p>${user.address.city}</p>
        `;

    userList.appendChild(card);
  });
}

async function initialize() {
  const users = await getUsers();

  if (users === null) {
    return;
  }

  allUsers = users;

  loading.textContent = "";

  renderUsers(allUsers);
}
initialize();

searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();

  const filteredUsers = allUsers.filter((user) => {
    return user.name.toLowerCase().includes(searchText.toLowerCase());
  });

  renderUsers(filteredUsers);
});
