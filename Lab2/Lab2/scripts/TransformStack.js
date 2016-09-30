function TransformStack()
   {
   
   };

TransformStack.prototype = 
   {
   m_Stack: []
   };

TransformStack.prototype.PushTransform = function( matrix ) 
   {
   var copy = mat4.create();
   mat4.set( matrix, copy );
   m_Stack.push( copy );
   }

TransformStack.prototype.PopTransform = function ()
   {
   if ( m_Stack.length == 0 )
      {
      throw "Invalid popMatrix!";
      }
   var copy = m_Stack.pop();
	return copy; 
   }