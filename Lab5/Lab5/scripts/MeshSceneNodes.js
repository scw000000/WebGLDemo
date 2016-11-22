class MeshSceneNode extends SceneNodes
   {
   constructor( meshResource, meshTextureResource )
      {
      super();
      this.VertexColorBuffer = null;
      this.Shininess = 3.0;
      this.MaterialAmbient = vec4.fromValues( 1.0, 1.0, 1.0, 1.0 );
      this.MaterialDiffuse = vec4.fromValues( 1.0, 1.0, 1.0, 1.0 );
      this.MaterialSpecular = vec4.fromValues( 1.0, 1.0, 1.0, 1.0 );
      this.MeshResource = meshResource;
      this.MeshTextureResource = meshTextureResource;
      }

   Initbuffer() { }

   DelegateOnRestore()
      {
      this.Program = initShaders( "shader-vs", "shader-fs" );
      
      this.Program.VertexPosAttr = gl.getAttribLocation( this.Program, "aVertexPosition" );
      gl.enableVertexAttribArray( this.Program.VertexPosAttr );

      this.Program.VertexNormalAttr = gl.getAttribLocation( this.Program, "aVertexNormal" );
      gl.enableVertexAttribArray( this.Program.VertexNormalAttr );

      this.Program.VertexUVAttr = gl.getAttribLocation( this.Program, "aVertexUV" );
      gl.enableVertexAttribArray( this.Program.VertexUVAttr );

      this.Program.mvpMatrixUni = gl.getUniformLocation( this.Program, "uMVPMatrix" );
      this.Program.mvMatrixUni = gl.getUniformLocation( this.Program, "uMVMatrix" );
      this.Program.nMatrixUni = gl.getUniformLocation( this.Program, "uNMatrix" );
      
      this.Program.LightPositionUni = gl.getUniformLocation( this.Program, "uLightPos_CameraSpace" );

      this.Program.ShininessUni = gl.getUniformLocation( this.Program, "uShininess" );

      this.Program.MaterialAmbientUni = gl.getUniformLocation( this.Program, "uLightAmbient" );
      this.Program.MaterialDiffuseUni = gl.getUniformLocation( this.Program, "uLightDiffuse" );
      this.Program.MaterialSpecularUni = gl.getUniformLocation( this.Program, "uLightSpecular" );

      this.Program.LightAmbientUni = gl.getUniformLocation( this.Program, "uMaterialAmbient" );
      this.Program.LightDiffuseUni = gl.getUniformLocation( this.Program, "uMaterialDiffuse" );
      this.Program.LightSpecularUni = gl.getUniformLocation( this.Program, "uMaterialSpecular" );

      this.Program.MeshTextureUni = gl.getUniformLocation( this.Program, "uMeshTexture" );
      }

   OnRender()
      {
      if( !this.MeshResource.IsLoaded || !this.MeshTextureResource.IsLoaded )
         {
         return;
         }

      gl.useProgram( this.Program );

      gl.enableVertexAttribArray( this.Program.VertexPosAttr );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.MeshResource.Context.VertexPosBuffer );
      gl.vertexAttribPointer( this.Program.VertexPosAttr, this.MeshResource.Context.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.enableVertexAttribArray( this.Program.VertexNormalAttr );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.MeshResource.Context.VertexNormalBuffer );
      gl.vertexAttribPointer( this.Program.VertexNormalAttr, this.MeshResource.Context.VertexNormalBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.enableVertexAttribArray( this.Program.VertexUVAttr );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.MeshResource.Context.VertexUVBuffer );
      gl.vertexAttribPointer( this.Program.VertexUVAttr, this.MeshResource.Context.VertexUVBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.MeshResource.Context.VertexIndexBuffer );
      //gl.enableVertexAttribArray( this.Program.VertexColorAttr );
      //gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexColorBuffer );
      //gl.vertexAttribPointer( this.Program.VertexColorAttr, this.VertexColorBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.activeTexture( gl.TEXTURE0 );   // set texture unit 0 to use 
	   gl.bindTexture( gl.TEXTURE_2D, this.MeshTextureResource.Context );    // bind the texture object to the texture unit 
	   gl.uniform1i( this.Program.MeshTextureUni, 0 );   // pass the texture unit to the shader 

      gl.uniformMatrix4fv( this.Program.mvpMatrixUni, false, globalScene.GetMVPMatrix() );
      var mvMat = globalScene.GetMVMatrix();
      gl.uniformMatrix4fv( this.Program.mvMatrixUni, false, mvMat );
      mat4.invert( mvMat, mvMat );
	   mat4.transpose( mvMat, mvMat ); 
      gl.uniformMatrix4fv( this.Program.nMatrixUni, false, mvMat );

      var lightGlobalTransform = globalLight.GetGlobalTransform();
      var lightPositionWorld = mat4.getTranslation( vec3.create(), lightGlobalTransform );
      var lightPositionCamera = vec3.transformMat4( vec3.create(), lightPositionWorld, globalScene.CameraNode.VMatrix );
    //  console.debug( vec3.str( lightPositionCamera ) );
      gl.uniform3f( this.Program.LightPositionUni, lightPositionCamera[ 0 ], lightPositionCamera[ 1 ], lightPositionCamera[ 2 ] );
      
      gl.uniform1f( this.Program.ShininessUni, this.Shininess );

      gl.uniform4f( this.Program.LightAmbientUni, globalLight.Ambient[ 0 ], globalLight.Ambient[ 1 ], globalLight.Ambient[ 2 ], globalLight.Ambient[ 3 ] );
      gl.uniform4f( this.Program.LightDiffuseUni, globalLight.Diffuse[ 0 ], globalLight.Diffuse[ 1 ], globalLight.Diffuse[ 2 ], globalLight.Diffuse[ 3 ] );
      gl.uniform4f( this.Program.LightSpecularUni, globalLight.Specular[ 0 ], globalLight.Specular[ 1 ], globalLight.Specular[ 2 ], globalLight.Specular[ 3 ] );

      gl.uniform4f( this.Program.MaterialAmbientUni, this.MaterialAmbient[ 0 ], this.MaterialAmbient[ 1 ], this.MaterialAmbient[ 2 ], this.MaterialAmbient[ 3 ] );
      gl.uniform4f( this.Program.MaterialDiffuseUni, this.MaterialDiffuse[ 0 ], this.MaterialDiffuse[ 1 ], this.MaterialDiffuse[ 2 ], this.MaterialDiffuse[ 3 ] );
      gl.uniform4f( this.Program.MaterialSpecularUni, this.MaterialSpecular[ 0 ], this.MaterialSpecular[ 1 ], this.MaterialSpecular[ 2 ], this.MaterialSpecular[ 3 ] );

      gl.drawElements( gl.TRIANGLES, this.MeshResource.Context.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );
      }
   }