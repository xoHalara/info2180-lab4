document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn'); // Button
  const searchInput = document.getElementById('search'); // Input field
  const resultDiv = document.getElementById('result'); // Result container

  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim(); // Get the input value and trim whitespace

    // Check if input is empty
    if (!query) {
      resultDiv.innerHTML = `<p style="color: red;">Please enter a superhero name or alias.</p>`;
      return;
    }

    // Construct the URL
    const url = `superheroes.php?query=${encodeURIComponent(query)}`;

    // Make the AJAX request using Fetch API
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // Parse the response as text
      })
      .then(data => {
        // Check if we got a valid response or an error message
        if (data.trim().toLowerCase() === 'superhero not found') {
          resultDiv.innerHTML = `<p style="color: red;">Superhero not found. Please try again.</p>`;
        } else {
          resultDiv.innerHTML = data; // Inject superhero details into the result div
        }
      })
      .catch(error => {
        // Handle fetch errors
        resultDiv.innerHTML = `<p style="color: red;">An error occurred: ${error.message}</p>`;
      });
  });
});
