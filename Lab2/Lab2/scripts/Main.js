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

var KeyPressed = {};

function handleKeyDown( event ) 
   {
   KeyPressed[ event.keyCode ] = true;
   }

function handleKeyUp( event ) 
   {
   KeyPressed[ event.keyCode ] = false;
   }

function handleKeys() 
   {
   // W
   if ( KeyPressed[ 83 ] ) 
      {
      globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0, -0.1 ) );
      }

   // S
   if ( KeyPressed[ 87 ] ) 
      {
      globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0, 0.1 ) );
      }

   // A
   if ( KeyPressed[ 65 ] ) 
      {
      globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0.1, 0, 0 ) );
      }

   // D
   if ( KeyPressed[ 68 ] ) 
      {
      globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( -0.1, 0, 0 ) );
      }

   // Space
   if ( KeyPressed[ 32 ] ) 
      {
      globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0.1, 0 ) );
      }

   // C
   if ( KeyPressed[ 67 ] ) 
      {
      globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, -0.1, 0 ) );
      }


   // Left Arrow
   if ( KeyPressed[ 37 ] ) 
      {
      globalScene.CameraNode.LocalTransform.RotateToWorldRad( 0.05, g_Up3v );
      }

   // Right arrow
   if ( KeyPressed[ 39 ] ) 
      {
      globalScene.CameraNode.LocalTransform.RotateToWorldRad( -0.05, g_Up3v );
      }

   // Up arrow
   if ( KeyPressed[ 38 ] ) 
      {
      globalScene.CameraNode.LocalTransform.RotateFromWorldRad( -0.05, g_Left3v );
      }

   // Down arrow
   if ( KeyPressed[ 40 ] ) 
      {
      globalScene.CameraNode.LocalTransform.RotateFromWorldRad( 0.05, g_Left3v );
      }

   }

function tick() 
   {
   requestAnimFrame( tick );
   handleKeys();
   playerController.OnUpdate();
   drawScene();

   //animate();
   }

var playerController;
var canvasOffset;

function webGLStart() 
   {
   globalScene = new Scene();
   document.onkeydown = handleKeyDown;
   document.onkeyup = handleKeyUp;
   
   canvas = document.getElementById("WebGL-canvas");
   canvasDimension = vec2.fromValues( canvas.width, canvas.height );
   
   playerController = new Controller();
   canvas.onmousemove = ( playerController.OnMouseMove ).bind( playerController );
   canvas.onmousedown = ( playerController.OnMouseBottonDown ).bind( playerController );
   canvas.onmouseup = ( playerController.OnMouseBottonUp ).bind( playerController );
   initGL();
   globalScene.AddChild( new CubeSceneNode() );

   globalScene.OnRestore();

   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.enable( gl.CULL_FACE );
   gl.cullFace( gl.BACK );
   tick();
   }


