var gSSAODrawer = {};

gSSAODrawer.Init = function()
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
   gSSAODrawer.SampleRadius = {};
   gSSAODrawer.SampleRadius.Min = 0.3;
   gSSAODrawer.SampleRadius.Max = 30.0;
   gSSAODrawer.SampleRadius.Value = 14;

   gSSAODrawer.SampleNum = {};
   gSSAODrawer.SampleNum.Min = 10;
   gSSAODrawer.SampleNum.Max = 100;
   gSSAODrawer.SampleNum.Value = 32;

   gSSAODrawer.SSAOPower = {};
   gSSAODrawer.SSAOPower.Min = 0.3;
   gSSAODrawer.SSAOPower.Max = 20.0;
   gSSAODrawer.SSAOPower.Value = 9.5;

   gSSAODrawer.SSAOShaderResource = new SSAOShaderResource();
   gSSAODrawer.SSAOShaderResource.Load( "SSAOShader-vs", "SSAOShader-fs" );
   
   //gSSAODrawer.GeometryShaderResource = new DeferredGemotryShaderResource();
   //gSSAODrawer.GeometryShaderResource.Load( "deferredGeometryShader-vs", "deferredGeometryShader-fs" );

   // Create and bind frame buffer
   gSSAODrawer.SSAOFrameBuffer = {};
   gSSAODrawer.SSAOFrameBuffer.Context = gl.createFramebuffer();
   gl.bindFramebuffer( gl.FRAMEBUFFER, gSSAODrawer.SSAOFrameBuffer.Context );

   // Create the render buffer
   //gSSAODrawer.SSAORenderBuffer = {};
   //gSSAODrawer.SSAORenderBuffer.Context = gl.createRenderbuffer();
   //gl.bindRenderbuffer( gl.RENDERBUFFER, gSSAODrawer.SSAORenderBuffer.Context );
   //gl.renderbufferStorage( gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth, gl.viewportHeight );
   //gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, gSSAODrawer.SSAORenderBuffer.Context );
   gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, null );

   var errCode = gl.getError();

   if( errCode != 0 )
      {
      alert("SSAO render buffer init error" );
      return;
      }

   ///////////////////////////////////////////////////////////////

   // Occlusion Buffer
   gSSAODrawer.OcclusionTexture = {};
   gSSAODrawer.OcclusionTexture.IsLoaded = false;

   gSSAODrawer.OcclusionTexture.Context = gl.createTexture();
   gl.bindTexture( gl.TEXTURE_2D, gSSAODrawer.OcclusionTexture.Context );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);  
   gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.viewportWidth, gl.viewportHeight, 0, gl.RGB, gl.FLOAT, null);
   gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, gSSAODrawer.OcclusionTexture.Context, 0 );

   gSSAODrawer.OcclusionTexture.IsLoaded = true;

   ///////////////////////////////////////////////////////////////

   // Noise texture : generate 4x4 random rotation vector in cameraspace, to produce a TBN matrix
   var randomVectors = [];
   for( var i = 0; i < 16; ++i )
      {
      var randomVec = vec3.fromValues(( Math.random() - 0.5 ) * 2.0, ( Math.random() - 0.5 ) * 2.0, 0 );
      vec3.normalize( randomVec, randomVec );
      randomVectors[ i * 3     ] = randomVec[ 0 ];
      randomVectors[ i * 3 + 1 ] = randomVec[ 1 ];
      randomVectors[ i * 3 + 2 ] = randomVec[ 2 ];
      }

   gSSAODrawer.NoiseTexture = {};
   gSSAODrawer.NoiseTexture.IsLoaded = false;
   gSSAODrawer.NoiseTexture.NoiseScale = vec2.fromValues( gl.viewportWidth / 4, gl.viewportHeight / 4 );

   gSSAODrawer.NoiseTexture.Context = gl.createTexture();
   gSSAODrawer.NoiseTexture.Width = 4;
   gl.bindTexture( gl.TEXTURE_2D, gSSAODrawer.NoiseTexture.Context );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);  
   gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gSSAODrawer.NoiseTexture.Width, gSSAODrawer.NoiseTexture.Width, 0, gl.RGB, gl.FLOAT, new Float32Array( randomVectors ) );

   gSSAODrawer.NoiseTexture.IsLoaded = true;


   var lerp = function( factor, a, b )
      {
      return ( 1 - factor ) * a + factor * b;
      }

   gSSAODrawer.SamplePoints = {};
   // generate a randoom sample point in tangent space, the value range for xyz is ( [ -1, 1 ], [ -1, 1 ], [ 0, 1 ] ) for hemisphere
   gSSAODrawer.SamplePoints.Data = [];
   for( var i = 0; i < gSSAODrawer.SampleNum.Max; ++i )
      {
      var randomVec = vec3.fromValues(( Math.random() - 0.5 ) * 2.0, ( Math.random() - 0.5 ) * 2.0, Math.random() );
      //var randomVec = vec3.fromValues(( Math.random() - 0.5 ) * 2.0, ( Math.random() - 0.5 ) * 2.0, ( Math.random() - 0.5 ) * 2.0 );
      vec3.normalize( randomVec, randomVec );
      //var scale = i / gSSAODrawer.SamplePoints.Num;
      var scale = Math.random();
      scale = lerp( scale * scale, 0.1, 1 );

      vec3.scale( randomVec, randomVec, scale );
      gSSAODrawer.SamplePoints.Data[ i * 3     ] = randomVec[ 0 ];
      gSSAODrawer.SamplePoints.Data[ i * 3 + 1 ] = randomVec[ 1 ];
      gSSAODrawer.SamplePoints.Data[ i * 3 + 2 ] = randomVec[ 2 ];
      }
   //var drawBuffers = [];
   //drawBuffers[ 0 ] = mrtExt.COLOR_ATTACHMENT0_WEBGL;
   ////drawBuffers[ 1 ] = mrtExt.COLOR_ATTACHMENT1_WEBGL;
   ////drawBuffers[ 2 ] = mrtExt.COLOR_ATTACHMENT2_WEBGL;
   ////drawBuffers[ 3 ] = mrtExt.COLOR_ATTACHMENT3_WEBGL;
   //mrtExt.drawBuffersWEBGL( drawBuffers );

   errCode = gl.getError();

   if( errCode != 0 )
      {
      alert("SSAO frame buffer init error" );
      return;
      }

   gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

   var fboCheckCode = gl.checkFramebufferStatus( gl.FRAMEBUFFER );
   if( fboCheckCode != gl.FRAMEBUFFER_COMPLETE )
      {
      alert( "Frame Buffer error" );
      return;
      }

   gl.bindFramebuffer( gl.FRAMEBUFFER, null );

   /////////
   gSSAODrawer.BlurShaderResource = new BlurShaderResource();
   gSSAODrawer.BlurShaderResource.Load( "blurShader-vs", "blurShader-fs" );

   // Create and bind frame buffer
   gSSAODrawer.BlurFrameBuffer = {};
   gSSAODrawer.BlurFrameBuffer.Context = gl.createFramebuffer();
   gl.bindFramebuffer( gl.FRAMEBUFFER, gSSAODrawer.BlurFrameBuffer.Context );

   // Create the render buffer
  // gSSAODrawer.BlurRenderBuffer = {};
  // gSSAODrawer.BlurRenderBuffer.Context = gl.createRenderbuffer();
 //  gl.bindRenderbuffer( gl.RENDERBUFFER, gSSAODrawer.BlurRenderBuffer.Context );
 //  gl.renderbufferStorage( gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.viewportWidth, gl.viewportHeight );
  // gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, gSSAODrawer.SSAORenderBuffer.Context );
   gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, null );

   var errCode = gl.getError();

   if( errCode != 0 )
      {
      alert("SSAO blur fbo error" );
      return;
      }

   ///////////////////////////////////////////////////////////////

   // Blur Buffer
   gSSAODrawer.BlurTexture = {};
   gSSAODrawer.BlurTexture.IsLoaded = false;

   gSSAODrawer.BlurTexture.Context = gl.createTexture();
   gl.bindTexture( gl.TEXTURE_2D, gSSAODrawer.BlurTexture.Context );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
   gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);  
   gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.viewportWidth, gl.viewportHeight, 0, gl.RGB, gl.FLOAT, null);
   gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, gSSAODrawer.BlurTexture.Context, 0 );

   gSSAODrawer.BlurTexture.IsLoaded = true;

   ///////////////////////////////////////////////////////////////

   errCode = gl.getError();

   if( errCode != 0 )
      {
      alert("SSAO blur FBO error" );
      return;   
      }

   gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

   fboCheckCode = gl.checkFramebufferStatus( gl.FRAMEBUFFER );
   if( fboCheckCode != gl.FRAMEBUFFER_COMPLETE )
      {
      alert( "Frame Buffer error" );
      }

   gl.bindFramebuffer( gl.FRAMEBUFFER, null );
   }

