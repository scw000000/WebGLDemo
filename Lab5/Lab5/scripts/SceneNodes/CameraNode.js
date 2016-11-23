class CameraNode extends SceneNodes
   {
   constructor()
      {
      super();
      this.Fov = 45;
      this.Aspect = 1.0;
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
      var globalTransform = new Transform();
      globalTransform.SetToWorld( this.GetGlobalTransform() );
      // Setting view matrix
      var position = globalTransform.GetToWorldPosition();
      var targetPosition = vec3.add( vec3.create(), position, globalTransform.GetForwardVector() );
      mat4.lookAt( this.VMatrix, position, targetPosition, globalTransform.GetUpVector() );
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


