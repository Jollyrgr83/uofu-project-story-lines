$(() => {
  $(() => {
    const db = {
      tasks: [
        { id: 1, description: "Button 1", status: 0 },
        { id: 1, description: "Button 2", status: 1 },
        { id: 1, description: "Button 3", status: 2 },
        { id: 1, description: "Header", status: 3 },
        { id: 1, description: "Footer", status: 0 }
      ],
      story: [
        {
          id: 3,
          projectID: 17,
          reporterName: "jhwatson",
          assigneeName: "sholmes",
          created: "04/01/20 08:30",
          estimated: "3 Days"
        }
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
    function arrowBtn(inputID, btnType) {
      const ref = {
        xmlns: "http://www.w3.org/2000/svg",
        fillrule: "evenodd",
        fill: "currentColor",
        width: "1em",
        height: "1em",
        viewBox: "0 0 16 16",
        edit: {
          class: "story-btn bi bi-pencil",
          pathOneD:
            "M3.17 6.706a5 5 0 0 1 7.103-3.16.5.5 0 1 0 .454-.892A6 6 0 1 0 13.455 5.5a.5.5 0 0 0-.91.417 5 5 0 1 1-9.375.789z",
          pathTwoD:
            "M8.147.146a.5.5 0 0 1 .707 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 1 1-.707-.708L10.293 3 8.147.854a.5.5 0 0 1 0-.708z"
        },
        save: {
          class: "story-btn bi bi-arrow-clockwise",
          pathOneD:
            "M3.17 6.706a5 5 0 0 1 7.103-3.16.5.5 0 1 0 .454-.892A6 6 0 1 0 13.455 5.5a.5.5 0 0 0-.91.417 5 5 0 1 1-9.375.789z",
          pathTwoD:
            "M8.147.146a.5.5 0 0 1 .707 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 1 1-.707-.708L10.293 3 8.147.854a.5.5 0 0 1 0-.708z"
        },
        add: {
          class: "story-btn bi bi-plus",
          pathOneD:
            "M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z",
          pathTwoD:
            "M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
        }
      };
      const svgEl = document.createElementNS(ref.xmlns, "svg");
      svgEl.setAttribute("id", inputID);
      svgEl.setAttribute("class", ref[btnType].class);
      svgEl.setAttribute("width", ref.width);
      svgEl.setAttribute("height", ref.height);
      svgEl.setAttribute("viewBox", ref.viewBox);
      svgEl.setAttribute("fill", ref.fill);
      const pathOneEl = document.createElementNS(xmlns, "path");
      pathOneEl.setAttribute("fill-rule", ref.fillrule);
      pathOneEl.setAttribute("d", ref[btnType].pathOneD);
      const pathTwoEl = document.createElementNS(ref.xmlns, "path");
      pathTwoEl.setAttribute("fill-rule", ref.fillrule);
      pathTwoEl.setAttribute("d", ref[btnType].pathTwoD);
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
    function compareStatus(a, b) {
      return a.due > b.due ? 1 : -1;
    }
  });
});
