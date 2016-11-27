var gDeferredDrawer = {};

gDeferredDrawer.Init = function()
   {
   var texFloatExt = gl.getExtension( "OES_texture_float" );
   if( !texFloatExt ) 
      { 
      alert( "error" );
      return; 
      }

   var texFloatLinearExt = gl.getExtension( "OES_texture_float_linear" );
   if( !texFloatLinearExt ) 
      { 
      alert( "error" );
      return; 
      }

   var mrtExt = gl.getExtension( "WEBGL_draw_buffers" );
   if( !mrtExt )
      {
      alert( "error" );
      return; 
     // return; 
      }

   gDeferredDrawer.GeometryShaderResource = new DeferredGemotryShaderResource();
   gDeferredDrawer.GeometryShaderResource.Load( "deferredGeometryShader-vs", "deferredGeometryShader-fs" );

   // Create and bind frame buffer
   gDeferredDrawer.GeometryFrameBuffer = {};
   gDeferredDrawer.GeometryFrameBuffer.Context = gl.createFramebuffer();
   gl.bindFramebuffer( gl.FRAMEBUFFER, gDeferredDrawer.GeometryFrameBuffer.Context );

   // Create the render buffer, which hold the real depth value
   gDeferredDrawer.GeometryDepthBuffer = {};
   gDeferredDrawer.GeometryDepthBuffer.Context = gl.createRenderbuffer();
   gl.bindRenderbuffer( gl.RENDERBUFFER, gDeferredDrawer.GeometryDepthBuffer.Context );
   gl.renderbufferStorage( gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth, gl.viewportHeight );
   gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, gDeferredDrawer.GeometryDepthBuffer.Context );

   ///////////////////////////////////////////////////////////////
   // Create and bind depth texture
   //gDeferredDrawer.DepthTexture = {};
   //gDeferredDrawer.DepthTexture.IsLoaded = false;
   //gDeferredDrawer.DepthTexture.Context = gl.createTexture();
   //gl.bindTexture( gl.TEXTURE_2D, gDeferredDrawer.DepthTexture.Context );
   //gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
   //gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
   //gl.texImage2D( gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT16, gl.viewportWidth, gl.viewportHeight, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null );   
   //gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, gDeferredDrawer.DepthTexture.Context, 0 );

   //gDeferredDrawer.DepthTexture.IsLoaded = true;

///////////////////////////////////////////////////////////////
   var errCode = gl.getError();

   if( errCode != 0 )
      {
      alert("- How to execute on your browser:\n1. Currently it will only support Google Chrome\n2. Enter about:flags in address bar.\n3. Find the field WebGL 2.0 Prototype and enable it.)" );
      return;
      }
   // Position Buffer
   gDeferredDrawer.PositionTexture = {};
   gDeferredDrawer.PositionTexture.IsLoaded = false;
   gDeferredDrawer.PositionTexture.Context = gl.createTexture();
   gl.bindTexture( gl.TEXTURE_2D, gDeferredDrawer.PositionTexture.Context );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
   gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth, gl.viewportHeight, 0, gl.RGBA, gl.FLOAT, null);
   gl.framebufferTexture2D( gl.FRAMEBUFFER, mrtExt.COLOR_ATTACHMENT0_WEBGL, gl.TEXTURE_2D, gDeferredDrawer.PositionTexture.Context, 0 );
   gDeferredDrawer.PositionTexture.IsLoaded = true;

///////////////////////////////////////////////////////////////
   var errCode = gl.getError();

   if( errCode != 0 )
      {
      alert("- How to execute on your browser:\n1. Currently it will only support Google Chrome\n2. Enter about:flags in address bar.\n3. Find the field WebGL 2.0 Prototype and enable it.)" );
      return;
      }
   // Normal Buffer
   gDeferredDrawer.NormalTexture = {};
   gDeferredDrawer.NormalTexture.IsLoaded = false;
   gDeferredDrawer.NormalTexture.Context = gl.createTexture();
   gl.bindTexture( gl.TEXTURE_2D, gDeferredDrawer.NormalTexture.Context );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
   gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth, gl.viewportHeight, 0, gl.RGBA, gl.FLOAT, null);
   gl.framebufferTexture2D( gl.FRAMEBUFFER, mrtExt.COLOR_ATTACHMENT1_WEBGL, gl.TEXTURE_2D, gDeferredDrawer.NormalTexture.Context, 0 );
   gDeferredDrawer.NormalTexture.IsLoaded = true;

