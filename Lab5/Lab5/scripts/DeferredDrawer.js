var gDeferredDrawer = {};

gDeferredDrawer.Init = function()
   {
   gTextureDrawer.ShaderResource = new TextureShaderResource();
   gTextureDrawer.ShaderResource.Load( "deferredShader-vs", "deferredShader-fs" );
   gTextureDrawer.ScreenResource = {};

   // Create and bind frame buffer
   gTextureDrawer.ScreenResource.FrameBuffer,Context = gl.createFramebuffer();
   gl.bindFramebuffer( gl.FRAMEBUFFER, gTextureDrawer.ScreenResource.Contrxt.FrameBuffer );

   // Create and bind depth texture
   gTextureDrawer.ScreenResource.DepthTexture,Context = gl.createTexture();
   gl.bindTexture( gl.TEXTURE_2D, gTextureDrawer.ScreenResource.DepthTexture,Context );
   gl.texImage2D( gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, gl.viewportWidth, gl.viewportWidth, 0, gl.DEPTH_COMPONENT, gl.FLOAT, null);
   gl.pixelStorei( gl.UNPACK_ALIGNMENT, 1 );
   
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_COMPARE_FUNC, gl.LEQUAL );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_R_TO_TEXTURE );

   gl.FramebufferTexture( gl.FRAMEBUFFER, gl._DEPTH_ATTACHMENT, gTextureDrawer.ScreenResource.DepthTexture,Context, 0 );

   gl.bindFramebuffer( gl.FRAMEBUFFER, 0 );
   //gTextureDrawer.ScreenResource.FrameBuffer = gl.
   }