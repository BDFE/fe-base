function init(id, width = 1200, height = 800, bgColor = '#ccc') {
    let canvas = document.getElementById(id);
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height)
    return ctx;
}

function addElements(elements, cb) {
    let list = [];
    for (let e of elements) {
        switch (e.type) {
            case 'Dot':
                {
                    let dot = new Dot(e.x, e.y, e.radius, e.color);
                    list.push(dot);
                    break;
                }
            case 'Line':
                {
                    let l = new Line(e.x, e.y, e.toX, e.toY, e.lineWidth, e.color, e.options);
                    list.push(l);
                    break;
                }
            case 'ImageIcon':
                {
                    let image = new Image(); // Create a new blank image.
                    image.crossOrigin = "";
                    image.src = e.src;
                    image.onload = function () {
                        let l = new ImageIcon(image, e.x, e.y, e.width, e.height, e.color, );
                        list.push(l);
                        cb && cb()
                    }
                    break;
                }
        }
    }
    return list;
}