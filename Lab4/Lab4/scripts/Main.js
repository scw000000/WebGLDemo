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

var globalLight;

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
  
  // globalScene.AddSceneNode( torsoCuboid );

   globalScene.AddSceneNode( globalScene.CameraNode );
   
   var sphereNode = new SphereSceneNode( 3, 20, 20, vec4.fromValues( 1.0, 0.0, 0.0 ) );
   sphereNode.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, 0, 20 ) );
   globalScene.AddSceneNode( sphereNode );

   globalLight = new PointLightSceneNode( vec4.fromValues( 1.0, 0.0, 0.0, 1.0 ), vec4.fromValues( 0.0, 1.0, 0.0, 1.0 ), vec4.fromValues( 0.0, 0.0, 1.0, 1.0 ) );
   globalLight.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, 0, -10 ) );
   globalScene.AddSceneNode( globalLight );

   controllingNode = sphereNode;
   
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


