$(() => {
  console.log("add");
});

$(document).ready(() => {
  // Getting references to our form and inputs
  const projectForm = $("#project-form");
  const projectDescription = $("#project-input");
  // When the form is submitted, we validate there's information
  projectForm.on("submit", event => {
    event.preventDefault();
    const projectData = {
      description: projectDescription.val().trim()
    };
    console.log(projectData);
    if (!projectData.description) {
      return;
    }

    // If we have information present we run the addProject function
    addProject(projectData.description);
    projectDescription.val("");
  });

  // addProject does a post to our "api/add" route and if successful, redirects us the the dashboard page
  function addProject(description) {
    $.post("/api/add", {
      description: description
    })
      .then(() => {
        window.location.replace("/dash");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }
});
