class RobotController extends Controller
   {
   DelegateUpdate( deltaTime )
      {
      // W and F: camera forward
      if ( this.KeyPressed[ 87 ] ) 
         {
         globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0, deltaTime * 30 ) );
         }

      // S and B: camera move backward
      if ( this.KeyPressed[ 83 ] || this.KeyPressed[ 66 ] ) 
         {
         globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0, -deltaTime * 30 ) );
         }

      // A and L: camera move left
      if ( this.KeyPressed[ 65 ] || this.KeyPressed[ 76 ] ) 
         {
         globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( deltaTime * 30, 0, 0 ) );
         }

      // D and R: camera move right
      if ( this.KeyPressed[ 68 ] || this.KeyPressed[ 82 ] ) 
         {
         globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( -deltaTime * 30, 0, 0 ) );
         }

      // Space: part move upward
      if ( this.KeyPressed[ 32 ] || this.KeyPressed[ 70 ] ) 
         {
          globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, deltaTime * 30, 0 ) );
         }

      // C: part move downward
      if ( this.KeyPressed[ 67 ] ) 
         {
          globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, -deltaTime * 30, 0 ) );
         }

      // Left Arrow: camera rotate global Y axis
      if ( this.KeyPressed[ 37 ] || this.KeyPressed[ 72 ] ) 
         {
         globalScene.CameraNode.LocalTransform.RotateToWorldRad( deltaTime, g_Up3v );
         }

      // Right arrow: camera rotate global Y axis
      if ( this.KeyPressed[ 39 ] || this.KeyPressed[ 75 ] ) 
         {
         globalScene.CameraNode.LocalTransform.RotateToWorldRad( -deltaTime, g_Up3v );
         }

      // Up arrow: camera rotate local X axis
      if ( this.KeyPressed[ 38 ] || this.KeyPressed[ 85 ] ) 
         {
         globalScene.CameraNode.LocalTransform.RotateFromWorldRad( -deltaTime, g_Left3v );
         }

      // Down arrow: camera rotate local X axis
      if ( this.KeyPressed[ 40 ] || this.KeyPressed[ 74 ] ) 
         {
         globalScene.CameraNode.LocalTransform.RotateFromWorldRad( deltaTime, g_Left3v );
         }

      if( this.MouseBottonPressed[ 0 ] )
         {
      //   controllingNode.LocalTransform.RotateFromWorldRad( this.DeltaMousePos[ 0 ] , g_Up3v );
      //   controllingNode.LocalTransform.RotateFromWorldRad( this.DeltaMousePos[ 1 ] , g_Left3v );
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
      //      controllingNode.LocalTransform.Scale( vec3.fromValues( scaleFactor, scaleFactor, scaleFactor ) );
            }
         else
            {
            var scaleFactor = 1 - Math.abs( this.DeltaMousePos[ 1 ] );
        //    controllingNode.LocalTransform.Scale( vec3.fromValues( scaleFactor, scaleFactor, scaleFactor ) );
            }
         
         this.SetShowingCursor( false );
         }
      else if( this.MouseBottonPressed[ 1 ] == false )
         {
         this.SetShowingCursor( true );
         }
      }

   }