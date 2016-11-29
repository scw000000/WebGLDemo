var gBloomDrawer = {};

gBloomDrawer.Init = function()
   {
   var texFloatLinearExt = gl.getExtension( "OES_texture_float_linear" );
   if( !texFloatLinearExt ) 
      { 
      alert( "WebGL init extension error" );
      return; 
      }
   var texFloatExt = gl.getExtension( "OES_texture_float" );
   if( !texFloatExt ) 
      { 
      alert( "WebGL init extension error" );
      return; 
      }

   gBloomDrawer.IterateNum = {};
   gBloomDrawer.IterateNum.Min = 0;
   gBloomDrawer.IterateNum.Max = 20;
   gBloomDrawer.IterateNum.Value = 6;

   gBloomDrawer.BlurShaderResource = new GaussianBlurShaderResource();
   gBloomDrawer.BlurShaderResource.Load( "gaussianBlurShader-vs", "gaussianBlurShader-fs" );

   gBloomDrawer.LightCombineShaderResource = new LightCombineShaderResource();
   gBloomDrawer.LightCombineShaderResource.Load( "lightCombineShader-vs", "lightCombineShader-fs" );
   
   gBloomDrawer.PingPongFBO = [];
   gBloomDrawer.PingPongTexture = [];

   for( var i = 0; i < 2; ++i )
      {
      gBloomDrawer.PingPongFBO[ i ] = {};
      gBloomDrawer.PingPongFBO[ i ].Context = gl.createFramebuffer();
      gl.bindFramebuffer( gl.FRAMEBUFFER, gBloomDrawer.PingPongFBO[ i ].Context );

      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, null );

      gBloomDrawer.PingPongTexture[ i ] = {};
      gBloomDrawer.PingPongTexture[ i ].Context = gl.createTexture();
      gl.bindTexture( gl.TEXTURE_2D, gBloomDrawer.PingPongTexture[ i ].Context );
      gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
      gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
      gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);  
      gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.viewportWidth, gl.viewportHeight, 0, gl.RGB, gl.FLOAT, null);
      gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, gBloomDrawer.PingPongTexture[ i ].Context, 0 );
      gBloomDrawer.PingPongTexture[ i ].IsLoaded = true;

      fboCheckCode = gl.checkFramebufferStatus( gl.FRAMEBUFFER );
      if( fboCheckCode != gl.FRAMEBUFFER_COMPLETE )
         {
         alert( "Frame Buffer error" );
         }

      gl.bindFramebuffer( gl.FRAMEBUFFER, null );
      }

   //gBloomDrawer.CombineFBO = {};
   //BloomDrawer.CombineFBO.Context = gl.createFramebuffer();
   //gl.bindFramebuffer( gl.FRAMEBUFFER,  BloomDrawer.CombineFBO.Context );
   //gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, null );
   //gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, gDeferredDrawer.OutputTexture.Context, 0 );
   
   //fboCheckCode = gl.checkFramebufferStatus( gl.FRAMEBUFFER );
   //   if( fboCheckCode != gl.FRAMEBUFFER_COMPLETE )
   //      {
   //      alert( "Frame Buffer error" );
   //      }

   //   gl.bindFramebuffer( gl.FRAMEBUFFER, null );
   }

