
var has_data = false;
var data;
var species = [];
var speciesStartIdx = [];
var avgs = [];
var avgCalculate = [];
var speciesSearchIdx = [];
//var drawSingleGroup = true;
var barColors = [];

function set_data( lines )
   {
   data = lines;
   has_data = true;
   generateSpeciesCheckBoxes( species );
   generateSpeciesColorInput( data[ 0 ] );
   }

function getCheckBoxOptions()
   {
   speciesSearchIdx = [];
   avgCalculate = [];
   for( var i = 0; i < species.length; ++i )
      {
      var checkBox = document.getElementById( "checkBox_" + species[ i ] );
      if( checkBox != null )
         {
         if( checkBox.checked )
            {
            avgCalculate.push( species[ i ] );
            speciesSearchIdx.push( speciesStartIdx[ i ] );
            }
         }
      }
   }

function csv_draw_bars()
   {
   avgs = [];
   barColors = [];
   getCheckBoxOptions();
   var dataLength = 0;
   var currSpeciesSearchIdx = 0;
   drawSingleGroup = true;
   for ( var i = 0; i < data.length; i++ )
      {
      if( currSpeciesSearchIdx < speciesSearchIdx.length - 1 && i == speciesSearchIdx[ currSpeciesSearchIdx + 1 ] )
         {
         ++currSpeciesSearchIdx;
         }
      var shouldCalculateAvg = ( avgCalculate.length == 0 ) || ( avgCalculate.length > 0 && data[ i ][ 0 ] == avgCalculate[ currSpeciesSearchIdx ] );
      if( shouldCalculateAvg )
         {
         ++dataLength;
         }
      for ( var j = 0; j < data[i].length; j++ )
         {
         
         // scv format declare, the first line of the data
         // so we need to deccide how long the array avgs will be
         if ( i == 0 ) 
            {
            // expand this array
            avgs.push( 0 ); 
            }
         else 
            {
            // flower specice declaration, set as zero
            if( shouldCalculateAvg )
               {
               if ( j == 0 )
                  { 
                  avgs[j] = 0;
                  }
               else 
                  {
                  avgs[j] += Number( data[i][j] );
                  }
               }
            }
         }
      }

   console.log( "Data length = " + dataLength );
   for ( var j = 0; j < data[0].length; j++ )
      {
      avgs[j] = avgs[j] / ( dataLength );
      barColors.push( getInputColor( data[ 0 ][ j ] ) );
      console.log( " column " + j + " Avg = " + avgs[j] );
      }

   // link to code05.js
   createBarVertices();

   }

function csv_draw_all_bars()
   {
   avgs = [];
   barColors = [];
   var dataLength = 0;
   var currSpeciesIdx = -1;
   drawSingleGroup = false;

   for ( var i = 1; i < data.length; i++ )
      {
      // a new kind of species
      if( currSpeciesIdx < speciesStartIdx.length - 1 && i == speciesStartIdx[ currSpeciesIdx + 1 ] )
         {
         // previous group of data has ended, count its average
         if( currSpeciesIdx >= 0 )
            {
            console.log( "Data length = " + dataLength );
            for( var j = 0; j < data[i].length; ++j )
               {
               avgs[ currSpeciesIdx * data[i].length + j ] /= dataLength;
               console.log( " column " + j + " Avg = " + avgs[ currSpeciesIdx * data[i].length + j ] );
               }
            }
         ++currSpeciesIdx;
         dataLength = 0;
         for ( var j = 0; j < data[ i ].length; j++ )
            {
            avgs.push( 0 );
            barColors.push( getInputColor( data[ 0 ][ j ] ) );
            }
         }
      if( data[ i ][ 0 ] == "" )
         {
         continue;
         }
      for ( var j = 1; j < data[i].length; j++ )
         {
         avgs[ currSpeciesIdx * data[i].length + j ] += Number( data[i][j] );
         }
      ++dataLength;
      }

   console.log( "Data length = " + dataLength );

   for( var j = 0; j < data[ 0 ].length; ++j )
      {
      avgs[ currSpeciesIdx * data[ 0 ].length + j ] /= dataLength;
      console.log( " column " + j + " Avg = " + avgs[ currSpeciesIdx * data[ 0 ].length + j ] );
      }

   // link to code05.js
   createBarVertices();
   }