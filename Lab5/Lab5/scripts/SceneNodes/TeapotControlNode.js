var gTeapotControlNode;

function InitTeapotControlNode()
   {
   gTeapotControlNode = new SceneNodes();
   gTeapotControlNode.TeapotPerLine = 5;  
   gTeapotControlNode.TeapotDistance = 20;  
   gTeapotControlNode.BrightnessThreshold = {};
   gTeapotControlNode.BrightnessThreshold.Min = 0.01;
   gTeapotControlNode.BrightnessThreshold.Value = 0.7;
   gTeapotControlNode.BrightnessThreshold.Max = 1.0;
   var meshRes = new MeshResource();
   meshRes.Load( "teapot.json" );
   var textureResArr = [ new TextureResource(), new TextureResource(), new TextureResource(), new TextureResource(), new TextureResource() ];
   textureResArr[ 0 ].Load( "gray.jpg"  );
   textureResArr[ 1 ].Load( "red.jpg"  );
   textureResArr[ 2 ].Load( "green.jpg"  );
   textureResArr[ 3 ].Load( "lightblue.jpg"  );
   textureResArr[ 4 ].Load( "blue.jpg"  );
   var offSet = ( gTeapotControlNode.TeapotPerLine - 1 ) * gTeapotControlNode.TeapotDistance / -2;
   for( var row = 0; row < gTeapotControlNode.TeapotPerLine; ++row )
      {
      for( var col = 0; col < gTeapotControlNode.TeapotPerLine; ++col )
         {
         if( row == 2 && col == 2 )
            {
            continue;
            }
         var teapot = new MeshSceneNode( gDeferredDrawer.GeometryShaderResource, meshRes, textureResArr[ row ] );
         teapot.LocalTransform.SetToWorldPosition( vec3.fromValues( offSet + row *gTeapotControlNode.TeapotDistance, 8.37, offSet + col *gTeapotControlNode.TeapotDistance ) );
         teapot.LocalTransform.RotateToWorldRad( Math.PI / 4.0, g_Up3v );
         teapot.Shininess = 20.0;
         teapot.MaterialAmbient= vec4.fromValues( 0.05, 0.05, 0.05, 1.0 );
         teapot.MaterialDiffuse = vec4.fromValues( 0.05, 0.05, 0.05, 1.0 );
         teapot.MaterialSpecular = vec4.fromValues( 0.05, 0.05, 0.05, 1.0 );
         gTeapotControlNode.AddChild( teapot );
         }
      }

   globalScene.AddSceneNode( gTeapotControlNode, 0 );

   gTeapotControlNode.OnUpdate = function()
      {
    //  gTeapotControlNode.LocalTransform.RotateToWorldRad( 0.01, g_Up3v );
         
      }
   }