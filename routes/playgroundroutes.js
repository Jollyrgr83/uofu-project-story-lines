// include queries to & from database
// get pulling data
// put change existing
// post add new
// delete existing
// module.specificmethod



// event scoring database example >>>>

// sends data to view.js to build the view and edit items section
router.get("/api/view/menu/:tableName", (req, res) => {
    model.getAllFromOneTable(req.params.tableName, data => {
        if (data[0].value) {
            let arr = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].type === "year") {
                    arr.push({id: data[i].id, name: data[i].value});
                }
            }
            res.json({data: arr});
        } else {
            res.json({data: data});
        }
    });
});
// sends data to year.js to render the tier and event information for the selected year 
router.get("/api/year/:id", (req, res) => {
    model.getAllYearSetupData(parseInt(req.params.id), data => res.json(data));
});
// sends data to comp.js to render competitor selection menu in view/edit competitors section
router.get("/api/comp/year/:year", (req, res) => {
    if (isNaN(parseInt(req.params.year))) {
        res.json([])
    } else {
        model.getAllCompetitorsByYear(parseInt(req.params.year), data => res.json(data.map(x => x.team ? {id: x.id, text: `${x.comp_number} - ${x.team_name}: ${x.group_names}`} : {id: x.id, text: `${x.comp_number} - ${x.first_name} ${x.last_name}`})));
    }
});
// sends data to comp.js to render competitor name and number information in view/edit competitors section
router.get("/api/comp/competitor/:competitor_id", (req, res) => {
    if (isNaN(parseInt(req.params.competitor_id))) {
        res.json([]);
    } else {
        model.getOneCompetitorByID(parseInt(req.params.competitor_id), data => res.json(data[0]));
    }
});
// sends boolean result to comp.js for team field based on tier id
router.get("/api/comp/tier/:id", (req, res) => {
    model.getTeamBooleanByTierID(parseInt(req.params.id), data => res.json(data));
});
// sends all organizations to comp.js for organization selection menu in add section
router.get("/api/comp/org/", (req, res) => {
    model.getAllFromOneTable("organizations", data => res.json(data));
});
// sends all event scores for one competitor to score.js to render competitor scores 
router.get("/api/score/competitor/:competitor_id", (req, res) => {
    model.getCompetitorScores(parseInt(req.params.competitor_id.split("&")[0]), parseInt(req.params.competitor_id.split("&")[1]), data => res.json(data));
});
// sends score reconciliation data to score.js
router.get("/api/score/reconcile/:year_id", (req, res) => {
    const obj = {year_id: parseInt(req.params.year_id), tiers: {}};
    model.getScoreReconciliation(obj.year_id, (data) => {
        // parse SQL result
        for (let i = 0; i < data.tiers.length; i++) {
            obj.tiers[data.tiers[i].tier_id] = {competitor_id: [], event_id: []};
            for (let j = 0; j < data.events.length; j++) {
                if (data.events[j].tier_id === data.tiers[i].tier_id) {
                    obj.tiers[data.tiers[i].tier_id].event_id.push(data.events[j]);
                }
            }
            for (let j = 0; j < data.competitors_table.length; j++) {
                if (data.competitors_table[j].tier_id === data.tiers[i].tier_id) {
                    obj.tiers[data.tiers[i].tier_id].competitor_id.push(data.competitors_table[j]);
                }
            }
        }
        // build required score entries
        obj.req = [];
        let tier_arr = Object.keys(obj.tiers);
        for (let i = 0; i < tier_arr.length; i++) {
            for (let j = 0; j < obj.tiers[tier_arr[i]].competitor_id.length; j++) {
                for (let k = 0; k < obj.tiers[tier_arr[i]].event_id.length; k++) {
                    var item = {
                        year_id: obj.year_id,
                        competitor_id: obj.tiers[tier_arr[i]].competitor_id[j].id,
                        event_id: obj.tiers[tier_arr[i]].event_id[k].event_id
                    };
                    obj.req.push(item);
                }
            }
        }
        // compare against actual
        obj.delta = [];
        for (let i = 0; i < obj.req.length; i++) {
            let counter = true;
            for (let j = 0; j < data.act.length; j++) {
                if (obj.req[i].competitor_id === data.act[j].competitor_id && obj.req[i].event_id === data.act[j].event_id) {
                    counter = false;
                }
            }
            if (counter) {
                obj.delta.push(obj.req[i]);
            }
        }
        // insert missing score table records
        for (let i = 0; i < obj.delta.length; i++) {
            model.addScore(obj.delta[i], data => console.log(data));
        }
        obj.scores = data;
        res.json(obj);
    });
});
// sends all scores and competitor data for selected year to report.js
router.get("/api/report/all/:year_id", (req, res) => {
    // get all tiers for selected year
    model.getAllTiersEventsByYearID(parseInt(req.params.year_id), (data) => {
        const tiersObj = {tiers: {}};
        // create properties in tiersObj.tiers for tier_id
        for (let i = 0; i < data.length; i++) {
            if (data[i].type === "tier") {
                tiersObj.tiers[data[i].tier_id] = {};
            }
        }
        // create properties with empty array values in tiersObj.tiers.[tier_id] for each event_id associated with that tier_id
        for (let i = 0; i < data.length; i++) {
            if (data[i].type === "event") {
                tiersObj.tiers[data[i].tier_id][data[i].event_id] = [];
            }
        }
        let keys = Object.keys(tiersObj.tiers);
        for (let i = 0; i < keys.length; i++) {
            tiersObj.tiers[keys[i]]["overall"] = [];
        }
        // get all scores for selected year
        model.getAllScoresByYearID(parseInt(req.params.year_id), (data) => {
            // push score objects to arrays in matching tier_id and event_id properties in tiersObj 
            for (let i = 0; i < data.length; i++) {
                tiersObj.tiers[data[i].tier_id][data[i].event_id].push(data[i]);
            }
            let tierArr = Object.keys(tiersObj.tiers);
            // for each tier_id
            for (let i = 0; i < tierArr.length; i++) {
                let eventArr = Object.keys(tiersObj.tiers[tierArr[i]]);
                // for each event_id in the tier_id property
                for (let j = 0; j < eventArr.length; j++) {
                    // sort and reverse the score objects by highest score and by lowest time if score is equal (uses the compare function declared below)
                    tiersObj.tiers[tierArr[i]][eventArr[j]].sort(compare).reverse();
                }
            }
            // get all names and metadata for rendering report page
            model.getAllNamesByYearID(parseInt(req.params.year_id), (data) => {
                tiersObj.comp_ref = data.comp_ref;
                tiersObj.org_ref = data.org_ref;
                tiersObj.tier_ref = data.tier_ref;
                tiersObj.event_ref = data.event_ref;
                tiersObj.event_ref["overall"] = "Overall";
                res.json(tiersObj);
            });
        });
    });
});
// generates pdf report on updating score selections
router.get("/api/generate-report/", (req, res) => {
  var fonts = {
    Roboto: {
      normal: "./public/assets/fonts/Lato-Light.ttf",
      bold: "./public/assets/fonts/Lato-Bold.ttf",
      italics: "./public/assets/fonts/Lato-Italic.ttf",
      bolditalics: "./public/assets/fonts/Lato-BoldItalic.ttf"
    }
  };
  var PdfPrinter = require('pdfmake');
  var printer = new PdfPrinter(fonts);
  var fs = require('fs');
  // add functionality here to generate report with data
  var docDefinition = { content: "This is a sample pdf." };
  var options = {};
  var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream("./output/report.pdf"))
  pdfDoc.end()
  res.json({ status: 200 });
});
// sends pdf file to browser
router.get("/api/retrieve-report", (req, res) => {
  res.download("./output/report.pdf");
});
// receives data from view.js and adds new category (tier, event, organization, year)
router.post("/api/view/", (req, res) => {
    model.addCategory(req.body, data => res.json(data));
});
// receives data from year.js and adds new event
router.post("/api/year/", (req, res) => {
    model.addEvent(req.body, data => res.json(data));
});
// receives data from year.js and adds new tier
router.post("/api/year/tier/", (req, res) => {
    model.addTier(req.body, data => res.json(data));
});
// receives data from comp.js and adds new competitor
router.post("/api/comp/", (req, res) => {
    model.addCompetitor(req.body, data => res.json(data));
});
// receives data from view.js and updates category record (tier, entry, organization, year)
router.put("/api/view/", (req, res) => {
    model.updateCategory(req.body, data => res.json(data));
});
// receives data from comp.js and updates competitor record
router.put("/api/comp/update/", (req, res) => {
    model.updateCompetitor(req.body, data => res.json(data));
});
// receives data from score.js 
router.put("/api/score/", (req, res) => {
    model.updateCompetitorScores(req.body.data, data => res.json(data));
});
// receives data from view.js and deletes category record (tier, entry, organization, year)
router.delete("/api/view/", (req, res) => {
    model.deleteCategory(req.body, data => res.json(data));
});
// receives data from year.js and deletes event record
router.delete("/api/year/", (req, res) => {
    model.deleteEvent(req.body.event_id, req.body.tier_id, req.body.year_id, data => res.json(data));
});
// receives data from year.js and deletes tier record
router.delete("/api/year/tier/", (req, res) => {
    model.deleteTier(req.body, data => res.json(data));
});
// receives data from comp.js and deletes competitor record
router.delete("/api/comp/", (req, res) => {
    model.deleteCompetitor(req.body, data => res.json(data));
});

// function used by sort to sort by highest score then by lowest time if tied
function compare(a, b) {
    if (a.score < b.score) {
      return -1;
    } else if (a.score < b.score) {
        return 1;
    } else if (a.score === b.score) {
        if (a.total_seconds < b.total_seconds) {
            return 1;
        } else {
            return -1;
        }
    }
}

module.exports = router;