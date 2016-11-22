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

   gDeferredDrawer.ShaderResource = new DeferredShaderResource();
   gDeferredDrawer.ShaderResource.Load( "deferredShader-vs", "deferredShader-fs" );

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


   var drawBuffers = [];
        drawBuffers[0] = mrtExt.COLOR_ATTACHMENT0_WEBGL;
        drawBuffers[1] = mrtExt.COLOR_ATTACHMENT1_WEBGL;
       // drawBuffers[2] = mrtExt.COLOR_ATTACHMENT2_WEBGL;
       // drawBuffers[3] = mrtExt.COLOR_ATTACHMENT3_WEBGL;
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
   //gTextureDrawer.ScreenResource.FrameBuffer = gl.
   }