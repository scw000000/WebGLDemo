var gTextureDrawer = {};



gTextureDrawer.Init = function()
   {
   gTextureDrawer.ShaderResource = new TextureShaderResource();
   gTextureDrawer.ShaderResource.Load( "textureShader-vs", "textureShader-fs" );
   gTextureDrawer.QuadResource = {};
   gTextureDrawer.QuadResource.Context = {};

   var vertexPos = [   
      -1.0, -1.0, 
      1.0, -1.0, 
      1.0, 1.0, 
      -1.0, 1.0 
      ];

   gTextureDrawer.QuadResource.Context.VertexPosBuffer = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gTextureDrawer.QuadResource.Context.VertexPosBuffer );
   gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( vertexPos ), gl.STATIC_DRAW );
   gTextureDrawer.QuadResource.Context.VertexPosBuffer.ItemSize = 2;
   gTextureDrawer.QuadResource.Context.VertexPosBuffer.NumItems = vertexPos.length / gTextureDrawer.QuadResource.Context.VertexPosBuffer.ItemSize; 

   var vertexUVs = [
      0.0, 0.0, 
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0 
      ];

   gTextureDrawer.QuadResource.Context.VertexUVBuffer = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gTextureDrawer.QuadResource.Context.VertexUVBuffer );
   gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertexUVs ), gl.STATIC_DRAW);
   gTextureDrawer.QuadResource.Context.VertexUVBuffer.ItemSize = 2;
   gTextureDrawer.QuadResource.Context.VertexUVBuffer.NumItems = vertexUVs.length / gTextureDrawer.QuadResource.Context.VertexUVBuffer.ItemSize;

   var indices = [ 0, 1, 2, 0, 2, 3 ];

   gTextureDrawer.QuadResource.Context.VertexIndexBuffer = gl.createBuffer();
   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gTextureDrawer.QuadResource.Context.VertexIndexBuffer );
   gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), gl.STATIC_DRAW );
   gTextureDrawer.QuadResource.Context.VertexIndexBuffer.ItemSize = 1;
   gTextureDrawer.QuadResource.Context.VertexIndexBuffer.NumItems = indices.length;

   }

gTextureDrawer.DrawTexture = function( textureResource, pointX, pointY, sizeX, sizeY )
   {
   gl.viewport(  pointX, pointY, sizeX, sizeY );

   gl.useProgram( gTextureDrawer.ShaderResource.Context.Program );

   gl.enableVertexAttribArray( gTextureDrawer.ShaderResource.Context.VertexPosAttr );
   gl.bindBuffer( gl.ARRAY_BUFFER, gTextureDrawer.QuadResource.Context.VertexPosBuffer );
   gl.vertexAttribPointer( gTextureDrawer.ShaderResource.Context.VertexPosAttr, gTextureDrawer.QuadResource.Context.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

   gl.enableVertexAttribArray( gTextureDrawer.ShaderResource.Context.VertexUVAttr );
   gl.bindBuffer( gl.ARRAY_BUFFER, gTextureDrawer.QuadResource.Context.VertexUVBuffer );
   gl.vertexAttribPointer( gTextureDrawer.ShaderResource.Context.VertexUVAttr, gTextureDrawer.QuadResource.Context.VertexUVBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gTextureDrawer.QuadResource.Context.VertexIndexBuffer );

   gl.activeTexture( gl.TEXTURE0 );  
	gl.bindTexture( gl.TEXTURE_2D, textureResource.Context );  
	gl.uniform1i( gTextureDrawer.ShaderResource.Context.TextureUni, 0 );   

  
   gl.drawElements( gl.TRIANGLES, gTextureDrawer.QuadResource.Context.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );
      

   gl.viewport( 0, 0, gl.viewportWidth, gl.viewportHeight );
   };