mapboxgl.accessToken = 'pk.eyJ1Ijoiemh1d2VubG9uZyIsImEiOiJjazdhNGF6dzIwd3V0M21zNHU1ejZ1a3Q4In0.VkUeaPhu-uMepNBOMc_UdA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [121.2621, 31.1547],
    zoom: 9,
    hash: true,
});

var markers = {};
var markersOnScreen = {};
const colors = ['#ef5b56', '#61ffa1', '#c7d5dc', '#ff918e'];

map.on('load', () => {
    // 添加Geojson的数据
    map.addSource('cluster', {
        type: 'geojson',
        data: '../data/all.geojson',
        cluster: true,
        clusterProperties: {
            "confirmedNum": ["+", ["get", "confirmedNum"]],
            "curesNum": ["+", ["get", "curesNum"]],
            "deathsNum": ["+", ["get", "deathsNum"]],
            "suspectedNum": ["+", ["get", "suspectedNum"]],
        },
        clusterRadius: 80
    });

    // 添加圆圈
    map.addLayer({
        'id': 'cagegory-layer',
        'type': 'symbol',
        'source': 'cluster',
    });

    map.on('data', function (e) {
        // 当数据源加载完毕之后，添加时间，并更新显示效果
        if (e.sourceId !== 'cluster' || !e.isSourceLoaded) return;
        map.on('move', updateMarkers);
        map.on('moveend', updateMarkers);
        updateMarkers();
    });
});

function updateMarkers() {
    var MarkersToDisplay = {};
    // 获取当前屏幕可见的数据
    var features = map.querySourceFeatures('cluster');

    // 遍历所有当前屏幕可见的数据
    // 优化一：Marker的缓存：如果还没有创建对应的标注（Marker）创建一个，否则直接使用已创建的
    // 优化二: 仅显示屏幕可见的Marker：如果Marker超出了屏幕可见范围将其移除，以节省资源
    for (var i = 0; i < features.length; i++) {
        var coords = features[i].geometry.coordinates;
        var props = features[i].properties;
        if (!props.cluster) {
            continue
        };
        var id = props.cluster_id;
        var marker = markers[id];
        // 如果自定义标记不存在创建一个
        if (!marker) {
            var el = createChart(props);
            marker = markers[id] = new mapboxgl.Marker({
                element: el
            }).setLngLat(coords);
        }
        MarkersToDisplay[id] = marker;

        // 如果当前的标记不在屏幕上，添加上去
        if (!markersOnScreen[id]) marker.addTo(map);
    }
    // 遍历所有屏幕上的标记，如果不在MarkersToDisplay中，说明该标注已经在屏幕之外了需要删除
    for (id in markersOnScreen) {
        if (!MarkersToDisplay[id]) markersOnScreen[id].remove();
    }
    markersOnScreen = MarkersToDisplay;
}

// 创建每一个Marke的HTML文件
function createChart(props) {
    var offsets = [];
    var counts = [
        props.confirmedNum,
        props.curesNum,
        props.deathsNum,
        props.suspectedNum
    ];
    var total = 0;
    for (var i = 0; i < counts.length; i++) {
        offsets.push(total);
        total += counts[i];
    }
    var fontSize =
        total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
    var r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
    var r0 = Math.round(r * 0.6);
    var w = r * 2;

    var paths = [];

    for (i = 0; i < counts.length; i++) {
        paths.push(segment(offsets[i] / total, (offsets[i] + counts[i]) / total, r, r0, colors[i]));
    }


    var html = (
        `<div>
            <svg width="${w}" height="${w}" viewbox="0 0 ${w} ${w} " text-anchor="middle" style="font: ${fontSize}px sans-serif">
                ${paths.join()}
                <circle cx="${r}" cy="${r}" r="${r0}" fill="white" />
                <text dominant-baseline="central" transform="translate(${r},${r})">${total}</text>
            </svg>
        </div>`
    );

    var el = document.createElement('div');
    el.innerHTML = html;
    return el.firstChild;
}

function segment(start, end, r, r0, color) {
    if (end - start === 1) end -= 0.00001;
    var a0 = 2 * Math.PI * (start - 0.25);
    var a1 = 2 * Math.PI * (end - 0.25);
    var x0 = Math.cos(a0),
        y0 = Math.sin(a0);
    var x1 = Math.cos(a1),
        y1 = Math.sin(a1);
    var largeArc = end - start > 0.5 ? 1 : 0;

    return `<path d="M ${r + r0 * x0} ${r + r0 * y0} L ${r + r * x0} ${r + r * y0} A ${r} ${r} 0 ${largeArc} 1 ${r + r * x1} ${r + r * y1} L ${r + r0 * x1} ${r + r0 * y1} A ${r0} ${r0} 0 ${largeArc} 0 ${r + r0 * x0} ${r + r0 * y0}" fill="${color}" />`
}