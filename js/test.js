function init(){
    var scene = new THREE.Scene(); //创建一个场景对象
    // scene.background = new THREE.Color( 0xF1F1F1 );
    var camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight, 0.1, 1000); //创建一个相机对象，相机决定了能够在场景中看到什么
    var renderer  = new THREE.WebGLRenderer( { alpha: true });//创建一个渲染器
    renderer.setClearAlpha(0.0);
    // renderer.setClearColor(new THREE.Color(0xF1F1F1));//将场景的背景颜色渲染为接近黑色
    renderer.setSize(window.innerWidth,window.innerHeight);//将场景的大小渲染为屏幕大小
    renderer.shadowMap.Enabled = true; //Three.js中默认不会渲染阴影效果，添加这个属性后可以进行渲染

    var axes = new THREE.AxesHelper(30); //创建一个坐标轴对象，设置轴线的粗细值为20
    scene.add(axes); //调用scene.add()方法，将坐标轴添加到场景中

    var planeGeometry = new THREE.PlaneGeometry(60,20); //创建一个平面，并且定义它的大小，宽度设置为60，高度设置为20
    var planeMaterial = new THREE.MeshPhysicalMaterial({ //定义这个平面的外观，其中可以包括这个平面的颜色和透明度
        color:0xAAAAAA  //颜色可以是16进制也可以是颜色名字符串
    });
    var plane = new THREE.Mesh(planeGeometry,planeMaterial) //创建一个Mesh对象，将平面的大小和外观的组合进去
    plane.rotation.x = -0.5 * Math.PI //围绕x轴旋转平面90°
    plane.position.set(15,0,0); //设置平面在场景中的位置
    plane.receiveShadow = true; //设置平面可以接受物体的阴影
    scene.add(plane); //将平面添加到场景中去

    var cubeGeometry = new THREE.CubeGeometry(4,4,4) //创建一个立方体对象，定义它的长宽高都是4
    var cubeMaterial = new THREE.MeshLambertMaterial({  //使用基本材质（MeshBasicMaterial）对光源不会产生任何效果
        color:"red",
        // wireframe:true //需要将线框属性设置为true，这样物体就不会被渲染为实体物体 
    })
    var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    cube.position.set(-4,3,0); //设置立方体在场景中的位置
    cube.castShadow = true; //设置立方体可以投射出阴影
    scene.add(cube); //将立方体对象添加到场景中

    var sphereGeometry = new THREE.SphereGeometry(4,20,20) //创建一个球体对象，定义大小
    var sphereMaterial = new THREE.MeshBasicMaterial({ //定义这个球体的外观
        color:'blue',
        // wireframe:true
    })
    var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial); //将大小和外观组合进Mesh对象中，并赋值给球体变量
    sphere.position.set(20,4,2) //设置该球体在场景中的位置
    sphere.castShadow = true; //设置球体可以投射出阴影
    scene.add(sphere) //将球体对象添加到场景中

    var spotLight = new THREE.SpotLight(0xFFFFFF) //定义一个白色的光源
    spotLight.position.set(-40,40,-15);//设置光源的位置
    spotLight.castShadow = true; //开启THREE的阴影功能，设置这个白色光源有投射出阴影的功能
    spotLight.shadow.mapSize = new THREE.Vector2(1024,1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;//通过设置阴影的这三个属性，来控制阴影的精细程度

    camera.position.set(-30,40,30);//设置摄像机的位置
    camera.lookAt(scene.position); //设置摄像机指向的位置，默认的位置是（0，0，0）

    document.getElementById("webgl-output").appendChild(renderer.domElement);
    renderer.render(scene,camera) //告诉渲染器用指定的摄像机来渲染场景
}