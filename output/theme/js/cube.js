var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x0000ee );
document.body.appendChild( renderer.domElement );

//Define the coordinates of where the box is loaded in space
var boxSpace = {x:1, y:1, z:1};

// Define box Geometry
var geometry = new THREE.BoxGeometry( boxSpace.x, boxSpace.y, boxSpace.z);

// Define box Material
var material = new THREE.MeshPhongMaterial( { color: 0x0000ee, specular: 0x111111 } );
//var material = new THREE.MeshNormalMaterial( { color: 0x0000ee, specular: 0x222222 } );
//var material = new THREE.LineBasicMaterial( { color: 0x0000ee, linewidth: 20  } );

// Insert make a new cube from geometry and material and add to scene

var cube = new THREE.Mesh( geometry, material );
var cube_right = new THREE.Mesh( geometry, material );
var cube_left = new THREE.Mesh( geometry, material );
var cube_top = new THREE.Mesh( geometry, material );
var cube_bottom = new THREE.Mesh( geometry, material );

var cube_top_right = new THREE.Mesh( geometry, material );
var cube_bottom_right = new THREE.Mesh( geometry, material );

var cube_top_left = new THREE.Mesh( geometry, material );
var cube_bottom_left = new THREE.Mesh( geometry, material );

scene.add( cube );
scene.add( cube_right );
scene.add( cube_left );

scene.add( cube_top);
scene.add( cube_top_right);
scene.add( cube_top_left);

scene.add( cube_bottom );
scene.add( cube_bottom_right );
scene.add( cube_bottom_left );

// Add a soft ambien light to the scene
var lighting = new THREE.AmbientLight( 0x909090 ); // soft white light
scene.add(lighting)

camera.position.z = 2;

var cube_distance = 1.2;

cube_top.position.y += cube_distance;
cube_bottom.position.y -= cube_distance;
cube_right.position.x += cube_distance;
cube_left.position.x -= cube_distance;

cube_top_right.position.x += cube_distance;
cube_top_right.position.y += cube_distance;

cube_top_left.position.x -= cube_distance;
cube_top_left.position.y += cube_distance;

cube_bottom_right.position.x += cube_distance;
cube_bottom_right.position.y -= cube_distance;

cube_bottom_left.position.x -= cube_distance;
cube_bottom_left.position.y -= cube_distance;


//Add directional light and point at cube
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
//Point light at cube
directionalLight.position.set( boxSpace.x, boxSpace.y, boxSpace.z );
scene.add( directionalLight );
window.addEventListener( 'resize', onWindowResize, false );


var rotation_speed = {x : 0.0098, y : 0.0121, z : 0.00103 };
var rotation_speed2 = {x : 0.0088, y : 0.0021, z : 0.00013 };


function rotateCube(obj, x_speed, y_speed, z_speed){
  obj.rotation.x += x_speed;
  obj.rotation.y += y_speed;
  obj.rotation.z += z_speed;
}

function render() {
  requestAnimationFrame( render );

  rotateCube(cube, rotation_speed.x, rotation_speed.y, rotation_speed.z);
  rotateCube(cube_right, rotation_speed.x, rotation_speed.y, rotation_speed.z);
  rotateCube(cube_left, rotation_speed.x, rotation_speed.y, rotation_speed.z);
  rotateCube(cube_top, rotation_speed.x, rotation_speed.y, rotation_speed.z);
  rotateCube(cube_bottom, rotation_speed.x, rotation_speed.y, rotation_speed.z);
  rotateCube(cube_top_left, rotation_speed.x, rotation_speed.y, rotation_speed.z);
  rotateCube(cube_top_right, rotation_speed.x, rotation_speed.y, rotation_speed.z);
  rotateCube(cube_bottom_left, rotation_speed.x, rotation_speed.y, rotation_speed.z);
  rotateCube(cube_bottom_right, rotation_speed.x, rotation_speed.y, rotation_speed.z);

  if (camera.position.z <= 10){
    camera.position.z += .0029;
  }

  renderer.render( scene, camera );
}


function switchColor(obj, color1, color2){
    if (obj.material.color.getHex().toString(16) === color1 ){
      obj.material.color.setHex(color2);
    }
    else if (obj.material.color.getHex().toString(16) === color2 )  {
      obj.material.color.setHex(color1);
    }
    else {
      console.log('Color is ' + obj.material.getHex().toString(16));
    }
}

function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
  }

render();

