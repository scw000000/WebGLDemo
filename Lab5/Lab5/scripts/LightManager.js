gLightManager = {};

gLightManager.Init = function()
   {
   gLightManager.LightNodes = [];
   gLightManager.LightNum = {};
   gLightManager.LightNum.Max = 200;
   gLightManager.LightNum.Value = 0;
   gLightManager.LightRadiusSqr = {};
   gLightManager.LightRadiusSqr.Min = 1.0;
   gLightManager.LightRadiusSqr.Max = 400;
   gLightManager.LightRadiusSqr.Value = 8100;

   gLightManager.AddLight = function( lightSceneNode )
      {
      if(  lightSceneNode instanceof PointLightSceneNode )
         {
         gLightManager.LightNodes.push( lightSceneNode );
         gLightManager.LightNum.Value = gLightManager.LightNodes.length;

         gLightManager.LightNum.Value = Math.min( gLightManager.LightNum.Value, gLightManager.LightNum.Max );
         }
      for( var i in lightSceneNode.ChildNodes )
         {
         gLightManager.AddLight( lightSceneNode.ChildNodes[ i ] );
         }
      }
   }