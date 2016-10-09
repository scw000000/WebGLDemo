class SceneNodes
   {
   constructor()
      {
      this.ChildNodes = [];
      this.LocalTransform = new Transform();
      this.VertexPosBuffer = null;
      this.VertexIndexBuffer = null;
      this.IndexBuffer = null;
      this.Program = null;
      }

   GetGlobalTransform()
      {
      if( this.Parent == null )
         {
         return mat4.clone( this.LocalTransform.GetToWorld() );
         }
      var parentTransform = this.Parent.GetGlobalTransform();
      return mat4.mul( parentTransform, parentTransform, this.LocalTransform.GetToWorld() );
      }

   AddChild( child )
      {
      this.ChildNodes.push( child );
      child.Parent = this;
      }

   DelegateOnRestore(){ }

   OnRestore() 
      {
      this.DelegateOnRestore();
      for( var i in this.ChildNodes )
         {
         this.ChildNodes[ i ].OnRestore();
         }
      }

   DelegateUpdate(){}

   OnUpdate()
      {
      this.DelegateUpdate();
      for( var i in this.ChildNodes )
         {
         this.ChildNodes[ i ].OnUpdate();
         }
      }

   PreRender()
      {
      globalScene.PushTransform( this.LocalTransform.GetToWorld() );
      };

   OnRender() { }

   PostRender() 
      {
      globalScene.PopTransform();
      }

   RenderChildren()
      {
      for( var i in this.ChildNodes )
         {
         this.ChildNodes[ i ].PreRender();
         this.ChildNodes[ i ].OnRender();
         this.ChildNodes[ i ].RenderChildren();
         this.ChildNodes[ i ].PostRender();
         }
      }
   }