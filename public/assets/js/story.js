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
    renderTasks();
    // click event listener for add-task button
    $("#add-task-btn").on("click", () => {
      renderAddTask();
    });
    function renderAddTask() {
      console.log("add");
    }
    // renders tasks section
    function renderTasks() {
      db.tasks.sort(compareStatus);
      $("#task-section").empty();
      for (let i = 0; i < db.tasks.length; i++) {
        const divEl = htmlEl("div", ["row-container row mx-auto", "none"]);
        const taskIDEl = htmlEl("p", ["section-item dash-day", "none"]);
        taskIDEl.text(db.tasks[i].id);
        const taskDescEl = htmlEl("p", ["section-item dash-story", "none"]);
        taskDescEl.text(`${db.tasks[i].status} - ${db.tasks[i].description}`);
        const btnEl = createSVG(`edit-${db.tasks[i].id}`, "edit");
        divEl.append(taskIDEl);
        divEl.append(taskDescEl);
        divEl.append(btnEl);
        $("#task-section").append(divEl);
      }
    }
    // generates arrowBtn svg elements
    function createSVG(inputID, btnType) {
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
            "M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z",
          pathTwoD:
            "M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"
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
      const pathOneEl = document.createElementNS(ref.xmlns, "path");
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
      return a.status > b.status ? 1 : -1;
    }
  });
});
