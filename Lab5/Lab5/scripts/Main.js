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
      gl = canvas.getContext("webgl2");
      //gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
      gl.viewport( 0, 0, gl.viewportWidth, gl.viewportHeight );
      gl.enable( gl.DEPTH_TEST );
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

function ouputBuffer()
   {
   if( gDrawable == false )
      {
      return;
      }
   gRenderFunction();
   }

function tick() 
   {
   requestAnimFrame( tick );
   controller.OnUpdate();
   globalScene.OnUpdate();
   gDeferredDrawer.PreRender();
   drawScene();
   
   //gTextureDrawer.DrawTexture( gSSAODrawer.OcclusionTexture, 0, 0, gl.viewportWidth, gl.viewportHeight );
  // gTextureDrawer.DrawTexture( gSSAODrawer.OcclusionTexture, 300, 0, 300, 300 );
  // gTextureDrawer.DrawTexture( gSSAODrawer.BlurTexture, 0, 0, 300, 300 );
   //gTextureDrawer.DrawTexture( gDeferredDrawer.AlbedoTexture, 0, 0, 300, 300 );
   //gTextureDrawer.DrawTexture( gDeferredDrawer.NormalTexture, 0, 0, 300, 300 );
   //gTextureDrawer.DrawTexture( gDeferredDrawer.PositionTexture, 300, 0, 300, 300 );
   //gTextureDrawer.DrawTexture( textureRes, 0, 0, 300, 300 );
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

function CreateSSAOControlButtons()
   {
   var container = document.getElementById( 'SSAOControlOption' );


   var cb = document.createElement( "input" );
   cb.type = "checkbox";
   cb.checked  = true;
   cb.onchange = function(){ gDeferredDrawer.UseSSAO = cb.checked? 1: 0; };
   container.appendChild( cb );

   var cbLabel = document.createElement('label')
   cbLabel.appendChild( document.createTextNode( "Enable SSAO" ) );
   container.appendChild( cbLabel );

   ////////////// SSAO radius

   var radLabel = document.createElement('label')
   radLabel.appendChild( document.createTextNode( "SSAO Radius: " ) );
   var radTextNode = document.createTextNode( gSSAODrawer.SampleRadius.Value.toString() );
   radLabel.appendChild( radTextNode );

   var radRange = document.createElement( "input" );
   radRange.type = "range";
   radRange.min = gSSAODrawer.SampleRadius.Min;
   radRange.max = gSSAODrawer.SampleRadius.Max;
   radRange.step = 0.1;
   radRange.value = gSSAODrawer.SampleRadius.Value;
   radRange.checked  = true;
   radRange.oninput = function(){ gSSAODrawer.SampleRadius.Value = radRange.value; radTextNode.textContent = radRange.value; };
   container.appendChild( radRange );

   container.appendChild( radLabel );

   ////////////// SSAO power
   var powerLabel = document.createElement('label')
   powerLabel.appendChild( document.createTextNode( "SSAO Power: " ) );
   var powerTextNode = document.createTextNode( gSSAODrawer.SSAOPower.Value.toString() );
   powerLabel.appendChild( powerTextNode );

   var powerRange = document.createElement( "input" );
   powerRange.type = "range";
   powerRange.min = gSSAODrawer.SSAOPower.Min;
   powerRange.max = gSSAODrawer.SSAOPower.Max;
   powerRange.step = 0.1;
   powerRange.value = gSSAODrawer.SSAOPower.Value;
   powerRange.checked  = true;
   powerRange.oninput = function(){ gSSAODrawer.SSAOPower.Value = powerRange.value; powerTextNode.textContent = powerRange.value; };
   container.appendChild( powerRange );

   container.appendChild( powerLabel );

   ////////////// Sample Num
   var sampleNumLabel = document.createElement('label')
   sampleNumLabel.appendChild( document.createTextNode( "Sample Num: " ) );
   var sampleNumTextNode = document.createTextNode( gSSAODrawer.SampleNum.Value.toString() );
   sampleNumLabel.appendChild( sampleNumTextNode );

   var sampleNumRange = document.createElement( "input" );
   sampleNumRange.type = "range";
   sampleNumRange.min = gSSAODrawer.SampleNum.Min;
   sampleNumRange.max = gSSAODrawer.SampleNum.Max;
   sampleNumRange.step = 1;
   sampleNumRange.value = gSSAODrawer.SampleNum.Value;
   sampleNumRange.checked  = true;
   sampleNumRange.oninput = function(){ gSSAODrawer.SampleNum.Value = sampleNumRange.value; sampleNumTextNode.textContent = sampleNumRange.value; };
   container.appendChild( sampleNumRange );

   container.appendChild( sampleNumLabel );
   //generateColorInput( container, "#FFFFFF", "Ambient", setAmbient );
   //generateColorInput( container, "#FFFFFF", "Diffuse", setDiffuse );
   //generateColorInput( container, "#FFFFFF", "Specular", setSpecular );

   //text = document.createElement( "input" );
   //text.type = "text";
   //text.value = "3.0";
   //container.appendChild( text );

   //button = document.createElement( "input" );
   //button.type = "button";
   //button.value = "Set Shininess";
   //button.onclick = function(){
   //   gDeferredDrawer.UseSSAO = gDeferredDrawer.UseSSAO == 1 ? 0: 1;
   //};
   //container.appendChild( button );
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

var globalLight;
var sphereNode;
var meshNode;
var forwardShader;
var skySphereShader;
var lightCubeShader;
var textureRes = {};
var meshRes = {};
var skySphereRes = {};
var skyMapRes = {};
var skySphereNode;
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
   textureRes.Load( "earth.png" );
   //textureRes.Load( "gray.jpg" );
   meshRes = new MeshResource();
   meshRes.Load( "teapot.json" );
   forwardShader = new ForwardShaderResource();
   forwardShader.Load( "shader-vs", "shader-fs" );

   meshNode = new MeshSceneNode( gDeferredDrawer.GeometryShaderResource, meshRes, textureRes );
   meshNode.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, 0, 20 ) );
   meshNode.Shininess = 10.0;
   meshNode.MaterialAmbient= vec4.fromValues( 0.5, 0.5, 0.5, 1.0 );
  // meshNode.MaterialDiffuse = vec4.fromValues( 0.5, 0.5, 0.5, 1.0 );
   globalScene.AddSceneNode( meshNode, 0 );

   skySphereRes = new MeshResource();
   skySphereRes.Load( "skySphere.json" );

   skyMapRes = new TextureResource();
   skyMapRes.Load( "skyMap.png" );

   skySphereShader = new SkySphereShaderResource( );
   skySphereShader.Load( "skyShader-vs", "skyShader-fs" );
   skySphereNode = new SkySphereSceneNode( skySphereShader, skySphereRes, skyMapRes );
   skySphereNode.LocalTransform.Scale( vec3.fromValues( 300, 300, 300 ) );
   
   globalScene.AddSceneNode( skySphereNode, 2 );
 //  var meshNode2 = new MeshSceneNode( forwardShader, meshRes, textureRes );
