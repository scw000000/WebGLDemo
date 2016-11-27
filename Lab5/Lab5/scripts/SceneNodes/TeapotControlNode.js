var gTeapotControlNode;

function InitTeapotControlNode()
   {
   gTeapotControlNode = new SceneNodes();
   gTeapotControlNode.TeapotPerLine = 5;  
   gTeapotControlNode.TeapotDistance = 20;  

   var offSet = ( gTeapotControlNode.TeapotPerLine - 1 ) * gTeapotControlNode.TeapotDistance / -2;
   for( var row = 0; row < gTeapotControlNode.TeapotPerLine; ++row )
      {
      for( var col = 0; col < gTeapotControlNode.TeapotPerLine; ++col )
         {
         var teapot = new MeshSceneNode( gDeferredDrawer.GeometryShaderResource, meshRes, textureRes );
         teapot.LocalTransform.SetToWorldPosition( vec3.fromValues( offSet + row *gTeapotControlNode.TeapotDistance, 0, offSet + col *gTeapotControlNode.TeapotDistance ) );
         teapot.LocalTransform.RotateToWorldRad( Math.PI / 4.0, g_Up3v );
         teapot.Shininess = 10.0;
         teapot.MaterialAmbient= vec4.fromValues( 0.1, 0.1, 0.1, 1.0 );
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