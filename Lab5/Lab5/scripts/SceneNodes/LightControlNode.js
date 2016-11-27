var gLightControlNode;

var lerp = function( scalar, a, b )
   {
   return ( 1 - scalar ) * a + scalar * b;
   }
var colorLerp = function( scalar, a, b )
   {
   return vec4.fromValues( lerp( scalar, a[ 0 ], b[ 0 ] ), lerp( scalar, a[ 1 ], b[ 1 ] ), lerp( scalar, a[ 2 ], b[ 2 ] ), lerp( scalar, a[ 3 ], b[ 3 ] ) );
   }

function GetRandomColor()
   {
   return vec4.fromValues( Math.random(), Math.random(), Math.random(), 1.0 );
   }

function ScaleColor( out, scalar, color )
   {
   out[ 0 ] = color[ 0 ] * scalar;
   out[ 1 ] = color[ 1 ] * scalar;
   out[ 2 ] = color[ 2 ] * scalar;
   return out;
   }

function GenerateLightNode( lightColor, ambientScalar, diffuseScalar, specularScalar )
   {
   return new LightCubeSceneNode( lightCubeShader, ScaleColor( vec4.create(), ambientScalar, lightColor ), ScaleColor( vec4.create(), diffuseScalar, lightColor ), ScaleColor( vec4.create(), specularScalar, lightColor ) );
   }

var grayCode = [
      vec4.fromValues( 0, 0, 1, 1 ),
      vec4.fromValues( 0, 1, 1, 1 ),
      vec4.fromValues( 0, 1, 0, 1 ),
      vec4.fromValues( 1, 1, 0, 1 ),
      vec4.fromValues( 1, 1, 1, 1 ),
      vec4.fromValues( 1, 0, 1, 1 ),
      vec4.fromValues( 1, 0, 0, 1 ),
      vec4.fromValues( 0, 0, 1, 1 )
      ];

var grayCodeRatios = [ 1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7, 6 / 7, 1 ];

function GetLerpedGrayCodeColor( scalar )
   {
   var left = 0;
   for( var i = 0; i < grayCodeRatios.length; ++i )
      {
      if( scalar < grayCodeRatios[ i ] )
         {
         left = i;
         break;
         }
      }
   return colorLerp( ( scalar - grayCodeRatios[ left ] + 1 / 7 ) / ( 1 / 7 ), grayCode[ left ], grayCode[ left + 1 ] );
   }

