class CameraController extends Controller
   {

   DelegateUpdate()
      {
      
      // W
      if ( this.KeyPressed[ 83 ] ) 
         {
         globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0, -0.1 ) );
         }

      // S
      if ( this.KeyPressed[ 87 ] ) 
         {
         globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0, 0.1 ) );
         }

      // A
      if ( this.KeyPressed[ 65 ] ) 
         {
         globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0.1, 0, 0 ) );
         }

      // D
      if ( this.KeyPressed[ 68 ] ) 
         {
         globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( -0.1, 0, 0 ) );
         }

      // Space
      if ( this.KeyPressed[ 32 ] ) 
         {
         globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, 0.1, 0 ) );
         }

      // C
      if ( this.KeyPressed[ 67 ] ) 
         {
         globalScene.CameraNode.LocalTransform.AddFromWorldPosition( vec3.fromValues( 0, -0.1, 0 ) );
         }

      // Left Arrow
      if ( this.KeyPressed[ 37 ] ) 
         {
         globalScene.CameraNode.LocalTransform.RotateToWorldRad( 0.05, g_Up3v );
         }

      // Right arrow
      if ( this.KeyPressed[ 39 ] ) 
         {
         globalScene.CameraNode.LocalTransform.RotateToWorldRad( -0.05, g_Up3v );
         }

      // Up arrow
      if ( this.KeyPressed[ 38 ] ) 
         {
         globalScene.CameraNode.LocalTransform.RotateFromWorldRad( -0.05, g_Left3v );
         }

      // Down arrow
      if ( this.KeyPressed[ 40 ] ) 
         {
         globalScene.CameraNode.LocalTransform.RotateFromWorldRad( 0.05, g_Left3v );
         }

      if( this.MouseBottonPressed[ 0 ] )
         {
         this.SetShowingCursor( false );
         globalScene.CameraNode.LocalTransform.RotateToWorldRad( cameraController.DeltaMousePos[ 0 ] , g_Up3v );
         globalScene.CameraNode.LocalTransform.RotateFromWorldRad( cameraController.DeltaMousePos[ 1 ], g_Left3v );
         }
      else
         {
         this.SetShowingCursor( true );
         }
      }

   }