class CubeSceneNode extends SceneNodes
   {
   constructor()
      {
      super();
      this.Size = 5;
      }

   Initbuffer()
      {
      this.VertexPosBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexPosBuffer );
      var halfSize = this.Size / 2;
      var vertices = [
            // Front face
            -halfSize, -halfSize, halfSize,
             halfSize, -halfSize, halfSize,
             halfSize, halfSize, halfSize,
            -halfSize, halfSize, halfSize,

            // Back face
            -halfSize, -halfSize, -halfSize,
            -halfSize, halfSize, -halfSize,
             halfSize, halfSize, -halfSize,
             halfSize, -halfSize, -halfSize,

            // Top face
            -halfSize, halfSize, -halfSize,
            -halfSize, halfSize, halfSize,
             halfSize, halfSize, halfSize,
             halfSize, halfSize, -halfSize,

            // Bottom face
            -halfSize, -halfSize, -halfSize,
             halfSize, -halfSize, -halfSize,
             halfSize, -halfSize, halfSize,
            -halfSize, -halfSize, halfSize,

            // Right face
             halfSize, -halfSize, -halfSize,
             halfSize, halfSize, -halfSize,
             halfSize, halfSize, halfSize,
             halfSize, -halfSize, halfSize,

            // Left face
            -halfSize, -halfSize, -halfSize,
            -halfSize, -halfSize, halfSize,
            -halfSize, halfSize, halfSize,
            -halfSize, halfSize, -halfSize,
      ];
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
      this.VertexPosBuffer.ItemSize = 3;
      this.VertexPosBuffer.NumItems = vertices.length / 3;
      }

   DelegateOnRestore()
      {
      this.Program = initShaders( "shader-vs", "shader-fs" );

      this.Program.VertexPosAttr = gl.getAttribLocation( this.Program, "aVertexPosition" );
      gl.enableVertexAttribArray( this.Program.VertexPosAttr );
      this.Initbuffer();

      this.Program.mvpMatrixUni = gl.getUniformLocation( this.Program, "uMVPMatrix" );
      }

   OnRender()
      {
      gl.useProgram( this.Program );
      gl.enableVertexAttribArray( this.Program.VertexPosAttr );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexPosBuffer );
      gl.vertexAttribPointer( this.Program.VertexPosAttr, this.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );


      gl.uniformMatrix4fv( this.Program.mvpMatrixUni, false, globalScene.GetMVPMatrix() );

      gl.drawArrays( gl.TRIANGLE_STRIP, 0, this.VertexPosBuffer.NumItems );
      }
}