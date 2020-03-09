mapboxgl.accessToken = 'pk.eyJ1Ijoiemh1d2VubG9uZyIsImEiOiJjazdhNGF6dzIwd3V0M21zNHU1ejZ1a3Q4In0.VkUeaPhu-uMepNBOMc_UdA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [121.2621, 31.1547],
    zoom: 9,
    hash: true,
});

map.on('load', () => {
    // 添加Geojson的数据
    map.addSource('cluster', {
        type: 'geojson',
        data: '../data/all.geojson',
        clusterRadius: 40,
        clusterProperties: { 'confirmedNum': ["+", ["get", "confirmedNum"]] }
    });

    // 添加圆圈
    map.addLayer(
        {
            id: 'clusters-layer',
            type: 'circle',
            source: 'cluster',
            filter: ['>=', ['get', 'confirmedNum'], 1],
            paint: {
                'circle-radius': 10,
                'circle-color': 'cyan'
            }
        },
        'waterway-label'
    );

    // 添加文本
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