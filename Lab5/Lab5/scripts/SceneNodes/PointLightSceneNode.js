class PointLightSceneNode extends SceneNodes
   {
   constructor( ambient, diffuse, specular )
      {
      super();
      this.Ambient = ambient;
      this.Diffuse = diffuse;
      this.Specular = specular; 
      }
   }

class LightCubeSceneNode extends PointLightSceneNode
   {
   constructor( shaderResource, ambient, diffuse, specular )
      {
      super( ambient, diffuse, specular );
      this.ShaderResource = shaderResource;
      }

   OnRender()
      {
      if( !this.ShaderResource || !gDrawable )
         {
         return;
         }
  
      gl.useProgram( this.ShaderResource.Program.Context );
      gl.bindFramebuffer( gl.FRAMEBUFFER, gSecondPassFrameBuffer.Context );
      /////// Vertex Attributes

      gl.enableVertexAttribArray( this.ShaderResource.VertexPosAttr.Context );
      gl.bindBuffer( gl.ARRAY_BUFFER, gCubeResource.VertexPosBuffer.Context );
      gl.vertexAttribPointer( this.ShaderResource.VertexPosAttr.Context, gCubeResource.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      /////// Uniforms
      gl.uniformMatrix4fv( this.ShaderResource.mvpMatrixUni.Context, false, this.GetMVPMatrix( globalScene ) );

      gl.uniform4f( this.ShaderResource.LightColorUni.Context, this.ScreenColor[ 0 ], this.ScreenColor[ 1 ], this.ScreenColor[ 2 ], this.ScreenColor[ 3 ] );

      gl.uniform1f( this.ShaderResource.BrightnessThresholdUni.Context, gLightControlNode.BrightnessThreshold.Value );

      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gCubeResource.VertexIndexBuffer.Context );

      gl.drawElements( gl.TRIANGLES, gCubeResource.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );

      gl.bindFramebuffer( gl.FRAMEBUFFER, null );

      }
   }

class LightSphereSceneNode extends PointLightSceneNode
   {
   constructor( shaderResource, ambient, diffuse, specular )
      {
      super( ambient, diffuse, specular );
      this.ShaderResource = shaderResource;
      }

   OnRender()
      {
      if( !this.ShaderResource || !gDrawable )
         {
         return;
         }
  
      gl.useProgram( this.ShaderResource.Program.Context );
      gl.bindFramebuffer( gl.FRAMEBUFFER, gSecondPassFrameBuffer.Context );
      /////// Vertex Attributes

      gl.enableVertexAttribArray( this.ShaderResource.VertexPosAttr.Context );
      gl.bindBuffer( gl.ARRAY_BUFFER, gSphereRsource.VertexPosBuffer.Context );
      gl.vertexAttribPointer( this.ShaderResource.VertexPosAttr.Context, gSphereRsource.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      /////// Uniforms
      gl.uniformMatrix4fv( this.ShaderResource.mvpMatrixUni.Context, false, this.GetMVPMatrix( globalScene ) );

      gl.uniform4f( this.ShaderResource.LightColorUni.Context, this.ScreenColor[ 0 ], this.ScreenColor[ 1 ], this.ScreenColor[ 2 ], this.ScreenColor[ 3 ] );

      gl.uniform1f( this.ShaderResource.BrightnessThresholdUni.Context, gLightControlNode.BrightnessThreshold.Value );

      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gSphereRsource.VertexIndexBuffer.Context );

      gl.drawElements( gl.TRIANGLES, gSphereRsource.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );

      gl.bindFramebuffer( gl.FRAMEBUFFER, null );

      }
   }