class Scene
   {
   constructor()
      {
      this.TransformStack = new TransformStack();
      // construct a empty dummy node
      this.RootNode = new SceneNodes();
      this.CameraNode = new CameraNode();
      //this.AddSceneNode( this.CameraNode );
      }

   AddSceneNode( sceneNode )
      {
      if( sceneNode == null )
         {
         return;
         }
      this.RootNode.AddChild( sceneNode );
      }

   OnRestore()
      {
      this.RootNode.OnRestore();
      }

   OnRender()
      {
      this.CameraNode.SetVPMatrix();
      if( this.RootNode != null && this.CameraNode != null )
         {
         this.RootNode.RenderChildren();
         }
      else
         {
         throw( "empty root node or camera" );
         }
      }

   PushTransform( matrix )
      {
      this.TransformStack.PushTransform( matrix );
      }

   PopTransform()
      {
      this.TransformStack.PopTransform();
      }

   GetTopTransform()
      {
      return this.TransformStack.GetTopTransform();
      }

   
   GetMVPMatrix()
      {
      if( this.CameraNode == null )
         {
         throw "Null camera node!";
         }
      return this.CameraNode.GetMVPMatrix();
      }

   GetMVMatrix()
      {
      if( this.CameraNode == null )
         {
         throw "Null camera node!";
         }
      return this.CameraNode.GetMVMatrix();
      }

   }