function InitLightControlNode( audioRes )
   {
   gLightControlNode = new SceneNodes();
   gLightControlNode.LightNum = 130;
   gLightControlNode.Radius = 150;
   gLightControlNode.AudioResource = audioRes;
   gLightControlNode.LightMaxHeight = 100;
   gLightControlNode.Smoothness = 0.3;
   gLightControlNode.AmbientScalar = 0.01;
   gLightControlNode.DiffuseScalar = 0.05;
   gLightControlNode.SpecularScalar = 1;
   gLightControlNode.Speed = 0.3;
   gLightControlNode.TargetSpeed = 0.3;
   gLightControlNode.CurrentTime = 0;
   gLightControlNode.TimeTick = 0.01;
   gLightControlNode.NextChangeTime = 20;

   var deltaRad = Math.PI * 2 / gLightControlNode.LightNum;
   var lightPos = vec3.scale( vec3.create(), g_Left3v, gLightControlNode.Radius );

   var red = vec4.fromValues( 1, 0, 0, 1 );
   var green = vec4.fromValues( 0, 1, 0, 1 );
   var blue = vec4.fromValues( 0, 0, 1, 1 );
   
   for( var i = 0; i < gLightControlNode.LightNum; ++i )
      {
      var idxRatio = i / gLightControlNode.LightNum;
      var lightColor = GetLerpedGrayCodeColor( idxRatio );
      

      //if( idxRatio <= 0.33 ) // red lerp with green
      //   { 
      //   lightColor = colorLerp( idxRatio / 0.33, red, green );
      //   }
      //else if( idxRatio <= 0.66 )
      //   {
      //   lightColor = colorLerp( ( idxRatio - 0.33 ) / 0.33, green, blue );
      //   }
      //else
      //   {
      //   lightColor = colorLerp( ( idxRatio - 0.66 ) / 0.33, blue, red );
      //   }
     // var light = new LightCubeSceneNode( lightCubeShader, lightColor, vec4.clone( lightColor ), vec4.clone( lightColor ) );
      var light = GenerateLightNode( lightColor, gLightControlNode.AmbientScalar, gLightControlNode.DiffuseScalar, gLightControlNode.SpecularScalar );
      light.LocalTransform.SetToWorldPosition( lightPos );
      gLightControlNode.AddChild( light );

      vec3.rotateY( lightPos, lightPos, g_Zero3v, deltaRad );
      }

   gLightControlNode.GetNormalizedFreq = function( scalar )
      {
      var freqIdx = Math.ceil( gLightControlNode.AudioResource.frequencyData.length * scalar );
      freqIdx = Math.max( 0, Math.min( freqIdx, gLightControlNode.AudioResource.frequencyData.length - 1 ) );
      return gLightControlNode.AudioResource.frequencyData[ freqIdx ] / 255;
      }

   gLightControlNode.PauseMusic = function()
      {
      gLightControlNode.AudioResource.audio.pause();
      }

   gLightControlNode.PlayMusic = function()
      {
      if( gLightControlNode.AudioResource.context == null )
         {
         gLightControlNode.AudioResource.context = new AudioContext();
         gLightControlNode.AudioResource.analyser = gLightControlNode.AudioResource.context.createAnalyser();
      
         gLightControlNode.AudioResource.audioSrc = gLightControlNode.AudioResource.context.createMediaElementSource( gLightControlNode.AudioResource.audio );

         gLightControlNode.AudioResource.audioSrc.connect( gLightControlNode.AudioResource.analyser );
         gLightControlNode.AudioResource.audioSrc.connect( gLightControlNode.AudioResource.context.destination );

         gLightControlNode.AudioResource.analyser.connect( gLightControlNode.AudioResource.context.destination );

         gLightControlNode.AudioResource.frequencyData = new Uint8Array( gLightControlNode.AudioResource.analyser.frequencyBinCount);
         }
      gLightControlNode.AudioResource.audio.play();
      gLightControlNode.AudioResource.audio.loop = true;
      }

   globalScene.AddSceneNode( gLightControlNode, 1 );

   gLightControlNode.OnUpdate =  UpdateLights;
   }

