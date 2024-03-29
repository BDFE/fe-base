function createAodiScene(a, e) {
    e[0] = getMaterial("model/audi/car_audi_a6l_cheshen"), e[1] = getMaterial("model/audi/car_audi_a6l_jinshu"), e[1].bumpMap = texture, e[1].bumpScale = .3, e[2] = getMaterial("model/audi/car_audi_a6l_chedeng"), e[3] = getMaterial("model/audi/car_audi_a6l_zuoyi"), e[4] = getMaterial("model/audi/car_audi_a6l_chemen"), e[5] = new THREE.MeshPhongMaterial({
        envMap: texture
    }), e[6] = getMaterial("model/audi/car_audi_a6l_cheding"), e[7] = new THREE.MeshPhongMaterial({
        opacity: .7,
        transparent: !0,
        color: 16777215,
        envMap: texture
    }), e[8] = getMaterial("model/audi/car_audi_a6l_cheshen"), e[9] = getMaterial("model/audi/car_audi_a6l_zhongkong"), e[10] = new THREE.MeshPhongMaterial({
        opacity: .07,
        transparent: !0,
        color: 0
    }), e[11] = getMaterial("model/audi/car_part_jiaodian_c1"), e[12] = getMaterial("model/audi/car_part_jiaodianhuanbian_c2"), e[13] = getMaterial("model/audi/car_audi_a6l_cheqiandeng"), e[13].bumpMap = texture, e[13].bumpScale = .2, e[14] = new THREE.MeshPhongMaterial({
        opacity: .2,
        transparent: !0,
        color: 16777215,
        envMap: texture
    }), e[15] = getMaterial("model/audi/car_audi_a6l_luntai"), e[15].bumpMap = texture, e[15].bumpScale = .2, e[16] = getMaterial("model/audi/car_audi_a6l_fangxiangpan"), e[16].bumpMap = texture, e[16].bumpScale = .2, e[17] = getMaterial("model/audi/car_audi_a6l_cheshen"), e[18] = getMaterial("model/audi/car_audi_a6l_cheshen"), e[19] = getMaterial("model/audi/car_audi_a6l_lungu92"), e[19].bumpMap = texture, e[19].bumpScale = .2, e[20] = getMaterial("model/audi/car_audi_a6l_cheshen"), e[21] = getMaterial("model/audi/car_audi_a6l_cheshen"), carbody = e[17], carcheding = e[21], carmenbashou = e[20], carhoushijing = e[18], carlugu = e[19], carzuoyi = e[3], carMesh = new THREE.Mesh(a, new THREE.MultiMaterial(e)), carMesh.position.set(0, -40, 0), carMesh.castShadow = !0, scene.add(carMesh)
}

function createBaomaScene(a, e) {
    for (var r = 0; r < e.length; r++) texture = THREE.ImageUtils.loadTexture("model/BMW/" + e[r].name + ".jpg"), e[r] = getMaterial("model/BMW/" + e[r].name);
    e[1] = new THREE.MeshPhongMaterial({
        opacity: .7,
        transparent: !0,
        envMap: textureCube
    }), e[3] = new THREE.MeshPhongMaterial({
        opacity: .5,
        transparent: !0,
        envMap: textureCube
    }), e[4] = new THREE.MeshPhongMaterial({
        envMap: textureCube
    }), e[5].bumpMap = THREE.ImageUtils.loadTexture("model/BMW/BMW_x5_jinshu.jpg"), e[5].bumpScale = .4, e[8] = new THREE.MeshPhongMaterial({
        envMap: texture,
        side: THREE.DoubleSide
    }), e[9].bumpMap = THREE.ImageUtils.loadTexture("model/BMW/BMW_x5_fangxiangpan.jpg"), e[9].bumpScale = .3, e[11] = new THREE.MeshPhongMaterial({
        opacity: .8,
        transparent: !0,
        color: 0,
        envMap: texture
    }), e[14].bumpMap = THREE.ImageUtils.loadTexture("model/BMW/BMW_x5_lungu2.jpg"), e[14].bumpScale = .2, carbody = e[10], carcheding = e[16], carmenbashou = e[15], carhoushijing = e[17], carlugu = e[14], carzuoyi = e[0], carMesh = new THREE.Mesh(a, new THREE.MultiMaterial(e))
}

