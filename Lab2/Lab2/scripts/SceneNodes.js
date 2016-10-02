class SceneNodes
   {
   constructor()
      {
      this.ChildNodes = [];
      this.Transform = mat4.create();
      this.VertexPosBuffer = null;
      this.VertexIndexBuffer = null;
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

   GetFromWorldTransform()
      {
      return mat4.invert( mat4.create(), this.Transform );
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

   GetToWorldVector( local3v )
      {
      var toWorld4v = vec4.fromValues( local3v[ 0 ], local3v[ 1 ], local3v[ 2 ], 0 );
      return vec4.transformMat4( toWorld4v, toWorld4v, this.Transform );
      }

   GetForwardVector()
      {
      return this.GetToWorldVector( g_Forward3v );
      }

   GetUpVector()
      {
      return this.GetToWorldVector( g_Up3v );
      }

   RotateToWorldRad( rad, axis )
      {
      var fromWorldTransform = this.GetFromWorldTransform();
      var axis4v = vec4.fromValues( axis[ 0 ], axis[ 1 ], axis[ 2 ], 0 );
      vec4.transformMat4( axis4v, axis4v, fromWorldTransform );
      this.RotateFromWorldRad( rad, axis4v );
      }

   RotateFromWorldRad( rad, axis )
      {
      mat4.rotate( this.Transform, this.Transform, rad, axis );
      }

   }