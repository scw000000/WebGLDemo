var gQuadResource = {};

gQuadResource.Init = function()
   {
   var vertexPos = [   
      -1.0, -1.0, 
      1.0, -1.0, 
      1.0, 1.0, 
      -1.0, 1.0 
      ];

   gQuadResource.VertexPosBuffer = {};
   gQuadResource.VertexPosBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gQuadResource.VertexPosBuffer.Context );
   gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( vertexPos ), gl.STATIC_DRAW );
   gQuadResource.VertexPosBuffer.ItemSize = 2;
   gQuadResource.VertexPosBuffer.NumItems = vertexPos.length / gQuadResource.VertexPosBuffer.ItemSize; 

   var vertexUVs = [
      0.0, 0.0, 
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0 
      ];

   gQuadResource.VertexUVBuffer = {};
   gQuadResource.VertexUVBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gQuadResource.VertexUVBuffer.Context );
   gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertexUVs ), gl.STATIC_DRAW);
   gQuadResource.VertexUVBuffer.ItemSize = 2;
   gQuadResource.VertexUVBuffer.NumItems = vertexUVs.length / gQuadResource.VertexUVBuffer.ItemSize;

   var indices = [ 0, 1, 2, 0, 2, 3 ];

   gQuadResource.VertexIndexBuffer = {};
   gQuadResource.VertexIndexBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gQuadResource.VertexIndexBuffer.Context );
   gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), gl.STATIC_DRAW );
   gQuadResource.VertexIndexBuffer.ItemSize = 1;
   gQuadResource.VertexIndexBuffer.NumItems = indices.length;
   }

var gCubeResource = {};

gCubeResource.Init = function()
   {
   var vertexPos = [
            // Front face
            -1.0, -1.0, 1.0,
             1.0, -1.0, 1.0,
             1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0,

            // Back face
            -1.0, -1.0, -1.0,
            -1.0, 1.0, -1.0,
             1.0, 1.0, -1.0,
             1.0, -1.0, -1.0
         ];

   gCubeResource.VertexPosBuffer = {};
   gCubeResource.VertexPosBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gCubeResource.VertexPosBuffer.Context );
   gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( vertexPos ), gl.STATIC_DRAW );
   gCubeResource.VertexPosBuffer.ItemSize = 3;
   gCubeResource.VertexPosBuffer.NumItems = vertexPos.length / gCubeResource.VertexPosBuffer.ItemSize; 

   var indices = [
            0, 1, 2,   0, 2, 3,    // Front face
            4, 5, 6,   4, 6, 7,    // Back face
            5, 3, 2,   5, 2, 6,  // Top face
            4, 7, 1,   4, 1, 0, // Bottom face
            7, 6, 2,   7, 2, 1, // Right face
            4, 0, 3,   4, 3, 5  // Left face
        ];

   gCubeResource.VertexIndexBuffer = {};
   gCubeResource.VertexIndexBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gCubeResource.VertexIndexBuffer.Context );
   gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), gl.STATIC_DRAW );
   gCubeResource.VertexIndexBuffer.ItemSize = 1;
   gCubeResource.VertexIndexBuffer.NumItems = indices.length;


   }