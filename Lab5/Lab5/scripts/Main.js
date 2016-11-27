var globalScene;
var gl;
var canvas;
var gDrawable = false;
var gRenderFunction = function(){};
// ************** Init OpenGL Context etc. ************* 

function initGL() 
   {
   try 
      {
      gl = canvas.getContext("experimental-webgl");
      //gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
      gl.viewport( 0, 0, gl.viewportWidth, gl.viewportHeight );
      gl.clearColor( 1.0, 1.0, 1.0, 1.0);
      gl.enable( gl.CULL_FACE );
      gl.cullFace( gl.BACK );
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LESS);
      } 
   catch (e) 
      {}
   if (!gl) 
      {
      alert("- How to execute on your browser:\n1. Currently it will only support Google Chrome\n2. Enter about:flags in address bar.3. Find the field WebGL 2.0 Prototype and enable it.");
      }
   }

 function drawScene() 
   {
   // you can declare multiple panel by call it many times
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   globalScene.OnRender();

   }

function ouputBuffer()
   {
   if( gDrawable == false )
      {
      return;
      }
   gRenderFunction();
   }

var lastCalledTime = Date.now();

function tick() 
   {
   deltaTime = (Date.now() - lastCalledTime)/1000;
   lastCalledTime = Date.now();

   requestAnimFrame( tick );
   controller.OnUpdate();
   globalScene.OnUpdate( deltaTime );
   gDeferredDrawer.PreRender();
   drawScene();
   }

var controller;

function CreateButton( node, btnText )
   {
   var container = document.getElementById( 'ControlOption' );

   var button = document.createElement( "input" );
   button.type = "button";
   button.value = btnText;
   button.onclick = function(){ controllingNode = node };
   container.appendChild( button );
   }

