var renderer, scene, camera, controls, airplane, mesh;
var directionSides = '';
var directionFront = '';
var directionUp = '';
var XXX = new THREE.Vector3(1,0,0);
var YYY = new THREE.Vector3(0,1,0);
var ZZZ = new THREE.Vector3(0,0,1);
var directXXX = '', directYYY = '', directZZZ = '';
// instantiate a loader

var cordX = 0, cordY = 0, cordZ = 0;
var cordrotX = 0, cordrotY = 0, cordrotZ = 0;

// load a resource
 
 var Colors = {
    red: 0x7A1D0A,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xF5986E,
    brownDark: 0x23190f,
    blue: 0x68c3c0,
    orange: 'rgb(251, 140, 0)',
    lightGreen: 'rgb(139, 195, 74)',
    green: 'rgb(175, 180, 43)'
};

var AirPlane = function() {
	
    this.mesh = new THREE.Mesh();
                
    // Create the cabin
    var geomCockpit = new THREE.SphereGeometry(40,50,60);
    var matCockpit = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
    var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);
          
    // Create the engine
    var geomEngine = new THREE.SphereGeometry(18, 50, 20, 0, Math.PI*2, 0, Math.PI);
    var matEngine = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
    var engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.z = -40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);
            
    // Create the tail
    var geomTailPlane = new THREE.SphereGeometry(5,20,15);
    var matTailPlane = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
    var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(0,25,35);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);
            
    // Create the wing
    var geomSideWing = new THREE.BoxGeometry(150,8,40);
    var matSideWing = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
    var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);
                
    // propeller
    var geomPropeller = new THREE.BoxGeometry(10,10,20);
    var matPropeller = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;
        
    // blades
    var geomBlade = new THREE.BoxGeometry(20,100,1);
    var matBlade = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});
    
    var blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(0,0,-8);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(0,0,-50);
    this.mesh.add(this.propeller);
    
};

function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    // scene
    scene = new THREE.Scene();
    // camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000000 );
    camera.position.set( 0, 0, 80 );
    // controls
    controls = new THREE.TrackballControls(camera, renderer.domElememnt);

    var axis = new THREE.AxisHelper(300);
    scene.add(axis);
    var grid = new THREE.GridHelper(30000, 200);
    var color = new THREE.Color("rgb(0,0,0)");
    grid.setColors(color, 0xffffff);
    scene.add(grid);

    addLight();
    
    airplane = new AirPlane();
    //airplane.mesh.scale.set(.25,.25,.25);
    //airplane.mesh.position.y = 100;
    //airplane.mesh.position.x = -100;
    
    scene.add(airplane.mesh);

}

    // render
function render() {
    renderer.render( scene, camera );
}

// animate
function animate() {

    requestAnimationFrame( animate );

    controls.update();
    render();

}
function addLight(){
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);

    directionalLight = new THREE.DirectionalLight(0xffffff, .9);

    directionalLight.position.set(150, 350, 350);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -400;
    directionalLight.shadow.camera.right = 400;
    directionalLight.shadow.camera.top = 400;
    directionalLight.shadow.camera.bottom = -400;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 1000;

    directionalLight.shadow.mapSize.width = 2048;
	directionalLight.shadow.mapSize.height = 2048;

    scene.add(hemisphereLight);  
	scene.add(directionalLight);
}

function addEventsLeftKey() {
    window.addEventListener('keydown', function(e) {
        if(e.keyCode == 37) {
            directionSides = 'left';
        }
    }, null);
    window.addEventListener('keyup', function(e) {
        directionSides = '';
    }, null);
}

function addEventsRightKey() {
    window.addEventListener('keydown', function(e) {
        if(e.keyCode == 39) {
            directionSides = 'right';
        }
    }, null);
    window.addEventListener('keyup', function(e) {
        directionSides = '';
    }, null);
}

function addEventsFrontKey() {
    window.addEventListener('keydown', function(e) {
        if(e.keyCode == 38) {
            directionFront = 'front';
        }
    }, null);
    window.addEventListener('keyup', function(e) {
        directionFront = '';
    }, null);
}

function addEventsBackKey() {
    window.addEventListener('keydown', function(e) {
        if(e.keyCode == 40) {
            directionFront = 'back';
        }
    }, null);
    window.addEventListener('keyup', function(e) {
        directionFront = '';
    }, null);
}

