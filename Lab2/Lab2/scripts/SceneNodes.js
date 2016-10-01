class SceneNodes
   {
   constructor()
      {
      this.ChildNodes = [];
      this.Transform = mat4.create();
      //var position = vec3.create();
      //position[0] = 1;
      //mat4.translate( this.Transform, this.Transform, vec3.set( vec3.create(), 2, 3, 5 ) );
      //mat4.getTranslation( position, this.Transform )
      //console.log( position );
      }

   AddChild( child )
      {
      this.ChildNodes.push( child );
      }

   DelegateOnRestore(){ }

   OnRestore() 
      {
      this.DelegateOnRestore();
      for( var childNode in this.ChildNodes )
         {
         childNode.OnRestore();
         }
      }

   PreRender()
      {
      globalScene.PushTransform( this.Transform );
      };

   OnRender() { }

   PostRender() 
      {
      globalScene.PopTransform();
      }

   RenderChildren()
      {
      for( var childNode in this.ChildNodes )
         {
         childNode.PreRender();
         childNode.OnRender();
         childNode.RenderChildren();
         childNode.PostRender();
         }
      }

   SetTransform( matrix )
      {
      mat4.copy( this.Transform, matrix);
      }

   }