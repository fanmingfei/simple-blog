const tpl = require("./libs/template.js");
const fs = require("fs");
var aa = fs.readFileSync("../_views/index.html");


var bb = tpl.render(aa.toString(), {
    website: {
        title: "aasd",
    },
    articles: [
        { title: "uuuuuu" }
    ]
});
console.log(bb)