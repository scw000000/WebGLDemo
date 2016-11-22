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