var globalScene;
var gl;
var canvas;
// ************** Init OpenGL Context etc. ************* 

function initGL() 
   {
   try 
      {
      gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
      } 
   catch (e) 
      {}
   if (!gl) 
      {
      alert("Could not initialise WebGL, sorry :-(");
      }
   }

 function drawScene() 
   {
   // you can declare multiple panel by call it many times
   gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   globalScene.OnRender();

   }

function tick() 
   {
   requestAnimFrame( tick );
   controller.OnUpdate();
   drawScene();
   }

var controller;
var controllingNode;
//var torsoCuboid;


function CreateButton( node, btnText )
   {
   var container = document.getElementById( 'ControlOption' );

   var button = document.createElement( "input" );
   button.type = "button";
   button.value = btnText;
   button.onclick = function(){ controllingNode = node };
   container.appendChild( button );
   }

function CreateCamerControlButtons()
   {
   var container = document.getElementById( 'CameraControlOption' );

   var button = document.createElement( "input" );
   button.type = "button";
   button.value = "Move Forward";
   button.onclick = function(){  globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0, 0.5 ) ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Move Backward";
   button.onclick = function(){  globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0, -0.5 ) ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Move Left";
   button.onclick = function(){  globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0.5, 0, 0 ) ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Move Right";
   button.onclick = function(){  globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( -0.5, 0, 0 ) ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Move Up";
   button.onclick = function(){  globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0.5, 0 ) ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Move Down";
   button.onclick = function(){  globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, -0.5, 0 ) ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Look Left";
   button.onclick = function(){  globalScene.CameraNode.LocalTransform.RotateToWorldRad( 0.05, g_Up3v ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Look Right";
   button.onclick = function(){  globalScene.CameraNode.LocalTransform.RotateToWorldRad( -0.05, g_Up3v ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Look Up";
   button.onclick = function(){ globalScene.CameraNode.LocalTransform.RotateFromWorldRad( -0.05, g_Left3v ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Look Down";
   button.onclick = function(){  globalScene.CameraNode.LocalTransform.RotateFromWorldRad( 0.05, g_Left3v ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Look Clockwise";
   button.onclick = function(){ globalScene.CameraNode.LocalTransform.RotateFromWorldRad( -0.05, g_Forward3v ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Look Counter Clockwise";
   button.onclick = function(){  globalScene.CameraNode.LocalTransform.RotateFromWorldRad( 0.05, g_Forward3v ) };
   container.appendChild( button );
   }

var floor;

function webGLStart() 
   {
   globalScene = new Scene();
   canvas = document.getElementById("WebGL-canvas");
   canvasDimension = vec2.fromValues( canvas.width, canvas.height );
   
   controller = new RobotController();
   document.onkeydown = ( controller.OnKeyDown ).bind( controller );
   document.onkeyup = ( controller.OnKeyUp ).bind( controller );
   canvas.onmousemove = ( controller.OnMouseMove ).bind( controller );
   canvas.onmousedown = ( controller.OnMouseBottonDown ).bind( controller );
   canvas.onmouseup = ( controller.OnMouseBottonUp ).bind( controller );
   canvas.onmouseleave = ( controller.ClearMouseBottonState ).bind( controller );
  
   // Create robot hierarchy nodes
   var torsoCuboid = new CuboidSceneNode( vec3.fromValues( 1, 1, 1 ) );
   torsoCuboid.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, 2, 0 ) );
   controllingNode = torsoCuboid;
   CreateButton( torsoCuboid, "Torso" );

   var rightLegCuboid = new CuboidSceneNode( vec3.fromValues( 0.3, 1, 0.3 ) );
   rightLegCuboid.LocalTransform.SetToWorldPosition( vec3.fromValues( -0.5, -1, 0 ) );
   torsoCuboid.AddChild( rightLegCuboid );
   CreateButton( rightLegCuboid, "Right Leg" );

   var leftLegCuboid = new CuboidSceneNode( vec3.fromValues( 0.3, 1, 0.3 ) );
   leftLegCuboid.LocalTransform.SetToWorldPosition( vec3.fromValues( 0.5, -1, 0 ) );
   torsoCuboid.AddChild( leftLegCuboid );
   CreateButton( leftLegCuboid, "Left Leg" );

   var rightHandCuboid = new CuboidSceneNode( vec3.fromValues( 1, 0.3, 0.3 ) );
   rightHandCuboid.LocalTransform.SetToWorldPosition( vec3.fromValues( -1, 0, 0 ) );
   torsoCuboid.AddChild( rightHandCuboid );
   CreateButton( rightHandCuboid, "Right Upper Hand" );

   var rightLowerHandCuboid = new CuboidSceneNode( vec3.fromValues( 0.3, 0.5, 0.3 ) );
   rightLowerHandCuboid.LocalTransform.SetToWorldPosition( vec3.fromValues( -0.35, -0.4, 0 ) );
   rightHandCuboid.AddChild( rightLowerHandCuboid );
   CreateButton( rightLowerHandCuboid, "Right Lower Hand" );

   var leftHandCuboid = new CuboidSceneNode( vec3.fromValues( 1, 0.3, 0.3 ) );
   leftHandCuboid.LocalTransform.SetToWorldPosition( vec3.fromValues( 1, 0, 0 ) );
   torsoCuboid.AddChild( leftHandCuboid );
   CreateButton( leftHandCuboid, "Left Upper Hand" );

   var leftLowerHandCuboid = new CuboidSceneNode( vec3.fromValues( 0.3, 0.5, 0.3 ) );
   leftLowerHandCuboid.LocalTransform.SetToWorldPosition( vec3.fromValues( 0.35, -0.4, 0 ) );
   leftHandCuboid.AddChild( leftLowerHandCuboid );
   CreateButton( leftLowerHandCuboid, "Left Lower Hand" );

   var headPyramidic = new PyramidicSceneNode( vec3.fromValues( 0.5, 0.5, 0.5 ) );
   headPyramidic.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, 0.7, 0 ) );
   torsoCuboid.AddChild( headPyramidic );
   CreateButton( headPyramidic, "Head" );

  // globalScene.AddSceneNode( torsoCuboid );

   globalScene.AddSceneNode( globalScene.CameraNode );

   var sphererNode = new SphereSceneNode( 3, 20 );
   sphererNode.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, 7, 13 ) );
  // globalScene.AddSceneNode( sphererNode );
   
   var culinderNode = new CylinderSceneNode( 3, 5, 20 );
   culinderNode.LocalTransform.SetToWorldPosition( vec3.fromValues( 10, 7, 13 ) );
  // globalScene.AddSceneNode( culinderNode );

   floor = new CuboidSceneNode( vec3.fromValues( 30, 0.5, 30 ) );
   floor.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, -1, 0 ) );
   floor.AddChild( torsoCuboid );
   floor.AddChild( sphererNode );
   floor.AddChild( culinderNode );
   globalScene.AddSceneNode( floor );

   CreateCamerControlButtons();

   initGL();

   globalScene.OnRestore();

   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.enable( gl.CULL_FACE );
   gl.cullFace( gl.BACK );
   gl.enable(gl.DEPTH_TEST);
   gl.depthFunc(gl.LESS);

   tick();
   }


