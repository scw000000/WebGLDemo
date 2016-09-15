

function GenerateSpeciesCheckBoxes( specices )
   {
   var container = document.getElementById( 'drawOption' );
   for( var i = 0; i < specices.length; ++i )
      {
      GenerateCheckBox( container, "checkBox_" + specices[ i ], specices[ i ] );
      }
   }

function GenerateCheckBox( container, boxId, labelText )
   {
   var checkbox = document.createElement('input');
   checkbox.type = "checkbox";
   checkbox.name = "name";
   checkbox.value = "value";
   checkbox.id = boxId;

   var label = document.createElement('label')
   label.appendChild( document.createTextNode( labelText ) );

   container.appendChild(checkbox);
   container.appendChild(label);
   }
