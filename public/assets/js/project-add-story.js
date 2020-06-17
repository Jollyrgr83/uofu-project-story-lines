$(() => {
  // event listener for button
  $(".button").on("click", () => {
    const data = {
      projectID: parseInt($("#project-title").attr("data-id")),
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
    }).then(data => {
      window.location.href = `/project/view/${parseInt(data.project)}`;
    });
  });
});
