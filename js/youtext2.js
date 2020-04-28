var orbit;

// once everything is loaded, we run our Three.js stuff.
function init() {

    // var stats = initStats();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();
    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // create a render and set the size
    var webGLRenderer = new THREE.WebGLRenderer({
        alpha: true
    });
    // webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    webGLRenderer.setClearAlpha(0.0);
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

    var shape = createMesh(new THREE.ShapeGeometry(drawShape()));
    // add the sphere to the scene
    scene.add(shape);


    
// var axes = new THREE.AxisHelper(30);
// scene.add(axes);



    // position and point the camera to the center of the scene
    camera.position.set(0, -10, 60);

    // camera.lookAt(new THREE.Vector3(60, -60, 0));

    var spotLight = new THREE.DirectionalLight(0xffffff);
    spotLight.intensity = 1;
    spotLight.position.set(0, -10, 20); //设置光源的位置
    // spotLight.castShadow = true; //开启THREE的阴影功能，设置这个白色光源有投射出阴影的功能
    // spotLight.shadow.mapSize = new THREE.Vector2(1024,1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40; //通过设置阴影

    spotLight.target = shape;

    scene.add(spotLight);

    // add the output of the renderer to the html element
    document.getElementById("webgl-output").appendChild(webGLRenderer.domElement);

    // orbit = new THREE.OrbitControls(camera, webGLRenderer.domElement);

    // call the render function
    var step = 0;


    // setup the control gui
    var controls = new function () {

        this.amount = 1;
        this.bevelThickness = 2;
        this.bevelSize = 0.5;
        this.bevelEnabled = true;
        this.bevelSegments = 50;
        this.bevelEnabled = true;
        this.curveSegments = 100;
        this.steps = 1;

        this.asGeom = function () {
            // remove the old plane
            scene.remove(shape);
            // create a new one

            var options = {
                amount: controls.amount,
                bevelThickness: controls.bevelThickness,
                bevelSize: controls.bevelSize,
                bevelSegments: controls.bevelSegments,
                bevelEnabled: controls.bevelEnabled,
                curveSegments: controls.curveSegments,
                steps: controls.steps
            };

            shape = createMesh(new THREE.ExtrudeGeometry(drawShape(), options));
            // add it to the scene.
            // shape.position.x = 20;
            // shape.position.y = 0;
            // shape.position.z = 2;
            scene.add(shape);
        };

    };

    // var gui = new dat.GUI();
    // // gui.add(controls, 'amount', 0, 20).onChange(controls.asGeom);
    // // gui.add(controls, 'bevelThickness', 0, 10).onChange(controls.asGeom);
    // // gui.add(controls, 'bevelSize', 0, 10).onChange(controls.asGeom);
    // // gui.add(controls, 'bevelSegments', 0, 30).step(1).onChange(controls.asGeom);
    // // gui.add(controls, 'bevelEnabled').onChange(controls.asGeom);
    // // gui.add(controls, 'curveSegments', 1, 30).step(1).onChange(controls.asGeom);
    // // gui.add(controls, 'steps', 1, 5).step(1).onChange(controls.asGeom);

    controls.asGeom();
    render();

    function drawShape() {


        var svgString = document.querySelector(".st0").getAttribute("d");

        var shape = transformSVGPathExposed(svgString);

        // return the shape
        return shape;
    }

    function createMesh(geom) {

        // geom.applyMatrix(new THREE.Matrix4().makeTranslation(-390, -74, 0));


        // assign two materials
        var meshMaterial = new THREE.MeshNormalMaterial({
            transparent: true,
            opacity: 0.9
        });
        var mesh = new THREE.Mesh(geom, meshMaterial);
        mesh.scale.x = 0.1;
        mesh.scale.y = 0.1;

        mesh.rotation.z = Math.PI;

        // mesh.applyMatrix(new THREE.Matrix4().makeScale(0.05,0.05,0.05));
        // mesh.center();
        // mesh.rotation.x = -1.1;
        return mesh;
    }


    function render() {
        // stats.update();
        shape.rotation.y += 0.005;
        // orbit.update();
        // render using requestAnimationFrame
        requestAnimationFrame(render);
        webGLRenderer.render(scene, camera);
    }
}