function UpdateLights( deltaTime )
   {
   if( !gLightControlNode.AudioResource.IsLoaded )
      {
      return;
      }
   
   if( !gLightControlNode.AudioResource.audio.paused )
      {
      gLightControlNode.AudioResource.analyser.getByteFrequencyData( gLightControlNode.AudioResource.frequencyData );
      
      for( var i in gLightControlNode.ChildNodes )
         {
         //var freqIdx = Math.ceil( gLightControlNode.AudioResource.frequencyData.length * i / gLightControlNode.ChildNodes.length );
         //var normalizedFreq = gLightControlNode.AudioResource.frequencyData[ freqIdx ] / 255;
         //var lightPos = gLightControlNode.ChildNodes[ i ].LocalTransform.GetToWorldPosition();
         //lightPos[ 1 ] += gLightControlNode.Smoothness * ( normalizedFreq * gLightControlNode.LightMaxHeight - lightPos[ 1 ] );
         //gLightControlNode.ChildNodes[ i ].LocalTransform.SetToWorldPosition( lightPos );
         var lightPos = gLightControlNode.ChildNodes[ i ].GlobalTransform.GetToWorldPosition();
         var cos = lightPos[ 0 ] / gLightControlNode.Radius;
         var leftCos = lightPos[ 2 ] / gLightControlNode.Radius;
         var freqIdxRatio = ( cos + 1 ) * 0.25;
         if( leftCos < 0 )
            {
            freqIdxRatio = 1 - freqIdxRatio;
            }

         //var freqIdx = Math.ceil( gLightControlNode.AudioResource.frequencyData.length * freqIdxRatio );
         //freqIdx = Math.max( 0, Math.min( freqIdx, gLightControlNode.AudioResource.frequencyData.length - 1 ) );
         //var normalizedFreq = gLightControlNode.AudioResource.frequencyData[ freqIdx ] / 255;
         var normalizedFreq = gLightControlNode.GetNormalizedFreq( freqIdxRatio );
         lightPos[ 1 ] += gLightControlNode.Smoothness * ( normalizedFreq * gLightControlNode.LightMaxHeight - lightPos[ 1 ] );
         vec3.transformMat4( lightPos, lightPos,gLightControlNode.LocalTransform.GetFromWorld() ); // Transform this point to local space
         gLightControlNode.ChildNodes[ i ].LocalTransform.SetToWorldPosition( lightPos );
         }
      gLightControlNode.CurrentTime += deltaTime;
      if( gLightControlNode.CurrentTime >= gLightControlNode.NextChangeTime )
         {
         gLightControlNode.NextChangeTime -= gLightControlNode.CurrentTime;
         gLightControlNode.NextChangeTime += Math.random() * 4 + 18;
         gLightControlNode.CurrentTime = 0;
         gLightControlNode.TargetSpeed = ( Math.random() * 0.15 + 0.2 )* Math.sign( gLightControlNode.TargetSpeed ) * -1;
         }
      gLightControlNode.Speed += 0.03 * ( gLightControlNode.TargetSpeed -  gLightControlNode.Speed );
      gLightControlNode.LocalTransform.RotateToWorldRad( gLightControlNode.Speed * deltaTime, g_Up3v );
      }
   }

//var gSecondLightControlNode;

//function InitSecondLightControlNode()
//   {
//   gSecondLightControlNode = new SceneNodes();
//   gSecondLightControlNode.LightNum = 40;
//   gSecondLightControlNode.Radius = 75;
//   gSecondLightControlNode.LightMaxHeight = 60;
//   gSecondLightControlNode.Smoothness = 0.1;

//   gSecondLightControlNode.LightsPerCycle = 17;
//   gSecondLightControlNode.HeightPerCycle = 75;
//   gSecondLightControlNode.SpiralScalar = Math.PI * 2 / gSecondLightControlNode.LightsPerCycle;
//   gSecondLightControlNode.yOffset = -gSecondLightControlNode.HeightPerCycle * ( gSecondLightControlNode.LightNum / gSecondLightControlNode.LightsPerCycle ) / 2;
//   gSecondLightControlNode.SampleShift = 0;
//   gSecondLightControlNode.SampleShiftSpeed = 0.001;

//   var scalar = gSecondLightControlNode.SpiralScalar;
//   var yOffset = gSecondLightControlNode.yOffset;
//   for( var i = 0; i < gSecondLightControlNode.LightNum; ++i )
//      {
//      var lightPos = vec3.fromValues( 
//         gSecondLightControlNode.Radius * Math.cos( scalar * i ), 
//         gSecondLightControlNode.HeightPerCycle / ( Math.PI * 2 ) * scalar * i + yOffset, 
//         gSecondLightControlNode.Radius * Math.sin( scalar * i )
//         );
//      var lightColor = GetRandomColor();;

//      var light = new LightCubeSceneNode( lightCubeShader, lightColor, lightColor, lightColor );
//      light.LocalTransform.SetToWorldPosition( lightPos );
//      gSecondLightControlNode.AddChild( light );

//      }

//   globalScene.AddSceneNode( gSecondLightControlNode, 1 );

