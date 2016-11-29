class Scene
   {
   constructor()
      {
      this.TransformStack = new TransformStack();
      // construct a empty dummy node
      this.RootNode = new SceneNodes();

      this.DeferredPassNodes = new SceneNodes();
      this.RootNode.AddChild( this.DeferredPassNodes );

      this.SkySpherePassNode = new SceneNodes();
      this.RootNode.AddChild( this.SkySpherePassNode );

      this.LightPassNode = new SceneNodes();
      this.RootNode.AddChild( this.LightPassNode );
      
      this.CameraNode = new CameraNode();
      //this.AddSceneNode( this.CameraNode );
      }

   AddSceneNode( sceneNode, pass )
      {
      if( sceneNode == null )
         {
         return;
         }
      if( pass == null )
         {
         this.RootNode.AddChild( sceneNode );
         }
      else if( pass == 0 )
         {
         this.DeferredPassNodes.AddChild( sceneNode );
         }
      else if( pass == 1 )
         {     
         this.LightPassNode.AddChild( sceneNode );
         gLightManager.AddLight( sceneNode );
         }
      else if( pass == 2 )
         {
         this.SkySpherePassNode.AddChild( sceneNode );
         }
      
      }

   OnRestore()
      {
      this.RootNode.OnRestore();
      }

   OnUpdate( deltaTime )
      {
      this.RootNode.UpdateChildren( deltaTime )
      }

   OnRender()
      {
      this.CameraNode.SetVPMatrix();
      if( this.RootNode != null && this.CameraNode != null )
         {
         this.DeferredPassNodes.RenderChildren();
         gSSAODrawer.DrawSSAO();
         gSSAODrawer.DrawBlur();
         gDeferredDrawer.FinalRender();
         this.LightPassNode.RenderChildren();
         this.SkySpherePassNode.RenderChildren();
         gBloomDrawer.DrawGussianBlur();
         ouputBuffer();
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

   GetPMatrix()
      {
      if( this.CameraNode == null )
         {
         throw "Null camera node!";
         }
      return this.CameraNode.GetPMatrix();
      }

   }