function addEventsUpKey() {
    window.addEventListener('keydown', function(e){
        if(e.keyCode == 32){
            directionUp = 'up';
        }
    }, null);
    window.addEventListener('keyup', function(e){
        directionUp = 'down'
    })
}

function addEventsYKeyLeft() {
    window.addEventListener('keydown', function(e){
        if(e.keyCode == 65){
            directYYY = 'YYY';
        }
    }, null);
    window.addEventListener('keyup', function(e){
        directYYY = '';
    })
}
function addEventsYKeyRight() {
    window.addEventListener('keydown', function(e){
        if(e.keyCode == 68){
            directYYY = 'YYYY';
        }
    }, null);
    window.addEventListener('keyup', function(e){
        directYYY = '';
    })
}
function addEventsXKeyLeft() {
    window.addEventListener('keydown', function(e){
        if(e.keyCode == 87){
            directXXX = 'XXX';
        }
    }, null);
    window.addEventListener('keyup', function(e){
        directXXX = '';
    })
}
function addEventsXKeyRight() {
    window.addEventListener('keydown', function(e){
        if(e.keyCode == 83){
            directXXX = 'XXXX';
        }
    }, null);
    window.addEventListener('keyup', function(e){
        directXXX = '';
    })
}

var positionAroundObjectAxis = function(object){
  
    object.geometry.computeBoundingBox();

    var boundingBox = object.geometry.boundingBox;

    position = new THREE.Vector3();
    position.subVectors( boundingBox.max, boundingBox.min );
    position.multiplyScalar( 0.5 );
    position.add( boundingBox.min );
    position.applyMatrix4( object.matrixWorld );

    object.geometry.applyMatrix( 
      new THREE.Matrix4()
        .makeTranslation( 
          -(position.x), 
          -(position.y), 
          -(position.z) 
        ));

    object.geometry.verticesNeedUpdate = true;

    object.position.x = position.x;
    object.position.y = position.y;
    object.position.z = position.z;
}



var positionWorldAxis = function(object, x, y, z) {
    object.geometry.computeBoundingBox();
    var boundingBox = object.geometry.boundingBox;

    position = new THREE.Vector3();
    position.subVectors( boundingBox.max, boundingBox.min );
    position.multiplyScalar( 0.5 );
    position.add( boundingBox.min );
    position.applyMatrix4( object.matrixWorld );

    object.geometry.applyMatrix( 
      new THREE.Matrix4().makeTranslation(position.x,position.y,position.z));

    object.geometry.verticesNeedUpdate = true;

    object.position.x = x;
    object.position.y = y;
    object.position.z = z;
    
    
    
    /*var rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.setPosition(axis);
    
    var currentPos = new THREE.Vector4(object.position.x, object.position.y, object.position.z, 1);
    var newPos = currentPos.applyMatrix4(rotWorldMatrix);

    //rotWorldMatrix.multiply(object.matrix);
    object.matrix = rotWorldMatrix;
    //object.rotation.setFromRotationMatrix(object.matrix);

    object.position.x = newPos.x;
    object.position.y = newPos.y;
    object.position.z = newPos.z;*/
};



