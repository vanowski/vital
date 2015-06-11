'use strict';

global.$ = require('jquery');
global.jQuery = $;
global.Backbone = require('backbone');
global.Backbone.$ = $;

var Model = require('./Model');
var FiltersView = require('./FiltersView');
var DataView = require('./DataView');

$(document).on('ready', function() {
    var model = new Model();

    new FiltersView({
        model: model,
        el: $('[data-js=filters]')[0]
    });

    new DataView({
        model: model,
        el: $('[data-js=data]')[0]
    });
});