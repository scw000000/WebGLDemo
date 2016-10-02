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
             halfSize, -halfSize, -halfSize
      ];
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
      this.VertexPosBuffer.ItemSize = 3;
      this.VertexPosBuffer.NumItems = vertices.length / this.VertexPosBuffer.ItemSize;

      var vertexIndices = [
            0, 1, 2,   0, 2, 3,    // Front face
            4, 5, 6,   4, 6, 7,    // Back face
            5, 3, 2,   5, 2, 0,  // Top face
            4, 7, 2,   4, 2, 0, // Bottom face
            7, 6, 2,   7, 2, 1, // Right face
            4, 0, 3,   4, 3, 5  // Left face
        ];

      this.VertexIndexBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer );
      gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( vertexIndices ), gl.STATIC_DRAW );
      this.VertexIndexBuffer.ItemSize = 1;
      this.VertexIndexBuffer.NumItems = vertexIndices.length;


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

      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer );

      gl.drawElements( gl.TRIANGLES, this.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );

      }
}