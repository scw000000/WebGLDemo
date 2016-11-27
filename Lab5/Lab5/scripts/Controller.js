class Controller
   {
   constructor(  )
      {
      this.KeyPressed = {};
      this.MouseBottonPressed = {};
      this.PrevMousePos = vec2.create();
      this.CurrMousePos = vec2.create();
      this.RealCurrMousePos = vec2.create();
      this.DeltaMousePos = vec2.create();
      }

   OnKeyDown( event ) 
      {
      this.KeyPressed[ event.keyCode ] = true;
      }

   OnKeyUp( event ) 
      {
      this.KeyPressed[ event.keyCode ] = false;
      }

   OnMouseMove( event )
      {
      event = event || window.event; 

      this.RealCurrMousePos[ 0 ] = ( ( event.pageX - canvas.offsetLeft ) / canvasDimension[ 0 ] - 0.5 ) * 2;
      this.RealCurrMousePos[ 1 ] = ( ( event.pageY - canvas.offsetTop ) / canvasDimension[ 1 ] - 0.5 ) * -2;
      }

   OnMouseBottonDown( event )
      {
      this.MouseBottonPressed[ event.button ] = true;
      }

   OnMouseBottonUp( event )
      {
      this.MouseBottonPressed[ event.button ] = false;
      }

   ClearMouseBottonState()
      {
      this.MouseBottonPressed = {};
      }

   // I want to accumulate the mouse shift and process them altogether before rendering
   //, so I use 2 variables to hold current mouse position
   OnUpdate( deltaTime )
      {
      vec2.copy( this.PrevMousePos, this.CurrMousePos );
      vec2.copy( this.CurrMousePos, this.RealCurrMousePos );
      vec2.sub( this.DeltaMousePos, this.CurrMousePos, this.PrevMousePos );

      this.DelegateUpdate( deltaTime );
      //console.log( this.DeltaMousePos[ 0 ] + "  " + this.DeltaMousePos[ 1 ] );
      }

   SetShowingCursor( isShowing )
      {
      if( isShowing )
         {
         document.body.style.cursor = 'auto';
         }
      else
         {
         document.body.style.cursor = 'none';
         }
      }

   DelegateUpdate( deltaTime ){}

   }





