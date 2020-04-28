function init() {
    // use the defaults
    var renderer = initRenderer();
    // renderer.setClearAlpha(0);
    // renderer.setSize(window.innerWidth,window.innerHeight);//将场景的大小渲染为屏幕大小
    // renderer.shadowMap.Enabled = true; //Three.js中默认不会渲染阴影效果，添加这个属性后可以进行渲染
    // renderer.setClearAlpha(0.01);
    var camera = initCamera();
    camera.position.set(-10,12,10);
    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xa0a0a0 );
    // initDefaultLighting(scene);
    camera.lookAt(scene.position); 

    var axes = new THREE.AxesHelper(30);
    scene.add(axes)
    var groundPlane = addLargeGroundPlane(scene)
    groundPlane.position.y = -30;
  
    // call the render function
    var step = 0;
  
    // setup the control gui
    var controls = new function () {
  
      this.appliedMaterial = applyMeshNormalMaterial
      this.castShadow = true;
      this.groundPlaneVisible = true;
  
      this.amount = 40;
      this.bevelThickness = 10;
      this.bevelSize = 0.5;
      this.bevelSegments = 25;
      this.bevelEnabled = false;
      this.curveSegments = 30;
      this.steps = 1;
  
      // redraw function, updates the control UI and recreates the geometry.
      this.redraw = function () {
        redrawGeometryAndUpdateUI(gui, scene, controls, function() {
          var options = {
            amount: controls.amount,
            bevelThickness: controls.bevelThickness,
            bevelSize: controls.bevelSize,
            bevelSegments: controls.bevelSegments,
            bevelEnabled: controls.bevelEnabled,
            curveSegments: controls.curveSegments,
            steps: controls.steps
          };
    
          var geom = new THREE.ExtrudeGeometry(drawShape(), options)
          geom.applyMatrix(new THREE.Matrix4().makeScale(0.05,0.05,0.05));
          geom.center();
  
          return geom
        });
      };
    };
  
    var gui = new dat.GUI();
    // gui.add(controls, 'amount', 0, 20).onChange(controls.redraw);
    // gui.add(controls, 'bevelThickness', 0, 10).onChange(controls.redraw);
    // gui.add(controls, 'bevelSize', 0, 10).onChange(controls.redraw);
    // gui.add(controls, 'bevelSegments', 0, 30).step(1).onChange(controls.redraw);
    // gui.add(controls, 'bevelEnabled').onChange(controls.redraw);
    // gui.add(controls, 'curveSegments', 1, 30).step(1).onChange(controls.redraw);
    // gui.add(controls, 'steps', 1, 5).step(1).onChange(controls.redraw);
  
  
    // add a material section, so we can switch between materials
    // gui.add(controls, 'appliedMaterial', {
    //   meshNormal: applyMeshNormalMaterial, 
    //   meshStandard: applyMeshStandardMaterial
    // }).onChange(controls.redraw)
    
    // gui.add(controls, 'castShadow').onChange(function(e) {controls.mesh.castShadow = e})
    // gui.add(controls, 'groundPlaneVisible').onChange(function(e) {groundPlane.material.visible = e})
  
    function drawShape() {
  
      var svgString = document.querySelector(".st0").getAttribute("d");
  
      var shape = transformSVGPathExposed(svgString);
  
      // return the shape
      return shape;
    }
  
    var step = 0;
    controls.redraw();
    render();
    
    function render() {
    //   stats.update();
      controls.mesh.rotation.y = step+=0.005
      controls.mesh.rotation.x = 0
      controls.mesh.rotation.z = 3
  
      // render using requestAnimationFrame
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
  }