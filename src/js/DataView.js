'use strict';

var hogan = require('hogan');

module.exports = Backbone.View.extend({
    initialize: function() {
        this.model.on('filter', this.render.bind(this));
        this.render();
    },

    render: function() {
        var template = hogan.compile($('[data-js=companies-list-template]', this.$el)[0].innerHTML);
        var $companiesList = $('[data-js=companies-list]', this.$el);

        $companiesList.html(
            template.render({
                list: this.model.get('results')
            })
        );
    }
});