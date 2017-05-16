require("./GLMap.js")

function EchartsLayer(option) {
    this.option = Object.assign({},option,{map:null});

    let map = option.map;
    var mapContainer = map.getCanvasContainer()
    this._container = document.createElement('div')
    this._container.style.width = map.getCanvas().style.width
    this._container.style.height = map.getCanvas().style.height
    this.chartId = 'echarts' + Math.random();
    this._container.setAttribute('id', this.chartId);
    this._container.setAttribute('class', 'echartMap')
    this._map = map
    mapContainer.appendChild(this._container)
    this.chart = echarts.init(this._container);
    echarts.glMap = map
    this.resize()
}
EchartsLayer.prototype.remove = function () {
    this._container.parentNode.removeChild(this._container)
    this._map = undefined
}
EchartsLayer.prototype.resize = function () {
    var me = this
    window.onresize = function () {
        me._container.style.width = me._map.getCanvas().style.width
        me._container.style.height = me._map.getCanvas().style.height
        me.chart.resize()
    }
}
EchartsLayer.prototype.getChartId = function () {
    return this.chartId;
}
EchartsLayer.prototype.dispose = function () {
    this.chart.dispose();
}
EchartsLayer.name = 'EchartsLayer';
module.exports = EchartsLayer;
