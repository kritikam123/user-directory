const loading = document.querySelector("#loading");
const userList = document.querySelector("#userList");

async function getUsers() {
  loading.textContent = "Loading...";
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);

    if (!response.ok) {
      throw new Error("failed to fetch data");
    }

    return response.json();
  } catch (error) {
    loading.textContent = "Something went wrong";
    console.log(error);
  }
}
getUsers();

function renderUsers() {
  userList.innerHTML = "";

  users.forEach((user) => {
    const card = document.createElement("ul");

    card.innerHTML = `
        <h3>${user.name} </h3>
        <p>${user.email}</p>
        <p>${user.address.city}</p>
        `;

    container.appendChild(card);
  });
}

async function initialize() {
    const users = await getUsers();
    renderUsers();
}
initialize();

