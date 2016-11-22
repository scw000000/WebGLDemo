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
         
      gl.useProgram( this.ShaderResource.Context.Program );

      gl.enableVertexAttribArray( this.ShaderResource.Context.VertexPosAttr );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.MeshResource.Context.VertexPosBuffer );
      gl.vertexAttribPointer( this.ShaderResource.Context.VertexPosAttr, this.MeshResource.Context.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.enableVertexAttribArray( this.ShaderResource.Context.VertexNormalAttr );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.MeshResource.Context.VertexNormalBuffer );
      gl.vertexAttribPointer( this.ShaderResource.Context.VertexNormalAttr, this.MeshResource.Context.VertexNormalBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.enableVertexAttribArray( this.ShaderResource.Context.VertexUVAttr );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.MeshResource.Context.VertexUVBuffer );
      gl.vertexAttribPointer( this.ShaderResource.Context.VertexUVAttr, this.MeshResource.Context.VertexUVBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.MeshResource.Context.VertexIndexBuffer );

      gl.activeTexture( gl.TEXTURE0 );   // set texture unit 0 to use 
	   gl.bindTexture( gl.TEXTURE_2D, this.MeshTextureResource.Context );    // bind the texture object to the texture unit 
	   gl.uniform1i( this.ShaderResource.Context.MeshTextureUni, 0 );   // pass the texture unit to the shader 

      gl.uniformMatrix4fv( this.ShaderResource.Context.mvpMatrixUni, false, globalScene.GetMVPMatrix() );
      var mvMat = globalScene.GetMVMatrix();
      gl.uniformMatrix4fv( this.ShaderResource.Context.mvMatrixUni, false, mvMat );
      mat4.invert( mvMat, mvMat );
	   mat4.transpose( mvMat, mvMat ); 
      gl.uniformMatrix4fv( this.ShaderResource.Context.nMatrixUni, false, mvMat );

      var lightGlobalTransform = globalLight.GetGlobalTransform();
      var lightPositionWorld = mat4.getTranslation( vec3.create(), lightGlobalTransform );
      var lightPositionCamera = vec3.transformMat4( vec3.create(), lightPositionWorld, globalScene.CameraNode.VMatrix );
    //  console.debug( vec3.str( lightPositionCamera ) );
      gl.uniform3f( this.ShaderResource.Context.LightPositionUni, lightPositionCamera[ 0 ], lightPositionCamera[ 1 ], lightPositionCamera[ 2 ] );
      
      gl.uniform1f( this.ShaderResource.Context.ShininessUni, this.Shininess );

      gl.uniform4f( this.ShaderResource.Context.LightAmbientUni, globalLight.Ambient[ 0 ], globalLight.Ambient[ 1 ], globalLight.Ambient[ 2 ], globalLight.Ambient[ 3 ] );
      gl.uniform4f( this.ShaderResource.Context.LightDiffuseUni, globalLight.Diffuse[ 0 ], globalLight.Diffuse[ 1 ], globalLight.Diffuse[ 2 ], globalLight.Diffuse[ 3 ] );
      gl.uniform4f( this.ShaderResource.Context.LightSpecularUni, globalLight.Specular[ 0 ], globalLight.Specular[ 1 ], globalLight.Specular[ 2 ], globalLight.Specular[ 3 ] );

      gl.uniform4f( this.ShaderResource.Context.MaterialAmbientUni, this.MaterialAmbient[ 0 ], this.MaterialAmbient[ 1 ], this.MaterialAmbient[ 2 ], this.MaterialAmbient[ 3 ] );
      gl.uniform4f( this.ShaderResource.Context.MaterialDiffuseUni, this.MaterialDiffuse[ 0 ], this.MaterialDiffuse[ 1 ], this.MaterialDiffuse[ 2 ], this.MaterialDiffuse[ 3 ] );
      gl.uniform4f( this.ShaderResource.Context.MaterialSpecularUni, this.MaterialSpecular[ 0 ], this.MaterialSpecular[ 1 ], this.MaterialSpecular[ 2 ], this.MaterialSpecular[ 3 ] );

      gl.drawElements( gl.TRIANGLES, this.MeshResource.Context.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );
      }
   }