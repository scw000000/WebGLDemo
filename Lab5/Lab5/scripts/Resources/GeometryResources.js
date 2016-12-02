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
            // Front
            -1.0, -1.0, 1.0,
             1.0, -1.0, 1.0,
             1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0,

            // Back
            -1.0, -1.0, -1.0,
            -1.0, 1.0, -1.0,
             1.0, 1.0, -1.0,
             1.0, -1.0, -1.0,

             // Left 
             1, -1, -1,
             1, 1, -1,
             1, 1, 1,
             1, -1, 1,

             // Right
             -1, -1, 1,
             -1, 1, 1,
             -1, 1, -1,
             -1, -1, -1,

             // Top
             -1, 1, -1,
             -1, 1, 1,
             1, 1, 1,
             1, 1, -1,

             // Bottom
             1, -1, -1,
             1, -1, 1,
             -1, -1, 1,
             -1, -1, -1
        ];

   gCubeResource.VertexPosBuffer = {};
   gCubeResource.VertexPosBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gCubeResource.VertexPosBuffer.Context );
   gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( vertexPos ), gl.STATIC_DRAW );
   gCubeResource.VertexPosBuffer.ItemSize = 3;
   gCubeResource.VertexPosBuffer.NumItems = vertexPos.length / gCubeResource.VertexPosBuffer.ItemSize; 

   var normals = [
            // Front
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,

            // Back
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,

             // right
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,

            // left 
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,

            // top
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,

            // bottom
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0
        ];

   gCubeResource.VertexNormalBuffer = {};
   gCubeResource.VertexNormalBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gCubeResource.VertexNormalBuffer.Context );
   gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( normals ), gl.STATIC_DRAW );
   gCubeResource.VertexNormalBuffer.ItemSize = 3;
   gCubeResource.VertexNormalBuffer.NumItems = normals.length / gCubeResource.VertexNormalBuffer.ItemSize;

   var uvs = [
            // Front 
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,

            // Back 
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,

            // Right 
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,

            // Left
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,

            // Top 
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,

            // Bottom 
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0

        ];

   gCubeResource.VertexUVBuffer = {};
   gCubeResource.VertexUVBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gCubeResource.VertexUVBuffer.Context );
   gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( uvs ), gl.STATIC_DRAW );
   gCubeResource.VertexUVBuffer.ItemSize = 2;
   gCubeResource.VertexUVBuffer.NumItems = uvs.length / gCubeResource.VertexUVBuffer.ItemSize; 

   var indices = [
            0, 1, 2,      0, 2, 3,    // Front 
            4, 5, 6,      4, 6, 7,    // Back 
            8, 9, 10,     8, 10, 11,  // Left
            12, 13, 14,   12, 14, 15, // Right
            16, 17, 18,   16, 18, 19, // Top
            20, 21, 22,   20, 22, 23  // Bottom     
        ];

   gCubeResource.VertexIndexBuffer = {};
   gCubeResource.VertexIndexBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gCubeResource.VertexIndexBuffer.Context );
   gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), gl.STATIC_DRAW );
   gCubeResource.VertexIndexBuffer.ItemSize = 1;
   gCubeResource.VertexIndexBuffer.NumItems = indices.length;


   gCubeResource.IsLoaded = true;
  
   }

var gSphereRsource = {};

