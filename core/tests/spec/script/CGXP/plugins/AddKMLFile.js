describe('plugins.AddKMLFile', function() {
    var p;
    describe('when calling constructor', function() {
        beforeEach(function() {
            p = new cgxp.plugins.AddKMLFile();
        });
        it('creates a gxp tool', function() {
            expect(p).toBeInstanceOf(gxp.plugins.Tool);
        });
        it('creates a addkmlfile plugin', function() {
            expect(p).toBeInstanceOf(cgxp.plugins.AddKMLFile);
        });
    });
    describe('when calling addActions', function() {
        var actions;
        beforeEach(function() {
            p = new cgxp.plugins.AddKMLFile();
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
        it('creates a fileupload form', function() {
            expect(actions[0]).toBeInstanceOf(Ext.form.FormPanel);
        });
    });
});

