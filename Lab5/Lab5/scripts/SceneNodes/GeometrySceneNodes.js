class GeometrySceneNodes extends SceneNodes
   {
   constructor()
      {
      super();
      this.VertexColorBuffer = null;
      this.Shininess = 3.0;
      this.MaterialAmbient = vec4.fromValues( 1.0, 1.0, 1.0, 1.0 );
      this.MaterialDiffuse = vec4.fromValues( 1.0, 1.0, 1.0, 1.0 );
      this.MaterialSpecular = vec4.fromValues( 1.0, 1.0, 1.0, 1.0 );
      }

   Initbuffer() { }

   DelegateOnRestore()
      {
      this.Program = initShaders( "shader-vs", "shader-fs" );
      
      this.Program.VertexPosAttr = gl.getAttribLocation( this.Program, "aVertexPosition" );
      gl.enableVertexAttribArray( this.Program.VertexPosAttr );

      this.Program.VertexNormalAttr = gl.getAttribLocation( this.Program, "aVertexNormal" );
      gl.enableVertexAttribArray( this.Program.VertexNormalAttr );

      this.Program.VertexUVAttr = gl.getAttribLocation( this.Program, "aVertexUV" );
      gl.enableVertexAttribArray( this.Program.VertexUVAttr );

      this.Program.mvpMatrixUni = gl.getUniformLocation( this.Program, "uMVPMatrix" );
      this.Program.mvMatrixUni = gl.getUniformLocation( this.Program, "uMVMatrix" );
      this.Program.nMatrixUni = gl.getUniformLocation( this.Program, "uNMatrix" );
      
      this.Program.LightPositionUni = gl.getUniformLocation( this.Program, "uLightPos_CameraSpace" );

      this.Program.ShininessUni = gl.getUniformLocation( this.Program, "uShininess" );

      this.Program.MaterialAmbientUni = gl.getUniformLocation( this.Program, "uLightAmbient" );
      this.Program.MaterialDiffuseUni = gl.getUniformLocation( this.Program, "uLightDiffuse" );
      this.Program.MaterialSpecularUni = gl.getUniformLocation( this.Program, "uLightSpecular" );

      this.Program.LightAmbientUni = gl.getUniformLocation( this.Program, "uMaterialAmbient" );
      this.Program.LightDiffuseUni = gl.getUniformLocation( this.Program, "uMaterialDiffuse" );
      this.Program.LightSpecularUni = gl.getUniformLocation( this.Program, "uMaterialSpecular" );

      this.Program.MeshTextureUni = gl.getUniformLocation( this.Program, "uMeshTexture" );

      this.Initbuffer();
      }

   OnRender()
      {
      gl.useProgram( this.Program );

      gl.enableVertexAttribArray( this.Program.VertexPosAttr );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexPosBuffer );
      gl.vertexAttribPointer( this.Program.VertexPosAttr, this.VertexPosBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.enableVertexAttribArray( this.Program.VertexNormalAttr );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexNormalBuffer );
      gl.vertexAttribPointer( this.Program.VertexNormalAttr, this.VertexNormalBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.enableVertexAttribArray( this.Program.VertexUVAttr );
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexUVBuffer );
      gl.vertexAttribPointer( this.Program.VertexUVAttr, this.VertexUVBuffer.ItemSize, gl.FLOAT, false, 0, 0 );


      //gl.enableVertexAttribArray( this.Program.VertexColorAttr );
      //gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexColorBuffer );
      //gl.vertexAttribPointer( this.Program.VertexColorAttr, this.VertexColorBuffer.ItemSize, gl.FLOAT, false, 0, 0 );

      gl.activeTexture( gl.TEXTURE0 );   // set texture unit 0 to use 
	   gl.bindTexture( gl.TEXTURE_2D, textureRes.Context );    // bind the texture object to the texture unit 
	   gl.uniform1i(this.Program.MeshTextureUni, 0);   // pass the texture unit to the shader 

      gl.uniformMatrix4fv( this.Program.mvpMatrixUni, false, globalScene.GetMVPMatrix() );
      var mvMat = globalScene.GetMVMatrix();
      gl.uniformMatrix4fv( this.Program.mvMatrixUni, false, mvMat );
      mat4.invert( mvMat, mvMat );
	   mat4.transpose( mvMat, mvMat ); 
      gl.uniformMatrix4fv( this.Program.nMatrixUni, false, mvMat );

      var lightGlobalTransform = globalLight.GetGlobalTransform();
      var lightPositionWorld = mat4.getTranslation( vec3.create(), lightGlobalTransform );
      var lightPositionCamera = vec3.transformMat4( vec3.create(), lightPositionWorld, globalScene.CameraNode.VMatrix );
    //  console.debug( vec3.str( lightPositionCamera ) );
      gl.uniform3f( this.Program.LightPositionUni, lightPositionCamera[ 0 ], lightPositionCamera[ 1 ], lightPositionCamera[ 2 ] );
      
      gl.uniform1f( this.Program.ShininessUni, this.Shininess );

      gl.uniform4f( this.Program.LightAmbientUni, globalLight.Ambient[ 0 ], globalLight.Ambient[ 1 ], globalLight.Ambient[ 2 ], globalLight.Ambient[ 3 ] );
      gl.uniform4f( this.Program.LightDiffuseUni, globalLight.Diffuse[ 0 ], globalLight.Diffuse[ 1 ], globalLight.Diffuse[ 2 ], globalLight.Diffuse[ 3 ] );
      gl.uniform4f( this.Program.LightSpecularUni, globalLight.Specular[ 0 ], globalLight.Specular[ 1 ], globalLight.Specular[ 2 ], globalLight.Specular[ 3 ] );

      gl.uniform4f( this.Program.MaterialAmbientUni, this.MaterialAmbient[ 0 ], this.MaterialAmbient[ 1 ], this.MaterialAmbient[ 2 ], this.MaterialAmbient[ 3 ] );
      gl.uniform4f( this.Program.MaterialDiffuseUni, this.MaterialDiffuse[ 0 ], this.MaterialDiffuse[ 1 ], this.MaterialDiffuse[ 2 ], this.MaterialDiffuse[ 3 ] );
      gl.uniform4f( this.Program.MaterialSpecularUni, this.MaterialSpecular[ 0 ], this.MaterialSpecular[ 1 ], this.MaterialSpecular[ 2 ], this.MaterialSpecular[ 3 ] );

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

class SphereSceneNode extends GeometrySceneNodes
   {
   constructor( radius, sliceNum, color )
      {
      super();
      this.Radius = radius;
      this.SliceNum = sliceNum;
      this.SectorNum = ( this.SliceNum - 1 ) * 2;
      this.Color = color;
      this.VertexColorBuffer = null;
      this.VertexNormalBuffer = null;
      this.VertexUVBuffer = null;
      }

   Initbuffer()
      {
      var vertices = [];
      var normals = [];
      var uvs = [];
      var sphericalcoord = vec3.scale( vec3.create(), g_Down3v, this.Radius );
      var deltaRad = Math.PI / ( this.SliceNum - 1 );
      
      for( var polar = 0; polar < this.SliceNum; ++polar )
         {
         for( var azimuthal = 0; azimuthal < this.SectorNum; ++azimuthal )
            {
            vertices.push( sphericalcoord[ 0 ] );
            vertices.push( sphericalcoord[ 1 ] );
            vertices.push( sphericalcoord[ 2 ] );

            var normal = vec3.normalize( vec3.create() ,sphericalcoord );
            normals.push( normal[ 0 ] );
            normals.push( normal[ 1 ] );
            normals.push( normal[ 2 ] );

            uvs.push( polar / this.SliceNum );
            uvs.push( azimuthal / this.SectorNum );
            if( polar == 0 || polar == this.SliceNum - 1 )
               {
               break;
               }
            vec3.rotateY( sphericalcoord, sphericalcoord, g_Zero3v, deltaRad );
            }
         sphericalcoord[ 0 ] = 0;
         vec3.rotateX( sphericalcoord, sphericalcoord, g_Zero3v, deltaRad );
         }

      this.VertexPosBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexPosBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
      this.VertexPosBuffer.ItemSize = 3;
      this.VertexPosBuffer.NumItems = vertices.length / this.VertexPosBuffer.ItemSize;

      this.VertexNormalBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexNormalBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( normals ), gl.STATIC_DRAW );
      this.VertexNormalBuffer.ItemSize = 3;
      this.VertexNormalBuffer.NumItems = normals.length / this.VertexNormalBuffer.ItemSize;

      this.VertexUVBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexUVBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( uvs ), gl.STATIC_DRAW );
      this.VertexUVBuffer.ItemSize = 2;
      this.VertexUVBuffer.NumItems = uvs.length / this.VertexUVBuffer.ItemSize;

      //var vertexColor = [];
      //for( var i = 0; i < this.VertexPosBuffer.NumItems; ++i )
      //   {
      //   vertexColor.push( Math.random() );
      //   vertexColor.push( Math.random() );
      //   vertexColor.push( Math.random() );
      //   //vertexColor.push( this.Color[ 0 ] );
      //   //vertexColor.push( this.Color[ 1 ] );
      //   //vertexColor.push( this.Color[ 2 ] );
      //   vertexColor.push( 1 );
      //   }

      //this.VertexColorBuffer = gl.createBuffer();
      //gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexColorBuffer );
      //gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertexColor ), gl.STATIC_DRAW );
      //this.VertexColorBuffer.ItemSize = 4;
      //this.VertexColorBuffer.NumItems = vertexColor.length / this.VertexColorBuffer.ItemSize;

      var vertexIndices = [];

      for( var i = 0; i < this.SectorNum; ++i )
         {
         vertexIndices.push( ( i + this.SectorNum - 1 ) % this.SectorNum + 1 );
         vertexIndices.push( 0 );
         vertexIndices.push( i + 1 );

         vertexIndices.push( this.VertexPosBuffer.NumItems - 1 );
         vertexIndices.push( ( i + this.SectorNum - 1 ) % this.SectorNum + this.VertexPosBuffer.NumItems - 1 - this.SectorNum );
         vertexIndices.push( i + this.VertexPosBuffer.NumItems - 1 - this.SectorNum );
         }

      for( var polarStride = 1; polarStride + this.SectorNum < this.VertexPosBuffer.NumItems - 1; polarStride += this.SectorNum )
         {
         for( var i = 0; i < this.SectorNum; ++i )
            {
            // Left-down
            vertexIndices.push( polarStride + i );
            // Right-down
            vertexIndices.push( polarStride + ( i + 1 ) % this.SectorNum );
            //Right-up
            vertexIndices.push( polarStride + this.SectorNum + ( i + 1 ) % this.SectorNum );
            
            // Left-down
            vertexIndices.push( polarStride + i );
            //Right-up
            vertexIndices.push( polarStride + this.SectorNum  + ( i + 1 ) % this.SectorNum );
            //Left-up
            vertexIndices.push( polarStride + this.SectorNum + i );
            }
         }

      this.VertexIndexBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer );
      gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( vertexIndices ), gl.STATIC_DRAW );
      this.VertexIndexBuffer.ItemSize = 1;
      this.VertexIndexBuffer.NumItems = vertexIndices.length;
      }
   }


