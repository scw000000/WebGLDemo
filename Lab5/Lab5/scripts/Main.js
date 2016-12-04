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
      gl = canvas.getContext("webgl");
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
      alert("WebGL init error");
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
   controller.OnUpdate( deltaTime );
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

function CreateBloomControlButtons()
   {
   var container = document.getElementById( 'BloomControlOption' );

   var blurLabel = document.createElement('label')
   blurLabel.appendChild( document.createTextNode( "   Gaussian Blur Iteration Num: " ) );
   var blurTextNode = document.createTextNode( gBloomDrawer.IterateNum.Value.toString() );
   blurLabel.appendChild( blurTextNode );

   var blurRange = document.createElement( "input" );
   blurRange.type = "range";
   blurRange.min = gBloomDrawer.IterateNum.Min;
   blurRange.max = gBloomDrawer.IterateNum.Max;
   blurRange.step = 1;
   blurRange.value = gBloomDrawer.IterateNum.Value;
   blurRange.oninput = function(){ gBloomDrawer.IterateNum.Value = blurRange.value; blurTextNode.textContent = blurRange.value; };
   container.appendChild( blurRange );

   container.appendChild( blurLabel );

   // Light brightness
   var lightLabel = document.createElement('label')
   lightLabel.appendChild( document.createTextNode( "   Light Cube Brightness Threshold: " ) );
   var lightTextNode = document.createTextNode( gLightControlNode.BrightnessThreshold.Value.toString() );
   lightLabel.appendChild( lightTextNode );

   var lightRange = document.createElement( "input" );
   lightRange.type = "range";
   lightRange.min = gLightControlNode.BrightnessThreshold.Min;
   lightRange.max = gLightControlNode.BrightnessThreshold.Max;
   lightRange.step = 0.01;
   lightRange.value = gLightControlNode.BrightnessThreshold.Value;
   lightRange.oninput = function(){ gLightControlNode.BrightnessThreshold.Value = lightRange.value; lightTextNode.textContent = lightRange.value; };
   container.appendChild( lightRange );

   container.appendChild( lightLabel );

   // For sky sphere

   var skyLabel = document.createElement('label')
   skyLabel.appendChild( document.createTextNode( "   Sky Sphere Brightness Threshold: " ) );
   var skyTextNode = document.createTextNode( gSkySphereNode.BrightnessThreshold.Value.toString() );
   skyLabel.appendChild( skyTextNode );

   var skyRange = document.createElement( "input" );
   skyRange.type = "range";
   skyRange.min = gSkySphereNode.BrightnessThreshold.Min;
   skyRange.max = gSkySphereNode.BrightnessThreshold.Max;
   skyRange.step = 0.01;
   skyRange.value = gSkySphereNode.BrightnessThreshold.Value;
   skyRange.oninput = function(){ gSkySphereNode.BrightnessThreshold.Value = skyRange.value; skyTextNode.textContent = skyRange.value; };
   container.appendChild( skyRange );

   container.appendChild( skyLabel );

   // For teapots and floor 

   var teapotLabel = document.createElement('label')
   teapotLabel.appendChild( document.createTextNode( "   Teapots Brightness Threshold: " ) );
   var teapotTextNode = document.createTextNode( gTeapotControlNode.BrightnessThreshold.Value.toString() );
   teapotLabel.appendChild( teapotTextNode );

   var teapotRange = document.createElement( "input" );
   teapotRange.type = "range";
   teapotRange.min = gTeapotControlNode.BrightnessThreshold.Min;
   teapotRange.max = gTeapotControlNode.BrightnessThreshold.Max;
   teapotRange.step = 0.01;
   teapotRange.value = gTeapotControlNode.BrightnessThreshold.Value;
   teapotRange.oninput = function(){ gTeapotControlNode.BrightnessThreshold.Value = teapotRange.value; teapotTextNode.textContent = teapotRange.value; };
   container.appendChild( teapotRange );

   container.appendChild( teapotLabel );
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
   button.value = "Output";
   button.onclick = function()
      { 
      gRenderFunction = function()
            { 
            gBloomDrawer.CombineLightAndScene();
            }; 
      };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Non bloomed";
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

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Light";
   button.onclick = function(){ gRenderFunction = function(){ gTextureDrawer.DrawTexture( gDeferredDrawer.LightTexture, 0, 0, gl.viewportWidth, gl.viewportHeight ); }; };
   container.appendChild( button );

   button = document.createElement( "input" );
   button.type = "button";
   button.value = "Blur";
   button.onclick = function(){ gRenderFunction = function(){ 
      var outputTexture = gDeferredDrawer.LightTexture;
   if( gBloomDrawer.IterateNum.Value != 0 )
      {
      outputTexture = gBloomDrawer.PingPongTexture[ 1 - ( gBloomDrawer.IterateNum.Value % 2 ) ];
      }
      gTextureDrawer.DrawTexture( outputTexture, 0, 0, gl.viewportWidth, gl.viewportHeight ); 
   }; };
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

var gSkySphereNode;

function webGLStart() 
   {
   canvas = document.getElementById("WebGL-canvas");
   canvasDimension = vec2.fromValues( canvas.width, canvas.height );
   initGL();
   if( !gl )
      {
      return;
      }
   globalScene = new Scene();
   
   gLightManager.Init();

   gQuadResource.Init();
   gCubeResource.Init();
   gSphereRsource.Init();

   gTextureDrawer.Init();
   gDeferredDrawer.Init();
   gSSAODrawer.Init();
   gSecondPassFrameBuffer.Init();
   gBloomDrawer.Init();

   gRenderFunction = function()
      { 
      gBloomDrawer.CombineLightAndScene();
      }; 

   controller = new RobotController();
   document.onkeydown = ( controller.OnKeyDown ).bind( controller );
   document.onkeyup = ( controller.OnKeyUp ).bind( controller );
   canvas.onmousemove = ( controller.OnMouseMove ).bind( controller );
   canvas.onmousedown = ( controller.OnMouseBottonDown ).bind( controller );
   canvas.onmouseup = ( controller.OnMouseBottonUp ).bind( controller );
   canvas.onmouseleave = ( controller.ClearMouseBottonState ).bind( controller );

   globalScene.AddSceneNode( globalScene.CameraNode );
   
   var skySphereRes = new MeshResource();
   skySphereRes.Load( "skySphere.json" );

   var skyMapRes = new TextureResource();
 //  skyMapRes.Load( "skyMap.png" );
  // skyMapRes.Load( "star2.jpg" );
   skyMapRes.Load( "meshTex/moon.jpg" );
  // skyMapRes.Load( "nightSky.png" );

   var lampTexRes = new TextureResource();
   lampTexRes.Load( "meshTex/black.jpg" );
   var lampMesh = new MeshResource();
   lampMesh.Load( "streetlight.json" );
   var lampMeshNode = new MeshSceneNode( gDeferredDrawer.GeometryShaderResource, lampMesh, lampTexRes );
   mat4.scale( lampMeshNode.LocalTransform.GetToWorld(), lampMeshNode.LocalTransform.GetToWorld(), vec3.fromValues( 30, 30, 30 ) );
   lampMeshNode.LocalTransform.RotateFromWorldRad( -Math.PI / 2, g_Left3v );
   lampMeshNode.Shininess = 20.0;
   lampMeshNode.MaterialAmbient= vec4.fromValues( 0.05, 0.05, 0.05, 1.0 );
   lampMeshNode.MaterialDiffuse = vec4.fromValues( 0.05, 0.05, 0.05, 1.0 );
   lampMeshNode.MaterialSpecular = vec4.fromValues( 0.05, 0.05, 0.05, 1.0 );
   globalScene.AddSceneNode( lampMeshNode, 0 );

   var textureMeshShader = new TextureMeshShaderResource( );
   textureMeshShader.Load( "textureMeshShader-vs", "textureMeshShader-fs" );

   //var crateImgRes = new TextureResource();
   //crateImgRes.Load( "crate.png" );
   var meshTex = new TextureResource();
   meshTex.Load( "meshTex/" + 154 + ".JPG" );
   var normalTex = new TextureResource();
   normalTex.Load( "meshTex/" + 154 + "_norm.JPG" );
   //var crateMeshNode = new MeshSceneNode( gDeferredDrawer.GeometryShaderResource, gCubeResource, crateImgRes );
   var crateMeshNode = new MeshSceneNode( gDeferredDrawer.GeometryShaderResource, gCubeResource, meshTex, normalTex );
   crateMeshNode.LocalTransform.Scale( vec3.fromValues( 55, 1, 55 ) );
   crateMeshNode.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, 0, 0 ) );
   crateMeshNode.Shininess = 20.0;
   crateMeshNode.MaterialAmbient= vec4.fromValues( 0.05, 0.05, 0.05, 1.0 );
   crateMeshNode.MaterialDiffuse = vec4.fromValues( 0.05, 0.05, 0.05, 1.0 );
   crateMeshNode.MaterialSpecular = vec4.fromValues( 0.01, 0.01, 0.01, 1.0 );
   globalScene.AddSceneNode( crateMeshNode, 0 );

   gSkySphereNode = new TextureMeshSceneNode( textureMeshShader, skySphereRes, skyMapRes );
   gSkySphereNode.LocalTransform.Scale( vec3.fromValues( 300, 300, 300 ) );

   globalScene.AddSceneNode( gSkySphereNode, 2 );
   
   globalScene.CameraNode.LocalTransform.SetToWorldPosition( vec3.fromValues( 50, 20, -130 ) );
   globalScene.CameraNode.LocalTransform.RotateToWorldRad( -Math.PI / 10, g_Up3v );
   var audioRes = new AudioResource();
   var container = document.getElementById( 'AudioFile' ).firstElementChild;
   audioRes.Load( container.src );

   InitLightShapeShader();
   InitLightControlNode( audioRes );
   InitLightBrightnessControlNode();
   InitLightScaleControlNode();
   InitStreetLightControlNode();
   InitTeapotControlNode();
   
   CreateRenderingControlButtons();
   CreateSSAOControlButtons();
   CreateLightControlButtons();
   CreateMusicontrolButtons();
   CreateBloomControlButtons();

   globalScene.OnRestore();

   tick();
   }


