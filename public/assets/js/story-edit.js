$(() => {
  // event listener for update button
  $(".button").on("click", () => {
    const storyID = parseInt($("#story-title").attr("data-storyid"));
    const data = {
      id: storyID,
      project: parseInt($("#story-title").attr("data-projectid")),
      title: $("#title")
        .val()
        .trim(),
      description: $("#story-description")
        .val()
        .trim(),
      reporter: parseInt($("#reporter-select").val()),
      assignee: parseInt($("#assignee-select").val()),
      estimate: parseFloat($("#estimate").val()),
      status: parseInt($("#status-select").val())
    };
    $.ajax("/api/edit/story", {
      type: "PUT",
      data: data
    }).then(() => {
      window.location.href = `/story/view/${storyID}`;
    });
  });
});
