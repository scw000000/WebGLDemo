

    var gl;
    var shaderProgram;

// ************** Init OpenGL Context etc. ************* 

function initGL(canvas) 
   {
   try 
      {
      gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
      } 
   catch (e) 
      {}
   if (!gl) 
      {
      alert("Could not initialise WebGL, sorry :-(");
      }
   }


//  ************** Initialize VBO  *************** 

    var objectVertexPositionBuffer;

 function initBuffers() 
   {
   objectVertexPositionBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, objectVertexPositionBuffer);
   vertices = [
            // Front face
            -1.0, -1.0,  1.0,
             1.0, -1.0,  1.0,
             1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,

            // Back face
            -1.0, -1.0, -1.0,
            -1.0,  1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0, -1.0, -1.0,

            // Top face
            -1.0,  1.0, -1.0,
            -1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0, -1.0,

            // Bottom face
            -1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
             1.0, -1.0,  1.0,
            -1.0, -1.0,  1.0,

            // Right face
             1.0, -1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0,  1.0,  1.0,
             1.0, -1.0,  1.0,

            // Left face
            -1.0, -1.0, -1.0,
            -1.0, -1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0,  1.0, -1.0,
        ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
   objectVertexPositionBuffer.itemSize = 3;
   objectVertexPositionBuffer.numItems = vertices.length / 3;
   }

var cameraPosition = vec3.create();
var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var targetPosition = vec3.create();
var upVector = vec3.create();

 function drawScene() 
   {
   gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

   gl.bindBuffer(gl.ARRAY_BUFFER, objectVertexPositionBuffer);
   gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, objectVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
   mat4.identity(mvMatrix);
   mat4.lookAt( cameraPosition, targetPosition, upVector, mvMatrix );
   gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
   gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
       
   gl.drawArrays(gl.TRIANGLE_STRIP, 0, objectVertexPositionBuffer.numItems);
   }

function webGLStart() 
   {
   var canvas = document.getElementById("code00-canvas");
   initGL(canvas);
   initShaders();

   shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
   gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute); 

   initBuffers(); 

   gl.clearColor(1.0, 0.0, 0.0, 1.0);

   cameraPosition = vec3.create( [5.0, 5.0, 5.0] );
   targetPosition = vec3.create( [0.0, 0.0, 0.0] );
   upVector = vec3.create( [0.0, 1.0, 0.0] );
   mat4.perspective( 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix );

   drawScene();
   }


