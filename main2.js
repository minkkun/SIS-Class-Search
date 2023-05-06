const titleInput = document.getElementById("class-title-input");
const codeInput = document.getElementById("class-code-input");
const descInput = document.getElementById("class-desc-input");
const profList = document.getElementById("class-prof");
const semList = document.getElementById("class-term");
const historyList = document.getElementById("class-history");

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", () => {
    const searchText = document.getElementById("searchbar").value;

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        try {
          const classData = JSON.parse(this.responseText); // retrieve JSON from echo of php file
          var found = true;

          // Set the content of the HTML elements using the class data
          const title = classData[0].title;
          const code = classData[0].code;
          const description = classData[0].description;

          let professor = [];
          let semester = [];

          for (let i = 0; i < classData.length; i++) {
            // Code to execute for each iteration of the loop
            prof = classData[i].professor;
            professor.push(prof);

            sem = classData[i].semester;
            semester.push(sem);
          }

          // Set the content of the relevant HTML elements
          document.getElementById("class-title-input").textContent = title;
          document.getElementById("class-code-input").textContent = code;
          document.getElementById("class-desc-input").textContent = description;

          const profList = document.getElementById("class-prof");
          profList.innerHTML = ""; // clear the list before adding new items

          for (let i = professor.length - 1; i >= 0; i--) {
            // Create a new list item and add it to the list
            const item = document.createElement("li");
            item.innerHTML = professor[i];
            profList.appendChild(item);
          }

          const semList = document.getElementById("class-term");
          semList.innerHTML = ""; // clear the list before adding new items

          for (let i = professor.length - 1; i >= 0; i--) {
            // Create a new list item and add it to the list
            const item = document.createElement("li");
            item.innerHTML = semester[i];
            semList.appendChild(item);
          }
        } catch (error) {
          // handle the error
          console.error(error);
          console.log("No matching class found");
          // Update the search results with an error message
          document.getElementById("class-title-input").textContent = "";
          document.getElementById("class-desc-input").textContent =
            "No matching class found";
          document.getElementById("class-term").textContent = "";
          document.getElementById("class-code-input").textContent = "";
          document.getElementById("class-history").innerHTML = "";

          titleInput.textContent = "";
          codeInput.textContent = "";
          descInput.textContent = "";
          profList.innerHTML = "";
          semList.innerHTML = "";
          historyList.innerHTML = "";
        }
      }
    };

    /* Send the results of the click events to server */
    xhttp.open("POST", "server2.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("searchText=" + searchText);
  });
});
