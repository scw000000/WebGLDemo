class MeshSceneNode extends SceneNodes
   {
   constructor( shaderResource, meshResource, meshTextureResource )
      {
      super();
      this.ShaderResource = shaderResource;
      this.MeshResource = meshResource;
      this.MeshTextureResource = meshTextureResource;
      this.Shininess = 3.0;
      this.MaterialAmbient = vec4.fromValues( 1.0, 1.0, 1.0, 1.0 );
      this.MaterialDiffuse = vec4.fromValues( 1.0, 1.0, 1.0, 1.0 );
      this.MaterialSpecular = vec4.fromValues( 1.0, 1.0, 1.0, 1.0 );
      }

   Initbuffer() { }

   DelegateOnRestore()
      {
      }

   OnRender()
      {
      if( !this.ShaderResource || !this.MeshResource.IsLoaded || !this.MeshTextureResource.IsLoaded )
         {
         return;
         }
      gDrawable = true;
      ////////////////////////////////////// Deferred Rendering
      gl.useProgram( this.ShaderResource.Program.Context );
      gl.bindFramebuffer( gl.FRAMEBUFFER, gDeferredDrawer.GeometryFrameBuffer.Context );

      /////// Vertex Attributes

      gl.enableVertexAttribArray( this.ShaderResource.VertexPosAttr.Context );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.MeshResource.VertexPosBuffer.Context );
      gl.vertexAttribPointer( this.ShaderResource.VertexPosAttr.Context, this.MeshResource.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.enableVertexAttribArray( this.ShaderResource.VertexNormalAttr.Context );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.MeshResource.VertexNormalBuffer.Context );
      gl.vertexAttribPointer( this.ShaderResource.VertexNormalAttr.Context, this.MeshResource.VertexNormalBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.enableVertexAttribArray( this.ShaderResource.VertexUVAttr.Context );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.MeshResource.VertexUVBuffer.Context );
      gl.vertexAttribPointer( this.ShaderResource.VertexUVAttr.Context, this.MeshResource.VertexUVBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      /////// Vertex Attributes

      /////// Uniforms

      gl.uniformMatrix4fv( this.ShaderResource.mvpMatrixUni.Context, false, globalScene.GetMVPMatrix() );
      var mvMat = globalScene.GetMVMatrix();
      gl.uniformMatrix4fv( this.ShaderResource.mvMatrixUni.Context, false, mvMat );
      mat4.invert( mvMat, mvMat );
	   mat4.transpose( mvMat, mvMat ); 
      gl.uniformMatrix4fv( this.ShaderResource.nMatrixUni.Context, false, mvMat );

      gl.activeTexture( gl.TEXTURE0 );  
	   gl.bindTexture( gl.TEXTURE_2D, this.MeshTextureResource.Context );   
	   gl.uniform1i( this.ShaderResource.MeshTextureUni.Context, 0 );   

      gl.uniform1f( this.ShaderResource.ShininessUni.Context, this.Shininess );

      gl.uniform4f( this.ShaderResource.MaterialAmbientUni.Context, this.MaterialAmbient[ 0 ], this.MaterialAmbient[ 1 ], this.MaterialAmbient[ 2 ], this.MaterialAmbient[ 3 ] );

      gl.uniform4f( this.ShaderResource.MaterialDiffuseUni.Context, this.MaterialDiffuse[ 0 ], this.MaterialDiffuse[ 1 ], this.MaterialDiffuse[ 2 ], this.MaterialDiffuse[ 3 ] );
      
      gl.uniform4f( this.ShaderResource.MaterialSpecularUni.Context, this.MaterialSpecular[ 0 ], this.MaterialSpecular[ 1 ], this.MaterialSpecular[ 2 ], this.MaterialSpecular[ 3 ] );

      /////// Uniforms

      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.MeshResource.VertexIndexBuffer.Context );

      gl.drawElements( gl.TRIANGLES, this.MeshResource.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );

      gl.bindFramebuffer( gl.FRAMEBUFFER, null );
      }
   }