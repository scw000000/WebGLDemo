
var gl;
var shaderProgram;
var readyToDraw = false;
var canvas;

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

var lineVertexBuffer;
var lineVertexColorBuffer;

var barVertices = [];
var barVerticesColors = [];
var targetVertices = [];
var indices = [];
var num_vertices;
var num_indices;
// the highest bar is max bar, which height is 2 - 2 * v_margin, start from -1 + v_margin
var v_margin = 0.25;
var h_margin = 0.1;
var num_bars = 0;

function createBarVertices()
   {
   readyToDraw = false;

   barVertices = [];
   indices = [];
   targetVertices = [];
   barVerticesColors = [];

   num_bars = avgs.length;
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
   
   // the total with of canvas is 2, from -1 to +1
   // each bar is 2h in width, and distance between each bar is h, so each bar take 3h width
   // the x coordinates starts from -1 + h
   var h = 2 / ( 3 * num_bars + 1 );
   for ( var i = 0; i < num_bars; i++ )
      {
      // x, y, z coordinates
      // vertex 0, down left
      barVertices.push( -1 + ( 3 * i + 1 ) * h ); barVertices.push( -1 + v_margin ); barVertices.push( 0.0 );
      targetVertices.push( -1 + ( 3 * i + 1 ) * h ); targetVertices.push( -1 + v_margin ); targetVertices.push( 0.0 );
      
      // vertex 1, donw right
      barVertices.push( -1 + ( 3 * i + 3 ) * h ); barVertices.push( -1 + v_margin ); barVertices.push( 0.0 );
      targetVertices.push( -1 + ( 3 * i + 3 ) * h ); targetVertices.push( -1 + v_margin ); targetVertices.push( 0.0 );

      // vertex 2, up right
      barVertices.push( -1 + ( 3 * i + 3 ) * h ); barVertices.push( -1 + v_margin ); barVertices.push( 0.0 );
      targetVertices.push( -1 + ( 3 * i + 3 ) * h ); targetVertices.push( -1 + v_margin + ( 2 - 2 * v_margin ) * ( avgs[i] - min ) / width ); targetVertices.push( 0.0 );
      
      // vertex 3, up left
      barVertices.push( -1 + ( 3 * i + 1 ) * h ); barVertices.push( -1 + v_margin ); barVertices.push( 0.0 );
      targetVertices.push( -1 + ( 3 * i + 1 ) * h ); targetVertices.push( -1 + v_margin + ( 2 - 2 * v_margin ) * ( avgs[i] - min ) / width ); targetVertices.push( 0.0 );

      indices.push( 0 + 4 * i ); indices.push( 1 + 4 * i ); indices.push( 2 + 4 * i );
      indices.push( 0 + 4 * i ); indices.push( 2 + 4 * i ); indices.push( 3 + 4 * i );

      // Each bar has its own color setting read in HTML color input, the color data
      // is set in Lab1-csv.js
      for( var j = 0; j < 4; ++j )
            {
            barVerticesColors.push( barColors[ i ].r );
            barVerticesColors.push( barColors[ i ].g );
            barVerticesColors.push( barColors[ i ].b );
            barVerticesColors.push( 1.0 );
            }
      }

   var horLineNum = getSelectedLineNumber();
   // For each horizontal line, create a text node for them
   createTextNodes( horLineNum, min, max );
   // For each horizontal line, allocate line vertex data to draw them
   createLineVerticesAndColors( horLineNum );

   initBuffers();

   // After setting all of vertes data for drawing, the WebGL now is ready to draw.
   readyToDraw = true;
   }

function createTextNodes( horLineNum, min, max )
   {
   // Remove all previous drawed text node before create new ones
   removeAllTextNodes();
   for( var i = 0; i < horLineNum + 1; ++i )
      {
      var factor = i / horLineNum;
      generateTextNode( -1 + 0.05, -1 + v_margin + ( 2 - 2 * v_margin ) * factor, ( min + ( max - min ) * factor ).toFixed( 2 ) );
      }
   }

var lineVertices = [];
var lineVerticesColors = [];

function createLineVerticesAndColors( horLineNum )
   {
   var leftShift = 0.05;
   var leftXCoord = leftShift + -1 + h_margin;
   var rightXCoord = 1;
   lineVertices = [ leftXCoord, -1 + v_margin, 0.0, 
                          1, -1 + v_margin, 0.0, 
                         leftXCoord, -1 + v_margin, 0.0,
                         leftXCoord, 1 - v_margin, 0.0 ];
   lineVerticesColors = [];

   for( var i = 1; i < horLineNum + 1; ++i )
      {
      var factor = i / horLineNum;
      var yCoordinate = -1 + v_margin + ( 2 - 2 * v_margin ) * factor;
      lineVertices.push( leftXCoord );
      lineVertices.push( yCoordinate );
      lineVertices.push( 0.0 );

      lineVertices.push( rightXCoord );
      lineVertices.push( yCoordinate );
      lineVertices.push( 0.0 );
      }

   for( var i = 0; i < lineVertices.length; ++i )
      {
      var lineColor = getInputColor( "lineColor" );
      lineVerticesColors.push( lineColor.r );
      lineVerticesColors.push( lineColor.g );
      lineVerticesColors.push( lineColor.b );
      lineVerticesColors.push( 1.0 );
      }
   }

