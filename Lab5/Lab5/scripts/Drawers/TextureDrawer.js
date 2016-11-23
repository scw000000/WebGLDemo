var gTextureDrawer = {};



gTextureDrawer.Init = function()
   {
   gTextureDrawer.ShaderResource = new TextureShaderResource();
   gTextureDrawer.ShaderResource.Load( "textureShader-vs", "textureShader-fs" );
   }

gTextureDrawer.DrawTexture = function( textureResource, pointX, pointY, sizeX, sizeY )
   {
   if( !textureResource.IsLoaded )
      {
      return;
      }
   if( gDrawable == false )
      {
      return;
      }

   gl.viewport(  pointX, pointY, sizeX, sizeY );

   gl.useProgram( gTextureDrawer.ShaderResource.Program.Context );

   gl.enableVertexAttribArray( gTextureDrawer.ShaderResource.VertexPosAttr.Context );
   gl.bindBuffer( gl.ARRAY_BUFFER, gQuadResource.VertexPosBuffer.Context );
   gl.vertexAttribPointer( gTextureDrawer.ShaderResource.VertexPosAttr.Context, gQuadResource.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

   gl.enableVertexAttribArray( gTextureDrawer.ShaderResource.VertexUVAttr.Context );
   gl.bindBuffer( gl.ARRAY_BUFFER, gQuadResource.VertexUVBuffer.Context );
   gl.vertexAttribPointer( gTextureDrawer.ShaderResource.VertexUVAttr.Context, gQuadResource.VertexUVBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gQuadResource.VertexIndexBuffer.Context );

   gl.activeTexture( gl.TEXTURE0 );  
	gl.bindTexture( gl.TEXTURE_2D, textureResource.Context );  
	gl.uniform1i( gTextureDrawer.ShaderResource.TextureUni.Context, 0 );   

  
   gl.drawElements( gl.TRIANGLES, gQuadResource.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );
      

   gl.viewport( 0, 0, gl.viewportWidth, gl.viewportHeight );
   };