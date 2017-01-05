var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x0000aa );
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
scene.add( cube );
scene.add( cube );

// Add a soft ambien light to the scene
var lighting = new THREE.AmbientLight( 0x303030 ); // soft white light
scene.add(lighting)

camera.position.z = 2;


/* Load cone as a JSONLoader file (converted from DAE) */
/*
var cone = new THREE.JSONLoader();
cone.load(
    'cone.json',
    function (geometry, materials)
    {
      var material = new THREE.MeshFaceMaterial(materials);
      var object = new THREE.Mesh(geometry, materials);
      scene.add( object );
    }
  )
*/

//Add directional light and point at cube
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
//Point light at cube
directionalLight.position.set( boxSpace.x, boxSpace.y, boxSpace.z );
scene.add( directionalLight );

function render() {
  requestAnimationFrame( render );

  cube.rotation.x += 0.0098;
  cube.rotation.y += 0.0121;
  cube.rotation.z += 0.00103;

  //camera.rotation.z += 0.0003;
  //camera.rotation.x += 0.00003;

  renderer.render( scene, camera );
}
render();

