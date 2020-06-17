$(() => {
  const projectID = parseInt($("#project-title").attr("data-id"));
  // event listener for update button
  $(".button").on("click", () => {
    const data = {
      projectID: projectID,
      title: $("#story-title")
        .val()
        .trim(),
      description: $("#story-description")
        .val()
        .trim(),
      ownerID: parseInt($("#owner-select").val())
    };
    $.ajax("/api/edit/project", {
      type: "PUT",
      data: data
    }).then(() => {
      window.location.href = `/project/view/${projectID}`;
    });
  });
});
