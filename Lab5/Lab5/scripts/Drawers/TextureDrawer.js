var gTextureDrawer = {};



gTextureDrawer.Init = function()
   {
   gTextureDrawer.ShaderResource = new TextureShaderResource();
   gTextureDrawer.ShaderResource.Load( "textureShader-vs", "textureShader-fs" );
   gTextureDrawer.QuadResource = {};
  // gTextureDrawer.QuadResource.Context = {};

   var vertexPos = [   
      -1.0, -1.0, 
      1.0, -1.0, 
      1.0, 1.0, 
      -1.0, 1.0 
      ];

   gTextureDrawer.QuadResource.VertexPosBuffer = {};
   gTextureDrawer.QuadResource.VertexPosBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gTextureDrawer.QuadResource.VertexPosBuffer.Context );
   gl.bufferData( gl.ARRAY_BUFFER,new Float32Array( vertexPos ), gl.STATIC_DRAW );
   gTextureDrawer.QuadResource.VertexPosBuffer.ItemSize = 2;
   gTextureDrawer.QuadResource.VertexPosBuffer.NumItems = vertexPos.length / gTextureDrawer.QuadResource.VertexPosBuffer.ItemSize; 

   var vertexUVs = [
      0.0, 0.0, 
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0 
      ];

   gTextureDrawer.QuadResource.VertexUVBuffer = {};
   gTextureDrawer.QuadResource.VertexUVBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, gTextureDrawer.QuadResource.VertexUVBuffer.Context );
   gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertexUVs ), gl.STATIC_DRAW);
   gTextureDrawer.QuadResource.VertexUVBuffer.ItemSize = 2;
   gTextureDrawer.QuadResource.VertexUVBuffer.NumItems = vertexUVs.length / gTextureDrawer.QuadResource.VertexUVBuffer.ItemSize;

   var indices = [ 0, 1, 2, 0, 2, 3 ];

   gTextureDrawer.QuadResource.VertexIndexBuffer = {};
   gTextureDrawer.QuadResource.VertexIndexBuffer.Context = gl.createBuffer();
   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gTextureDrawer.QuadResource.VertexIndexBuffer.Context );
   gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), gl.STATIC_DRAW );
   gTextureDrawer.QuadResource.VertexIndexBuffer.ItemSize = 1;
   gTextureDrawer.QuadResource.VertexIndexBuffer.NumItems = indices.length;

   }

gTextureDrawer.DrawTexture = function( textureResource, pointX, pointY, sizeX, sizeY )
   {
   if( !textureResource.IsLoaded )
      {
      return;
      }
   gl.viewport(  pointX, pointY, sizeX, sizeY );

   gl.useProgram( gTextureDrawer.ShaderResource.Program.Context );

   gl.enableVertexAttribArray( gTextureDrawer.ShaderResource.VertexPosAttr.Context );
   gl.bindBuffer( gl.ARRAY_BUFFER, gTextureDrawer.QuadResource.VertexPosBuffer.Context );
   gl.vertexAttribPointer( gTextureDrawer.ShaderResource.VertexPosAttr.Context, gTextureDrawer.QuadResource.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

   gl.enableVertexAttribArray( gTextureDrawer.ShaderResource.VertexUVAttr.Context );
   gl.bindBuffer( gl.ARRAY_BUFFER, gTextureDrawer.QuadResource.VertexUVBuffer.Context );
   gl.vertexAttribPointer( gTextureDrawer.ShaderResource.VertexUVAttr.Context, gTextureDrawer.QuadResource.VertexUVBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gTextureDrawer.QuadResource.VertexIndexBuffer.Context );

   gl.activeTexture( gl.TEXTURE0 );  
	gl.bindTexture( gl.TEXTURE_2D, textureResource.Context );  
	gl.uniform1i( gTextureDrawer.ShaderResource.TextureUni.Context, 0 );   

  
   gl.drawElements( gl.TRIANGLES, gTextureDrawer.QuadResource.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );
      

   gl.viewport( 0, 0, gl.viewportWidth, gl.viewportHeight );
   };