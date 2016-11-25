class ShaderResource extends Resource
   {
   constructor()
      {
      super();
      this.Program = {};
      }

   Load( vsName, fsName )
      {
      this.Program.Context = initShaders( vsName, fsName );
      this.InitAttrbutesAndUniforms();
      this.IsLoaded = true;
      }

   InitAttrbutesAndUniforms()
      {
      }

   }

class ForwardShaderResource extends ShaderResource
   {
   InitAttrbutesAndUniforms()
      {

      this.VertexPosAttr = {};
      this.VertexPosAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexPosition" );
      gl.enableVertexAttribArray( this.VertexPosAttr.Context );

      this.VertexNormalAttr = {};
      this.VertexNormalAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexNormal" );
      gl.enableVertexAttribArray( this.VertexNormalAttr.Context );

      this.VertexUVAttr = {};
      this.VertexUVAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexUV" );
      gl.enableVertexAttribArray( this.VertexUVAttr.Context );

      this.mvpMatrixUni = {};
      this.mvpMatrixUni.Context = gl.getUniformLocation( this.Program.Context, "uMVPMatrix" );
      this.mvMatrixUni = {};
      this.mvMatrixUni.Context = gl.getUniformLocation( this.Program.Context, "uMVMatrix" );
      this.nMatrixUni = {};
      this.nMatrixUni.Context = gl.getUniformLocation( this.Program.Context, "uNMatrix" );
      
      this.LightPositionUni = {};
      this.LightPositionUni.Context = gl.getUniformLocation( this.Program.Context, "uLightPos_CameraSpace" );

      this.ShininessUni = {};
      this.ShininessUni.Context = gl.getUniformLocation( this.Program.Context, "uShininess" );

      this.MaterialAmbientUni = {};
      this.MaterialAmbientUni.Context = gl.getUniformLocation( this.Program.Context, "uLightAmbient" );
      this.MaterialDiffuseUni = {};
      this.MaterialDiffuseUni.Context = gl.getUniformLocation( this.Program.Context, "uLightDiffuse" );
      this.MaterialSpecularUni = {};
      this.MaterialSpecularUni.Context = gl.getUniformLocation( this.Program.Context, "uLightSpecular" );

      this.LightAmbientUni = {};
      this.LightAmbientUni.Context = gl.getUniformLocation( this.Program.Context, "uMaterialAmbient" );
      this.LightDiffuseUni = {};
      this.LightDiffuseUni.Context = gl.getUniformLocation( this.Program.Context, "uMaterialDiffuse" );
      this.LightSpecularUni = {};
      this.LightSpecularUni.Context = gl.getUniformLocation( this.Program.Context, "uMaterialSpecular" );

      this.MeshTextureUni = {};
      this.MeshTextureUni.Context = gl.getUniformLocation( this.Program.Context, "uMeshTexture" );
      
      this.OnLoaded();
      }
   }

class TextureShaderResource extends ShaderResource
   {
   InitAttrbutesAndUniforms()
      {
      this.VertexPosAttr = {};
      this.VertexPosAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexPosition" );
      gl.enableVertexAttribArray( this.VertexPosAttr.Context );

      this.VertexUVAttr = {};
      this.VertexUVAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexUV" );
      gl.enableVertexAttribArray( this.VertexUVAttr.Context );
      
      this.TextureUni = {};
      this.TextureUni.Context = gl.getUniformLocation( this.Program.Context, "uTexture" );
      
      this.OnLoaded();
      }
   }

class DeferredGemotryShaderResource extends ShaderResource
   {
   InitAttrbutesAndUniforms()
      {
      this.VertexPosAttr = {};
      this.VertexPosAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexPosition" );
      gl.enableVertexAttribArray( this.VertexPosAttr.Context );

      this.VertexNormalAttr = {};
      this.VertexNormalAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexNormal" );
      gl.enableVertexAttribArray( this.VertexNormalAttr.Context );

      this.VertexUVAttr = {};
      this.VertexUVAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexUV" );
      gl.enableVertexAttribArray( this.VertexUVAttr.Context );

      this.mvpMatrixUni = {};
      this.mvpMatrixUni.Context = gl.getUniformLocation( this.Program.Context, "uMVPMatrix" );

      this.mvMatrixUni = {};
      this.mvMatrixUni.Context = gl.getUniformLocation( this.Program.Context, "uMVMatrix" );

      this.nMatrixUni = {};
      this.nMatrixUni.Context = gl.getUniformLocation( this.Program.Context, "uNMatrix" );

      this.MeshTextureUni = {};
      this.MeshTextureUni.Context = gl.getUniformLocation( this.Program.Context, "uMeshTexture" );

      this.ShininessUni = {};
      this.ShininessUni.Context = gl.getUniformLocation( this.Program.Context, "uShininess" );

      this.MaterialAmbientUni = {};
      this.MaterialAmbientUni.Context = gl.getUniformLocation( this.Program.Context, "uMaterialAmbient" );
      
      this.MaterialDiffuseUni = {};
      this.MaterialDiffuseUni.Context = gl.getUniformLocation( this.Program.Context, "uMaterialDiffuse" );
      
      this.MaterialSpecularUni = {};
      this.MaterialSpecularUni.Context = gl.getUniformLocation( this.Program.Context, "uMaterialSpecular" );

      
      this.OnLoaded();
      }
   }


