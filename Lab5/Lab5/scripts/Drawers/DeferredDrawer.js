﻿var gDeferredDrawer = {};

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

   var depthTextureExt = gl.getExtension( "WEBGL_depth_texture" );
   if( !depthTextureExt ) 
      { 
      alert( "error" );
      return; 
      }

   var mrtExt = gl.getExtension( "WEBGL_draw_buffers" );
   if( !mrtExt )
      {
      alert( "error" );
      return; 
      }

   gDeferredDrawer.GeometryShaderResource = new DeferredGemotryShaderResource();
   gDeferredDrawer.GeometryShaderResource.Load( "deferredGeometryShader-vs", "deferredGeometryShader-fs" );

   // Create and bind frame buffer
   gDeferredDrawer.FrameBuffer = {};
   gDeferredDrawer.FrameBuffer.Context = gl.createFramebuffer();
   gl.bindFramebuffer( gl.FRAMEBUFFER, gDeferredDrawer.FrameBuffer.Context );

   // Create the render buffer
   //gDeferredDrawer.RenderBuffer = {};
   //gDeferredDrawer.RenderBuffer.Context = gl.createRenderbuffer();
   //gl.bindRenderbuffer( gl.RENDERBUFFER, gDeferredDrawer.RenderBuffer.Context );
   //gl.renderbufferStorage( gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth, gl.viewportHeigh );
   //gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, gDeferredDrawer.RenderBuffer.Context );

   ///////////////////////////////////////////////////////////////
   
   // Create and bind depth texture
   gDeferredDrawer.DepthTexture = {};
   gDeferredDrawer.DepthTexture.IsLoaded = false;
   gDeferredDrawer.DepthTexture.Context = gl.createTexture();
   gl.bindTexture( gl.TEXTURE_2D, gDeferredDrawer.DepthTexture.Context );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
   gl.texImage2D( gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, gl.viewportWidth, gl.viewportHeight, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null );   

   gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, gDeferredDrawer.DepthTexture.Context, 0 );

   gDeferredDrawer.DepthTexture.IsLoaded = true;

///////////////////////////////////////////////////////////////

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

   var drawBuffers = [];
        drawBuffers[0] = mrtExt.COLOR_ATTACHMENT0_WEBGL;
        drawBuffers[1] = mrtExt.COLOR_ATTACHMENT1_WEBGL;
        drawBuffers[2] = mrtExt.COLOR_ATTACHMENT2_WEBGL;
        drawBuffers[3] = mrtExt.COLOR_ATTACHMENT3_WEBGL;
        mrtExt.drawBuffersWEBGL( drawBuffers );

   var errCode = gl.getError();

   if( errCode != 0 )
      {
      alert( "WebGL error" );
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
   }

gDeferredDrawer.PreRender = function()
   {
   gl.bindFramebuffer( gl.FRAMEBUFFER, gDeferredDrawer.FrameBuffer.Context );
   gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
   gl.bindFramebuffer( gl.FRAMEBUFFER, null );
   }

gDeferredDrawer.FinalRender = function()
   {
   gl.useProgram( gDeferredDrawer.LightShaderResource.Program.Context );

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

   // Uniforms for lights
   var lightGlobalTransform = globalLight.GetGlobalTransform();
   var lightPositionWorld = mat4.getTranslation( vec3.create(), lightGlobalTransform );
   var lightPositionCamera = vec3.transformMat4( vec3.create(), lightPositionWorld, globalScene.CameraNode.VMatrix );
    
   gl.uniform3f( gDeferredDrawer.LightShaderResource.LightPositionUni.Context, lightPositionCamera[ 0 ], lightPositionCamera[ 1 ], lightPositionCamera[ 2 ] );   

   gl.uniform1f( gDeferredDrawer.LightShaderResource.ShininessUni.Context, 3 );

   gl.uniform4f( gDeferredDrawer.LightShaderResource.LightAmbientUni.Context, globalLight.Ambient[ 0 ], globalLight.Ambient[ 1 ], globalLight.Ambient[ 2 ], globalLight.Ambient[ 3 ] );
   gl.uniform4f( gDeferredDrawer.LightShaderResource.LightDiffuseUni.Context, globalLight.Diffuse[ 0 ], globalLight.Diffuse[ 1 ], globalLight.Diffuse[ 2 ], globalLight.Diffuse[ 3 ] );
   gl.uniform4f( gDeferredDrawer.LightShaderResource.LightSpecularUni.Context, globalLight.Specular[ 0 ], globalLight.Specular[ 1 ], globalLight.Specular[ 2 ], globalLight.Specular[ 3 ] );



   gl.drawElements( gl.TRIANGLES, gQuadResource.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );
   };