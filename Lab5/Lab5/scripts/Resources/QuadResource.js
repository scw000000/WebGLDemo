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

   gCubeResource.VertexPosBuffer = {};
   gCubeResource.VertexPosBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gCubeResource.VertexPosBuffer.Context );
   gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( vertexPos ), gl.STATIC_DRAW );
   gCubeResource.VertexPosBuffer.ItemSize = 3;
   gCubeResource.VertexPosBuffer.NumItems = vertexPos.length / gCubeResource.VertexPosBuffer.ItemSize; 

   var normals = [
            // Front face
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,

            // Back face
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,

            // Top face
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,

            // Bottom face
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,

            // Right face
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,

            // Left face
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0
        ];

   gCubeResource.VertexNormalBuffer = {};
   gCubeResource.VertexNormalBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gCubeResource.VertexNormalBuffer.Context );
   gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( normals ), gl.STATIC_DRAW );
   gCubeResource.VertexNormalBuffer.ItemSize = 3;
   gCubeResource.VertexNormalBuffer.NumItems = normals.length / gCubeResource.VertexNormalBuffer.ItemSize;

   var uvs = [
            // Front face
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,

            // Back face
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,

            // Top face
            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,

            // Bottom face
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,

            // Right face
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,

            // Left face
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ];

   gCubeResource.VertexUVBuffer = {};
   gCubeResource.VertexUVBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gCubeResource.VertexUVBuffer.Context );
   gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( uvs ), gl.STATIC_DRAW );
   gCubeResource.VertexUVBuffer.ItemSize = 2;
   gCubeResource.VertexUVBuffer.NumItems = uvs.length / gCubeResource.VertexUVBuffer.ItemSize; 

   var indices = [
            0, 1, 2,      0, 2, 3,    // Front face
            4, 5, 6,      4, 6, 7,    // Back face
            8, 9, 10,     8, 10, 11,  // Top face
            12, 13, 14,   12, 14, 15, // Bottom face
            16, 17, 18,   16, 18, 19, // Right face
            20, 21, 22,   20, 22, 23  // Left face
        ];

   gCubeResource.VertexIndexBuffer = {};
   gCubeResource.VertexIndexBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gCubeResource.VertexIndexBuffer.Context );
   gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), gl.STATIC_DRAW );
   gCubeResource.VertexIndexBuffer.ItemSize = 1;
   gCubeResource.VertexIndexBuffer.NumItems = indices.length;


   gCubeResource.IsLoaded = true;
  
   }