describe('plugins.FeatureGrid', function() {
    var p,
        events;
    beforeEach(function() {
        events = new Ext.util.Observable();
        p = new cgxp.plugins.FeatureGrid({
            events: events
        });
    });
    afterEach(function() {
        // clean up the DOM, which must be Ext-free
        // after each run
        var cmp = p && p.output && p.output[0];
        while(cmp && cmp.ownerCt) {
            cmp = cmp.ownerCt;
        }
        if(cmp) {
            cmp.destroy();
        }
        p = null;
    });
    describe('when calling constructor', function() {
        it('creates a gxp tool', function() {
            expect(p).toBeInstanceOf(gxp.plugins.Tool);
        });
        it('creates a featuregrid plugin', function() {
            expect(p).toBeInstanceOf(cgxp.plugins.FeatureGrid);
        });
    });
    describe('when calling addOutput', function() {
        var output;
        beforeEach(function() {
            var target = new Ext.Panel({
                tools: {},
                on: function() {},
                mapPanel: {
                    map: new OpenLayers.Map('map')
                }
            });
            p.init(target);
            output = p.addOutput();
        });
        it('creates a tabpanel', function() {
            expect(output).toBeInstanceOf(Ext.TabPanel);
        });
        describe('when expanded', function() {
            it('shows the vector layer', function() {
                output.ownerCt.fireEvent('expand');
                expect(p.vectorLayer.visibility).toBeTruthy();
            });
        });
        describe('when collapsed', function() {
            it('hides the vector layer', function() {
                output.ownerCt.fireEvent('collapse');
                expect(p.vectorLayer.visibility).toBeFalsy();
            });
        });
    });
});
