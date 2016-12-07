class Resource
   {
   constructor()
      {
      this.IsLoaded = false;
      this.Context = {};
      }
   
   Load()
      {
      }

   OnLoaded()
      {
      this.IsLoaded = true;
      }
   }

class TextureResource extends Resource
   {
   constructor()
      {
      super();
      this.Context = gl.createTexture();
      }

   Load( fileName )
      {
      console.log("loading texture " + fileName );
      this.image = new Image();
      this.image.onload = this.Onloaded.bind( this );
      this.image.src = fileName;      
      }

   Onloaded()
      {
      gl.bindTexture(gl.TEXTURE_2D, this.Context );
      gl.pixelStorei( gl.UNPACK_ALIGNMENT, 1 );
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.bindTexture(gl.TEXTURE_2D, null);
      super.OnLoaded();
      console.log("texture loading complete!!");
      }
   }

class MeshResource extends Resource
   {
   constructor()
      {
      super();
      this.MeshData = null;
      this.VertexPosBuffer = {};
      this.VertexIndexBuffer = {};
      this.VertexNormalBuffer = {};
      this.VertexTangentBuffer = {};
      this.VertexBitangentBuffer = {};
      this.VertexUVBuffer = {};
      }

   Load( fileName )
      {
      this.FileName = fileName;
      console.log("loading mesh " + fileName );
      var request = new  XMLHttpRequest();
      request.open( "GET", fileName );    
      var self = this;
      request.onreadystatechange =
      function () 
         {
         if (request.readyState == 4) 
            {
	         console.log("state ="+request.readyState); 
            self.MeshData = JSON.parse( request.responseText );
            self.Onloaded();
            }
         };
      request.send();    
      console.log("loading mesh....!");
      }

   Onloaded()
      {
      this.VertexPosBuffer.Context = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexPosBuffer.Context );
      gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( this.MeshData.vertexPositions ), gl.STATIC_DRAW );
      this.VertexPosBuffer.ItemSize = 3;
      this.VertexPosBuffer.NumItems = this.MeshData.vertexPositions.length / 3; 
    
      this.VertexNormalBuffer.Context =  gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexNormalBuffer.Context );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.MeshData.vertexNormals ), gl.STATIC_DRAW );
      this.VertexNormalBuffer.ItemSize = 3;
      this.VertexNormalBuffer.NumItems = this.MeshData.vertexNormals.length / 3;

      if(this.MeshData.vertexTextureCoords == null )  
         {
         var vertexNum = this.VertexNormalBuffer.NumItems;
         var size = vertexNum * 2;
         this.MeshData.vertexTextureCoords = new Float32Array( size ).fill( 0 );
         
         while(size--)
            {
            this.MeshData.vertexTextureCoords[size] = 0.5;
            }
         }
      this.VertexUVBuffer.Context = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexUVBuffer.Context );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.MeshData.vertexTextureCoords ), gl.STATIC_DRAW);
      this.VertexUVBuffer.ItemSize = 2;
      this.VertexUVBuffer.NumItems = this.MeshData.vertexTextureCoords.length / 2;

      this.VertexIndexBuffer.Context = gl.createBuffer();
      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer.Context );
      gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( this.MeshData.indices ), gl.STATIC_DRAW );
      this.VertexIndexBuffer.ItemSize = 1;
      this.VertexIndexBuffer.NumItems = this.MeshData.indices.length;

      this.CalculateTBT();

      this.VertexTangentBuffer.Context =  gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexTangentBuffer.Context );
      gl.bufferData( gl.ARRAY_BUFFER, this.MeshData.vertexTangents, gl.STATIC_DRAW );
      this.VertexTangentBuffer.ItemSize = 3;
      this.VertexTangentBuffer.NumItems = this.MeshData.vertexTangents.length / 3;

      this.VertexBitangentBuffer.Context =  gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexBitangentBuffer.Context );
      gl.bufferData( gl.ARRAY_BUFFER, this.MeshData.vertexBitangents, gl.STATIC_DRAW );
      this.VertexBitangentBuffer.ItemSize = 3;
      this.VertexBitangentBuffer.NumItems = this.MeshData.vertexBitangents.length / 3;

      var positions = this.MeshData.vertexPositions;
      var xmin, xmax, ymin, ymax, zmin, zmax;
      xmin = xmax = positions[0];
      ymin = ymax = positions[1];
      zmin = zmax = positions[2];
      for (var i = 0; i< positions.length/3; i++) 
         {
	      if (positions[i*3] < xmin) xmin = positions[i*3];
	      if (positions[i*3] > xmax) xmax = positions[i*3]; 	

	      if (positions[i*3+1] < ymin) ymin = positions[i*3+1];
	      if (positions[i*3+1] > ymax) ymax = positions[i*3+1]; 	

	      if (positions[i*3+2] < zmin) zmin = positions[i*3+2];
	      if (positions[i*3+2] > zmax) zmax = positions[i*3+2]; 	
         }

      console.log("*****xmin = "+xmin + "xmax = "+xmax);
      console.log("*****ymin = "+ymin + "ymax = "+ymax);
      console.log("*****zmin = "+zmin + "zmax = "+zmax);       

      super.OnLoaded();
      console.log("Mesh loading complete!!");
      }

   CalculateTBT()
      {
      this.MeshData.vertexTangents = new Float32Array( this.VertexPosBuffer.NumItems * 3 ).fill( 0 );
      this.MeshData.vertexBitangents = new Float32Array( this.VertexPosBuffer.NumItems * 3 ).fill( 0 );
      var tangentData = this.MeshData.vertexTangents;
      var bitangentData = this.MeshData.vertexBitangents;
      var uvData = this.MeshData.vertexTextureCoords;
      var posData = this.MeshData.vertexPositions;
      var pushTBT = function( v0Idx, v1Idx, v2Idx, uv0Idx, uv1Idx, uv2Idx )
         {
         var dUV1 = vec2.fromValues( uvData[ uv1Idx ] - uvData[ uv0Idx ], uvData[ uv1Idx + 1 ] - uvData[ uv0Idx + 1 ] );
         var dUV2 = vec2.fromValues( uvData[ uv2Idx ] - uvData[ uv0Idx ], uvData[ uv2Idx + 1 ] - uvData[ uv0Idx + 1 ] );

         var dV1 = vec3.fromValues( posData[ v1Idx ] - posData[ v0Idx ],
            posData[ v1Idx + 1 ] - posData[ v0Idx + 2 ],
            posData[ v1Idx + 1 ] - posData[ v0Idx + 2 ]
            );
         var dV2 = vec3.fromValues( posData[ v2Idx ] - posData[ v0Idx ],
            posData[ v2Idx + 1 ] - posData[ v0Idx + 2 ],
            posData[ v2Idx + 1 ] - posData[ v0Idx + 2 ]
            );

         var tangent = vec3.sub( vec3.create(), 
            vec3.scale( vec3.create(), dV1, dUV2[ 1 ] ), 
            vec3.scale( vec3.create(), dV2, dUV1[ 1 ] ) );
         vec3.normalize( tangent, tangent );

         var bitangent = vec3.sub( vec3.create(), 
            vec3.scale( vec3.create(), dV2, dUV1[ 0 ] ), 
            vec3.scale( vec3.create(), dV1, dUV2[ 0 ] ) );
         vec3.normalize( bitangent, bitangent );

         tangentData[ v0Idx ] = tangent[ 0 ];
         tangentData[ v0Idx + 1 ] = tangent[ 1 ];
         tangentData[ v0Idx + 1 ] = tangent[ 2 ];

         bitangentData[ v0Idx ] = bitangent[ 0 ];
         bitangentData[ v0Idx + 1 ] = bitangent[ 1 ];
         bitangentData[ v0Idx + 1 ] = bitangent[ 2 ];

         tangentData[ v1Idx ] = tangent[ 0 ];
         tangentData[ v1Idx + 1 ] = tangent[ 1 ];
         tangentData[ v1Idx + 1 ] = tangent[ 2 ];

         bitangentData[ v1Idx ] = bitangent[ 0 ];
         bitangentData[ v1Idx + 1 ] = bitangent[ 1 ];
         bitangentData[ v1Idx + 1 ] = bitangent[ 2 ];

         tangentData[ v2Idx ] = tangent[ 0 ];
         tangentData[ v2Idx + 1 ] = tangent[ 1 ];
         tangentData[ v2Idx + 1 ] = tangent[ 2 ];

         bitangentData[ v2Idx ] = bitangent[ 0 ];
         bitangentData[ v2Idx + 1 ] = bitangent[ 1 ];
         bitangentData[ v2Idx + 1 ] = bitangent[ 2 ];
         }
      pushTBT = pushTBT.bind( this );
      var tirangleNum = this.MeshData.indices.length / 3;
      for( var i = 0; i < tirangleNum; ++i )
         {
         var v0 = this.MeshData.indices[ i * 3 ] * this.VertexPosBuffer.ItemSize;
         var v1 = this.MeshData.indices[ i * 3 + 1] * this.VertexPosBuffer.ItemSize;
         var v2 = this.MeshData.indices[ i * 3 + 2 ] * this.VertexPosBuffer.ItemSize;

         var uv0 = this.MeshData.indices[ i * 3 ] * this.VertexUVBuffer.ItemSize;
         var uv1 = this.MeshData.indices[ i * 3 + 1] * this.VertexUVBuffer.ItemSize;
         var uv2 = this.MeshData.indices[ i * 3 + 2 ] * this.VertexUVBuffer.ItemSize;

         pushTBT( v0, v1, v2, uv0, uv1, uv2 );
         }
      }

   }

class AudioResource extends Resource
   {
   constructor()
      {
      super();
      }

   Load( fileName )
      {
      console.log("loading audio " + fileName );
      this.audio = new Audio();
      this.audio.oncanplaythrough = this.Onloaded.bind( this );
      this.audio.src = fileName;      
      }

   Onloaded()
      {
      super.OnLoaded();
      console.log("audio loading complete!!");
      }
   }