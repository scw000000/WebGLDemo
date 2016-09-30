function Scene ()
   {
   this.m_TransformStack = new TransformStack();

   };

Scene.prototype = 
   {
   m_RootNode: null,
   m_CameraNode: null,
   m_TransformStack: null,
   }

Scene.prototype.OnRender = function()
   {
   if( this.m_RootNode != null && this.m_CameraNode != null )
      {
      this.m_RootNode.PreRender();
      this.m_RootNode.OnRender();
      this.m_RootNode.RenderChildren();
      this.m_RootNode.PostRender();
      }
   else
      {
      alert( "empty root node or camera" );
      }
   };

Scene.prototype.PushTransform = function( matrix )
   {
   this.m_TransformStack.PushTransform();
   };