# Coronavirus-2019-demo

相关文章： [从地图看疫情](https://www.zhuwenlong.com/blog/article/5e5235cd502a71323370c652)

## 1. 项目背景

## 2. 各图层教程

### 2.1 热力图

要点: `热力图的绘制原理`，Mapbox官方热力图图层的实现以及`热力参数调优`，`热力图配色`。

#### 参考资源：
* 热力图绘制原理 https://cdn.zhuwenlong.com/demos/heatmap.html
* Mapbox热力图图层官方文档 https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#heatmap
* 调优前的热力图图层 https://zmofei.github.io/coronavirus-2019-demo/src/heatmap/heatmap-origin.html
* 调优后的热力图图层  https://zmofei.github.io/coronavirus-2019-demo/src/heatmap/heatmap-optimized.html

![](docs/color.jpg)

### 2.2 填色图

要点：Mapbox中实现填色图层，`Mapbox Expressoion` 的使用

### 2.3 聚合图

要点：Mapbox数据的聚合功能, `cluster: true`
* 调优前的热力图图层 https://zmofei.github.io/coronavirus-2019-demo/src/colorfill/colorfill-origin.html
* 调优后的热力图图层  https://zmofei.github.io/coronavirus-2019-demo/src/colorfill/colorfill-optimized.html
* Mapbox Geojson Source https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#geojson
* Mapbox 官方集合图层DEMO https://docs.mapbox.com/mapbox-gl-js/example/cluster/

### 2.4 分类聚合

要点：Mapbox自定义复杂SVG图标，


Mapbox自定义图层

## 3. Q&A