class CylinderSceneNode extends GeometrySceneNodes
   {
   constructor( radius, height, sectorNum, color )
      {
      super();
      this.Radius = radius;
      this.Height = height;
      this.SectorNum = sectorNum;
      this.ringNum = ( this.SliceNum - 1 ) * 2;
      this.Color = color;
      this.VertexColorBuffer = null;
      }

   Initbuffer()
      {
      var vertices = [];
      var sphericalcoord = vec3.scale( vec3.create(), g_Left3v, this.Radius );
      var deltaRad = Math.PI * 2 / this.SectorNum;
      
      vertices.push( 0 );
      vertices.push( -this.Height / 2 );
      vertices.push( 0 );
      for( var i = 0; i < this.SectorNum; ++i )
         {
         vertices.push( sphericalcoord[ 0 ] );
         vertices.push( sphericalcoord[ 1 ] - this.Height / 2 );
         vertices.push( sphericalcoord[ 2 ] );

         vertices.push( sphericalcoord[ 0 ] );
         vertices.push( sphericalcoord[ 1 ] + this.Height / 2 );
         vertices.push( sphericalcoord[ 2 ] );
         vec3.rotateY( sphericalcoord, sphericalcoord, g_Zero3v, deltaRad );
         }
      vertices.push( 0 );
      vertices.push( this.Height / 2 );
      vertices.push( 0 );
      
      this.VertexPosBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexPosBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
      this.VertexPosBuffer.ItemSize = 3;
      this.VertexPosBuffer.NumItems = vertices.length / this.VertexPosBuffer.ItemSize;


      var vertexColor = [];
      for( var i = 0; i < this.VertexPosBuffer.NumItems; ++i )
         {
         //vertexColor.push( Math.random() );
         //vertexColor.push( Math.random() );
         //vertexColor.push( Math.random() );
         vertexColor.push( this.Color[ 0 ] );
         vertexColor.push( this.Color[ 1 ] );
         vertexColor.push( this.Color[ 2 ] );
         vertexColor.push( 1 );
         }

      this.VertexColorBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, this.VertexColorBuffer );
      gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertexColor ), gl.STATIC_DRAW );
      this.VertexColorBuffer.ItemSize = 4;
      this.VertexColorBuffer.NumItems = vertexColor.length / this.VertexColorBuffer.ItemSize;

      var vertexIndices = [];

      for( var i = 0; i < this.SectorNum; ++i )
         {
         vertexIndices.push( ( ( i + this.SectorNum - 1 ) % this.SectorNum ) * 2 + 1 );
         vertexIndices.push( 0 );
         vertexIndices.push( i * 2 + 1 );

         vertexIndices.push( this.VertexPosBuffer.NumItems - 1 );
         vertexIndices.push( ( ( i + this.SectorNum - 1 ) % this.SectorNum ) * 2 + 2 );
         vertexIndices.push( i * 2 + 2 );
         }

      for( var i = 0; i < this.SectorNum; ++i )
         {
         // RIght-down
         vertexIndices.push( i * 2 + 1 );
         // Right-up
         vertexIndices.push( i * 2 + 2 );
         // Left-up
         vertexIndices.push( ( ( i + this.SectorNum - 1 ) % this.SectorNum ) * 2 + 2 );

         // Left-up
         vertexIndices.push( ( ( i + this.SectorNum - 1 ) % this.SectorNum ) * 2 + 2 );
         // Left-down
         vertexIndices.push( ( ( i + this.SectorNum - 1 ) % this.SectorNum ) * 2 + 1 );
         // RIght-down
         vertexIndices.push( i * 2 + 1 );
         }


      this.VertexIndexBuffer = gl.createBuffer();
      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer );
      gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( vertexIndices ), gl.STATIC_DRAW );
      this.VertexIndexBuffer.ItemSize = 1;
      this.VertexIndexBuffer.NumItems = vertexIndices.length;
      }
   }