//   meshNode2.LocalTransform.SetToWorldPosition( vec3.fromValues( -5, 0, 20 ) );
 //  meshNode2.Shininess = 1.0;
  // meshNode2.MaterialSpecular = vec4.fromValues( 0.5, 0.5, 0.5, 1.0 );
 //  meshNode2.MaterialDiffuse = vec4.fromValues( 0.5, 0.5, 0.5, 1.0 );
   //globalScene.AddSceneNode( meshNode2 );
   //sphereNode = new SphereSceneNode( 3, 20, 20, vec4.fromValues( 1.0, 0.0, 0.0 ) );
   //phereNode.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, 0, 20 ) );
   //globalScene.AddSceneNode( sphereNode );
   lightCubeShader = new LightCubeShaderResource( );
   lightCubeShader.Load( "lightCubeShader-vs", "lightCubeShader-fs" );

   var dummyNode = new SceneNodes();
   dummyNode.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, 10, 0 ) );

   globalLight = new LightCubeSceneNode( lightCubeShader, vec4.fromValues( 0.5, 0.5, 0.5, 1.0 ), vec4.fromValues( 1.0, 1.0, 1.0, 1.0 ), vec4.fromValues( 1.0, 1.0, 1.0, 1.0 ) );
   globalLight.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, 0, -10 ) );
   dummyNode.AddChild( globalLight );
   //globalScene.AddSceneNode( globalLight, 1 );

   var light = new LightCubeSceneNode( lightCubeShader, vec4.fromValues( 0.5, 0.5, 0.5, 1.0 ), vec4.fromValues( 1.0, 0.0, 0.0, 1.0 ), vec4.fromValues( 1.0, 1.0, 1.0, 1.0 ) );
   light.LocalTransform.SetToWorldPosition( vec3.fromValues( 0, 0, 50 ) );
   dummyNode.AddChild( light )
   //globalScene.AddSceneNode( light, 1 );

   globalScene.AddSceneNode( dummyNode, 1 );

   controllingNode = globalLight;
   
   CreateRenderingControlButtons();
   CreateSSAOControlButtons();
   
   //initTextures( textureRes, "earth.png" );

   globalScene.OnRestore();

   gl.clearColor( 1.0, 1.0, 1.0, 1.0);
   gl.enable( gl.CULL_FACE );
   gl.cullFace( gl.BACK );
   gl.enable(gl.DEPTH_TEST);
   gl.depthFunc(gl.LESS);

   tick();
   }


