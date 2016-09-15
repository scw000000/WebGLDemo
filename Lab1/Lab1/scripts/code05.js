
var gl;
var shaderProgram;
var draw_type = 2;

//////////// Init OpenGL Context etc. ///////////////

function initGL( canvas )
   {
   try
      {
      gl = canvas.getContext( "experimental-webgl" );
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
      } 
   catch ( e )
      {}
   if ( !gl )
      {
      alert( "Could not initialise WebGL, sorry :-(" );
      }
   }

var squareVertexPositionBuffer;
var squareVertexColorBuffer;
var squareVertexIndexBuffer;

var vertices = [];
var indices = [];
var num_vertices;
var num_indices;

function createBarVertices( avgs )
   {
   vertices = [];
   indices = [];

   var num_bars = avgs.length;
   num_vertices = num_bars * 4;
   num_indices = num_bars * 6;

   var min, max;
   var width;
   min = Number( avgs[0] ); 
   max = Number( avgs[0] );
   // find min and max in avgs
   for ( var i = 0; i < num_bars; i++ )
      {
      console.log( "val = " + avgs[i] );
      if ( Number( avgs[i] ) < min ) min = Number( avgs[i] );
      if ( Number( avgs[i] ) > max ) max = Number( avgs[i] );
      }
   width = max - min;
   console.log( "min = " + min + " max = " + max );
   // the highest bar is max bar, which height is 2 - 2 * v_margin, start from -1 + v_margin
   var v_margin = 0.25;
   // the total with of canvas is 2, from -1 to +1
   // each bar is 2h in width, and distance between each bar is h, so each bar take 3h width
   // the x coordinates starts from -1 + h
   var h = 2 / ( 3 * num_bars + 1 );
   for ( var i = 0; i < num_bars; i++ )
      {
      // x, y, z coordinates
      // vertex 0, down left
      vertices.push( -1 + ( 3 * i + 1 ) * h ); vertices.push( -1 + v_margin ); vertices.push( 0.0 );
      // vertex 1, donw right
      vertices.push( -1 + ( 3 * i + 3 ) * h ); vertices.push( -1 + v_margin ); vertices.push( 0.0 );
      // vertex 2, up right
      vertices.push( -1 + ( 3 * i + 3 ) * h ); vertices.push( -1 + v_margin + ( 2 - 2 * v_margin ) * ( avgs[i] - min ) / width ); vertices.push( 0.0 );
      // vertex 3, up left
      vertices.push( -1 + ( 3 * i + 1 ) * h ); vertices.push( -1 + v_margin + ( 2 - 2 * v_margin ) * ( avgs[i] - min ) / width ); vertices.push( 0.0 );

      indices.push( 0 + 4 * i ); indices.push( 1 + 4 * i ); indices.push( 2 + 4 * i );
      indices.push( 0 + 4 * i ); indices.push( 2 + 4 * i ); indices.push( 3 + 4 * i );
      }

   initBuffers();

   drawScene();
   }

////////////////    Initialize VBO  ////////////////////////

function initBuffers()
   {
   squareVertexPositionBuffer = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, squareVertexPositionBuffer );
   gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
   squareVertexPositionBuffer.itemSize = 3;
   squareVertexPositionBuffer.numItems = num_vertices;

   squareVertexIndexBuffer = gl.createBuffer();
   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer );
   gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), gl.STATIC_DRAW );
   squareVertexIndexBuffer.itemsize = 1;
   squareVertexIndexBuffer.numItems = num_indices;
   }

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           window.setTimeout(callback, 1000/60);
         };
})();

function onUpdate() 
   {
   requestAnimFrame( onUpdate );
   if( has_data )
      {
      drawScene();
      }
   }

///////////////////////////////////////////////////////////////////////

function drawScene()
   {
   console.log( "draw" );
   gl.viewport( 0, 0, gl.viewportWidth, gl.viewportHeight );
   gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

   gl.bindBuffer( gl.ARRAY_BUFFER, squareVertexPositionBuffer );
   gl.vertexAttribPointer( shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0 );

   // draw elementary arrays - triangle indices 
   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer );

   gl.drawElements( gl.TRIANGLES, num_indices, gl.UNSIGNED_SHORT, 0 );

   }


///////////////////////////////////////////////////////////////

function webGLStart()
   {
   var canvas = document.getElementById( "WebGL-canvas" );
   initGL( canvas );
   initShaders();

   shaderProgram.vertexPositionAttribute = gl.getAttribLocation( shaderProgram, "aVertexPosition" );
   gl.enableVertexAttribArray( shaderProgram.vertexPositionAttribute );

   gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

   }

function BG( red, green, blue )
   {

   gl.clearColor( red, green, blue, 1.0 );
   drawScene();

   }