gSSAODrawer.DrawSSAO = function()
   {
   if( gDrawable == false )
      {
      return;
      }

   gl.bindFramebuffer( gl.FRAMEBUFFER, gSSAODrawer.SSAOFrameBuffer.Context );
   gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

   gl.useProgram( gSSAODrawer.SSAOShaderResource.Program.Context );

   gl.enableVertexAttribArray( gSSAODrawer.SSAOShaderResource.VertexPosAttr.Context );
   gl.bindBuffer( gl.ARRAY_BUFFER, gQuadResource.VertexPosBuffer.Context );
   gl.vertexAttribPointer( gSSAODrawer.SSAOShaderResource.VertexPosAttr.Context, gQuadResource.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

   gl.enableVertexAttribArray( gSSAODrawer.SSAOShaderResource.VertexUVAttr.Context );
   gl.bindBuffer( gl.ARRAY_BUFFER, gQuadResource.VertexUVBuffer.Context );
   gl.vertexAttribPointer( gSSAODrawer.SSAOShaderResource.VertexUVAttr.Context, gQuadResource.VertexUVBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gQuadResource.VertexIndexBuffer.Context );


   
   gl.activeTexture( gl.TEXTURE0 );  
	gl.bindTexture( gl.TEXTURE_2D, gDeferredDrawer.PositionTexture.Context );  
	gl.uniform1i( gSSAODrawer.SSAOShaderResource.PositionTextureUni.Context, 0 );  

   gl.activeTexture( gl.TEXTURE1 );  
	gl.bindTexture( gl.TEXTURE_2D, gDeferredDrawer.NormalTexture.Context );  
	gl.uniform1i( gSSAODrawer.SSAOShaderResource.NormalTextureUni.Context, 1 );  

   gl.activeTexture( gl.TEXTURE2 );  
	gl.bindTexture( gl.TEXTURE_2D, gSSAODrawer.NoiseTexture.Context );  
	gl.uniform1i( gSSAODrawer.SSAOShaderResource.NoiseTextureUni.Context, 2 );

   gl.uniform2f( gSSAODrawer.SSAOShaderResource.NoiseScaleUni.Context, gSSAODrawer.NoiseTexture.NoiseScale[ 0 ], gSSAODrawer.NoiseTexture.NoiseScale[ 1 ] );

   for( var i = 0; i < gSSAODrawer.SampleNum.Max; ++i )
      {
      gl.uniform3f( gSSAODrawer.SSAOShaderResource.SamplePointsUni[ i ].Context, 
         gSSAODrawer.SamplePoints.Data[ i * 3     ], 
         gSSAODrawer.SamplePoints.Data[ i * 3 + 1 ],
         gSSAODrawer.SamplePoints.Data[ i * 3 + 2 ] );
      }

   gl.uniform1i( gSSAODrawer.SSAOShaderResource.SampleNumUni.Context, gSSAODrawer.SampleNum.Value );

   gl.uniformMatrix4fv( gSSAODrawer.SSAOShaderResource.pMatrixUni.Context, false, globalScene.GetPMatrix() );
   
   gl.uniform1f( gSSAODrawer.SSAOShaderResource.SampleRadiusUni.Context, gSSAODrawer.SampleRadius.Value );
   
   gl.uniform1f( gSSAODrawer.SSAOShaderResource.SSAOPowerUni.Context, gSSAODrawer.SSAOPower.Value );

   gl.drawElements( gl.TRIANGLES, gQuadResource.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );

   gl.bindFramebuffer( gl.FRAMEBUFFER, null );
   }

gSSAODrawer.DrawBlur = function()
   {
   if( gDrawable == false )
      {
      return;
      }

   
   gl.bindFramebuffer( gl.FRAMEBUFFER, gSSAODrawer.BlurFrameBuffer.Context );
   gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

   gl.useProgram( gSSAODrawer.BlurShaderResource.Program.Context );

   gl.enableVertexAttribArray( gSSAODrawer.BlurShaderResource.VertexPosAttr.Context );
   gl.bindBuffer( gl.ARRAY_BUFFER, gQuadResource.VertexPosBuffer.Context );
   gl.vertexAttribPointer( gSSAODrawer.BlurShaderResource.VertexPosAttr.Context, gQuadResource.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

   gl.enableVertexAttribArray( gSSAODrawer.BlurShaderResource.VertexUVAttr.Context );
   gl.bindBuffer( gl.ARRAY_BUFFER, gQuadResource.VertexUVBuffer.Context );
   gl.vertexAttribPointer( gSSAODrawer.BlurShaderResource.VertexUVAttr.Context, gQuadResource.VertexUVBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

   gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gQuadResource.VertexIndexBuffer.Context );

   gl.activeTexture( gl.TEXTURE0 );  
	gl.bindTexture( gl.TEXTURE_2D, gSSAODrawer.OcclusionTexture.Context );  
	gl.uniform1i( gSSAODrawer.BlurShaderResource.SSAOTextureUni.Context, 0 );  

   gl.uniform2f( gSSAODrawer.BlurShaderResource.InvTextureSizeUni.Context, 1 / gl.viewportWidth, 1 / gl.viewportHeight );

   gl.drawElements( gl.TRIANGLES, gQuadResource.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );

   gl.bindFramebuffer( gl.FRAMEBUFFER, null );
   }