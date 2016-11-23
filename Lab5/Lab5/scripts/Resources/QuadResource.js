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