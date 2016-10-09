
class Transform
   {
   constructor()
      {
      this.ToWorld = mat4.create();
      this.FromWorld = mat4.create();
      this.IsFromWorldDirty = false;
      this.Parent = null;
      }

   GetToWorld()
      {
      return this.ToWorld;
      }
   
   SetIsFromWorldDirty( isDirty )
      {
      this.IsFromWorldDirty = isDirty;
      }

   GetFromWorld()
      {
      if( this.IsFromWorldDirty )
         {
         mat4.invert( this.FromWorld, this.ToWorld );
         this.SetIsFromWorldDirty( false );
         }
      return this.FromWorld;
      }

   SetToWorld( matrix )
      {
      mat4.copy( this.ToWorld, matrix);
      this.SetIsFromWorldDirty( true );
      }

   SetToWorldPosition( newPos )
      {
      this.ToWorld[ 12 ] = newPos[ 0 ];
      this.ToWorld[ 13 ] = newPos[ 1 ];
      this.ToWorld[ 14 ] = newPos[ 2 ];
      this.SetIsFromWorldDirty( true );
      }

   AddToWorldPosition( offset )
      {
      var newPos = this.GetToWorldPosition();
      this.SetToWorldPosition( vec3.add( newPos, newPos, offset ) );
      }

   AddFromWorldPosition( offset )
      {
      mat4.translate( this.ToWorld, this.ToWorld, offset );
      this.SetIsFromWorldDirty( true );
      //var globalOffset4v = vec4.fromValues( offset[ 0 ], offset[ 1 ], offset[ 2 ], 0 );
      //vec4.transformMat4( globalOffset4v, globalOffset4v, this.ToWorld );
      //this.AddToWorldPosition( globalOffset4v );
      }

   GetToWorldPosition()
      {
      return mat4.getTranslation( vec3.create(), this.ToWorld );
      }

   GetToWorldVector( local3v )
      {
      var toWorld4v = vec4.fromValues( local3v[ 0 ], local3v[ 1 ], local3v[ 2 ], 0 );
      return vec4.transformMat4( toWorld4v, toWorld4v, this.ToWorld );
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
      this.GetFromWorld();
      var axis4v = vec4.fromValues( axis[ 0 ], axis[ 1 ], axis[ 2 ], 0 );
      vec4.transformMat4( axis4v, axis4v, this.FromWorld );
      this.RotateFromWorldRad( rad, axis4v );
      }

   RotateFromWorldRad( rad, axis )
      {
      mat4.rotate( this.ToWorld, this.ToWorld, rad, axis );
      this.SetIsFromWorldDirty( true );
      }

   }