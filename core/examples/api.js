var MAX_EXTENT = [420000, 30000, 900000, 350000];
var INITIAL_EXTENT = [515000, 180000, 580000, 230000];
var RESTRICTED_EXTENT = [420000, 30000, 900000, 350000];
var WMS_PROXY_URL = "http://sitn-proto-c2cgeoportail.demo-camptocamp.com/elemoine/wsgi/mapserv_proxy";
// example of a class inherited from cgxp.api.Map
// This one does not need ExtJS at all. It's an OpenLayers only example.
var Api = function() {
    this.wmsURL = WMS_PROXY_URL;
    return cgxp.api.Map.apply(this, arguments);
};
OpenLayers.inherit(Api, cgxp.api.Map, {
    initMap: function() {
        var mapConfig = {
            maxExtent: MAX_EXTENT,
            extent: INITIAL_EXTENT,
            restrictedExtent: RESTRICTED_EXTENT,
            projection: "EPSG:21781",
            resolutions: [250,100,50,20,10,5,2.5,2,1.5,1,0.5,0.25,0.125,0.0625],
            controls: [
                new OpenLayers.Control.Navigation(),
                new OpenLayers.Control.LayerSwitcher(),
                new OpenLayers.Control.PanZoomBar({
                    panIcons: false,
                    zoomWorldIcon: true
                })
            ],
            layers: [{
                source: 'olsource',
                type: "OpenLayers.Layer.TMS",
                args: [
                    OpenLayers.i18n('Plan de ville'),
                    ['http://tile1-sitn.ne.ch/tilecache_new/tilecache.cgi/', 'http://tile2-sitn.ne.ch/tilecache_new/tilecache.cgi/', 'http://tile3-sitn.ne.ch/tilecache_new/tilecache.cgi/', 'http://tile4-sitn.ne.ch/tilecache_new/tilecache.cgi/', 'http://tile5-sitn.ne.ch/tilecache_new/tilecache.cgi/'],
                    {
                        layername: 'plan_ville_c2c',
                        type:'png; mode=24bit',
                        serverResolutions: [250,100,50,20,10,5,2.5,2,1.5,1,0.5,0.25,0.125,0.0625],
                        maxExtent: new OpenLayers.Bounds(420000,30000,900000,360000),
                        tileOrigin: new OpenLayers.LonLat(420000,30000),
                        ref: 'plan',
                        group: 'background'
                    }
                ]
            }]
        };

        this.createMapFromConfig(mapConfig);
    }
});

// example of a class inherited from cgxp.api.Map which creates a viewer.
var Xapi = function() {
    this.wmsURL = WMS_PROXY_URL;
    return cgxp.api.Map.apply(this, arguments);
};
OpenLayers.inherit(Xapi, cgxp.api.Map, {
    initMap: function() {
        var mapConfig = {
            maxExtent: MAX_EXTENT,
            extent: INITIAL_EXTENT,
            restrictedExtent: RESTRICTED_EXTENT,
            projection: "EPSG:21781",
            resolutions: [250,100,50,20,10,5,2.5,2,1.5,1,0.5,0.25,0.125,0.0625],
            controls: [
                new OpenLayers.Control.Navigation(),
                new OpenLayers.Control.LayerSwitcher(),
                new OpenLayers.Control.PanZoomBar({
                    panIcons: false,
                    zoomWorldIcon: true
                })
            ],
            layers: [{
                source: 'olsource',
                type: "OpenLayers.Layer.TMS",
                args: [
                    OpenLayers.i18n('Plan de ville'),
                    ['http://tile1-sitn.ne.ch/tilecache_new/tilecache.cgi/', 'http://tile2-sitn.ne.ch/tilecache_new/tilecache.cgi/', 'http://tile3-sitn.ne.ch/tilecache_new/tilecache.cgi/', 'http://tile4-sitn.ne.ch/tilecache_new/tilecache.cgi/', 'http://tile5-sitn.ne.ch/tilecache_new/tilecache.cgi/'],
                    {
                        layername: 'plan_ville_c2c',
                        type:'png; mode=24bit',
                        serverResolutions: [250,100,50,20,10,5,2.5,2,1.5,1,0.5,0.25,0.125,0.0625],
                        maxExtent: new OpenLayers.Bounds(420000,30000,900000,360000),
                        tileOrigin: new OpenLayers.LonLat(420000,30000),
                        ref: 'plan',
                        group: 'background'
                    }
                ]
            }]
        };

        var config = this.adaptConfigForViewer(mapConfig);
        var div = config.div;
        var app = new gxp.Viewer({
            portalConfig: {
                renderTo: div,
                height: Ext.get(div).getHeight(),
                layout: "fit",
                items: [config.id]
            },
            // configuration of all tool plugins for this application
            tools: [
            {
                ptype: "cgxp_disclaimer",
                outputTarget: config.id
            },
            {
                ptype: "gxp_zoomtoextent",
                actionTarget: "map.tbar",
                closest: true,
                extent: INITIAL_EXTENT
            },
            {
                ptype: "cgxp_menushortcut",
                actionTarget: "map.tbar",
                type: '-'
            },
            {
                ptype: "cgxp_zoom",
                actionTarget: "map.tbar",
                toggleGroup: "maptools"
            }],
            sources: {
                olsource: {
                    ptype: "gxp_olsource"
                }
            },
            map: config
        });
        app.on('ready',
            this.onViewerReady.createDelegate(this, [app]));
        this.map = app.mapPanel.map;
    }
});

window.onload = function() {
    var api1 = new Api({
        div: 'map1',
        center: [544500, 210100],
        zoom: 8,
        showMarker: true,
        layerSwitcher: true,
        layers: ['parcelles', 'batiments_ofs']
    });
    var api2 = new Xapi({
        div: 'map2',
        center: [544500, 210100],
        zoom: 8,
        showMarker: true,
        layerSwitcher: true,
        layers: ['parcelles', 'batiments_ofs']
    });
};