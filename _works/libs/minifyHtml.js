var minify = require('html-minifier').minify;

function minifyHtml(html) {
    return minify(html, {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
    });
}
module.exports = minifyHtml;