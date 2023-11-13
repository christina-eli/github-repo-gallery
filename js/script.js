//create global variables
const overview = document.querySelector (".overview"); //profile info div
const username = "christina-eli";
const repoList= document.querySelector(".repo-list"); 

//fetch API JSON Data
const gitUserInfo = async function () {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
};

//call function at the end//

gitUserInfo();

//Fetch & Display User Information
const displayUserInfo = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
         </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> 
        `;

    overview.append(div);
    gitRepos();
};

//fetch repos
const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
  };
 
//display repos
  const displayRepos = function (repos) {
    for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(repoItem);
    }
  };