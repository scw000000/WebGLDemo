﻿class SceneNodes
   {
   constructor()
      {
      this.ChildNodes = [];
      this.LocalTransform = new Transform();
      this.GlobalTransform = new Transform();
      this.VertexPosBuffer = null;
      this.VertexIndexBuffer = null;
      this.Program = null;
      }

   UpdateGlobalTransform()
      {
      if( this.Parent == null ) // Root node, leave
         {
         return;
         }
      var parentTransform = this.Parent.GetGlobalTransform();
      var parentToWorld = parentTransform.GetToWorld();
      this.GlobalTransform.SetToWorld( mat4.mul( this.GlobalTransform.GetToWorld(), parentToWorld, this.LocalTransform.GetToWorld() ) );
      }

   GetGlobalTransform()
      {
      return this.GlobalTransform;
      //if( this.Parent == null )
      //   {
      //   return mat4.clone( this.LocalTransform.GetToWorld() );
      //   }
      //var parentToWorld = this.Parent.GetGlobalTransform().GetToWorld();
      //return mat4.mul( parentToWorld, parentToWorld, this.LocalTransform.GetToWorld() );
      }

   AddChild( child )
      {
      this.ChildNodes.push( child );
      child.Parent = this;
      }

   DelegateOnRestore(){ }

   OnRestore() 
      {
      this.DelegateOnRestore();
      for( var i in this.ChildNodes )
         {
         this.ChildNodes[ i ].OnRestore();
         }
      }

   OnUpdate( deltaTime ){}

   UpdateChildren()
      {
      for( var i in this.ChildNodes )
         {
         this.ChildNodes[ i ].OnUpdate( deltaTime );
         this.ChildNodes[ i ].UpdateGlobalTransform();
         this.ChildNodes[ i ].UpdateChildren( deltaTime );
         }
      }

   PreRender()
      {
     // globalScene.PushTransform( this.LocalTransform.GetToWorld() );
      };

   OnRender() { }

   PostRender() 
      {
    //  globalScene.PopTransform();
      }

   RenderChildren( scene )
      {
      for( var i in this.ChildNodes )
         {
         this.ChildNodes[ i ].PreRender();
         this.ChildNodes[ i ].OnRender();
         this.ChildNodes[ i ].RenderChildren();
         this.ChildNodes[ i ].PostRender();
         }
      }

   GetMVPMatrix( scene )
      {
      var vpMat = scene.CameraNode.GetVPMatrix();
      return mat4.mul( mat4.create(), vpMat, this.GlobalTransform.GetToWorld() );
      }

   GetMVMatrix( scene )
      {
      var vMat = scene.CameraNode.GetVMatrix();
      return mat4.mul( mat4.create(), vMat, this.GlobalTransform.GetToWorld() );
      }
   }