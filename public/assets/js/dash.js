$(() => {
  console.log("story");
  const db = {
    projects: [
      { id: 1, name: "Calculator" },
      { id: 7, name: "CMS" },
      { id: 12, name: "EMS" },
      { id: 21, name: "Database" },
      { id: 41, name: "RPG" }
    ],
    stories: [
      { id: 4, projectID: 1, due: 1, old: 7, name: "String" },
      { id: 7, projectID: 1, due: 2, old: 8 },
      { id: 14, projectID: 7, due: 3, old: 1 },
      { id: 13, projectID: 12, due: 4, old: 11 },
      { id: 24, projectID: 21, due: 5, old: 2 },
      { id: 11, projectID: 41, due: 6, old: 4 }
    ]
  };
  activeProjects();
  // event listener for arrow button clicks
  $(".arrow-btn").on("click", event => {
    const arrowID = $(event.target).attr("id");
    const numID = parseInt(arrowID.split("-")[1]);
    const textID = arrowID.split("-")[0];
    console.log("textID", textID);
    if (textID === "arrowProject") {
      window.location.href = "/project/";
    } else if (textID === "arrowStory") {
      window.location.href = "/story/";
    }
  });
  // event listener for sort select dropdown menu
  $("#sort-select").on("change", event => {
    activeStories();
  });
  // renders the active projects section
  function activeProjects() {
    $("#dynamic-project").empty();
    console.log("db.projects", db.projects);
    for (let i = 0; i < db.projects.length; i++) {
      const rowEl = $("<div>");
      rowEl.attr("class", "row-container row mx-auto");
      const pEl = $("<p>");
      pEl.attr("class", "section-item dash-project");
      pEl.text(`Project ${db.projects[i].id} - ${db.projects[i].name}`);
      const svgEl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgEl.setAttribute("id", `arrowProject-${db.projects[i].id}`);
      svgEl.setAttribute("class", "arrow-btn bi bi-arrow-right-short");
      svgEl.setAttribute("width", "1.5em");
      svgEl.setAttribute("height", "1.5em");
      svgEl.setAttribute("viewBox", "0 0 16 16");
      svgEl.setAttribute("fill", "currentColor");
      // svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      const pathOneEl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      pathOneEl.setAttribute("fill-rule", "evenodd");
      pathOneEl.setAttribute(
        "d",
        "M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z"
      );
      const pathTwoEl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      pathTwoEl.setAttribute("fill-rule", "evenodd");
      pathTwoEl.setAttribute(
        "d",
        "M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z"
      );
      svgEl.append(pathOneEl);
      svgEl.append(pathTwoEl);
      rowEl.append(pEl);
      rowEl.append(svgEl);
      $("#dynamic-project").append(rowEl);
    }
  }

  function activeStories() {
    const sortID = parseInt($("#sort-select").val());
    $("#dynamic-story").empty();
    for (let i = 0; i < db.stories.length; i++) {
      // const divEl;
    }
  }
});
