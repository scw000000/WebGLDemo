class RobotController extends Controller
   {
   DelegateUpdate()
      {
      
      // W and F: part move forward
      if ( this.KeyPressed[ 87 ] || this.KeyPressed[ 70 ]) 
         {
         controllingNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0, 0.1 ) );
         }

      // S and B: part move backward
      if ( this.KeyPressed[ 83 ] || this.KeyPressed[ 66 ] ) 
         {
         controllingNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0, -0.1 ) );
         }

      // A and L: part move left
      if ( this.KeyPressed[ 65 ] || this.KeyPressed[ 76 ] ) 
         {
         controllingNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0.1, 0, 0 ) );
         }

      // D and R: part move right
      if ( this.KeyPressed[ 68 ] || this.KeyPressed[ 82 ] ) 
         {
         controllingNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( -0.1, 0, 0 ) );
         }

      // Space: part move upward
      if ( this.KeyPressed[ 32 ] ) 
         {
         controllingNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0.1, 0 ) );
         }

      // C: part move downward
      if ( this.KeyPressed[ 67 ] ) 
         {
         controllingNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, -0.1, 0 ) );
         }
      
      // Q: par rotate local Y axis
      if ( this.KeyPressed[ 81 ] ) 
         {
         controllingNode.LocalTransform.RotateFromWorldRad( 0.05, g_Up3v );
         }

      // E: par rotate local Y axis
      if ( this.KeyPressed[ 69 ] ) 
         {
         controllingNode.LocalTransform.RotateFromWorldRad( -0.05, g_Up3v );
         }

      // U: camera move forward
      if ( this.KeyPressed[ 85 ] ) 
         {
          globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0, 0.1 ) );
         }

      // J: camera move backward
      if ( this.KeyPressed[ 74 ] ) 
         {
          globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0, -0.1 ) );
         }

      // H: camera move left
      if ( this.KeyPressed[ 72 ] ) 
         {
          globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0.1, 0, 0 ) );
         }

      // K: camera move right
      if ( this.KeyPressed[ 75 ] ) 
         {
          globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( -0.1, 0, 0 ) );
         }

      // Left Arrow: camera rotate global Y axis
      if ( this.KeyPressed[ 37 ] ) 
         {
         globalScene.CameraNode.LocalTransform.RotateToWorldRad( 0.05, g_Up3v );
         }

      // Right arrow: camera rotate global Y axis
      if ( this.KeyPressed[ 39 ] ) 
         {
         globalScene.CameraNode.LocalTransform.RotateToWorldRad( -0.05, g_Up3v );
         }

      // Up arrow: camera rotate local X axis
      if ( this.KeyPressed[ 38 ] ) 
         {
         globalScene.CameraNode.LocalTransform.RotateFromWorldRad( -0.05, g_Left3v );
         }

      // Down arrow: camera rotate local X axis
      if ( this.KeyPressed[ 40 ] ) 
         {
         globalScene.CameraNode.LocalTransform.RotateFromWorldRad( 0.05, g_Left3v );
         }

      if( this.MouseBottonPressed[ 0 ] )
         {
         floor.LocalTransform.RotateFromWorldRad( this.DeltaMousePos[ 0 ] , g_Up3v );
         floor.LocalTransform.RotateFromWorldRad( this.DeltaMousePos[ 1 ] , g_Left3v );
         this.SetShowingCursor( false );
         }
      else
         {
         this.SetShowingCursor( true );
         }

      if( this.MouseBottonPressed[ 2 ] )
         {
         if( this.DeltaMousePos[ 1 ] > 0  )
            {
            var scaleFactor = Math.abs( this.DeltaMousePos[ 1 ] ) + 1;
            floor.LocalTransform.Scale( vec3.fromValues( scaleFactor, scaleFactor, scaleFactor ) );
            }
         else
            {
            var scaleFactor = 1 - Math.abs( this.DeltaMousePos[ 1 ] );
            floor.LocalTransform.Scale( vec3.fromValues( scaleFactor, scaleFactor, scaleFactor ) );
            }
         
         this.SetShowingCursor( false );
         }
      else if( this.MouseBottonPressed[ 1 ] == false )
         {
         this.SetShowingCursor( true );
         }
      }

   }