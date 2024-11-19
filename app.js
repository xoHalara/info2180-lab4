document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from refreshing the page
  
    // Get the search input value and sanitize it
    const query = encodeURIComponent(document.getElementById("search-input").value.trim());
  
    // Prepare the AJAX request
    const xhr = new XMLHttpRequest();
    const url = query ? `superheroes.php?query=${query}` : "superheroes.php";
  
    xhr.open("GET", url, true);
  
    xhr.onload = function () {
      const resultDiv = document.getElementById("result");
      if (xhr.status === 200) {
        let responseText = xhr.responseText.trim();
  
        // Check if the response contains PHP array syntax
        try {
          // Parse the response if it's a JSON-like structure
          const superheroes = JSON.parse(responseText);
  
          if (query) {
            // Find the superhero by alias or name
            const superhero = superheroes.find(
              (hero) =>
                hero.alias.toLowerCase() === decodeURIComponent(query).toLowerCase() ||
                hero.name.toLowerCase() === decodeURIComponent(query).toLowerCase()
            );
  
            if (superhero) {
              resultDiv.innerHTML = `
                <h3>${superhero.alias}</h3>
                <h4>${superhero.name}</h4>
                <p>${superhero.biography}</p>
              `;
            } else {
              resultDiv.innerHTML = "<p style='color: red;'>Superhero not found</p>";
            }
          } else {
            // Display all superheroes if no query is entered
            resultDiv.innerHTML = "<ul>" +
              superheroes
                .map((hero) => `<li>${hero.alias}</li>`)
                .join("") +
              "</ul>";
          }
        } catch (error) {
          resultDiv.innerHTML =
            "<p style='color: red;'>Error parsing data. Please check the server response format.</p>";
        }
      } else {
        resultDiv.innerHTML = "<p style='color: red;'>Error fetching data.</p>";
      }
    };
  
    xhr.send();
  });
  