function createKayanScene(a, e) {
    e[0] = getMaterial("model/Cayenne/car_kayan_yizi"), e[1] = getMaterial("model/Cayenne/car_kayan_chemen"), e[2] = new THREE.MeshPhongMaterial({
        opacity: .4,
        transparent: !0
    }), e[3] = getMaterial("model/Cayenne/car_kayan_jingshu"), e[4] = new THREE.MeshPhongMaterial({
        opacity: .8,
        transparent: !0,
        color: 16777215,
        side: THREE.DoubleSide,
        envMap: textureCube
    }), e[5] = getMaterial("model/Cayenne/car_kayan_zhongkong"), e[6] = getMaterial("model/Cayenne/car_kayan_chedeng"), e[6].bumpMap = texture, e[6].bumpScale = .03, e[7] = getMaterial("model/Cayenne/car_kayan_fangxiangpan"), e[8] = getMaterial("model/Cayenne/car_kayan_luntai"), e[9] = new THREE.MeshPhongMaterial({
        opacity: .7,
        transparent: !0,
        color: 0,
        envMap: texture
    }), e[10] = getMaterial("model/Cayenne/car_kayan_chesheng"), e[10].color = new THREE.Color(0), e[10].transparent = !0, e[10].opacity = .9, e[11] = getMaterial("model/Cayenne/car_kayan_chesheng"), e[12] = getMaterial("model/Cayenne/car_kayan_chegu2"), e[12].bumpMap = texture, e[12].bumpScale = .1, e[13] = getMaterial("model/Cayenne/car_kayan_chesheng"), e[14] = getMaterial("model/Cayenne/car_kayan_chesheng"), e[15] = getMaterial("model/Cayenne/car_kayan_chesheng"), carbody = e[11], carcheding = e[15], carmenbashou = e[14], carhoushijing = e[13], carlugu = e[12], carzuoyi = e[0], carMesh = new THREE.Mesh(a, new THREE.MultiMaterial(e)), carMesh.position.set(0, -40, 0), carMesh.castShadow = !0, scene.add(carMesh)
}

function createlandRoverScene(a, e) {
    e[0] = new THREE.MeshPhongMaterial({
        opacity: .8,
        transparent: !0,
        color: 16777215,
        envMap: textureCube
    }), e[1] = new THREE.MeshPhongMaterial({
        opacity: .8,
        transparent: !0,
        color: 16777215,
        envMap: textureCube
    }), e[2] = getMaterial("model/landRover/car_luhu_jinshucaizhi"), e[3] = getMaterial("model/landRover/car_luhu_zhongkong"), e[4] = getMaterial("model/landRover/car_luhu_jinshu"), e[4].bumpMap = texture, e[4].bumpScale = .3, e[5] = new THREE.MeshPhongMaterial({
        opacity: .7,
        transparent: !0,
        color: 16777215,
        envMap: texture
    }), e[6] = getMaterial("model/landRover/car_luhu_fsangxiangpan"), e[7] = getMaterial("model/landRover/car_luhu_cheshen"), e[8] = getMaterial("model/landRover/car_luhu_chedeng"), e[8].bumpMap = texture, e[8].bumpScale = .3, e[9] = getMaterial("model/landRover/car_luhu_cheshen"), e[10] = getMaterial("model/landRover/car_luhu_jinshu"), e[10].bumpMap = texture, e[10].bumpScale = .3, e[11] = getMaterial("model/landRover/car_luhu_chemen"), e[12] = new THREE.MeshPhongMaterial({
        opacity: .7,
        transparent: !0,
        color: 16777215,
        envMap: texture
    }), e[13] = getMaterial("model/landRover/car_luhu_cheshen"), e[14] = getMaterial("model/landRover/car_luhu_luntai"), e[14].bumpMap = texture, e[14].bumpScale = .2, e[15] = getMaterial("model/landRover/car_luhu_zuoyi"), e[16] = getMaterial("model/landRover/car_part_jiaodianhuanbian_c1"), e[17] = getMaterial("model/landRover/car_part_jiaodian_c1"), e[18] = getMaterial("model/landRover/car_tb_lhsx_c"), e[19] = new THREE.MeshPhongMaterial({
        opacity: .9,
        transparent: !0,
        color: 16777215,
        envMap: textureCube
    }), e[20] = getMaterial("model/landRover/car_luhu_cheshen"), e[21] = getMaterial("model/landRover/car_luhu_cheshen"), e[22] = getMaterial("model/landRover/car_luhu_lungu2"), e[23] = getMaterial("model/landRover/car_luhu_cheshen"), carbody = e[23], carcheding = e[7], carmenbashou = e[20], carhoushijing = e[13], carhoushijingx = e[21], carlugu = e[22], carzuoyi = e[3], carOther = e[2], carMesh = new THREE.Mesh(a, new THREE.MultiMaterial(e)), carMesh.position.set(0, -40, 0), carMesh.castShadow = !0, scene.add(carMesh)
}