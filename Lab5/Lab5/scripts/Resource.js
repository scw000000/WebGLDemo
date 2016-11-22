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
      console.log("loading texture....");
      this.image = new Image();
      this.image.onload = this.Onloaded.bind( this );
      this.image.src = fileName;      
      console.log("loading texture....!");
      }

   Onloaded()
      {
      console.log("loaded");
      gl.bindTexture(gl.TEXTURE_2D, this.Context );
      gl.pixelStorei( gl.UNPACK_ALIGNMENT, 1 );
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.bindTexture(gl.TEXTURE_2D, null);
      super.OnLoaded();
      console.log("loading complete!!");
      }
   }

class MeshResource extends Resource
   {
   constructor()
      {
      super();
      this.MeshData = null;
      this.Context.VertexPosBuffer = null;
      this.Context.VertexIndexBuffer = null;
      this.Context.VertexNormalBuffer = null;
      this.Context.VertexUVBuffer = null;
      }

   Load( fileName )
      {
      console.log("loading mesh....");
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
      console.log(" in hand LoadedTeapot"); 

      this.Context.VertexPosBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.Context.VertexPosBuffer );
      gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( this.MeshData.vertexPositions ), gl.STATIC_DRAW );
      this.Context.VertexPosBuffer.ItemSize = 3;
      this.Context.VertexPosBuffer.NumItems = this.MeshData.vertexPositions.length / 3; 
    
      this.Context.VertexNormalBuffer =  gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.Context.VertexNormalBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.MeshData.vertexNormals ), gl.STATIC_DRAW );
      this.Context.VertexNormalBuffer.ItemSize = 3;
      this.Context.VertexNormalBuffer.NumItems = this.MeshData.vertexNormals.length / 3;

      this.Context.VertexUVBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.Context.VertexUVBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.MeshData.vertexTextureCoords ), gl.STATIC_DRAW);
      this.Context.VertexUVBuffer.ItemSize = 2;
      this.Context.VertexUVBuffer.NumItems = this.MeshData.vertexTextureCoords.length / 2;

      this.Context.VertexIndexBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.Context.VertexIndexBuffer );
      gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( this.MeshData.indices ), gl.STATIC_DRAW );
      this.Context.VertexIndexBuffer.ItemSize = 1;
      this.Context.VertexIndexBuffer.NumItems = this.MeshData.indices.length;

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

      console.log("*****xmin = "+xmin + "xmax = "+xmax);
      console.log("*****ymin = "+ymin + "ymax = "+ymax);
      console.log("*****zmin = "+zmin + "zmax = "+zmax);       

      super.OnLoaded();
      console.log("loading complete!!");
      }
   }


function initTextures( resource, fileName ) {
    resource.Context = gl.createTexture();
    resource.image = new Image();
    resource.image.onload = function() { handleTextureLoaded( resource ); }
    resource.image.src = fileName;
    resource.IsLoaded = false;
    console.log("loading texture....");
}

function handleTextureLoaded( resource ) {
    gl.bindTexture(gl.TEXTURE_2D, resource.Context );
    gl.pixelStorei( gl.UNPACK_ALIGNMENT, 1 );
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resource.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
    resource.IsLoaded = true;
    console.log("loading complete");
}