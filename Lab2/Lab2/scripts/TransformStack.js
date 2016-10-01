class TransformStack
   {
   constructor()
      {
      this.Stack = [];
      }

   GetTopTransform()
      {
      if( this.Stack.length <= 0 )
         {
         throw "Stack is empty, return";
         }
      return this.Stack[ this.Stack.length - 1 ]
      }

   PushTransform( matrix ) 
      {
      var copy = mat4.clone( matrix );
      if( this.Stack.length > 0 )
         {
         var topTransform = this.GetTopTransform();
         copy = mat4.multiply( topTransform, copy );
         }
      this.Stack.push( copy );
      }

   PopTransform()
      {
      if ( this.Stack.length == 0 )
         {
         throw "Invalid pop, stack is empty!";
         }
      var copy = this.Stack.pop();
	   return copy; 
      }
   }