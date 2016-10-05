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
   cameraController.OnUpdate();
   drawScene();
   }

var cameraController;

function webGLStart() 
   {
   globalScene = new Scene();
   canvas = document.getElementById("WebGL-canvas");
   canvasDimension = vec2.fromValues( canvas.width, canvas.height );
   
   cameraController = new CameraController();
   document.onkeydown = ( cameraController.OnKeyDown ).bind( cameraController );
   document.onkeyup = ( cameraController.OnKeyUp ).bind( cameraController );
   canvas.onmousemove = ( cameraController.OnMouseMove ).bind( cameraController );
   canvas.onmousedown = ( cameraController.OnMouseBottonDown ).bind( cameraController );
   canvas.onmouseup = ( cameraController.OnMouseBottonUp ).bind( cameraController );
   canvas.onmouseleave = ( cameraController.ClearMouseBottonState ).bind( cameraController );

   initGL();
   globalScene.AddChild( new CubeSceneNode() );

   globalScene.OnRestore();

   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.enable( gl.CULL_FACE );
   gl.cullFace( gl.BACK );
   tick();
   }


