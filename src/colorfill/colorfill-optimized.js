mapboxgl.accessToken = 'pk.eyJ1Ijoiemh1d2VubG9uZyIsImEiOiJjazdhNGF6dzIwd3V0M21zNHU1ejZ1a3Q4In0.VkUeaPhu-uMepNBOMc_UdA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
    center: [113.78, 33.94],
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
            // 使用Expression进行填色
            "fill-color": [
                "match",
                [
                    "get",
                    "name"
                ],
                "湖北",
                "rgba(204,30,29,1)",
                "广东",
                "rgba(239,63,63,1)",
                "河南",
                "rgba(239,63,63,1)",
                "浙江",
                "rgba(239,63,63,1)",
                "湖南",
                "rgba(240,64,64,1)",
                "安徽",
                "rgba(240,64,64,1)",
                "江西",
                "rgba(241,69,65,1)",
                "山东",
                "rgba(247,86,71,1)",
                "江苏",
                "rgba(251,98,74,1)",
                "重庆",
                "rgba(252,103,75,1)",
                "四川",
                "rgba(253,107,76,1)",
                "黑龙江",
                "rgba(255,114,80,1)",
                "北京",
                "rgba(255,122,86,1)",
                "上海",
                "rgba(255,134,96,1)",
                "河北",
                "rgba(255,137,99,1)",
                "福建",
                "rgba(255,139,101,1)",
                "广西",
                "rgba(255,145,106,1)",
                "陕西",
                "rgba(255,149,109,1)",
                "云南",
                "rgba(255,157,116,1)",
                "海南",
                "rgba(255,160,119,1)",
                "贵州",
                "rgba(255,162,121,1)",
                "天津",
                "rgba(255,162,121,1)",
                "山西",
                "rgba(255,162,121,1)",
                "辽宁",
                "rgba(255,166,124,1)",
                "香港",
                "rgba(255,168,126,1)",
                "吉林",
                "rgba(255,168,126,1)",
                "甘肃",
                "rgba(255,168,126,1)",
                "新疆",
                "rgba(255,175,132,1)",
                "内蒙古",
                "rgba(255,175,132,1)",
                "宁夏",
                "rgba(255,175,132,1)",
                "台湾",
                "rgba(255,191,149,1)",
                "青海",
                "rgba(255,199,157,1)",
                "澳门",
                "rgba(255,199,157,1)",
                "西藏",
                "rgba(255,208,166,1)",
                "black"
            ]
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


    map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point);
        if (features.length > 0) {
            console.log(features);
        }
    });
});