///////////////////////////////////////////////////////////////
   var errCode = gl.getError();

   if( errCode != 0 )
      {
      alert("- How to execute on your browser:\n1. Currently it will only support Google Chrome\n2. Enter about:flags in address bar.\n3. Find the field WebGL 2.0 Prototype and enable it.)" );
      return;
      }
   // Albedo Buffer
   gDeferredDrawer.AlbedoTexture = {};
   gDeferredDrawer.AlbedoTexture.IsLoaded = false;
   gDeferredDrawer.AlbedoTexture.Context = gl.createTexture();
   gl.bindTexture( gl.TEXTURE_2D, gDeferredDrawer.AlbedoTexture.Context );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
   gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth, gl.viewportHeight, 0, gl.RGBA, gl.FLOAT, null);
   gl.framebufferTexture2D( gl.FRAMEBUFFER, mrtExt.COLOR_ATTACHMENT2_WEBGL, gl.TEXTURE_2D, gDeferredDrawer.AlbedoTexture.Context, 0 );
   gDeferredDrawer.AlbedoTexture.IsLoaded = true;

///////////////////////////////////////////////////////////////
   var errCode = gl.getError();

   if( errCode != 0 )
      {
      alert("- How to execute on your browser:\n1. Currently it will only support Google Chrome\n2. Enter about:flags in address bar.\n3. Find the field WebGL 2.0 Prototype and enable it.)" );
      return;
      }
   // Dissuse Buffer
   gDeferredDrawer.DiffuseTexture = {};
   gDeferredDrawer.DiffuseTexture.IsLoaded = false;
   gDeferredDrawer.DiffuseTexture.Context = gl.createTexture();
   gl.bindTexture( gl.TEXTURE_2D, gDeferredDrawer.DiffuseTexture.Context );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
   gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth, gl.viewportHeight, 0, gl.RGBA, gl.FLOAT, null);
   gl.framebufferTexture2D( gl.FRAMEBUFFER, mrtExt.COLOR_ATTACHMENT3_WEBGL, gl.TEXTURE_2D, gDeferredDrawer.DiffuseTexture.Context, 0 );
   gDeferredDrawer.DiffuseTexture.IsLoaded = true;

///////////////////////////////////////////////////////////////
   var errCode = gl.getError();

   if( errCode != 0 )
      {
      alert("- How to execute on your browser:\n1. Currently it will only support Google Chrome\n2. Enter about:flags in address bar.\n3. Find the field WebGL 2.0 Prototype and enable it.)" );
      return;
      }
   var drawBuffers = [];
    drawBuffers[ 0 ] = mrtExt.COLOR_ATTACHMENT0_WEBGL;
   drawBuffers[ 1 ] = mrtExt.COLOR_ATTACHMENT1_WEBGL;
   drawBuffers[ 2 ] = mrtExt.COLOR_ATTACHMENT2_WEBGL;
   drawBuffers[ 3 ] = mrtExt.COLOR_ATTACHMENT3_WEBGL;
   mrtExt.drawBuffersWEBGL( drawBuffers );

   var errCode = gl.getError();

   if( errCode != 0 )
      {
      alert("- How to execute on your browser:\n1. Currently it will only support Google Chrome\n2. Enter about:flags in address bar.\n3. Find the field WebGL 2.0 Prototype and enable it.)" );
      return;
      }

   gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

   var fboCheckCode = gl.checkFramebufferStatus( gl.FRAMEBUFFER );
   if( fboCheckCode != gl.FRAMEBUFFER_COMPLETE )
      {
      alert( "Frame Buffer error" );
      }

   gl.bindFramebuffer( gl.FRAMEBUFFER, null );
   
   ////////////////////// Ligh Shader 
   gDeferredDrawer.LightShaderResource = new DeferredLightShaderResource();
   gDeferredDrawer.LightShaderResource.Load( "deferredLightShader-vs", "deferredLightShader-fs" );

   gDeferredDrawer.UseSSAO = 1;

      // Create and bind frame buffer
   gDeferredDrawer.LightPassFrameBuffer = {};
   gDeferredDrawer.LightPassFrameBuffer.Context = gl.createFramebuffer();
   gl.bindFramebuffer( gl.FRAMEBUFFER, gDeferredDrawer.LightPassFrameBuffer.Context );

   // Create the render buffer
   //gDeferredDrawer.LightRenderBuffer = {};
   //gDeferredDrawer.LightRenderBuffer.Context = gl.createRenderbuffer();
   //gl.bindRenderbuffer( gl.RENDERBUFFER, gDeferredDrawer.LightRenderBuffer.Context );
   //gl.renderbufferStorage( gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth, gl.viewportHeight );
   gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, null );

   // Output Buffer
   gDeferredDrawer.OutputTexture = {};
   gDeferredDrawer.OutputTexture.IsLoaded = false;
   gDeferredDrawer.OutputTexture.Context = gl.createTexture();
   gl.bindTexture( gl.TEXTURE_2D, gDeferredDrawer.OutputTexture.Context );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
   gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.viewportWidth, gl.viewportHeight, 0, gl.RGBA, gl.FLOAT, null);
   gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, gDeferredDrawer.OutputTexture.Context, 0 );
   gDeferredDrawer.OutputTexture.IsLoaded = true;

  // gl.drawBuffers( [ gl.COLOR_ATTACHMENT0 ] );

   var errCode = gl.getError();

   if( errCode != 0 )
      {
      alert("- How to execute on your browser:\n1. Currently it will only support Google Chrome\n2. Enter about:flags in address bar.\n3. Find the field WebGL 2.0 Prototype and enable it.)" );
      return;
      }

   gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

   var fboCheckCode = gl.checkFramebufferStatus( gl.FRAMEBUFFER );
   if( fboCheckCode != gl.FRAMEBUFFER_COMPLETE )
      {
      alert( "Frame Buffer error" );
      }
   }