//   gSecondLightControlNode.OnUpdate =  UpdateSecondLights;
//   }

//Math.fmod = function (a,b) { return Number((a - (Math.floor(a / b) * b)).toPrecision(8)); };

//function UpdateSecondLights()
//   {
//   if( !gLightControlNode.AudioResource.IsLoaded )
//      {
//      return;
//      }

//   gSecondLightControlNode.LocalTransform.RotateToWorldRad( -0.01, g_Up3v );

//   if( !gLightControlNode.AudioResource.audio.paused )
//      {
//      gSecondLightControlNode.SampleShift += gSecondLightControlNode.SampleShiftSpeed;
//      while( gSecondLightControlNode.SampleShift >= 1.0 )
//         {
//         gSecondLightControlNode.SampleShift -= 1.0;
//         }
//      //console.log( gSecondLightControlNode.SampleShift );
//      var scalar = gSecondLightControlNode.SpiralScalar;
//      var yOffset = gSecondLightControlNode.yOffset;

//      for( var i in gSecondLightControlNode.ChildNodes )
//         {
//         var sampleIdxRatio = i / gSecondLightControlNode.ChildNodes.length + gSecondLightControlNode.SampleShift;
//         if( sampleIdxRatio >= 1 )
//            {
//            sampleIdxRatio -= 1;
//            }
//         var freqIdx = Math.min( Math.ceil( gLightControlNode.AudioResource.frequencyData.length * sampleIdxRatio ), gLightControlNode.AudioResource.frequencyData.length - 1 );

//         var normalizedFreq = gLightControlNode.AudioResource.frequencyData[ freqIdx ] / 255;

//         var lightPos = gSecondLightControlNode.ChildNodes[ i ].LocalTransform.GetToWorldPosition();
//         var baseY = gSecondLightControlNode.HeightPerCycle / ( Math.PI * 2 ) * scalar * i + yOffset;
//         var targetY = baseY + normalizedFreq * gSecondLightControlNode.LightMaxHeight;
//         lightPos[ 1 ] += gSecondLightControlNode.Smoothness * ( targetY - lightPos[ 1 ] );
//         gSecondLightControlNode.ChildNodes[ i ].LocalTransform.SetToWorldPosition( lightPos );
//         }
//      }
      
//   }

var gLightBrightnessControlNode;

