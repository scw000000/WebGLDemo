// These functions are for generate HTML elements or read data from them

function generateSpeciesCheckBoxes( specices )
   {
   var container = document.getElementById( 'avgOption' );
   for( var i = 0; i < specices.length; ++i )
      {
      generateCheckBox( container, "checkBox_" + specices[ i ], specices[ i ] );
      }
   }

function generateCheckBox( container, boxId, labelText )
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

function generateTextNode( relativeX, relativeY, text )
   {
   // // look up the divcontainer
    var divContainer = document.getElementById("divContainer");
     
    // make the div
    var div = document.createElement("div");

    // assign it a CSS class
    div.className = "floating-div";
    div.style.left = Math.floor( ( relativeX + 1 ) * ( canvas.width / 2 ) ) + "px";
    div.style.top = Math.floor( ( -relativeY + 1 ) * ( canvas.height / 2 ) ) + "px";

    // add it to the divcontainer
    divContainer.appendChild(div);

   // make a text node for its content
   var textNode = document.createTextNode("");
   div.appendChild(textNode);
   textNode.nodeValue = text;
   }

function getSelectedLineNumber()
   {
   var element = document.getElementById( "horLineNumSelect" );
   return Number( element.options[ element.selectedIndex].value );
   }

// Because HTML color input element store RGB data as 255 format, we need to normalize it
function hexStrToColor( hexStr )
   {
   var subHexStr = hexStr.substring( 1, 7 );
   var r = parseInt( subHexStr.substring( 0, 2 ),16 ) / 255;
   var g = parseInt( subHexStr.substring( 2, 4 ),16 ) / 255;
   var b = parseInt( subHexStr.substring( 4, 6 ),16 ) / 255;
   return { r, g, b };
   }

function convertColor( event )
   {
   return hexStrToColor( event.srcElement.value );
   }

function generateColorInput( container, colorInputId, labelText )
   {
   var colorSelect = document.createElement('input');
   colorSelect.type = "color";
   colorSelect.name = "name";
   colorSelect.id = colorInputId;
   colorSelect.value = "#FF0000";
   var label = document.createElement('label')
   label.appendChild( document.createTextNode( labelText ) );

   container.appendChild( colorSelect );
   container.appendChild( label );
   }

// After reading CSV file, now we know how many bars we want to create.
// And we can generate color input according to these fields.
function generateSpeciesColorInput( specices )
   {
   var container = document.getElementById( 'barColorOption' );
   for( var i = 0; i < specices.length; ++i )
      {
      generateColorInput( container, "colorInput_" + specices[ i ], specices[ i ] );
      }
   }

function getInputColor( inputName )
   {
   var speciesBarColorElement = document.getElementById( "colorInput_" + inputName );
   if( speciesBarColorElement == null )
      {
      return { r:1.0, g:1.0, b:1.0 };
      }
   return hexStrToColor( speciesBarColorElement.value );
   }

// We may want to remove all text lables if we try to redraw the graph
function removeAllTextNodes()
   {
   var divContainer = document.getElementById( "divContainer" );
   while ( divContainer.firstChild ) 
      {
      divContainer.removeChild( divContainer.firstChild );
      }
   }
