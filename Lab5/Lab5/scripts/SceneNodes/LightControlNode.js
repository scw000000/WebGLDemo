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

function InitLightControlNode( audioRes )
   {
   gLightControlNode = new SceneNodes();
   gLightControlNode.LightNum = 80;
   gLightControlNode.Radius = 200;
   gLightControlNode.AudioResource = audioRes;
   gLightControlNode.AudioResource.ShouldPlay = true;
   gLightControlNode.LightMaxHeight = 100;
   gLightControlNode.Smoothness = 0.3;

   var deltaRad = Math.PI * 2 / gLightControlNode.LightNum;
   var lightPos = vec3.scale( vec3.create(), g_Left3v, gLightControlNode.Radius );

   var red = vec4.fromValues( 1, 0, 0, 1 );
   var green = vec4.fromValues( 0, 1, 0, 1 );
   var blue = vec4.fromValues( 0, 0, 1, 1 );
   for( var i = 0; i < gLightControlNode.LightNum; ++i )
      {
      var idxRatio = i / gLightControlNode.LightNum;
      var lightColor;
      if( idxRatio <= 0.33 ) // red lerp with green
         { 
         lightColor = colorLerp( idxRatio / 0.33, red, green );
         }
      else if( idxRatio <= 0.66 )
         {
         lightColor = colorLerp( ( idxRatio - 0.33 ) / 0.33, green, blue );
         }
      else
         {
         lightColor = colorLerp( ( idxRatio - 0.66 ) / 0.33, blue, red );
         }

      var light = new LightCubeSceneNode( lightCubeShader, lightColor, lightColor, lightColor );
      light.LocalTransform.SetToWorldPosition( lightPos );
      gLightControlNode.AddChild( light );

      vec3.rotateY( lightPos, lightPos, g_Zero3v, deltaRad );
      }

   globalScene.AddSceneNode( gLightControlNode, 1 );

   gLightControlNode.OnUpdate =  UpdateLights;
   }

function UpdateLights()
   {
   if( !gLightControlNode.AudioResource.IsLoaded )
      {
      return;
      }
   if( gLightControlNode.AudioResource.ShouldPlay && gLightControlNode.AudioResource.audio.paused )
      {
      gLightControlNode.AudioResource.context = new AudioContext();
      gLightControlNode.AudioResource.analyser = gLightControlNode.AudioResource.context.createAnalyser();
      
      gLightControlNode.AudioResource.audioSrc = gLightControlNode.AudioResource.context.createMediaElementSource( gLightControlNode.AudioResource.audio );

      gLightControlNode.AudioResource.audioSrc.connect( gLightControlNode.AudioResource.analyser );
      gLightControlNode.AudioResource.audioSrc.connect( gLightControlNode.AudioResource.context.destination );

      gLightControlNode.AudioResource.analyser.connect( gLightControlNode.AudioResource.context.destination );

      gLightControlNode.AudioResource.frequencyData = new Uint8Array( gLightControlNode.AudioResource.analyser.frequencyBinCount);
      
      gLightControlNode.AudioResource.audio.play();
      gLightControlNode.AudioResource.audio.loop = true;
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
       //  var rightVec = vec3.fromValues( lightPos[ 2 ] / gLightControlNode.Radius, 0, lightPos[ 0 ] / gLightControlNode.Radius );
         var leftCos = lightPos[ 2 ] / gLightControlNode.Radius;
         var freqIdxRatio = ( cos + 1 ) * 0.25;
         if( leftCos < 0 )
            {
            freqIdxRatio = 1 - freqIdxRatio;
            }

         var freqIdx = Math.ceil( gLightControlNode.AudioResource.frequencyData.length * freqIdxRatio );
         freqIdx = Math.max( 0, Math.min( freqIdx, gLightControlNode.AudioResource.frequencyData.length - 1 ) );
         var normalizedFreq = gLightControlNode.AudioResource.frequencyData[ freqIdx ] / 255;
         
         lightPos[ 1 ] += gLightControlNode.Smoothness * ( normalizedFreq * gLightControlNode.LightMaxHeight - lightPos[ 1 ] );
         vec3.transformMat4( lightPos, lightPos,gLightControlNode.LocalTransform.GetFromWorld() ); // Transthis point to local space
         gLightControlNode.ChildNodes[ i ].LocalTransform.SetToWorldPosition( lightPos );
         }
      }
   gLightControlNode.LocalTransform.RotateToWorldRad( 0.01, g_Up3v );
      
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