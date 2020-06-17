$(() => {
  // event listener for button
  $(".button").on("click", () => {
    const projectID = parseInt($("#project-title").attr("data-id"));
    const data = {
      projectID: projectID,
      title: $("#story-title")
        .val()
        .trim(),
      description: $("#story-description")
        .val()
        .trim(),
      reporter: parseInt($("#reporter-select").val()),
      assignee: parseInt($("#assignee-select").val()),
      estimate: parseFloat(
        $("#estimate")
          .val()
          .trim()
      ),
      status: parseInt($("#status-select").val()),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    $.ajax("/api/add/story", {
      type: "POST",
      data: data
    }).then(() => {
      window.location.href = `/project/view/${projectID}`;
    });
  });
});
