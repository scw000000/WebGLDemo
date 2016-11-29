class TextureMeshSceneNode extends SceneNodes
   {
   constructor( shaderResource, meshResource, meshTextureResource )
      {
      super();
      this.ShaderResource = shaderResource;
      this.MeshResource = meshResource;
      this.MeshTextureResource = meshTextureResource;
      }

   DelegateOnRestore()
      {
      }

   OnRender()
      {
      if( !this.ShaderResource || !this.MeshResource.IsLoaded || !this.MeshTextureResource.IsLoaded || !gDrawable)
         {
         return;
         }
      
      gl.useProgram( this.ShaderResource.Program.Context );
      gl.bindFramebuffer( gl.FRAMEBUFFER, gSecondPassFrameBuffer.Context );
      /////// Vertex Attributes

      gl.enableVertexAttribArray( this.ShaderResource.VertexPosAttr.Context );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.MeshResource.VertexPosBuffer.Context );
      gl.vertexAttribPointer( this.ShaderResource.VertexPosAttr.Context, this.MeshResource.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.enableVertexAttribArray( this.ShaderResource.VertexUVAttr.Context );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.MeshResource.VertexUVBuffer.Context );
      gl.vertexAttribPointer( this.ShaderResource.VertexUVAttr.Context, this.MeshResource.VertexUVBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      /////// Uniforms
      gl.uniformMatrix4fv( this.ShaderResource.mvpMatrixUni.Context, false, globalScene.GetMVPMatrix() );

      gl.activeTexture( gl.TEXTURE0 );  
	   gl.bindTexture( gl.TEXTURE_2D, this.MeshTextureResource.Context );   
	   gl.uniform1i( this.ShaderResource.MeshTextureUni.Context, 0 );   

      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.MeshResource.VertexIndexBuffer.Context );

      gl.drawElements( gl.TRIANGLES, this.MeshResource.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );

      gl.bindFramebuffer( gl.FRAMEBUFFER, null );
      }
   }

gSecondPassFrameBuffer = {};

gSecondPassFrameBuffer.Init = function()
   {
   var mrtExt = gl.getExtension( "WEBGL_draw_buffers" );
   if( !mrtExt )
      {
      alert( "WebGL init extension error" );
      return; 
     // return; 
      }

   gSecondPassFrameBuffer.Context = gl.createFramebuffer();
   gl.bindFramebuffer( gl.FRAMEBUFFER, gSecondPassFrameBuffer.Context );
   // Use the depth buffer in geometry pass
   gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, gDeferredDrawer.GeometryDepthBuffer.Context );

   // Output Buffer
   gl.framebufferTexture2D( gl.FRAMEBUFFER, mrtExt.COLOR_ATTACHMENT0_WEBGL, gl.TEXTURE_2D, gDeferredDrawer.OutputTexture.Context, 0 );
   
   gl.framebufferTexture2D( gl.FRAMEBUFFER, mrtExt.COLOR_ATTACHMENT1_WEBGL, gl.TEXTURE_2D, gDeferredDrawer.LightTexture.Context, 0 );
   
   mrtExt.drawBuffersWEBGL( [ mrtExt.COLOR_ATTACHMENT0_WEBGL, mrtExt.COLOR_ATTACHMENT1_WEBGL ] );

   var fboCheckCode = gl.checkFramebufferStatus( gl.FRAMEBUFFER );
   if( fboCheckCode != gl.FRAMEBUFFER_COMPLETE )
      {
      alert( "Frame Buffer error" );
      }

   gl.bindFramebuffer( gl.FRAMEBUFFER, null );
   }