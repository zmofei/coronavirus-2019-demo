mapboxgl.accessToken = 'pk.eyJ1Ijoiemh1d2VubG9uZyIsImEiOiJjazdhNGF6dzIwd3V0M21zNHU1ejZ1a3Q4In0.VkUeaPhu-uMepNBOMc_UdA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
    center: [74.2, 10.6],
    zoom: 1.5,
    hash: true,
});

map.on('load', () => {
    map.addSource('coronavirus', {
        'type': 'geojson',
        'data': '../data/all.geojson'
    });

    map.addLayer(
        {
            'id': 'coronavirus-heat',
            'type': 'heatmap',
            'source': 'coronavirus',
            // 'maxzoom': 9,
            'paint': {
                // 热力权重，适用于集合图
                // Mapbox Expression https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/
                'heatmap-weight': [
                    'interpolate',
                    ['linear'],
                    ['get', 'confirmedNum'],
                    0, 0,
                    1000, 1
                ],
                // 全局控制热力权重
                'heatmap-intensity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0, 3,
                    9, 5
                ],
                // 热力图配色范围
                'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0, "rgba(0, 0, 0, 0)",
                    0.1, "#927903",
                    0.15, "#ffd403",
                    1, "red"
                ],
                // 每个热力点的绘制半径
                'heatmap-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0, 2,
                    1, 4,
                    2, 8,
                    3, 16,
                    4, 32,
                    5, 64,
                    6, 128,
                    7, 256,
                    8, 512,
                    9, 1024,
                    10, 2048,
                    11, 4096,
                    17, 131072
                ],
                // 热力图的透明度
                'heatmap-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    5, 0.95,
                    6, 0.5
                ]
            }
        },
        'waterway-label'
    );
});