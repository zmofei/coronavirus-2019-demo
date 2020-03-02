mapboxgl.accessToken = 'pk.eyJ1Ijoiemh1d2VubG9uZyIsImEiOiJjazdhNGF6dzIwd3V0M21zNHU1ejZ1a3Q4In0.VkUeaPhu-uMepNBOMc_UdA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
    center: [74.2, 10.6],
    zoom: 1.5,
    hash: true,
});

map.on('load', () => {
    map.addSource('cluster', {
        type: 'geojson',
        data: '../data/all.geojson',
        cluster: true,
        clusterRadius: 40,
        clusterProperties: { 'confirmedNum': ["+", ["get", "confirmedNum"]] }
    });

    map.addLayer(
        {
            id: 'clusters',
            type: 'circle',
            source: 'cluster',
            paint: {
                'circle-color': '#51bbd6',
                // 'circle-radius': 5,
                'circle-radius': [
                    'step',
                    ['get', 'confirmedNum'],
                    10, 10,
                    20, 1000,
                    30, 5000,
                    40
                ],
                'circle-color': [
                    'step',
                    ['get', 'confirmedNum'],
                    '#9ad5ff', 10,
                    '#9af6ff', 1000,
                    'cyan', 2000,
                    '#f1f075'
                ]
            }
        },
        'waterway-label'
    );

    map.addLayer({
        id: `clusters-count`,
        type: 'symbol',
        source: `cluster`,
        filter: ['>=', ['get', 'confirmedNum'], 1],
        layout: {
            'text-field': '{confirmedNum}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'text-allow-overlap': true,
        }
    }, 'waterway-label');


    // debug
    map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point);
        if (features.length > 0) {
            console.log(features);
        }
    });
});