gSphereRsource.Init = function()
   {
   var vertices = [];
   var normals = [];
   var uvs = [];
   var sphericalcoord = vec3.scale( vec3.create(), g_Down3v, 1 );
   var sliceNum = 20;
   var sectorNum = ( sliceNum - 1 ) * 2;;
   var deltaRad = Math.PI / ( sliceNum - 1 );
      
   for( var polar = 0; polar < sliceNum; ++polar )
      {
      for( var azimuthal = 0; azimuthal < sectorNum; ++azimuthal )
         {
         vertices.push( sphericalcoord[ 0 ] );
         vertices.push( sphericalcoord[ 1 ] );
         vertices.push( sphericalcoord[ 2 ] );

         var normal = vec3.normalize( vec3.create() ,sphericalcoord );
         normals.push( normal[ 0 ] );
         normals.push( normal[ 1 ] );
         normals.push( normal[ 2 ] );

         uvs.push( polar / sliceNum );
         uvs.push( azimuthal / sectorNum );
         if( polar == 0 || polar == sliceNum - 1 )
            {
            break;
            }
         vec3.rotateY( sphericalcoord, sphericalcoord, g_Zero3v, deltaRad );
         }
      sphericalcoord[ 0 ] = 0;
      vec3.rotateX( sphericalcoord, sphericalcoord, g_Zero3v, deltaRad );
      }

   gSphereRsource.VertexPosBuffer = {};
   gSphereRsource.VertexPosBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gSphereRsource.VertexPosBuffer.Context );
   gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( vertices ), gl.STATIC_DRAW );
   gSphereRsource.VertexPosBuffer.ItemSize = 3;
   gSphereRsource.VertexPosBuffer.NumItems = vertices.length / gSphereRsource.VertexPosBuffer.ItemSize; 

   gSphereRsource.VertexNormalBuffer = {};
   gSphereRsource.VertexNormalBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gSphereRsource.VertexNormalBuffer.Context );
   gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( normals ), gl.STATIC_DRAW );
   gSphereRsource.VertexNormalBuffer.ItemSize = 3;
   gSphereRsource.VertexNormalBuffer.NumItems = normals.length / gSphereRsource.VertexNormalBuffer.ItemSize;

   gSphereRsource.VertexUVBuffer = {};
   gSphereRsource.VertexUVBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gSphereRsource.VertexUVBuffer.Context );
   gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( uvs ), gl.STATIC_DRAW );
   gSphereRsource.VertexUVBuffer.ItemSize = 2;
   gSphereRsource.VertexUVBuffer.NumItems = uvs.length / gSphereRsource.VertexUVBuffer.ItemSize; 

   var vertexIndices = [];

   for( var i = 0; i < sectorNum; ++i )
      {
      vertexIndices.push( ( i + sectorNum - 1 ) % sectorNum + 1 );
      vertexIndices.push( 0 );
      vertexIndices.push( i + 1 );

      vertexIndices.push( gSphereRsource.VertexPosBuffer.NumItems - 1 );
      vertexIndices.push( ( i + sectorNum - 1 ) % sectorNum + gSphereRsource.VertexPosBuffer.NumItems - 1 - sectorNum );
      vertexIndices.push( i + gSphereRsource.VertexPosBuffer.NumItems - 1 - sectorNum );
      }

   for( var polarStride = 1; polarStride + sectorNum < gSphereRsource.VertexPosBuffer.NumItems - 1; polarStride += sectorNum )
      {
      for( var i = 0; i < sectorNum; ++i )
         {
         // Left-down
         vertexIndices.push( polarStride + i );
         // Right-down
         vertexIndices.push( polarStride + ( i + 1 ) % sectorNum );
         //Right-up
         vertexIndices.push( polarStride + sectorNum + ( i + 1 ) % sectorNum );
            
         // Left-down
         vertexIndices.push( polarStride + i );
         //Right-up
         vertexIndices.push( polarStride + sectorNum  + ( i + 1 ) % sectorNum );
         //Left-up
         vertexIndices.push( polarStride + sectorNum + i );
         }
      }

   gSphereRsource.VertexIndexBuffer = {};
   gSphereRsource.VertexIndexBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gSphereRsource.VertexIndexBuffer.Context );
   gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( vertexIndices ), gl.STATIC_DRAW );
   gSphereRsource.VertexIndexBuffer.ItemSize = 1;
   gSphereRsource.VertexIndexBuffer.NumItems = vertexIndices.length;
   gSphereRsource.IsLoaded = true;
   }