class CameraNode extends SceneNodes
   {
   constructor()
      {
      super();
      this.Fov = 45;
      this.Aspect = 1.0;
      this.NearDist = 1.0;
      this.FarDist = 1000.0;
      this.ProjectMatrix = mat4.create();
      this.ViewMatrix = mat4.create();
      }

   DelegateOnRestore()
      {
      this.SetViewMatrix();
      mat4.perspective( this.ProjectMatrix, this.Fov, this.Aspect, this.NearDist, this.FarDist );
      }

   SetViewMatrix()
      {
      // Setting view matrix
      var position = this.GetToWorldPosition();
      var targetPosition = vec3.create();
      //mat4.lookAt( this.ViewMatrix, position, vec3.add( targetPosition, position, this.GetForwardVector() ), g_Up );
      mat4.lookAt( this.ViewMatrix, vec3.fromValue( 1, 2, 3 ) , vec3.create(), g_Up );
      }

   PreRender()
      {
      super.PreRender();
      SetViewMatrix();
      }

   GetMVPMatrix()
      {
      var ret = mat4.clone( globalScene.GetTopTransform() );
      mat4.mul( ret, this.ViewMatrix, ret );
      return mat4.mul( ret, this.ProjectMatrix, ret );
      }

   }


