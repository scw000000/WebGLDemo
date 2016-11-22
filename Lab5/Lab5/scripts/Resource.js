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
      this.Context = null
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
            self.Context = JSON.parse( request.responseText );
            self.Onloaded();
            }
         };
      request.send();    
      console.log("loading mesh....!");
      }

   Onloaded()
      {
      console.log(" in hand LoadedTeapot"); 

      var positions = this.Context.vertexPositions;
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