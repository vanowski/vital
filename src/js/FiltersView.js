'use strict';

require('bootstrap');
require('./lib/bootstrap-multiselect');
require('./lib/bootstrap-slider');

module.exports = Backbone.View.extend({
    initialize: function() {
        var $phases = $('[data-js=filter-phases]', this.$el);
        var $amount = $('[data-js=filter-amount]', this.$el);
        var $statuses = $('[data-js=filter-statuses]', this.$el);

        $amount.slider({
            min: 10,
            max: 10000,
            step: 100,
            value: [2000, 8000],
            handle: 'round'
        }).on('slide', function(e) {
            var bottom = e.value[0];
            var top = e.value[1];

            this.model.set({
                amountRange: {
                    top: top,
                    bottom: bottom
                }
            })
        }.bind(this));

        $phases.multiselect({
            nonSelectedText: 'All',
            buttonWidth: '100%',
            onChange: function(option, checked) {
                var phases = [];

                $phases.find('option:selected').each(function(i, el) {
                    phases.push(parseInt($(el).val(), 10));
                });

                this.model.set({
                    phases: phases
                })
            }.bind(this)
        });

        $statuses.multiselect({
            nonSelectedText: 'All',
            buttonWidth: '100%',
            onChange: function(option, checked) {
                var statuses = [];

                $statuses.find('option:selected').each(function(i, el) {
                    statuses.push($(el).val());
                });

                this.model.set({
                    statuses: statuses
                })
            }.bind(this)
        });
    }
});