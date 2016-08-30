class Camera
   {
   constructor( eye, center, up )
      {
      //this.eye = eye;
      //this.center = center;
      //this.up = up;
      mat4.lookat( this.m_PMat, eye, center, up );
      }

   };