function CreateSSAOControlButtons()
   {
   var container = document.getElementById( 'SSAOControlOption' );


   var cb = document.createElement( "input" );
   cb.type = "checkbox";
   cb.checked  = true;
   cb.onchange = function(){ gDeferredDrawer.UseSSAO = cb.checked? 1: 0; };
   container.appendChild( cb );

   var cbLabel = document.createElement('label')
   cbLabel.appendChild( document.createTextNode( "   Enable SSAO" ) );
   container.appendChild( cbLabel );

   ////////////// SSAO radius

   var radLabel = document.createElement('label')
   radLabel.appendChild( document.createTextNode( "   SSAO Radius: " ) );
   var radTextNode = document.createTextNode( gSSAODrawer.SampleRadius.Value.toString() );
   radLabel.appendChild( radTextNode );

   var radRange = document.createElement( "input" );
   radRange.type = "range";
   radRange.min = gSSAODrawer.SampleRadius.Min;
   radRange.max = gSSAODrawer.SampleRadius.Max;
   radRange.step = 0.1;
   radRange.value = gSSAODrawer.SampleRadius.Value;
   radRange.oninput = function(){ gSSAODrawer.SampleRadius.Value = radRange.value; radTextNode.textContent = radRange.value; };
   container.appendChild( radRange );

   container.appendChild( radLabel );

   ////////////// SSAO power
   var powerLabel = document.createElement('label')
   powerLabel.appendChild( document.createTextNode( "   SSAO Power: " ) );
   var powerTextNode = document.createTextNode( gSSAODrawer.SSAOPower.Value.toString() );
   powerLabel.appendChild( powerTextNode );

   var powerRange = document.createElement( "input" );
   powerRange.type = "range";
   powerRange.min = gSSAODrawer.SSAOPower.Min;
   powerRange.max = gSSAODrawer.SSAOPower.Max;
   powerRange.step = 0.1;
   powerRange.value = gSSAODrawer.SSAOPower.Value;
   powerRange.oninput = function(){ gSSAODrawer.SSAOPower.Value = powerRange.value; powerTextNode.textContent = powerRange.value; };
   container.appendChild( powerRange );

   container.appendChild( powerLabel );

   ////////////// Sample Num
   var sampleNumLabel = document.createElement('label')
   sampleNumLabel.appendChild( document.createTextNode( "   Sample Num: " ) );
   var sampleNumTextNode = document.createTextNode( gSSAODrawer.SampleNum.Value.toString() );
   sampleNumLabel.appendChild( sampleNumTextNode );

   var sampleNumRange = document.createElement( "input" );
   sampleNumRange.type = "range";
   sampleNumRange.min = gSSAODrawer.SampleNum.Min;
   sampleNumRange.max = gSSAODrawer.SampleNum.Max;
   sampleNumRange.step = 1;
   sampleNumRange.value = gSSAODrawer.SampleNum.Value;
   sampleNumRange.oninput = function(){ gSSAODrawer.SampleNum.Value = sampleNumRange.value; sampleNumTextNode.textContent = sampleNumRange.value; };
   container.appendChild( sampleNumRange );

   container.appendChild( sampleNumLabel );
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

function CreateMusicontrolButtons()
   {
   var container = document.getElementById( 'MusicControlOption' );


   var cb = document.createElement( "input" );
   cb.type = "checkbox";
   cb.onchange = function(){ 
      cb.checked ? gLightControlNode.PlayMusic(): gLightControlNode.PauseMusic()
      };
   cb.checked  = false;
   container.appendChild( cb );

   var cbLabel = document.createElement('label')
   cbLabel.appendChild( document.createTextNode( "   Enable Music" ) );
   container.appendChild( cbLabel );

   }

function CreateRenderingControlButtons()
   {
   var container = document.getElementById( 'RenderControlOption' );

   var button = document.createElement( "input" );
   button.type = "button";
   button.value = "Default";
   button.onclick = function()
      { 
      gRenderFunction = function()
            { 
            gTextureDrawer.DrawTexture( gDeferredDrawer.OutputTexture, 0, 0, gl.viewportWidth, gl.viewportHeight ); 
            }; 
      };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Position CameraSpace";
   button.onclick = function()
      { 
         gRenderFunction = function()
            { 
            gTextureDrawer.DrawTexture( gDeferredDrawer.PositionTexture, 0, 0, gl.viewportWidth, gl.viewportHeight ); 
            }; 
      };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Normal CameraSpace";
   button.onclick = function(){ gRenderFunction = function(){ gTextureDrawer.DrawTexture( gDeferredDrawer.NormalTexture, 0, 0, gl.viewportWidth, gl.viewportHeight ); }; };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Albedo";
   button.onclick = function(){ gRenderFunction = function(){ gTextureDrawer.DrawTexture( gDeferredDrawer.AlbedoTexture, 0, 0, gl.viewportWidth, gl.viewportHeight ); }; };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Material Diffuse";
   button.onclick = function(){ gRenderFunction = function(){ gTextureDrawer.DrawTexture( gDeferredDrawer.DiffuseTexture, 0, 0, gl.viewportWidth, gl.viewportHeight ); }; };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "SSAO";
   button.onclick = function(){ gRenderFunction = function(){ gTextureDrawer.DrawTexture( gSSAODrawer.OcclusionTexture, 0, 0, gl.viewportWidth, gl.viewportHeight ); }; };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "SSAO Blur";
   button.onclick = function(){ gRenderFunction = function(){ gTextureDrawer.DrawTexture( gSSAODrawer.BlurTexture, 0, 0, gl.viewportWidth, gl.viewportHeight ); }; };
   container.appendChild( button );
   }

function CreateLightControlButtons()
   {
   var container = document.getElementById( 'LightControlOption' );
   
   // Radius
   var radLabel = document.createElement('label')
   radLabel.appendChild( document.createTextNode( "     Light Radius: " ) );
   var radTextNode = document.createTextNode( Math.sqrt( gLightManager.LightRadiusSqr.Value ).toString() );
   radLabel.appendChild( radTextNode );

   var radRange = document.createElement( "input" );
   radRange.type = "range";
   radRange.min = gLightManager.LightRadiusSqr.Min;
   radRange.max = gLightManager.LightRadiusSqr.Max;
   radRange.step = 0.1;
   radRange.value = Math.sqrt( gLightManager.LightRadiusSqr.Value );
   radRange.oninput = function(){ gLightManager.LightRadiusSqr.Value = radRange.value * radRange.value; radTextNode.textContent = radRange.value; };
   container.appendChild( radRange );

   container.appendChild( radLabel );

   // Gamma
   var gammaPowerLabel = document.createElement('label')
   gammaPowerLabel.appendChild( document.createTextNode( "     Gamma Power: " ) );
   var gammaPowerNode = document.createTextNode( gLightBrightnessControlNode.GammaPower.Value.toString() );
   gammaPowerLabel.appendChild( gammaPowerNode );

   var gammaPowerRange = document.createElement( "input" );
   gammaPowerRange.type = "range";
   gammaPowerRange.min = gLightBrightnessControlNode.GammaPower.Min;
   gammaPowerRange.max = gLightBrightnessControlNode.GammaPower.Max;
   gammaPowerRange.step = 0.1;
   gammaPowerRange.value = gLightBrightnessControlNode.GammaPower.Value;
   gammaPowerRange.oninput = function(){ gLightBrightnessControlNode.GammaPower.Value = gammaPowerRange.value; gammaPowerNode.textContent = gammaPowerRange.value; };
   container.appendChild( gammaPowerRange );

   container.appendChild( gammaPowerLabel );

   // Gamma scalar
   var gammaScalarLabel = document.createElement('label')
   gammaScalarLabel.appendChild( document.createTextNode( "     Gamma Scalar: " ) );
   var gammaScalarNode = document.createTextNode( gLightBrightnessControlNode.GammaScalar.Value.toString() );
   gammaScalarLabel.appendChild( gammaScalarNode );

   var gammaScalarRange = document.createElement( "input" );
   gammaScalarRange.type = "range";
   gammaScalarRange.min = gLightBrightnessControlNode.GammaScalar.Min;
   gammaScalarRange.max = gLightBrightnessControlNode.GammaScalar.Max;
   gammaScalarRange.step = 0.1;
   gammaScalarRange.value = gLightBrightnessControlNode.GammaScalar.Value;
   gammaScalarRange.oninput = function(){ gLightBrightnessControlNode.GammaScalar.Value = gammaScalarRange.value; gammaScalarNode.textContent = gammaScalarRange.value; };
   container.appendChild( gammaScalarRange );

   container.appendChild( gammaScalarLabel );
   }

var globalLight;
var textureMeshShader;
var lightCubeShader;
var textureRes = {};
var meshRes = {};
var skySphereRes = {};
var skyMapRes = {};
var skySphereNode;
var crateImgRes;
function webGLStart() 
   {
   canvas = document.getElementById("WebGL-canvas");
   canvasDimension = vec2.fromValues( canvas.width, canvas.height );
   initGL();

   globalScene = new Scene();
   
   gLightManager.Init();
   gQuadResource.Init();
   gCubeResource.Init();
   gTextureDrawer.Init();
   gDeferredDrawer.Init();
   gSSAODrawer.Init();
   gSecondPassFrameBuffer.Init();

   gRenderFunction = function()
      { 
      gTextureDrawer.DrawTexture( gDeferredDrawer.OutputTexture, 0, 0, gl.viewportWidth, gl.viewportHeight ); 
      }; 

   controller = new RobotController();
   document.onkeydown = ( controller.OnKeyDown ).bind( controller );
   document.onkeyup = ( controller.OnKeyUp ).bind( controller );
   canvas.onmousemove = ( controller.OnMouseMove ).bind( controller );
   canvas.onmousedown = ( controller.OnMouseBottonDown ).bind( controller );
   canvas.onmouseup = ( controller.OnMouseBottonUp ).bind( controller );
   canvas.onmouseleave = ( controller.ClearMouseBottonState ).bind( controller );

   globalScene.AddSceneNode( globalScene.CameraNode );
   
   textureRes = new TextureResource();
   //textureRes.Load( "earth.png" );
   textureRes.Load( "gray.jpg" );
   meshRes = new MeshResource();
   meshRes.Load( "teapot.json" );

   skySphereRes = new MeshResource();
   skySphereRes.Load( "skySphere.json" );

   skyMapRes = new TextureResource();
 //  skyMapRes.Load( "skyMap.png" );
  // skyMapRes.Load( "star2.jpg" );
   skyMapRes.Load( "moon.jpg" );
   //skyMapRes.Load( "moon.jpg" );
   //skyMapRes.Load( "nightSky.jpg" );
  // skyMapRes.Load( "nightSky.png" );

   textureMeshShader = new TextureMeshShaderResource( );
   textureMeshShader.Load( "textureMeshShader-vs", "textureMeshShader-fs" );

   crateImgRes = new TextureResource();
   crateImgRes.Load( "crate.png" );
   var crateMeshNode = new MeshSceneNode( gDeferredDrawer.GeometryShaderResource, gCubeResource, crateImgRes );
   crateMeshNode.LocalTransform.Scale( vec3.fromValues( 55, 1, 55 ) );
   crateMeshNode.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, -8.37, 0 ) );
   crateMeshNode.Shininess = 10.0;
   crateMeshNode.MaterialAmbient= vec4.fromValues( 0.05, 0.05, 0.05, 1.0 );
   crateMeshNode.MaterialDiffuse = vec4.fromValues( 0.05, 0.05, 0.05, 1.0 );
   crateMeshNode.MaterialSpecular = vec4.fromValues( 0.05, 0.05, 0.05, 1.0 );
   globalScene.AddSceneNode( crateMeshNode, 0 );

   skySphereNode = new TextureMeshSceneNode( textureMeshShader, skySphereRes, skyMapRes );
   skySphereNode.LocalTransform.Scale( vec3.fromValues( 300, 300, 300 ) );

   globalScene.AddSceneNode( skySphereNode, 2 );

   lightCubeShader = new LightCubeShaderResource( );
   lightCubeShader.Load( "lightCubeShader-vs", "lightCubeShader-fs" );

   globalScene.CameraNode.LocalTransform.SetToWorldPosition( vec3.fromValues( 50, 20, -130 ) );
   globalScene.CameraNode.LocalTransform.RotateToWorldRad( -Math.PI / 10, g_Up3v );
   var audioRes = new AudioResource();
   audioRes.Load( "Music.mp3" );

   InitLightControlNode( audioRes );
   InitLightBrightnessControlNode();
   InitLightScaleControlNode();
   InitTeapotControlNode();

   controllingNode = globalLight;
   
   CreateRenderingControlButtons();
   CreateSSAOControlButtons();
   CreateLightControlButtons();
   CreateMusicontrolButtons();

   globalScene.OnRestore();

   tick();
   }


