$(() => {
  // event listener for update button
  $(".button").on("click", () => {
    const data = {
      projectID: parseInt($("#project-title").attr("data-id")),
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
    }).then(data => {
      window.location.href = `/project/view/${data[0]}`;
    });
  });
});
