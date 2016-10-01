//this file is for compiling and linking shaders to get final program

function getShader( gl, id )
   {
   var shaderScript = document.getElementById( id );
   if ( !shaderScript )
      {
      return null;
      }  

   var str = "";
   var k = shaderScript.firstChild;
   while ( k )
      {
      if ( k.nodeType == 3 )
         {
         str += k.textContent;
         }
      k = k.nextSibling;
      }

   var shader;
   if ( shaderScript.type == "x-shader/x-fragment" )
      {
      shader = gl.createShader( gl.FRAGMENT_SHADER );
      } 
   else if ( shaderScript.type == "x-shader/x-vertex" )
      {
      shader = gl.createShader( gl.VERTEX_SHADER );
      } 
   else
      {
      return null;
      }

   gl.shaderSource( shader, str );
   gl.compileShader( shader );

   if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) )
      {
      alert( gl.getShaderInfoLog( shader ) );
      return null;
      }

   return shader;
   }

function initShaders( vsId, fsId )
   {

   var program = gl.createProgram();

   var vertexShader = getShader( gl, vsId );
   var fragmentShader = getShader( gl, fsId );

   gl.attachShader( program, vertexShader );
   gl.attachShader( program, fragmentShader );
   gl.linkProgram( program );

   if ( !gl.getProgramParameter( program, gl.LINK_STATUS ) )
      {
      alert( "Could not initialise shaders" );
      }

   gl.useProgram( program );

   program.vertexPositionAttribute = gl.getAttribLocation( program, "aVertexPosition" );
   gl.enableVertexAttribArray( program.vertexPositionAttribute );

   program.mvpMatrixUniform = gl.getUniformLocation( program, "uMVPMatrix" );
   return program;
   }

