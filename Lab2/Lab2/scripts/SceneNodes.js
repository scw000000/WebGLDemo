class SceneNodes
   {
   constructor()
      {
      this.ChildNodes = [];
      this.Transform = mat4.create();
      this.VertexPosBuffer = null;
      this.IndexBuffer = null;
      this.Program = null;
      }

   AddChild( child )
      {
      this.ChildNodes.push( child );
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
      globalScene.PushTransform( this.Transform );
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

   SetTransform( matrix )
      {
      mat4.copy( this.Transform, matrix);
      }

   SetToWorldPosition( newPos )
      {
      this.Transform[ 12 ] = newPos[ 0 ];
      this.Transform[ 13 ] = newPos[ 1 ];
      this.Transform[ 14 ] = newPos[ 2 ];
      }

   AddToWorldPosition( offset )
      {
      var newPos = this.GetToWorldPosition();
      this.SetToWorldPosition( vec3.add( newPos, newPos, offset ) );
      }

   AddFromWorldPosition( offset )
      {
      var globalOffset4v = vec4.fromValues( offset[ 0 ], offset[ 1 ], offset[ 2 ], 0 );
      vec4.transformMat4( globalOffset4v, globalOffset4v, this.Transform );
      this.AddToWorldPosition( globalOffset4v );
      }

   GetToWorldPosition()
      {
      return mat4.getTranslation( vec3.create(), this.Transform );
      }

   GetForwardVector()
      {
      var forward4v = vec4.transformMat4( vec4.create(), g_Forward4v, this.Transform );
      return vec3.fromValues( forward4v[ 0 ], forward4v[ 1 ], forward4v[ 2 ] );
      }

   RotateToWorldRad( rad, axis )
      {
      mat4.rotate( this.Transform, this.Transform, rad, axis );
      }

   RotateFromWorldRad( rad, axis )
      {
      var localAxis4v = vec4.fromValues( axis[ 0 ], axis[ 1 ], axis[ 2 ], 0 );
      vec4.transformMat4( localAxis4v, localAxis4v, this.Transform );
      mat4.rotate( this.Transform, this.Transform, rad, transformMat4 );
      }

   }