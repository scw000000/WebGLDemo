class ShaderResource extends Resource
   {
   constructor( vsName, fsName )
      {
      super();
      this.Context.Program = initShaders( vsName, fsName );
      this.IsLoaded = true;
      }
   }

class ForwardShaderResource extends Resource
   {
   constructor( vsName, fsName )
      {
      super( vsName, fsName );
      this.Context.VertexPosAttr = gl.getAttribLocation( this.Context.Program, "aVertexPosition" );
      gl.enableVertexAttribArray( this.Context.VertexPosAttr );

      this.Context.VertexNormalAttr = gl.getAttribLocation( this.Context.Program, "aVertexNormal" );
      gl.enableVertexAttribArray( this.Context.VertexNormalAttr );

      this.Context.VertexUVAttr = gl.getAttribLocation( this.Context.Program, "aVertexUV" );
      gl.enableVertexAttribArray( this.Context.VertexUVAttr );

      this.Context.mvpMatrixUni = gl.getUniformLocation( this.Context.Program, "uMVPMatrix" );
      this.Context.mvMatrixUni = gl.getUniformLocation( this.Context.Program, "uMVMatrix" );
      this.Context.nMatrixUni = gl.getUniformLocation( this.Context.Program, "uNMatrix" );
      
      this.Context.LightPositionUni = gl.getUniformLocation( this.Context.Program, "uLightPos_CameraSpace" );

      this.Context.ShininessUni = gl.getUniformLocation( this.Context.Program, "uShininess" );

      this.Context.MaterialAmbientUni = gl.getUniformLocation( this.Context.Program, "uLightAmbient" );
      this.Context.MaterialDiffuseUni = gl.getUniformLocation( this.Context.Program, "uLightDiffuse" );
      this.Context.MaterialSpecularUni = gl.getUniformLocation( this.Context.Program, "uLightSpecular" );

      this.Context.LightAmbientUni = gl.getUniformLocation( this.Context.Program, "uMaterialAmbient" );
      this.Context.LightDiffuseUni = gl.getUniformLocation( this.Context.Program, "uMaterialDiffuse" );
      this.Context.LightSpecularUni = gl.getUniformLocation( this.Context.Program, "uMaterialSpecular" );

      this.Context.MeshTextureUni = gl.getUniformLocation( this.Context.Program, "uMeshTexture" );
      }
   }