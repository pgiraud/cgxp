describe('plugins.FullTextSearch', function() {
    var p;
    describe('when calling constructor', function() {
        beforeEach(function() {
            p = new cgxp.plugins.FullTextSearch();
        });
        it('creates a gxp tool', function() {
            expect(p).toBeInstanceOf(gxp.plugins.Tool);
        });
        it('creates a full text search plugin', function() {
            expect(p).toBeInstanceOf(cgxp.plugins.FullTextSearch);
        });
    });
    describe('when calling init', function() {
        beforeEach(function() {
            p = new cgxp.plugins.FullTextSearch({});
            p.init({
                tools: {},
                on: function(){}
            });
        });
        it('creates a vector layer', function() {
            expect(p.vectorLayer).toBeInstanceOf(OpenLayers.Layer.Vector);
        });
    });
    describe('when calling viewerReady', function() {
        var map;
        beforeEach(function() {
            p = new cgxp.plugins.FullTextSearch({});
            map = new OpenLayers.Map();
            p.init({
                tools: {},
                on: function(){}
            });
            p.target = {
                mapPanel: {
                    map: map
                }
            };
            p.viewerReady();
        });
        it('adds the vector layer to the map', function() {
            expect(map.layers.indexOf(p.vectorLayer) != -1).toBeTruthy();
        });
    });
    describe('when calling addActions', function() {
        var actions;
        beforeEach(function() {
            p = new cgxp.plugins.FullTextSearch();
            // some mocking
            p.actionTarget = [null];
            p.target = {
                mapPanel: {
                    map: {}
                }
            };
            actions = p.addActions();
        });
        it('creates an array of length 1', function() {
            expect(actions.length).toEqual(1);
        });
        it('creates a twin trigger combo', function() {
            expect(actions[0]).toBeInstanceOf(Ext.ux.form.TwinTriggerComboBox);
        });
    });
});
