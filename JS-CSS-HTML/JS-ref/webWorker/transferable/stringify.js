var APP = {};

function getArrayBuffer(num = 1000 * 1000) {
    // var uInt8Array = new Uint8Array(new ArrayBuffer(num));
    // let temp = { "status": 0, "message": null, "data": { "route": [{ "points": [[114.376616, 30.610987], [114.376616, 30.610997], [114.376626, 30.611067], [114.376636, 30.611107], [114.377308, 30.61147], [114.377408, 30.611379], [114.377478, 30.611389], [114.37817, 30.611742], [114.378311, 30.61155], [114.378411, 30.611379]], "pixels": [[152, 87], [153, 87], [154, 88], [154, 88], [156, 89], [154, 90]], "distance": 231.73274954845, "distances": [13.495242512757, 76.012512921924, 18.616276005024, 77.068392009397, 46.540326099347] }, { "points": [[114.378411, 30.611379], [114.377739, 30.611066], [114.376685, 30.610566], [114.376475, 30.610458], [114.375793, 30.610124], [114.374098, 30.609257]], "pixels": [[154, 90], [145, 83]], "distance": 475.9700526234, "distances": [475.9700526234] }, { "points": [[114.374098, 30.609257], [114.373878, 30.609488]], "pixels": [[145, 83], [146, 82]], "distance": 33.249632960347, "distances": [33.249632960347] }, { "points": [[114.373878, 30.609488], [114.373708, 30.609729]], "pixels": [[146, 82], [147, 82]], "distance": 31.385043905195, "distances": [31.385043905195] }, { "points": [[114.373708, 30.609729], [114.373468, 30.610041], [114.373378, 30.610222], [114.373058, 30.610794], [114.372818, 30.611235], [114.372658, 30.611466], [114.371968, 30.61267], [114.371918, 30.612761], [114.371878, 30.612851], [114.371758, 30.613002], [114.371738, 30.613032], [114.371638, 30.613182], [114.370749, 30.614687], [114.370669, 30.614777], [114.370499, 30.615098], [114.370419, 30.615278], [114.369899, 30.61624], [114.369769, 30.61645], [114.36911, 30.617593], [114.36901, 30.617793], [114.36886, 30.618013], [114.36885, 30.618043], [114.36847, 30.618714], [114.368101, 30.619365], [114.367551, 30.620336], [114.367252, 30.620866], [114.367102, 30.621146]], "pixels": [[147, 82], [168, 77], [195, 71]], "distance": 1419.9345472991, "distances": [632.88773417711, 787.046813122] }, { "points": [[114.367102, 30.621146], [114.365591, 30.619976]], "pixels": [[195, 71], [190, 69]], "distance": 194.71980232861, "distances": [194.71980232861] }, { "points": [[114.365591, 30.619976], [114.365391, 30.619816], [114.364701, 30.619285], [114.363811, 30.618643], [114.362971, 30.61796], [114.362951, 30.61794], [114.362861, 30.61787], [114.362671, 30.617719], [114.362621, 30.617679]], "pixels": [[190, 69], [180, 64]], "distance": 382.53861631364, "distances": [382.53861631364] }] } };
    let temp = 1;
    let list = [];
    for (var i = 0; i < num; ++i) {
        list.push(temp);
    }
    return list;
}

onmessage = function (e) {
    let cnt = 0;
    if (e.data.cnt) {
        cnt = e.data.cnt;
    }
    let t = new Date().valueOf();
    postMessage({
        time: t,
    });
    let list = getArrayBuffer(cnt);
    let t2 = new Date().valueOf();
    // console.log('getData:', list.length, t2 - t)
    // postMessage({ type: 'string', data: list });
    postMessage({ type: 'string', data: JSON.stringify(list) });
};

//close();