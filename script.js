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
        .catch(error => console.error('Error fetching data:', error));
});

function displayData(title, body) {
    const fetchDiv = document.getElementById('fetchDiv');
    fetchDiv.innerHTML = `
        <h3>${title}</h3>
        <p>${body}</p>
    `;
};