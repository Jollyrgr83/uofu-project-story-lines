$(() => {
  $(() => {
    const db = {
      tasks: [
        { id: 1, description: "Button 1", status: 0 },
        { id: 2, description: "Button 2", status: 1 },
        { id: 3, description: "Button 3", status: 2 },
        { id: 4, description: "Header", status: 3 },
        { id: 5, description: "Footer", status: 0 }
      ],
      story: [
        {
          id: 3,
          projectID: 17,
          reporterID: 2,
          assigneeID: 3,
          created: "04/01/20 08:30",
          estimated: 3.5,
          details:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!"
        }
      ]
    };
    renderInfo();
    renderTasks();
    renderDetails("static");
    // click event listener for buttons
    $(document).on("click", "svg", event => {
      const clickID = $(event.target).attr("id");
      const clickClass = $(event.target).attr("class");
      if (clickID === "add-task-btn") {
        renderAddTask();
      }
      if (clickClass.indexOf("pencil") !== -1) {
        if (clickID.split("-")[1] === "details") {
          renderDetails("edit");
        } else {
          renderEditTask(parseInt(clickID.split("-")[1]));
        }
      }
      if (clickID === "updateTaskBtn") {
        console.log("update");
        // insert PUT request and update db object
        taskMessage("update");
      }
      if (clickID === "saveNewTaskBtn") {
        console.log("save");
        // insert POST request and update db object
        taskMessage("save");
      }
      if (clickID === "update-details") {
        // insert PUT request and update db object
        renderDetails("static");
        detailsMessage();
      }
      if (clickID === "save-info-btn") {
        console.log("save-info-btn");
        // insert PUT request and update db object
        infoMessage();
      }
    });
    // renders story information
    function renderInfo() {
      $("#story-title").text(
        `Project ${db.story[0].projectID} - Story ${db.story[0].id}`
      );
      $(`#reporter option[value="${db.story[0].reporterID}"]`).attr(
        "selected",
        "selected"
      );
      $(`#assignee option[value="${db.story[0].assigneeID}"]`).attr(
        "selected",
        "selected"
      );
      $("#created").text(db.story[0].created);
      $("#estimated").val(db.story[0].estimated);
      if (db.story[0].estimated <= 1) {
        $("#estimated").attr("class", "story-info-input mx-auto red");
      } else {
        if (db.story[0].estimated <= 3) {
          $("#estimated").attr("class", "story-info-input mx-auto yellow");
        } else {
          $("#estimated").attr("class", "story-info-input mx-auto green");
        }
      }
    }
    // renders add task section
    function renderAddTask() {
      $("#dynamic-task-section").empty();
      const sectionEl = htmlEl("section", [
        "section-container mx-auto text-center",
        "none"
      ]);
      // title row
      const titleRowEl = htmlEl("div", ["row-container row mx-auto", "none"]);
      const pTitleEl = htmlEl("p", ["section-title", "none"]);
      pTitleEl.text("Add Task");
      const saveBtnEl = createSVG("saveNewTaskBtn", "save");
      titleRowEl.append(pTitleEl);
      titleRowEl.append(saveBtnEl);
      sectionEl.append(titleRowEl);
      // input row
      const inputRowEl = htmlEl("div", ["row-container row mx-auto", "none"]);
      const inputEl = htmlEl("input", ["story-task-input", "add-task-input"]);
      inputEl.attr("type", "text");
      const statusMenuEl = htmlEl("select", ["status-select", "status-select"]);
      const todoOptionEl = htmlEl("option", ["none", "none"]);
      todoOptionEl.attr("value", "0");
      todoOptionEl.text("Todo");
      const blockedOptionEl = htmlEl("option", ["none", "none"]);
      blockedOptionEl.attr("value", "1");
      blockedOptionEl.text("Blocked");
      const inProgressOptionEl = htmlEl("option", ["none", "none"]);
      inProgressOptionEl.attr("value", "2");
      inProgressOptionEl.text("In Progress");
      const completedOptionEl = htmlEl("option", ["none", "none"]);
      completedOptionEl.attr("value", "3");
      completedOptionEl.text("Completed");
      statusMenuEl.append(todoOptionEl);
      statusMenuEl.append(blockedOptionEl);
      statusMenuEl.append(inProgressOptionEl);
      statusMenuEl.append(completedOptionEl);
      inputRowEl.append(inputEl);
      inputRowEl.append(statusMenuEl);
      sectionEl.append(inputRowEl);
      $("#dynamic-task-section").append(sectionEl);
    }
    // renders edit task section
    function renderEditTask(taskID) {
      console.log("taskID", taskID);
      $("#dynamic-task-section").empty();
      const sectionEl = htmlEl("section", [
        "section-container mx-auto text-center",
        "none"
      ]);
      // title row
      const titleRowEl = htmlEl("div", ["row-container row mx-auto", "none"]);
      const pTitleEl = htmlEl("p", ["section-title", "none"]);
      pTitleEl.text(`Edit Task ${db.tasks[taskID].id}`);
      const saveBtnEl = createSVG("updateTaskBtn", "save");
      titleRowEl.append(pTitleEl);
      titleRowEl.append(saveBtnEl);
      sectionEl.append(titleRowEl);
      // input row
      const inputRowEl = htmlEl("div", ["row-container row mx-auto", "none"]);
      const inputEl = htmlEl("input", ["story-task-input", "add-task-input"]);
      inputEl.attr("type", "text");
      inputEl.val(db.tasks[taskID].description);
      const statusMenuEl = htmlEl("select", ["status-select", "status-select"]);
      const todoOptionEl = htmlEl("option", ["none", "none"]);
      todoOptionEl.attr("value", "0");
      todoOptionEl.text("Todo");
      const blockedOptionEl = htmlEl("option", ["none", "none"]);
      blockedOptionEl.attr("value", "1");
      blockedOptionEl.text("Blocked");
      const inProgressOptionEl = htmlEl("option", ["none", "none"]);
      inProgressOptionEl.attr("value", "2");
      inProgressOptionEl.text("In Progress");
      const completedOptionEl = htmlEl("option", ["none", "none"]);
      completedOptionEl.attr("value", "3");
      completedOptionEl.text("Completed");
      if (db.tasks[taskID].status === 0) {
        todoOptionEl.attr("selected", "selected");
      } else if (db.tasks[taskID].status === 1) {
        blockedOptionEl.attr("selected", "selected");
      } else if (db.tasks[taskID].status === 2) {
        inProgressOptionEl.attr("selected", "selected");
      } else {
        completedOptionEl.attr("selected", "selected");
      }
      statusMenuEl.append(todoOptionEl);
      statusMenuEl.append(blockedOptionEl);
      statusMenuEl.append(inProgressOptionEl);
      statusMenuEl.append(completedOptionEl);
      inputRowEl.append(inputEl);
      inputRowEl.append(statusMenuEl);
      sectionEl.append(inputRowEl);
      $("#dynamic-task-section").append(sectionEl);
    }
    // renders edit story details section
    function renderDetails(inputType) {
      $("#details-section").empty();
      if (inputType === "static") {
        const divEl = htmlEl("div", ["row-container row mx-auto", "none"]);
        const pTitleEl = htmlEl("p", ["section-title", "none"]);
        pTitleEl.text("Details");
        const editBtnEl = createSVG("edit-details", "edit");
        divEl.append(pTitleEl);
        divEl.append(editBtnEl);
        $("#details-section").append(divEl);
        const pTextEl = htmlEl("p", ["story-details mx-auto", "none"]);
        pTextEl.text(db.story[0].details);
        $("#details-section").append(pTextEl);
      } else {
        $("#details-message").empty();
        const divEl = htmlEl("div", ["row-container row mx-auto", "none"]);
        const pTitleEl = htmlEl("p", ["section-title", "none"]);
        pTitleEl.text("Details");
        const editBtnEl = createSVG("update-details", "save");
        divEl.append(pTitleEl);
        divEl.append(editBtnEl);
        $("#details-section").append(divEl);
        const textareaEl = htmlEl("textarea", [
          "story-details mx-auto",
          "details-input"
        ]);
        textareaEl.val(db.story[0].details);
        textareaEl.attr("rows", 6);
        $("#details-section").append(textareaEl);
      }
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
        const btnEl = createSVG(`edit-${i}`, "edit");
        divEl.append(taskIDEl);
        divEl.append(taskDescEl);
        divEl.append(btnEl);
        $("#task-section").append(divEl);
      }
    }
    // renders message following task save or update
    function taskMessage(messageType) {
      $("#dynamic-task-section").empty();
      sectionEl = htmlEl("section", ["section-container mx-auto text-center"]);
      messageEl = htmlEl("p", ["section-message", "none"]);
      messageType === "save"
        ? messageEl.text("Task added!")
        : messageEl.text("Task updated!");
      sectionEl.append(messageEl);
      $("#dynamic-task-section").append(sectionEl);
    }
    // renders message following details update
    function detailsMessage() {
      $("#details-message").empty();
      const messageEl = htmlEl("p", ["section-message", "none"]);
      messageEl.text("Story details updated!");
      $("#details-message").append(messageEl);
    }
    function infoMessage() {
      $("#info-message").empty();
      const messageEl = htmlEl("p", ["section-message", "none"]);
      messageEl.text("Story information updated!");
      $("#info-message").append(messageEl);
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