function InitLightBrightnessControlNode()
   {
   gLightBrightnessControlNode = new SceneNodes();
   gLightBrightnessControlNode.LightNum = 70;
   gLightBrightnessControlNode.Radius = 80;
   gLightBrightnessControlNode.AmbientScalar = 0.2;
   gLightBrightnessControlNode.DiffuseScalar = 0.2;
   gLightBrightnessControlNode.SpecularScalar = 1.0;

   gLightBrightnessControlNode.LightBrightMaxScalar = 1.0;
   gLightBrightnessControlNode.LightBrightMinScalar = 0.1;
   gLightBrightnessControlNode.GammaPower = {};
   gLightBrightnessControlNode.GammaPower.Min = 0.1
   gLightBrightnessControlNode.GammaPower.Max = 5.0;
   gLightBrightnessControlNode.GammaPower.Value = 1.7;
   gLightBrightnessControlNode.GammaScalar = {};
   gLightBrightnessControlNode.GammaScalar.Min = 0.1
   gLightBrightnessControlNode.GammaScalar.Max = 20.0;
   gLightBrightnessControlNode.GammaScalar.Value = 8.5;
   gLightBrightnessControlNode.Smoothness = 0.2;

   var deltaRad = Math.PI * 2 / gLightBrightnessControlNode.LightNum;
   var lightPos = vec3.scale( vec3.create(), g_Left3v, gLightBrightnessControlNode.Radius );

   var red = vec4.fromValues( 1, 0, 0, 1 );
   var green = vec4.fromValues( 0, 1, 0, 1 );
   var blue = vec4.fromValues( 0, 0, 1, 1 );
   for( var i = 0; i < gLightBrightnessControlNode.LightNum; ++i )
      {
      var idxRatio = i / gLightBrightnessControlNode.LightNum;
      var lightColor = GetLerpedGrayCodeColor( idxRatio );
      //if( idxRatio <= 0.33 ) // red lerp with green
      //   { 
      //   lightColor = colorLerp( idxRatio / 0.33, red, green );
      //   }
      //else if( idxRatio <= 0.66 )
      //   {
      //   lightColor = colorLerp( ( idxRatio - 0.33 ) / 0.33, green, blue );
      //   }
      //else
      //   {
      //   lightColor = colorLerp( ( idxRatio - 0.66 ) / 0.33, blue, red );
      //   }
      //var light = new LightCubeSceneNode( lightCubeShader, lightColor, lightColor, lightColor );
      var light = GenerateLightNode( lightColor, gLightBrightnessControlNode.AmbientScalar, gLightBrightnessControlNode.DiffuseScalar, gLightBrightnessControlNode.SpecularScalar ); 
      light.LocalTransform.SetToWorldPosition( lightPos );
      light.Brightness = 1;
      light.OrigAmbient = vec4.clone( light.Ambient );
      light.OrigDiffuse = vec4.clone( light.Diffuse );
      light.OrigSpecular = vec4.clone( light.Specular );
      gLightBrightnessControlNode.AddChild( light );
      vec3.rotateY( lightPos, lightPos, g_Zero3v, deltaRad );
      }
   gLightBrightnessControlNode.LocalTransform.RotateFromWorldRad( Math.PI / 4, g_Forward3v );

   globalScene.AddSceneNode( gLightBrightnessControlNode, 1 );

   gLightBrightnessControlNode.OnUpdate =  UpdateLightsBrightness;
   }

function UpdateLightsBrightness( deltaTime )
   {
   if( !gLightControlNode.AudioResource.IsLoaded )
      {
      return;
      }
   
   if( !gLightControlNode.AudioResource.audio.paused )
      {
      for( var i in gLightBrightnessControlNode.ChildNodes )
         {
         var light = gLightBrightnessControlNode.ChildNodes[ i ];
         var lightVec = light.GlobalTransform.GetToWorldPosition();
         lightVec[ 1 ] = 0; // drop height
         vec3.normalize( lightVec, lightVec );
         // normalize
        // vec3.multiply( lightVec, lightVec, gLightBrightnessControlNode.Nomalizer );
         var cos = lightVec[ 2 ];
         var leftCos = lightVec[ 0 ];
         var freqIdxRatio = ( cos + 1 ) * 0.25;
         if( leftCos < 0 )
            {
            freqIdxRatio = 1 - freqIdxRatio;
            }

         var normalizedFreq = gLightControlNode.GetNormalizedFreq( freqIdxRatio );

         var prevBrightness = light.Brightness;
         var newBirhgtness = prevBrightness + gLightBrightnessControlNode.Smoothness * ( normalizedFreq * gLightBrightnessControlNode.LightBrightMaxScalar - prevBrightness );       
         newBirhgtness = Math.max( newBirhgtness, gLightBrightnessControlNode.LightBrightMinScalar );
         var colorScalar = gLightBrightnessControlNode.GammaScalar.Value * Math.pow( newBirhgtness, gLightBrightnessControlNode.GammaPower.Value );
        // var colorScalar = newBirhgtness;
         ScaleColor( light.Ambient, colorScalar, light.OrigAmbient );
         ScaleColor( light.Diffuse, colorScalar, light.OrigDiffuse );
         ScaleColor( light.Specular, colorScalar, light.OrigSpecular );

         light.Brightness = newBirhgtness;
         gLightBrightnessControlNode.ChildNodes[ i ].LocalTransform.RotateFromOriginRad( gLightControlNode.Speed * deltaTime, g_Left3v );
         
         }
      gLightBrightnessControlNode.LocalTransform.RotateFromWorldRad( gLightControlNode.Speed * deltaTime, g_Up3v );
      }
   }


