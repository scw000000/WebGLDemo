var gDeferredDrawer = {};

gDeferredDrawer.Init = function()
   {
   var depthTextureExt = gl.getExtension("WEBKIT_WEBGL_depth_texture"); // Or browser-appropriate prefix
   if(!depthTextureExt) { 
      alert( "error" );
      return; 
      }

   gDeferredDrawer.ShaderResource = new DeferredShaderResource();
   gDeferredDrawer.ShaderResource.Load( "deferredShader-vs", "deferredShader-fs" );

   // Create and bind frame buffer
   gDeferredDrawer.FrameBuffer = {};
   gDeferredDrawer.FrameBuffer.Context = gl.createFramebuffer();
   gl.bindFramebuffer( gl.FRAMEBUFFER, gDeferredDrawer.FrameBuffer.Context );

   // Create and bind depth texture
   gDeferredDrawer.DepthTexture = {};
   gDeferredDrawer.DepthTexture.IsLoaded = false;
   gDeferredDrawer.DepthTexture.Context = gl.createTexture();
   gl.bindTexture( gl.TEXTURE_2D, gDeferredDrawer.DepthTexture.Context );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
   gl.texImage2D( gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, gl.viewportWidth, gl.viewportHeight, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null );
   //gl.texImage2D( gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, 512, 512, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null );
   
   //gl.pixelStorei( gl.UNPACK_ALIGNMENT, 1 );

   gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, gDeferredDrawer.DepthTexture.Context, 0 );

   gDeferredDrawer.DepthTexture.IsLoaded = true;

   var errCode = gl.getError();

   gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

   if( gl.checkFramebufferStatus( gl.FRAMEBUFFER ) != gl.FRAMEBUFFER_COMPLETE )
      {
      alert( "Frame Buffer error" );
      }

   gl.bindFramebuffer( gl.FRAMEBUFFER, null );
   //gTextureDrawer.ScreenResource.FrameBuffer = gl.
   }