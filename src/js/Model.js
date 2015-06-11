'use strict';

module.exports = Backbone.Model.extend({
    defaults: {
        phases: [],
        amountRange: {},
        statuses: [],
        keywords: [],
        companies: [],
        results: []
    },

    initialize: function() {
        if (localStorage.companies) {
            var companies = JSON.parse(localStorage.companies);

            this.set({
                companies: companies,
                results: companies
            });
        } else {
            $.ajax({
                url: "/companies"
            })
            .done(function(response) {
                var companies = response.objects;

                this.set({
                    companies: companies,
                    results: companies
                });

                localStorage.setItem('companies', JSON.stringify(companies));
            }.bind(this))
            .fail(function() {
                console.log('Failed to get companies info');
            });
        }

        this.on('change', function() {
            var results = this.get('companies')
                .filter(function(el) {
                    var top = this.get('amountRange').top;
                    var bottom = this.get('amountRange').bottom;

                    if (top && bottom) {
                        return  el.amount <= top && el.amount >= bottom
                    } else {
                        return true;
                    }
                }.bind(this))
                .filter(function(el) {
                    var phases = this.get('phases');

                    if (phases.length) {
                        return phases.indexOf(el.phase) !== -1
                    } else {
                        return true;
                    }
                }.bind(this))
                .filter(function(el) {
                    var statuses = this.get('statuses');

                    if (statuses.length) {
                        return statuses.indexOf(el.status) !== -1
                    } else {
                        return true;
                    }
                }.bind(this));

            this.set({
                results: results
            });

            this.trigger('filter');
        });
    }
});