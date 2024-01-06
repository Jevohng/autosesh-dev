document.addEventListener("DOMContentLoaded", function () {
  // Initialize all toasts on the page
  $('.toast').toast();
  // Get the profile icon element by its class
  var profileIcon = document.querySelector(".icon-container i");

  // Get the dropdown menu element by its ID
  var dropdownMenu = document.getElementById("dropdown-menu");

  // Toggle the menu when clicking on the profile icon
  profileIcon.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the event from bubbling up
    if (dropdownMenu.style.display === "block") {
      dropdownMenu.style.display = "none";
    } else {
      dropdownMenu.style.display = "block";
    }
  });

  // Close the menu when clicking outside of it
  document.addEventListener("click", function (event) {
    if (
      !event.target.matches(".icon-container") &&
      !event.target.matches(".dropdown-content")
    ) {
      dropdownMenu.style.display = "none";
    }
  });

  // Prevent the menu from closing when clicking inside it
  dropdownMenu.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  // Theme Toggle Functionality
  const themeToggle = document.getElementById("flexSwitchCheckDefault");
  const darkTheme = document.getElementById("dark-theme"); // ID for dark theme stylesheet
  const normalTheme = document.getElementById("normal-theme"); // ID for normal theme stylesheet

  // Function to toggle the theme based on the switch state
  function toggleTheme() {
    if (themeToggle.checked) {
      darkTheme.disabled = false; // Enable dark theme
      normalTheme.disabled = true; // Disable normal theme
    } else {
      darkTheme.disabled = true; // Disable dark theme
      normalTheme.disabled = false; // Enable normal theme
    }

    // Store the user's theme preference in local storage
    localStorage.setItem("dark-mode-preference", themeToggle.checked);
  }

  // Add a change event listener to the theme toggle switch
  themeToggle.addEventListener("change", toggleTheme);

  // Initially, set the theme based on the user's stored preference or default to the normal theme
  const userPreference = localStorage.getItem("dark-mode-preference");
  if (userPreference === "true") {
    themeToggle.checked = true;
  } else {
    themeToggle.checked = false;
  }
  toggleTheme(); // Apply the initial theme

  // Sidebar Toggle Functionality
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("toggleSidebar");
  const mainContent = document.getElementById("mainContent");
  const fullMenu = document.querySelector(".nav-container");
  const minimizedMenu = document.querySelector(".min-nav-container"); // Update this line with the correct class or ID name for your minimized menu container

  // Get the minimize button element by its class
  const minimizeButton = document.querySelector(".minimize-side-nav");

  // Initialize sidebar state
  let isSidebarMinimized = true; // Change this to true

  // Add CSS for transitions to both sidebar and mainContent
  sidebar.style.transition = "width 0.3s ease-in-out, margin-left 0.3s ease-in-out"; // Combine transitions
  mainContent.style.transition = "margin-left 0.3s ease-in-out"; // Keep this transition property

  // Function to toggle sidebar styles and rotate the button/icon
  function toggleSidebarStyles() {
    sidebar.style.transition = "width 0.3s ease-in-out, margin-left 0.3s ease-in-out"; // Add transitions back here
    mainContent.style.transition = "margin-left 0.3s ease-in-out"; // Add transitions back here

    if (isSidebarMinimized) {
      sidebar.style.width = "230px";
      mainContent.style.marginLeft = "430px";
      fullMenu.style.display = "block";
      minimizedMenu.style.display = "none";
      minimizeButton.style.transition = "margin-left 0.3s ease-in-out"; // Add smooth transition for margin-left
      minimizeButton.style.marginLeft = "230px"; // Move the button to the right
      toggleButton.style.transform = "rotateY(0deg)"; // Rotate when minimized
    } else {
      sidebar.style.width = "80px";
      mainContent.style.marginLeft = "280px";
      fullMenu.style.display = "none";
      minimizedMenu.style.display = "block";
      minimizeButton.style.transition = "margin-left 0.3s ease-in-out"; // Add smooth transition for margin-left
      minimizeButton.style.marginLeft = "80px"; // Move the button to the same position
      toggleButton.style.transform = "rotateY(180deg)"; // Reset rotation when expanded
    }
  }

  // Toggle sidebar when the button is clicked
  toggleButton.addEventListener("click", function () {
    isSidebarMinimized = !isSidebarMinimized; // Toggle the sidebar state
    toggleSidebarStyles(); // Apply styles with smooth transitions and button/icon rotation
  });

  // Event listener to handle form submission
  const createProjectForm = document.getElementById("createProjectForm");
  const createProjectButton = document.getElementById("formSubmit");

  createProjectForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const projectName = document.getElementById("projectTitle").value;
    const artistName = document.getElementById("projectArtist").value;
    const projectImageInput = document.getElementById("projectImage");

    // Check if an image file was selected
    if (projectImageInput.files.length > 0) {
      const projectImageFile = projectImageInput.files[0];
      const projectImageURL = URL.createObjectURL(projectImageFile);

      // Display the project card by calling the createProjectCard function
      createProjectCard(projectName, artistName, projectImageURL);

      // Close the create project modal
      $('#new-project-modal').modal('hide'); // Close the modal

      // Display the success message
      function showSuccessMessage() {
        const successMessage = document.getElementById("success-message");
        successMessage.removeAttribute("hidden"); // Remove the hidden attribute
        setTimeout(function () {
          successMessage.style.right = "0"; // Animate in from the right
        }, 0); // Delay the animation to avoid triggering on initial page load
        setTimeout(function () {
          successMessage.style.right = "-100%"; // Animate out to the right
        }, 3000); // Hide the toast after 3 seconds (adjust as needed)
      }

      // Call the showSuccessMessage function after successfully creating a new project
      showSuccessMessage();

    } else {
      // Handle the case where no image was selected (you can show an error message)
      console.log("No image selected");
    }
  });

  // Event listener to handle modal hiding event
  $('#new-project-modal').on('hidden.bs.modal', function () {
    // Reset the form fields
    document.getElementById('createProjectForm').reset();
  });

  // Function to create a new project card
  function createProjectCard(projectName, artistName, projectImageURL) {
    // Create a new project card element
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    // Create the image element and set its source
    const projectImage = document.createElement("img");
    projectImage.src = projectImageURL;
    projectImage.alt = "Project Image"; // Set alt text as needed

    // Create the project info container
    const projectInfoContainer = document.createElement("div");
    projectInfoContainer.classList.add("card-text");

    // Create the heading for artist name and paragraph for project name
    const artistHeading = document.createElement("h6");
    artistHeading.textContent = artistName;

    const projectNamePara = document.createElement("p");
    projectNamePara.textContent = projectName;

    // Append the image and project info to the project card
    projectInfoContainer.appendChild(artistHeading);
    projectInfoContainer.appendChild(projectNamePara);
    projectCard.appendChild(projectImage);
    projectCard.appendChild(projectInfoContainer);

    // Prepend the project card to the "card-layout" div (at the beginning)
    const cardLayout = document.querySelector(".card-layout");
    cardLayout.insertBefore(projectCard, cardLayout.firstChild);
    showNoProjectsMessage();
  }

  // Function to show a message when there are no projects created
  function showNoProjectsMessage() {
    const noProjectsMessage = document.getElementById("no-projects-message");
    const cardLayout = document.querySelector(".card-layout");
    const numberOfChildren = cardLayout.childElementCount;
    if (numberOfChildren == 1) {
      noProjectsMessage.style.display = "block";
      console.log("hey");
    } else {
      console.log("yo");
      noProjectsMessage.style.display = "none";
    }
  }

  showNoProjectsMessage();
});
