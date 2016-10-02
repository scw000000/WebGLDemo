class CameraNode extends SceneNodes
   {
   constructor()
      {
      super();
      this.Fov = 45;
      this.Aspect = 1.0;
      this.NearDist = 0.1;
      this.FarDist = 1000.0;
      this.ProjectMatrix = mat4.create();
      this.ViewMatrix = mat4.create();
      }

   DelegateOnRestore()
      {
      this.SetToWorldPosition( vec3.fromValues( 0, 0, -10 ) );
      mat4.perspective( this.ProjectMatrix, this.Fov, this.Aspect, this.NearDist, this.FarDist );
      } 

   SetViewMatrix()
      {
      // Setting view matrix
      var position = this.GetToWorldPosition();
      var targetPosition = vec3.add( vec3.create(), position, this.GetForwardVector() );
      mat4.lookAt( this.ViewMatrix, position, targetPosition, this.GetUpVector() );
      }

   PreRender()
      {
      super.PreRender();
      this.SetViewMatrix();
      }

   GetMVPMatrix()
      {
      var ret = mat4.clone( globalScene.GetTopTransform() );
      mat4.mul( ret, this.ViewMatrix, ret );
      return mat4.mul( ret, this.ProjectMatrix, ret );
      }

   }


