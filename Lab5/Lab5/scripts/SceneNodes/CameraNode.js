class CameraNode extends SceneNodes
   {
   constructor()
      {
      super();
      this.Fov = 45;
      this.Aspect = gl.viewportWidth / gl.viewportHeight;
      this.NearDist = 0.1;
      this.FarDist = 1000.0;
      this.VMatrix = mat4.create();
      this.PMatrix = mat4.create();
      this.VPMatrix = mat4.create();
      }

   DelegateOnRestore()
      {
      mat4.perspective( this.PMatrix, this.Fov, this.Aspect, this.NearDist, this.FarDist );
      } 

   SetVPMatrix()
      {
     // var globalTransform = new Transform();
    //  globalTransform.SetToWorld( this.GetGlobalTransform() );
      // Setting view matrix
      var position = this.GlobalTransform.GetToWorldPosition();
      var targetPosition = vec3.add( vec3.create(), position, this.GlobalTransform.GetForwardVector() );
      mat4.lookAt( this.VMatrix, position, targetPosition, this.GlobalTransform.GetUpVector() );
      mat4.mul( this.VPMatrix, this.PMatrix, this.VMatrix );
      }

   GetMVPMatrix()
      {
      var ret = mat4.clone( globalScene.GetTopTransform() );
      return mat4.mul( ret, this.VPMatrix, ret );
      }

   GetMVMatrix()
      {
      var ret = mat4.clone( globalScene.GetTopTransform() );
      return mat4.mul( ret, this.VMatrix, ret );
      }

   GetPMatrix()
      {
      return this.PMatrix;
      }
   }