var gLightScaleControlNode;

function InitLightScaleControlNode()
   {
   gLightScaleControlNode = new SceneNodes();
   gLightScaleControlNode.LightNum = 40;
   gLightScaleControlNode.Radius = 120;
   gLightScaleControlNode.AmbientScalar = 0.1;
   gLightScaleControlNode.DiffuseScalar = 0.1;
   gLightScaleControlNode.SpecularScalar = 1.0;

   gLightScaleControlNode.LightScale = {};
   gLightScaleControlNode.LightScale.Min = 1;
   gLightScaleControlNode.LightScale.Max = 60.0;

   gLightScaleControlNode.Smoothness = 0.2;
   var invRadius = 1 / gLightScaleControlNode.Radius;
   gLightScaleControlNode.Nomalizer = vec3.fromValues( invRadius, invRadius, invRadius );

   var deltaRad = Math.PI * 2 / gLightScaleControlNode.LightNum;
   var lightPos = vec3.scale( vec3.create(), g_Left3v, gLightScaleControlNode.Radius );

   var red = vec4.fromValues( 1, 0, 0, 1 );
   var green = vec4.fromValues( 0, 1, 0, 1 );
   var blue = vec4.fromValues( 0, 0, 1, 1 );
   for( var i = 0; i < gLightScaleControlNode.LightNum; ++i )
      {
      var idxRatio = i / gLightScaleControlNode.LightNum;
      var lightColor = GetRandomColor();

      //var light = new LightCubeSceneNode( lightCubeShader, lightColor, lightColor, lightColor );
      var light = GenerateLightNode( lightColor, gLightScaleControlNode.AmbientScalar, gLightScaleControlNode.DiffuseScalar, gLightScaleControlNode.SpecularScalar );
      light.LocalTransform.SetToWorldPosition( lightPos );
      light.Scale = 1;
      gLightScaleControlNode.AddChild( light );
      vec3.rotateY( lightPos, lightPos, g_Zero3v, deltaRad );
      }
   gLightScaleControlNode.LocalTransform.RotateFromWorldRad( -Math.PI / 4, g_Forward3v );

   globalScene.AddSceneNode( gLightScaleControlNode, 1 );

   gLightScaleControlNode.OnUpdate =  UpdateLightsScale;
   }

function UpdateLightsScale()
   {
   if( !gLightControlNode.AudioResource.IsLoaded )
      {
      return;
      }
   
   if( !gLightControlNode.AudioResource.audio.paused )
      {
      for( var i in gLightScaleControlNode.ChildNodes )
         {
         var light = gLightScaleControlNode.ChildNodes[ i ];

         var normalizedFreq = gLightControlNode.GetNormalizedFreq( i / gLightScaleControlNode.ChildNodes.length );

         var prevScale = light.Scale;
         var newScale = prevScale + gLightScaleControlNode.Smoothness * ( gLightScaleControlNode.LightScale.Min + normalizedFreq * gLightScaleControlNode.LightScale.Max - prevScale );       
         newScale = Math.max( newScale, gLightScaleControlNode.LightScale.Min );
         var scalar = newScale / prevScale;

         mat4.scale( light.LocalTransform.GetToWorld(), light.LocalTransform.GetToWorld(), vec3.fromValues( 1, scalar, 1 ) );
         //ScaleColor( light.Ambient ,colorScalar, light.OrigColor );
         light.Scale = newScale;
         gLightScaleControlNode.ChildNodes[ i ].LocalTransform.RotateFromOriginRad( gLightControlNode.Speed * -deltaTime, g_Left3v );
         
         }
      gLightScaleControlNode.LocalTransform.RotateFromWorldRad( gLightControlNode.Speed * -deltaTime * 2, g_Up3v );
      }
   }