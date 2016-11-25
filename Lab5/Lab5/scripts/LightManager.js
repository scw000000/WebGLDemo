gLightManager = {};

gLightManager.Init = function()
   {
   gLightManager.LightNodes = [];
   gLightManager.MaximumLightSupported = 50;
   gLightManager.AddLight = function( lightSceneNode )
      {
      if(  lightSceneNode instanceof PointLightSceneNode )
         {
         gLightManager.LightNodes.push( lightSceneNode );
         }
      for( var i in lightSceneNode.ChildNodes )
         {
         gLightManager.AddLight( lightSceneNode.ChildNodes[ i ] );
         }
      }
   }