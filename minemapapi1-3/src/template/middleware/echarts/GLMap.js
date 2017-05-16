/**
 * GLMap component extension
 */
if(window.echarts){
    echarts.registerCoordinateSystem(
        'GLMap', require('./GLMapCoordSys')
    )
    require('./GLMapModel')
    require('./GLMapView')

// Action
    echarts.registerAction({
        type: 'GLMapRoam',
        event: 'GLMapRoam',
        update: 'updateLayout'
    }, function (payload, ecModel) {
    })
}

module.exports = {
    version: '1.0.0'
}