class DeferredLightShaderResource extends ShaderResource
   {
   InitAttrbutesAndUniforms()
      {
      this.VertexPosAttr = {};
      this.VertexPosAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexPosition" );
      gl.enableVertexAttribArray( this.VertexPosAttr.Context );

      this.VertexUVAttr = {};
      this.VertexUVAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexUV" );
      gl.enableVertexAttribArray( this.VertexUVAttr.Context );

      //////////////////////////////////

      this.PositionTextureUni = {};
      this.PositionTextureUni.Context = gl.getUniformLocation( this.Program.Context, "uPositionTex_CameraSpace" );

      this.NormalTextureUni = {};
      this.NormalTextureUni.Context = gl.getUniformLocation( this.Program.Context, "uNormalTex_CameraSpace" );

      this.AlbedoTextureUni = {};
      this.AlbedoTextureUni.Context = gl.getUniformLocation( this.Program.Context, "uAlbedoTex" );

      this.MaterialDiffuseTextureUni = {};
      this.MaterialDiffuseTextureUni.Context = gl.getUniformLocation( this.Program.Context, "uMaterialDiffuseTex" );
      
      this.BlurTextureUni = {};
      this.BlurTextureUni.Context = gl.getUniformLocation( this.Program.Context, "uBlurTex" );

      this.LightPositionUni = {};
      this.LightPositionUni.Context = gl.getUniformLocation( this.Program.Context, "uLightPos_CameraSpace" );

      this.ShininessUni = {};
      this.ShininessUni.Context = gl.getUniformLocation( this.Program.Context, "uShininess" );

      this.LightAmbientUni = {};
      this.LightAmbientUni.Context = gl.getUniformLocation( this.Program.Context, "uLightAmbient" );
      this.LightDiffuseUni = {};
      this.LightDiffuseUni.Context = gl.getUniformLocation( this.Program.Context, "uLightDiffuse" );
      this.LightSpecularUni = {};
      this.LightSpecularUni.Context = gl.getUniformLocation( this.Program.Context, "uLightSpecular" );

      this.UseSSAOUni = {};
      this.UseSSAOUni.Context = gl.getUniformLocation( this.Program.Context, "uUseSSAO" );

      this.OnLoaded();
      }
   }

class SSAOShaderResource extends ShaderResource
   {
   InitAttrbutesAndUniforms()
      {
      this.VertexPosAttr = {};
      this.VertexPosAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexPosition" );
      gl.enableVertexAttribArray( this.VertexPosAttr.Context );

      this.VertexUVAttr = {};
      this.VertexUVAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexUV" );
      gl.enableVertexAttribArray( this.VertexUVAttr.Context );

      //////////////////////////////////

      this.PositionTextureUni = {};
      this.PositionTextureUni.Context = gl.getUniformLocation( this.Program.Context, "uPositionTex_CameraSpace" );

      this.NormalTextureUni = {};
      this.NormalTextureUni.Context = gl.getUniformLocation( this.Program.Context, "uNormalTex_CameraSpace" );

      this.NoiseTextureUni = {};
      this.NoiseTextureUni.Context = gl.getUniformLocation( this.Program.Context, "uNoiseTex" );

      this.NoiseScaleUni = {};
      this.NoiseScaleUni.Context = gl.getUniformLocation( this.Program.Context, "uNoiseScale" );

      this.SamplePointsUni = [];
      for( var i = 0; i < gSSAODrawer.SampleNum.Max; ++i )
         {
         this.SamplePointsUni[ i ] = {};
         this.SamplePointsUni[ i ].Context = gl.getUniformLocation( this.Program.Context, "uSamplePoints[" + i + "]" );
         }

      this.SampleNumUni = {};
      this.SampleNumUni.Context = gl.getUniformLocation( this.Program.Context, "uSampleNum" );

      this.pMatrixUni = {};
      this.pMatrixUni.Context = gl.getUniformLocation( this.Program.Context, "uPMatrix" );

      this.SampleRadiusUni = {};
      this.SampleRadiusUni.Context = gl.getUniformLocation( this.Program.Context, "uSampleRadius" );

      this.SSAOPowerUni = {};
      this.SSAOPowerUni.Context = gl.getUniformLocation( this.Program.Context, "uSSAOPower" );

      this.OnLoaded();
      }
   }


class BlurShaderResource extends ShaderResource
   {
   InitAttrbutesAndUniforms()
      {
      this.VertexPosAttr = {};
      this.VertexPosAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexPosition" );
      gl.enableVertexAttribArray( this.VertexPosAttr.Context );

      this.VertexUVAttr = {};
      this.VertexUVAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexUV" );
      gl.enableVertexAttribArray( this.VertexUVAttr.Context );

      //////////////////////////////////

      this.SSAOTextureUni = {};
      this.SSAOTextureUni.Context = gl.getUniformLocation( this.Program.Context, "uSSAOTex" );

      this.InvTextureSizeUni = {};
      this.InvTextureSizeUni.Context = gl.getUniformLocation( this.Program.Context, "uInvTexureSize" );


      this.OnLoaded();
      }
   }

class SkySphereShaderResource extends ShaderResource
   {
   InitAttrbutesAndUniforms()
      {

      this.VertexPosAttr = {};
      this.VertexPosAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexPosition" );
      gl.enableVertexAttribArray( this.VertexPosAttr.Context );

      this.VertexUVAttr = {};
      this.VertexUVAttr.Context = gl.getAttribLocation( this.Program.Context, "aVertexUV" );
      gl.enableVertexAttribArray( this.VertexUVAttr.Context );

      this.mvpMatrixUni = {};
      this.mvpMatrixUni.Context = gl.getUniformLocation( this.Program.Context, "uMVPMatrix" );

      this.MeshTextureUni = {};
      this.MeshTextureUni.Context = gl.getUniformLocation( this.Program.Context, "uMeshTexture" );
      
      this.OnLoaded();
      }
   }