gDeferredDrawer.PreRender = function()
   {
   gl.bindFramebuffer( gl.FRAMEBUFFER, gDeferredDrawer.GeometryFrameBuffer.Context );
   gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
   gl.bindFramebuffer( gl.FRAMEBUFFER, null );
   }

gDeferredDrawer.FinalRender = function()
   {
   if( gDrawable == false )
      {
      return;
      }
   gl.useProgram( gDeferredDrawer.LightShaderResource.Program.Context );
   gl.bindFramebuffer( gl.FRAMEBUFFER, gDeferredDrawer.LightPassFrameBuffer.Context );
   
   ////////////////////// VBOs

   gl.enableVertexAttribArray( gDeferredDrawer.LightShaderResource.VertexPosAttr.Context );
   gl.bindBuffer( gl.ARRAY_BUFFER, gQuadResource.VertexPosBuffer.Context );
   gl.vertexAttribPointer( gDeferredDrawer.LightShaderResource.VertexPosAttr.Context, gQuadResource.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

   gl.enableVertexAttribArray( gDeferredDrawer.LightShaderResource.VertexUVAttr.Context );
   gl.bindBuffer( gl.ARRAY_BUFFER, gQuadResource.VertexUVBuffer.Context );
   gl.vertexAttribPointer( gDeferredDrawer.LightShaderResource.VertexUVAttr.Context, gQuadResource.VertexUVBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gQuadResource.VertexIndexBuffer.Context );

   ////////////////////// VBOs

   gl.activeTexture( gl.TEXTURE0 );  
	gl.bindTexture( gl.TEXTURE_2D, gDeferredDrawer.PositionTexture.Context );  
	gl.uniform1i( gDeferredDrawer.LightShaderResource.PositionTextureUni.Context, 0 );  

   gl.activeTexture( gl.TEXTURE1 );  
	gl.bindTexture( gl.TEXTURE_2D, gDeferredDrawer.NormalTexture.Context );  
	gl.uniform1i( gDeferredDrawer.LightShaderResource.NormalTextureUni.Context, 1 );  

   gl.activeTexture( gl.TEXTURE2 );  
	gl.bindTexture( gl.TEXTURE_2D, gDeferredDrawer.AlbedoTexture.Context );  
	gl.uniform1i( gDeferredDrawer.LightShaderResource.AlbedoTextureUni.Context, 2 );  

   gl.activeTexture( gl.TEXTURE3 );  
	gl.bindTexture( gl.TEXTURE_2D, gDeferredDrawer.DiffuseTexture.Context );  
	gl.uniform1i( gDeferredDrawer.LightShaderResource.MaterialDiffuseTextureUni.Context, 3 );  

   gl.activeTexture( gl.TEXTURE4 );  
	gl.bindTexture( gl.TEXTURE_2D, gSSAODrawer.BlurTexture.Context );  
	gl.uniform1i( gDeferredDrawer.LightShaderResource.BlurTextureUni.Context, 4 );  

   ///// Lights

   // Uniforms for lights
   //var lightGlobalTransform = gLightManager.LightNodes[ 0 ].GetGlobalTransform();
   //var lightPositionWorld = mat4.getTranslation( vec3.create(), lightGlobalTransform );
   //var lightPositionCamera = vec3.transformMat4( vec3.create(), lightPositionWorld, globalScene.CameraNode.VMatrix );
    
   //gl.uniform3f( gDeferredDrawer.LightShaderResource.LightPositionUni.Context, lightPositionCamera[ 0 ], lightPositionCamera[ 1 ], lightPositionCamera[ 2 ] );   

   //gl.uniform4f( gDeferredDrawer.LightShaderResource.LightAmbientUni.Context, gLightManager.LightNodes[ 0 ].Ambient[ 0 ], gLightManager.LightNodes[ 0 ].Ambient[ 1 ], gLightManager.LightNodes[ 0 ].Ambient[ 2 ], gLightManager.LightNodes[ 0 ].Ambient[ 3 ] );
   //gl.uniform4f( gDeferredDrawer.LightShaderResource.LightDiffuseUni.Context, gLightManager.LightNodes[ 0 ].Diffuse[ 0 ], gLightManager.LightNodes[ 0 ].Diffuse[ 1 ], gLightManager.LightNodes[ 0 ].Diffuse[ 2 ], gLightManager.LightNodes[ 0 ].Diffuse[ 3 ] );
   //gl.uniform4f( gDeferredDrawer.LightShaderResource.LightSpecularUni.Context, gLightManager.LightNodes[ 0 ].Specular[ 0 ], gLightManager.LightNodes[ 0 ].Specular[ 1 ], gLightManager.LightNodes[ 0 ].Specular[ 2 ], gLightManager.LightNodes[ 0 ].Specular[ 3 ] );

   for( var i = 0; i < gLightManager.LightNum.Value; ++i )
      {
      var lightGlobalTransform = gLightManager.LightNodes[ i ].GetGlobalTransform().GetToWorld();
      var lightPositionWorld = mat4.getTranslation( vec3.create(), lightGlobalTransform );
      var lightPositionCamera = vec3.transformMat4( vec3.create(), lightPositionWorld, globalScene.CameraNode.VMatrix );
    
      gl.uniform3f( gDeferredDrawer.LightShaderResource.LightPositionUni[ i ].Context, lightPositionCamera[ 0 ], lightPositionCamera[ 1 ], lightPositionCamera[ 2 ] );   

      gl.uniform4f( gDeferredDrawer.LightShaderResource.LightAmbientUni[ i ].Context, gLightManager.LightNodes[ i ].Ambient[ 0 ], gLightManager.LightNodes[ i ].Ambient[ 1 ], gLightManager.LightNodes[ i ].Ambient[ 2 ], gLightManager.LightNodes[ i ].Ambient[ 3 ] );
      gl.uniform4f( gDeferredDrawer.LightShaderResource.LightDiffuseUni[ i ].Context, gLightManager.LightNodes[ i ].Diffuse[ 0 ], gLightManager.LightNodes[ i ].Diffuse[ 1 ], gLightManager.LightNodes[ i ].Diffuse[ 2 ], gLightManager.LightNodes[ i ].Diffuse[ 3 ] );
      gl.uniform4f( gDeferredDrawer.LightShaderResource.LightSpecularUni[ i ].Context, gLightManager.LightNodes[ i ].Specular[ 0 ], gLightManager.LightNodes[ i ].Specular[ 1 ], gLightManager.LightNodes[ i ].Specular[ 2 ], gLightManager.LightNodes[ i ].Specular[ 3 ] );
      }

   gl.uniform1i( gDeferredDrawer.LightShaderResource.LightNumUni.Context, gLightManager.LightNum.Value );

   gl.uniform1f( gDeferredDrawer.LightShaderResource.LightRadiusSqrUni.Context, gLightManager.LightRadiusSqr.Value );

   gl.uniform1i( gDeferredDrawer.LightShaderResource.UseSSAOUni.Context, gDeferredDrawer.UseSSAO );

   gl.drawElements( gl.TRIANGLES, gQuadResource.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );

   gl.bindFramebuffer( gl.FRAMEBUFFER, null );
   };