gBloomDrawer.DrawGussianBlur = function()
   {
   gl.bindFramebuffer( gl.FRAMEBUFFER, gBloomDrawer.PingPongFBO[ 0 ].Context );
   gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
   gl.bindFramebuffer( gl.FRAMEBUFFER, gBloomDrawer.PingPongFBO[ 1 ].Context );
   gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

   gl.disableVertexAttribArray( 2 );
   gl.disableVertexAttribArray( 3 ); 

   gl.useProgram( gBloomDrawer.BlurShaderResource.Program.Context );

   for( var i = 0; i < gBloomDrawer.IterateNum.Value; ++i )
      {
      gl.bindFramebuffer( gl.FRAMEBUFFER, gBloomDrawer.PingPongFBO[ i % 2 ].Context );
      var referenceTexture = gDeferredDrawer.LightTexture;
      if( i != 0 )
         {
         referenceTexture = gBloomDrawer.PingPongTexture[ 1 - ( i % 2 ) ];
         }
      gl.enableVertexAttribArray( gBloomDrawer.BlurShaderResource.VertexPosAttr.Context );
      gl.bindBuffer( gl.ARRAY_BUFFER, gQuadResource.VertexPosBuffer.Context );
      gl.vertexAttribPointer( gBloomDrawer.BlurShaderResource.VertexPosAttr.Context, gQuadResource.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.enableVertexAttribArray( gBloomDrawer.BlurShaderResource.VertexUVAttr.Context );
      gl.bindBuffer( gl.ARRAY_BUFFER, gQuadResource.VertexUVBuffer.Context );
      gl.vertexAttribPointer( gBloomDrawer.BlurShaderResource.VertexUVAttr.Context, gQuadResource.VertexUVBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gQuadResource.VertexIndexBuffer.Context );

      gl.activeTexture( gl.TEXTURE0 );  
	   gl.bindTexture( gl.TEXTURE_2D, referenceTexture.Context );  
	   gl.uniform1i( gBloomDrawer.BlurShaderResource.ReferenceTextureUni.Context, 0 );  

      gl.uniform1i( gBloomDrawer.BlurShaderResource.DirectionUni.Context, i % 2 );

      gl.uniform2f( gBloomDrawer.BlurShaderResource.InvTextureSizeUni.Context, 1 / gl.viewportWidth, 1 / gl.viewportHeight );

      gl.drawElements( gl.TRIANGLES, gQuadResource.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );

      }

   gl.bindFramebuffer( gl.FRAMEBUFFER, null );

   //if( i == 0 )
   //   {
   //   return gDeferredDrawer.LightTexture;
   //   }

   //return gBloomDrawer.PingPongTexture[ !( gBloomDrawer.IterateNum.Value % 2 ) ];
   }

gBloomDrawer.CombineLightAndScene = function()
   {
   gl.bindFramebuffer( gl.FRAMEBUFFER, null );
   gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

   gl.useProgram( gBloomDrawer.LightCombineShaderResource.Program.Context );

   gl.activeTexture( gl.TEXTURE0 );  
	gl.bindTexture( gl.TEXTURE_2D, gDeferredDrawer.OutputTexture.Context );  
   gl.uniform1i( gBloomDrawer.LightCombineShaderResource.SceneTextureUni.Context, 0 ); 

   var lightTexture = gDeferredDrawer.LightTexture;
   if( gBloomDrawer.IterateNum.Value != 0 )
      {
      lightTexture = gBloomDrawer.PingPongTexture[ 1 - ( gBloomDrawer.IterateNum.Value % 2 ) ];
      }

   gl.activeTexture( gl.TEXTURE1 );  
	gl.bindTexture( gl.TEXTURE_2D, lightTexture.Context );  
	gl.uniform1i( gBloomDrawer.LightCombineShaderResource.LightTextureUni.Context, 1 ); 


   gl.enableVertexAttribArray( gBloomDrawer.LightCombineShaderResource.VertexPosAttr.Context );
   gl.bindBuffer( gl.ARRAY_BUFFER, gQuadResource.VertexPosBuffer.Context );
   gl.vertexAttribPointer( gBloomDrawer.LightCombineShaderResource.VertexPosAttr.Context, gQuadResource.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

   gl.enableVertexAttribArray( gBloomDrawer.LightCombineShaderResource.VertexUVAttr.Context );
   gl.bindBuffer( gl.ARRAY_BUFFER, gQuadResource.VertexUVBuffer.Context );
   gl.vertexAttribPointer( gBloomDrawer.LightCombineShaderResource.VertexUVAttr.Context, gQuadResource.VertexUVBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gQuadResource.VertexIndexBuffer.Context );

   gl.drawElements( gl.TRIANGLES, gQuadResource.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );
   }