var globalScene;
var gl;

// ************** Init OpenGL Context etc. ************* 

function initGL(canvas) 
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

var currentlyPressedKeys = {};

function handleKeyDown( event ) 
   {
   currentlyPressedKeys[ event.keyCode ] = true;
   }

function handleKeyUp( event ) 
   {
   currentlyPressedKeys[ event.keyCode ] = false;
   }

function handleKeys() 
   {
   // W
   if ( currentlyPressedKeys[ 83 ] ) 
      {
      globalScene.CameraNode.AddFromWorldPosition( vec3.fromValues( 0, 0, -0.1 ) );
      }

   // S
   if ( currentlyPressedKeys[ 87 ] ) 
      {
      globalScene.CameraNode.AddFromWorldPosition( vec3.fromValues( 0, 0, 0.1 ) );
      }

   // A
   if ( currentlyPressedKeys[ 65 ] ) 
      {
      globalScene.CameraNode.AddFromWorldPosition( vec3.fromValues( 0.1, 0, 0 ) );
      }

   // D
   if ( currentlyPressedKeys[ 68 ] ) 
      {
      globalScene.CameraNode.AddFromWorldPosition( vec3.fromValues( -0.1, 0, 0 ) );
      }

   // Space
   if ( currentlyPressedKeys[ 32 ] ) 
      {
      globalScene.CameraNode.AddFromWorldPosition( vec3.fromValues( 0, 0.1, 0 ) );
      }

   // C
   if ( currentlyPressedKeys[ 67 ] ) 
      {
      globalScene.CameraNode.AddFromWorldPosition( vec3.fromValues( 0, -0.1, 0 ) );
      }


   // Left Arrow
   if ( currentlyPressedKeys[ 37 ] ) 
      {
      globalScene.CameraNode.RotateToWorldRad( 0.05, g_Up3v );
      }

   // Right arrow
   if ( currentlyPressedKeys[ 39 ] ) 
      {
      globalScene.CameraNode.RotateToWorldRad( -0.05, g_Up3v );
      }

   // Up arrow
   if ( currentlyPressedKeys[ 38 ] ) 
      {
      globalScene.CameraNode.RotateFromWorldRad( -0.05, g_Left3v );
      }

   // Down arrow
   if ( currentlyPressedKeys[ 40 ] ) 
      {
      globalScene.CameraNode.RotateFromWorldRad( 0.05, g_Left3v );
      }

   }

function tick() 
   {
   requestAnimFrame( tick );
   handleKeys();
   drawScene();
   //animate();
   }

function webGLStart() 
   {
   globalScene = new Scene();
   document.onkeydown = handleKeyDown;
   document.onkeyup = handleKeyUp;
   
   var canvas = document.getElementById("WebGL-canvas");
   initGL( canvas );
   globalScene.AddChild( new CubeSceneNode() );

   globalScene.OnRestore();

   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.enable( gl.CULL_FACE );
  // gl.cullFace( gl.FRONT_AND_BACK );
   tick();
   }


