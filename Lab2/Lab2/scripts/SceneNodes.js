function SceneNodes()
   {

   };

SceneNodes.prototype = 
   {
   m_ChildNodes: [],
   m_Transform: null
   };

SceneNodes.prototype.PreRender = function()
   {
   globalScene.PushTransform( this.m_Transform );
   };

SceneNodes.prototype.OnRender = function()
   {

   };

SceneNodes.prototype.PostRender = function()
   {
   globalScene.PopTransform();
   };

SceneNodes.prototype.RenderChildren = function()
   {
   for( var childNode in this.m_ChildNodes )
      {
      childNode.PreRender();
      childNode.OnRender();
      childNode.RenderChildren();
      childNode.PostRender();
      }
   };