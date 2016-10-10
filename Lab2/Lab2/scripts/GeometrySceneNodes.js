class GeometrySceneNodes extends SceneNodes
   {
   constructor()
      {
      super();
      this.VertexColorBuffer = null;
      }

   Initbuffer() { }

   DelegateOnRestore()
      {
      this.Program = initShaders( "shader-vs", "shader-fs" );
      
      this.Program.VertexPosAttr = gl.getAttribLocation( this.Program, "aVertexPosition" );
      gl.enableVertexAttribArray( this.Program.VertexPosAttr );

      this.Program.VertexColorAttr = gl.getAttribLocation( this.Program, "aVertexColor" );
      gl.enableVertexAttribArray( this.Program.VertexColorAttr );

      this.Program.mvpMatrixUni = gl.getUniformLocation( this.Program, "uMVPMatrix" );


      this.Initbuffer();
      }

   OnRender()
      {
      gl.useProgram( this.Program );

      gl.enableVertexAttribArray( this.Program.VertexPosAttr );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexPosBuffer );
      gl.vertexAttribPointer( this.Program.VertexPosAttr, this.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.enableVertexAttribArray( this.Program.VertexColorAttr );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexColorBuffer );
      gl.vertexAttribPointer( this.Program.VertexColorAttr, this.VertexColorBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.uniformMatrix4fv( this.Program.mvpMatrixUni, false, globalScene.GetMVPMatrix() );

      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer );

      gl.drawElements( gl.TRIANGLES, this.VertexIndexBuffer.NumItems, gl.UNSIGNED_SHORT, 0 );

      }
   }

class CuboidSceneNode extends GeometrySceneNodes
   {
   constructor( dimension )
      {
      super();
      this.Dimension = vec3.clone( dimension );
      this.VertexColorBuffer = null;
      }

   Initbuffer()
      {
      this.VertexPosBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexPosBuffer );
      var halfDimension = vec3.fromValues( this.Dimension[ 0 ] / 2, this.Dimension[ 1 ] / 2, this.Dimension[ 2 ] / 2 );

      var vertices = [
            // Front face
            -halfDimension[ 0 ], -halfDimension[ 1 ], halfDimension[ 2 ],
             halfDimension[ 0 ], -halfDimension[ 1 ], halfDimension[ 2 ],
             halfDimension[ 0 ], halfDimension[ 1 ], halfDimension[ 2 ],
            -halfDimension[ 0 ], halfDimension[ 1 ], halfDimension[ 2 ],

            // Back face
            -halfDimension[ 0 ], -halfDimension[ 1 ], -halfDimension[ 2 ],
            -halfDimension[ 0 ], halfDimension[ 1 ], -halfDimension[ 2 ],
             halfDimension[ 0 ], halfDimension[ 1 ], -halfDimension[ 2 ],
             halfDimension[ 0 ], -halfDimension[ 1 ], -halfDimension[ 2 ]
         ];
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
      this.VertexPosBuffer.ItemSize = 3;
      this.VertexPosBuffer.NumItems = vertices.length / this.VertexPosBuffer.ItemSize;

      var vertexColor = [
            // Front face
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            1.0, 0.0, 0.0, 1.0,

            // Back face
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            1.0, 0.0, 0.0, 1.0
         ];
      this.VertexColorBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexColorBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertexColor ), gl.STATIC_DRAW );
      this.VertexColorBuffer.ItemSize = 4;
      this.VertexColorBuffer.NumItems = vertexColor.length / this.VertexColorBuffer.ItemSize;

      var vertexIndices = [
            0, 1, 2,   0, 2, 3,    // Front face
            4, 5, 6,   4, 6, 7,    // Back face
            5, 3, 2,   5, 2, 6,  // Top face
            4, 7, 1,   4, 1, 0, // Bottom face
            7, 6, 2,   7, 2, 1, // Right face
            4, 0, 3,   4, 3, 5  // Left face
        ];

      this.VertexIndexBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer );
      gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( vertexIndices ), gl.STATIC_DRAW );
      this.VertexIndexBuffer.ItemSize = 1;
      this.VertexIndexBuffer.NumItems = vertexIndices.length;
      }
   }

class PyramidicSceneNode extends GeometrySceneNodes
   {
   constructor( dimension )
      {
      super();
      this.Dimension = vec3.clone( dimension );
      this.VertexColorBuffer = null;
      }

   Initbuffer()
      {
      this.VertexPosBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexPosBuffer );
      var halfDimension = vec3.fromValues( this.Dimension[ 0 ] / 2, this.Dimension[ 1 ] / 2, this.Dimension[ 2 ] / 2 );

      var vertices = [
            // Top vertex
            0.0, this.Dimension[ 1 ], 0.0,
            // bottom face
             halfDimension[ 0 ], 0.0, -halfDimension[ 2 ],
             halfDimension[ 0 ], 0.0, halfDimension[ 2 ],
             -halfDimension[ 0 ], 0.0, halfDimension[ 2 ],
            -halfDimension[ 0 ], 0.0, -halfDimension[ 2 ]

         ];
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
      this.VertexPosBuffer.ItemSize = 3;
      this.VertexPosBuffer.NumItems = vertices.length / this.VertexPosBuffer.ItemSize;

      var vertexColor = [
            // Top vertex
            1.0, 0.0, 0.0, 1.0,

            // Front face
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
         ];
      this.VertexColorBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexColorBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertexColor ), gl.STATIC_DRAW );
      this.VertexColorBuffer.ItemSize = 4;
      this.VertexColorBuffer.NumItems = vertexColor.length / this.VertexColorBuffer.ItemSize;

      var vertexIndices = [
            1, 2, 3,   1, 3, 4,    // bottom face
            1, 0, 2,   
            2, 0, 3,
            3, 0, 4,
            4, 0, 1


        ];

      this.VertexIndexBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer );
      gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( vertexIndices ), gl.STATIC_DRAW );
      this.VertexIndexBuffer.ItemSize = 1;
      this.VertexIndexBuffer.NumItems = vertexIndices.length;
      }
   }