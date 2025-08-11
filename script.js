// Part 1: API Interaction using GET requests

// Button function including error handling
document.getElementById('fetch-button').addEventListener('click', function () {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Bad network response');
            }
            return response.json();
        })
        .then(data => {
            displayData(data.title, data.body);
        })
        .catch(error => displayError(error.message));
});
// Function for displaying data from the API
function displayData(title, body) {
    const fetchDiv = document.getElementById('fetchDiv');
    fetchDiv.innerHTML = `
        <h3>${title}</h3>
        <p>${body}</p>
    `;
};
// Function for displaying error in the body if required
function displayError(message) {
    const fetchDiv = document.getElementById('fetchDiv');
    fetchDiv.innerHTML = `<p class="error">Error: ${message}</p>`;
};

// Part 2: API interaction using XMLHttpRequest

document.getElementById('fetch-xhr').addEventListener('click', function () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                displayData(data.title, data.body);  // Utilizing the previous function for display
            } else {
                displayError(error.message, xhr.statusText); // Utilizing the previous error display function
            }
        }
    };

    xhr.send();
});

// Part 3: Send data using POST

