$(() => {
  $(() => {
    const db = {
      projects: [
        { id: 1, name: "Calculator" },
        { id: 7, name: "CMS" },
        { id: 12, name: "EMS" },
        { id: 21, name: "Database" },
        { id: 41, name: "RPG" }
      ],
      stories: [
        { id: 4, projectID: 1, projectName: "Calculator", due: 0.5, age: 7.5 },
        { id: 7, projectID: 1, projectName: "Calculator", due: 1.0, age: 8.0 },
        { id: 14, projectID: 7, projectName: "CMS", due: 1.5, age: 1.0 },
        { id: 13, projectID: 12, projectName: "EMS", due: 2.5, age: 11.0 },
        { id: 24, projectID: 21, projectName: "Database", due: 4.0, age: 2.0 },
        { id: 11, projectID: 41, projectName: "RPG", due: 6.0, age: 4.0 }
      ]
    };
    activeProjects();
    activeStories();
    // event listener for arrow button clicks
    $(".arrow-btn").on("click", event => {
      const arrowID = $(event.target).attr("id");
      const numID = parseInt(arrowID.split("-")[1]);
      const textID = arrowID.split("-")[0];
      console.log("textID", textID);
      console.log("numID", numID);
      if (textID === "arrowProject") {
        window.location.href = "/project/";
      } else if (textID === "arrowStory") {
        window.location.href = "/story/";
      }
    });
    // event listener for sort select dropdown menu
    $("#sort-select").on("change", () => {
      activeStories();
    });
    // renders the active projects section
    function activeProjects() {
      $("#project-results").empty();
      const sectionEl = htmlEl("section", [
        "section-container mx-auto text-center",
        "none"
      ]);
      const sectionTitleEl = htmlEl("p", ["section-title", "none"]);
      sectionTitleEl.text("Projects");
      sectionEl.append(sectionTitleEl);
      for (let i = 0; i < db.projects.length; i++) {
        const rowEl = htmlEl("div", ["row-container row mx-auto", "none"]);
        const pEl = htmlEl("p", ["section-item dash-project", "none"]);
        pEl.text(`Project ${db.projects[i].id} - ${db.projects[i].name}`);
        const svgEl = arrowBtn(`arrowProject-${db.projects[i].id}`);
        rowEl.append(pEl);
        rowEl.append(svgEl);
        sectionEl.append(rowEl);
      }
      $("#project-results").append(sectionEl);
    }
    // renders the active stories section
    function activeStories() {
      db.stories.sort(compareDue);
      $("#story-results").empty();
      const sectionEl = htmlEl("section", [
        "section-container mx-auto text-center",
        "none"
      ]);
      const sectionTitleEl = htmlEl("p", ["section-title", "none"]);
      sectionTitleEl.text("Stories");
      sectionEl.append(sectionTitleEl);
      for (let i = 0; i < db.stories.length; i++) {
        const rowEl = htmlEl("div", ["row-container row mx-auto", "none"]);
        const pStoryEl = htmlEl("p", ["section-item dash-story", "none"]);
        pStoryEl.text(
          `Project ${db.stories[i].projectID} - Story ${db.stories[i].id}`
        );
        const svgEl = arrowBtn(`arrowStory-${db.stories[i].id}`);
        const dayVal = db.stories[i].due;
        let dayClass = "";
        if (dayVal <= 1) {
          dayClass = "section-item dash-day red";
        } else {
          if (dayVal <= 3) {
            dayClass = "section-item dash-day yellow";
          } else {
            dayClass = "section-item dash-day green";
          }
        }
        const pDayEl = htmlEl("p", [dayClass, "none"]);
        pDayEl.text(dayVal);
        rowEl.append(pDayEl);
        rowEl.append(pStoryEl);
        rowEl.append(svgEl);
        sectionEl.append(rowEl);
      }
      $("#story-results").append(sectionEl);
    }
    // generates arrowBtn svg elements
    function arrowBtn(inputID) {
      const svgEl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgEl.setAttribute("id", inputID);
      svgEl.setAttribute("class", "arrow-btn bi bi-arrow-right-short");
      svgEl.setAttribute("width", "1.5em");
      svgEl.setAttribute("height", "1.5em");
      svgEl.setAttribute("viewBox", "0 0 16 16");
      svgEl.setAttribute("fill", "currentColor");
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
      return svgEl;
    }
    // generates html elements
    function htmlEl(elType, elArr) {
      const el = $(`<${elType}>`);
      if (elArr[0] !== "none") {
        el.attr("class", `${elArr[0]}`);
      }
      if (elArr[1] !== "none") {
        el.attr("id", `${elArr[1]}`);
      }
      return el;
    }
    // used in the sort method to sort by due date
    function compareDue(a, b) {
      return a.due > b.due ? 1 : -1;
    }
  });
});
