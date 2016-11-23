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

      this.MaterialDiffuseUni = {};
      this.MaterialDiffuseUni.Context = gl.getUniformLocation( this.Program.Context, "uMaterialDiffuse" );
      
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


      this.OnLoaded();
      }
   }