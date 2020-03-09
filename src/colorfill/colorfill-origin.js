mapboxgl.accessToken = 'pk.eyJ1Ijoiemh1d2VubG9uZyIsImEiOiJjazdhNGF6dzIwd3V0M21zNHU1ejZ1a3Q4In0.VkUeaPhu-uMepNBOMc_UdA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
    center: [33.54, 102.01],
    zoom: 3,
    hash: true,
});

map.on('load', () => {

    // 地区多边形
    map.addSource('area-polygon', {
        'type': 'vector',
        'url': 'mapbox://zhuwenlong.bpyitk7f'
    });

    map.addLayer({
        'id': 'area-fill',
        'source': 'area-polygon',
        'source-layer': 'cn_sheng_polygon',
        'type': 'fill',
        "paint": {
            "fill-color": '#808080'
        }
    })

    map.addLayer({
        'id': 'area-outline',
        'source': 'area-polygon',
        'source-layer': 'cn_sheng_polygon',
        'type': 'line',
        "paint": {
            "line-color": 'rgba(0,0,0,0.3)',
        }
    })


    // 点击打印瓦片信息
    map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point);
        if (features.length > 0) {
            console.log(features);
        }
    });
});