////////////////    Initialize VBO  ////////////////////////

function initBuffers()
   {
   squareVertexPositionBuffer = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, squareVertexPositionBuffer );
   gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( barVertices ), gl.STATIC_DRAW );
   squareVertexPositionBuffer.itemSize = 3;
   squareVertexPositionBuffer.numItems = num_vertices;
   
   squareVertexColorBuffer = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, squareVertexColorBuffer );
   gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( barVerticesColors ), gl.STATIC_DRAW );
   squareVertexColorBuffer.itemSize = 4;
   squareVertexColorBuffer.numItems = barVerticesColors.length / 4;

   squareVertexIndexBuffer = gl.createBuffer();
   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer );
   gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), gl.STATIC_DRAW );
   squareVertexIndexBuffer.itemsize = 1;
   squareVertexIndexBuffer.numItems = num_indices;

   lineVertexBuffer = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, lineVertexBuffer );
   gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( lineVertices ), gl.STATIC_DRAW );
   lineVertexBuffer.itemSize = 3;
   lineVertexBuffer.numItems = lineVertices.length / 3;

   lineVertexColorBuffer = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, lineVertexColorBuffer );
   gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( lineVerticesColors ), gl.STATIC_DRAW );
   lineVertexColorBuffer.itemSize = 4;
   lineVertexColorBuffer.numItems = lineVerticesColors.length / 4;
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

function updateBarVertices()
   { 
   var lerpFactor = 0.94;
   var inverseLerpFactor = 1.0 - lerpFactor;
   for( var i = 0; i < num_bars; ++i )
      {
      if( barVertices[ 12 * i + 7 ] != targetVertices[ 12 * i + 7 ] )
         {
         barVertices[ 12 * i + 7 ] = inverseLerpFactor * targetVertices[ 12 * i + 7 ] + lerpFactor * barVertices[ 12 * i + 7 ];
         barVertices[ 12 * i + 10 ] = inverseLerpFactor * targetVertices[ 12 * i + 10 ] + lerpFactor * barVertices[ 12 * i + 10 ];
         }
      }
   gl.bindBuffer( gl.ARRAY_BUFFER, squareVertexPositionBuffer );
   gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( barVertices ), gl.STATIC_DRAW );  
   }

// Request a draw call for next frame,
// Also, call drawScene if a csv file is selected and draw button is clicked
function onUpdate() 
   {
   requestAnimFrame( onUpdate );
   if( readyToDraw )
      {
      updateBarVertices();
      drawScene();
      }
   }

///////////////////////////////////////////////////////////////////////

function drawScene()
   {
   gl.viewport( 0, 0, gl.viewportWidth, gl.viewportHeight );
   gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

   gl.bindBuffer( gl.ARRAY_BUFFER, squareVertexPositionBuffer );
   gl.vertexAttribPointer( shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0 );

   gl.bindBuffer( gl.ARRAY_BUFFER, squareVertexColorBuffer );
   gl.vertexAttribPointer( shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0 );

   // draw elementary arrays - triangle indices 
   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer );

   gl.drawElements( gl.TRIANGLES, num_indices, gl.UNSIGNED_SHORT, 0 );

   gl.bindBuffer( gl.ARRAY_BUFFER, lineVertexBuffer );
   gl.vertexAttribPointer( shaderProgram.vertexPositionAttribute, lineVertexBuffer.itemSize, gl.FLOAT, false, 0, 0 );

   gl.bindBuffer( gl.ARRAY_BUFFER, lineVertexColorBuffer );
   gl.vertexAttribPointer( shaderProgram.vertexColorAttribute, lineVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0 );

   gl.drawArrays( gl.LINES, 0, lineVertexBuffer.numItems ); 
   }


///////////////////////////////////////////////////////////////



function webGLStart()
   {
   canvas = document.getElementById( "WebGL-canvas" );
   
   initGL( canvas );
   initShaders();

   shaderProgram.vertexPositionAttribute = gl.getAttribLocation( shaderProgram, "aVertexPosition" );
   gl.enableVertexAttribArray( shaderProgram.vertexPositionAttribute );

   shaderProgram.vertexColorAttribute = gl.getAttribLocation( shaderProgram, "aVertexColor" );
   gl.enableVertexAttribArray( shaderProgram.vertexColorAttribute );

   gl.clearColor( 0.0, 0.0, 0.0, 0.0 );
   onUpdate();
   }

function BG( red, green, blue )
   {
   gl.clearColor( red, green, blue, 1.0 );
   }
