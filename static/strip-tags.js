/*
 * strip-tags <https://github.com/jonschlinkert/strip-tags>
 *
 * Copyright (c) 2015 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var cheerio = require('cheerio');

exports.strip = function (str, tags) {
    var $ = cheerio.load(str, {decodeEntities: false, lowerCaseAttributeNames: false, lowerCaseTags: false});

    if (!tags || tags.length === 0) {
        return str;
    }

    tags = !Array.isArray(tags) ? [tags] : tags;
    var len = tags.length;

    while (len--) {
        $(tags[len]).remove();
    }
    // if (/showda/i.test(str)) {
    //     console.log($.html())
    // }
    return $.html();
};

exports.fetch = function (str, tag) {
    var $ = cheerio.load(str, {decodeEntities: false, lowerCaseAttributeNames: false, lowerCaseTags: false});
    if (!tag) {
        return str;
    }

    return $(tag).html();
};
