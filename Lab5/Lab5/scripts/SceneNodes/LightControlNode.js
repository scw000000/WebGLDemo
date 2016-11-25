var gLightControlNode;

function GetRandomColor()
   {
   return vec4.fromValues( Math.random(), Math.random(), Math.random(), 1.0 );
   }

function InitLightControlNode()
   {
   gLightControlNode = new SceneNodes();
   gLightControlNode.LightNum = 40;
   gLightControlNode.Radius = 100;
   

   var deltaRad = Math.PI * 2 / gLightControlNode.LightNum;
   var lightPos = vec3.scale( vec3.create(), g_Left3v, gLightControlNode.Radius );
   for( var i = 0; i < gLightControlNode.LightNum; ++i )
      {
      var light = new LightCubeSceneNode( lightCubeShader, GetRandomColor(), GetRandomColor(), GetRandomColor() );
      light.LocalTransform.SetToWorldPosition( lightPos );
      gLightControlNode.AddChild( light );

      vec3.rotateY( lightPos, lightPos, g_Zero3v, deltaRad );
      }

   globalScene.AddSceneNode( gLightControlNode, 1 );

   gLightControlNode.OnUpdate = function()
      {
      gLightControlNode.LocalTransform.RotateToWorldRad( 0.01, g_Up3v );
         
      }
   }