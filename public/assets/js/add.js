$(document).ready(() => {
  // Getting references to our form and inputs
  $(".button").on("click", () => {
    const data = {
      title: $("#project-title")
        .val()
        .trim(),
      description: $("#project-description")
        .val()
        .trim(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    $.ajax("/api/add/", {
      type: "POST",
      data: data
    }).then(() => {
      window.location.href = `/project/view/${projectID}`;
    });
  });
});
