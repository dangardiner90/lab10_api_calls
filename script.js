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


document.getElementById('formButton').addEventListener('click', () => {
    const output = document.getElementById('output');
    output.textContent = "Loading...";

    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return response.json();
        })
        .then(data => displayPost(data.title, data.body))
        .catch(error => errorDisplay('output', error.message));
});


document.getElementById('postForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    document.getElementById('postResult').textContent = "Loading...";

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ title, body, userId: 1 })
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            document.getElementById('postResult').innerHTML = `
          <p>ID: ${data.id}</p>
          <p>Title: ${data.title}</p>
          <p>Body: ${data.body}</p>
        `;
        })
        .catch(error => errorDisplay('postResult', error.message));
});

function displayPost(title, body) {
    document.getElementById('output').innerHTML = `
        <h3>${title}</h3>
        <p>${body}</p>
      `;
}

function errorDisplay(targetId, message) {
    document.getElementById(targetId).innerHTML = `<p class="error">Error: ${message}</p>`;
}

// Part 4: 

document.getElementById('updateForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('updateId').value;
    const title = document.getElementById('updateTitle').value;
    const body = document.getElementById('updateBody').value;

    document.getElementById('postResult').textContent = "Updating...";

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById('updateResult').innerHTML = `
            <p>ID: ${data.id}</p>
            <p>Title: ${data.title}</p>
            <p>Body: ${data.body}</p>
          `;
        } else {
            errorDisplay('updateResult', `Request failed with status ${xhr.status}`);
        }
    };

    xhr.onerror = function () {
        errorDisplay('updateResult', 'Network error occurred.');
    };

    xhr.send(JSON.stringify({ id, title, body }));
});