function gameLoop(){
    
    if (directionSides == 'left') {
        airplane.mesh.position.x -= 3 + 100 * 0.002; 
        if(airplane.mesh.rotation.z < 0.15){
            airplane.mesh.rotation.z += .01;
        }
        else {
            airplane.mesh.rotation.y += 0.05;
        }
        if(directionFront == 'front'){
            airplane.mesh.position.z -= 3 + 100 * 0.002; 
        }
        if(directionFront == 'back'){
            airplane.mesh.position.z += 3 + 100 * 0.002;
        }
    }
    if (directionSides == 'right'){
        airplane.mesh.position.x += 3 + 100 * 0.002;
        if(airplane.mesh.rotation.z > -0.15)
            airplane.mesh.rotation.z -= .01;
        else {
            airplane.mesh.rotation.y -= 0.05;
        }
        if(directionFront == 'front'){
            airplane.mesh.position.z -= 3 + 100 * 0.002; 
        }
        if(directionFront == 'back'){
            airplane.mesh.position.z += 3 + 100 * 0.002;
        }
    } 
    
    if(directionFront == 'front'){
        airplane.mesh.position.z -= 3 + 100 * 0.002; 
        
        if(directionSides == 'left'){
            airplane.mesh.position.x -= 3 + 100 * 0.002; 
            if(airplane.mesh.rotation.z < 0.15)
                airplane.mesh.rotation.z += .01;
        }
        if(directionSides == 'right'){
            airplane.mesh.position.x += 3 + 100 * 0.002; 
            if(airplane.mesh.rotation.z > -0.15)
                airplane.mesh.rotation.z -= .01;
        }
    }
    
    
    if(directionFront == 'back'){
        airplane.mesh.position.z += 3 + 100 * 0.002; 
        if(directionSides == 'left'){
            airplane.mesh.position.x -= 3 + 100 * 0.002; 
            if(airplane.mesh.rotation.z < 0.15)
                airplane.mesh.rotation.z += .01;
        }
        if(directionSides == 'right'){
            airplane.mesh.position.x += 3 + 100 * 0.002;
            if(airplane.mesh.rotation.z > -0.15)
                airplane.mesh.rotation.z -= .01;
        }
    }
    
    if(directionUp == 'up'){
        airplane.mesh.position.y +=  2;
        if(directionFront == 'front' && airplane.mesh.rotation.x < 0.15){
               airplane.mesh.rotation.x += 0.1;
        }
    }
    if(directionUp == 'down' && airplane.mesh.position.y > 0){
        airplane.mesh.position.y -= 0.07;
        airplane.mesh.rotation.x = 0;
    }
    if(directYYY == 'YYY'){
        //airplane.mesh.rotation.y += 0.1;
        airplane.mesh.rotateOnAxis(YYY, 0.1);
    }
    if(directYYY == 'YYYY' ){
        //airplane.mesh.rotation.y -= 0.1;
        airplane.mesh.rotateOnAxis(YYY, -0.1);
    }
    if(directXXX == 'XXX'){
        //airplane.mesh.rotation.x += 0.1;
        airplane.mesh.rotateOnAxis(XXX, 0.1);
    }
    if(directXXX == 'XXXX' ){
        //airplane.mesh.rotation.x -= 0.1;
        airplane.mesh.rotateOnAxis(XXX, -0.1);
    }
    

    airplane.propeller.rotation.z += 100 * 0.002;
    
    
    //rotateAroundWorldAxis(airplane.mesh, YYY, 0.003);
    
    /*if (directionSides == 'left') {
        cordX -= 1;
        //airplane.mesh.rotateOnAxis(ZZZ, cordX);
        if(airplane.mesh.rotation.z < 0.15){
            cordrotZ += 0.01;
            airplane.mesh.rotateOnWorldAxis(ZZZ, cordrotZ);
        }
        else {
            cordrotY += 0.002
            airplane.mesh.rotateOnWorldAxis(YYY, cordrotY);
        }
    }
    
    if (directionSides == 'right'){
        cordX += 1;
        if(airplane.mesh.rotation.z > -0.15){
            cordrotZ -= 0.01;
            airplane.mesh.rotateOnAxis(ZZZ, cordrotZ);
        }
        /*else {
            cordrotY -= 0.002;
            airplane.mesh.rotateOnAxis(YYY, cordrotY);
        }
    } 
    if(directionFront == 'front'){
        cordZ -= 1;
    }  
    if(directionFront == 'back'){
        cordZ += 1;
    }
    if(directionUp == 'up'){
        cordY += 1;
    }
    if(directionUp == 'down'){
        cordY -= 0.02;
    }
    if(directionSides == '' && directionFront == '' && directionUp == 'down'){
        //cordX = 0;
        //cordZ = 0;
        //cordY = 0;
        cordrotZ = 0;
        //cordrotX = 0;
        cordrotY = 0;
    }
    
    positionWorldAxis(airplane.mesh, cordX, cordY, cordZ);*/
    
    
    requestAnimationFrame(gameLoop);
    
    
}

init();
animate();
addEventsLeftKey();
addEventsRightKey();
addEventsFrontKey();
addEventsBackKey();
addEventsUpKey();
addEventsYKeyLeft();
addEventsYKeyRight();
addEventsXKeyLeft();
addEventsXKeyRight();
gameLoop();