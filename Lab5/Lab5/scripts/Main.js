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
      gl.viewport( 0, 0, gl.viewportWidth, gl.viewportHeight );
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
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   globalScene.OnRender();

   }

function tick() 
   {
   requestAnimFrame( tick );
   controller.OnUpdate();
   drawScene();
   gTextureDrawer.DrawTexture( textureRes, 0, 0, 300, 300 );
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

function CreateLightControlButtons()
   {
   var container = document.getElementById( 'LightControlOption' );

   var button = document.createElement( "input" );
   button.type = "button";
   button.value = "Move Forward";
   button.onclick = function(){  controllingNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0, 3 ) ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Move Backward";
   button.onclick = function(){  controllingNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0, -3 ) ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Move Left";
   button.onclick = function(){  controllingNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 3, 0, 0 ) ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Move Right";
   button.onclick = function(){  controllingNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( -3, 0, 0 ) ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Move Up";
   button.onclick = function(){  controllingNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 3, 0 ) ) };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Move Down";
   button.onclick = function(){  controllingNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, -3, 0 ) ) };
   container.appendChild( button );

   generateColorInput( container, "#FFFFFF", "Ambient", setAmbient );
   generateColorInput( container, "#FFFFFF", "Diffuse", setDiffuse );
   generateColorInput( container, "#FFFFFF", "Specular", setSpecular );

   text = document.createElement( "input" );
   text.type = "text";
   text.value = "3.0";
   container.appendChild( text );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Set Shininess";
   button.onclick = function(){  sphereNode.Shininess = parseFloat( text.value ); };
   container.appendChild( button );
   }

function setAmbient( ambient )
      {
      globalLight.Ambient = ambient;
      }

function setDiffuse( diffuse )
      {
      globalLight.Diffuse = diffuse;
      }

function setSpecular( specular )
      {
      globalLight.Specular = specular;
      }

function hexStrToColor( hexStr )
   {
   var subHexStr = hexStr.substring( 1, 7 );
   var r = parseInt( subHexStr.substring( 0, 2 ),16 ) / 255;
   var g = parseInt( subHexStr.substring( 2, 4 ),16 ) / 255;
   var b = parseInt( subHexStr.substring( 4, 6 ),16 ) / 255;
   return vec4.fromValues( r, g, b, 1.0 );
   }

function generateColorInput( container, defaultColor, labelText, changeFunction )
   {
   var colorSelect = document.createElement('input');
   colorSelect.type = "color";
   colorSelect.value = defaultColor;
   colorSelect.onchange = function(){ changeFunction( hexStrToColor( colorSelect.value ) ); };
   var label = document.createElement('label')
   label.appendChild( document.createTextNode( labelText ) );

   container.appendChild( colorSelect );
   container.appendChild( label );
   }

function CreateCameraControlButtons()
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
var sphereNode;
var meshNode;
var forwardShader;
var textureRes = {};
var meshRes = {};

function webGLStart() 
   {
   globalScene = new Scene();
   canvas = document.getElementById("WebGL-canvas");
   canvasDimension = vec2.fromValues( canvas.width, canvas.height );
   initGL();

   gTextureDrawer.Init();

   controller = new RobotController();
   document.onkeydown = ( controller.OnKeyDown ).bind( controller );
   document.onkeyup = ( controller.OnKeyUp ).bind( controller );
   canvas.onmousemove = ( controller.OnMouseMove ).bind( controller );
   canvas.onmousedown = ( controller.OnMouseBottonDown ).bind( controller );
   canvas.onmouseup = ( controller.OnMouseBottonUp ).bind( controller );
   canvas.onmouseleave = ( controller.ClearMouseBottonState ).bind( controller );
  
  // globalScene.AddSceneNode( torsoCuboid );

   globalScene.AddSceneNode( globalScene.CameraNode );
   
   textureRes = new TextureResource();
   textureRes.Load( "earth.png" );
   meshRes = new MeshResource();
   meshRes.Load( "teapot.json" );
   forwardShader = new ForwardShaderResource();
   forwardShader.Load( "shader-vs", "shader-fs" );

   meshNode = new MeshSceneNode( forwardShader, meshRes, textureRes );
   meshNode.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, 0, 20 ) );
   globalScene.AddSceneNode( meshNode );
   //sphereNode = new SphereSceneNode( 3, 20, 20, vec4.fromValues( 1.0, 0.0, 0.0 ) );
   //sphereNode.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, 0, 20 ) );
   //globalScene.AddSceneNode( sphereNode );

   globalLight = new PointLightSceneNode( vec4.fromValues( 0.2, 0.2, 0.2, 1.0 ), vec4.fromValues( 0.5, 0.5, 0.5, 1.0 ), vec4.fromValues( 0.7, 0.7, 0.7, 1.0 ) );
   globalLight.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, 0, -10 ) );
   globalScene.AddSceneNode( globalLight );

   controllingNode = globalLight;
   
   CreateLightControlButtons();
   CreateCameraControlButtons();

   
   //initTextures( textureRes, "earth.png" );

   globalScene.OnRestore();

   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.enable( gl.CULL_FACE );
   gl.cullFace( gl.BACK );
   gl.enable(gl.DEPTH_TEST);
   gl.depthFunc(gl.LESS);

   tick();
   }


