class CameraNode extends SceneNodes
   {
   constructor()
      {
      super();
      this.Fov = 3.14 / 4;
      this.Aspect = 1.0;
      this.NearDist = 1.0;
      this.FarDist = 1000.0;
      this.ProjectMatrix = mat4.create();
      this.ViewMatrix = mat4.create();
      }

   DelegateOnRestore()
      {

      }


   }


