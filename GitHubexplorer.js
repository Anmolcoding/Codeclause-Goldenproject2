// Function to search for a GitHub user
function searchUser() {
    var username = document.getElementById("searchInput").value;
    if (username !== "") {
        var url = "https://api.github.com/users/" + username + "/repos";

        fetch(url)
            .then(response => response.json())
            .then(data => displayRepos(data))
            .catch(error => displayError("Error fetching repositories."));
    }
}

// Function to display the user's repositories
function displayRepos(repos) {
    var resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";

    if (repos.message === "Not Found") {
        displayError("User not found.");
        return;
    }

    repos.forEach(repo => {
        var repoElement = document.createElement("div");
        repoElement.classList.add("repo");

        var titleElement = document.createElement("h3");
        titleElement.innerText = repo.name;

        var descriptionElement = document.createElement("p");
        descriptionElement.innerText = repo.description || "No description provided.";

        repoElement.appendChild(titleElement);
        repoElement.appendChild(descriptionElement);
        resultsContainer.appendChild(repoElement);
    });
}

// Function to display an error message
function displayError(message) {
    var resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";

    var errorElement = document.createElement("p");
    errorElement.classList.add("error-message");
    errorElement.innerText = message;

    resultsContainer.appendChild(errorElement);
}
