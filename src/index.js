module.exports = function toReadable (number) {
  var string = number.toString(), units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;

  // remove spacing and commas
  string = string.replace(/[, ]/g,"");

  // check that number is zero
  if( parseInt( string ) === 0 ) {
      return 'zero';
  }

  // List of units words
  units = [ '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
  'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ];

  // List of tens words
  tens = [ '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];

  // List of scales words
  scales = [ '', 'thousand', 'million', 'billion', 'trillion' ];

  // Split the arguments
  start = string.length;
  splittedString = [];
  while( start > 0 ) {
      end = start;
      splittedString.push( string.slice( ( start = Math.max( 0, start - 3 ) ), end ) );
  }

  // Check that the function has enough scale words to be able to stringify the argument
  chunksLen = splittedString.length;
  if( chunksLen > scales.length ) {
      return '';
  }

  // Replace digits to words according to the Expected result
  words = [];
  for( i = 0; i < chunksLen; i++ ) {

      chunk = parseInt( splittedString[i] );

      if( chunk ) {

          /* Split chunk into array of individual integers */
          ints = splittedString[i].split( '' ).reverse().map( parseFloat );

          /* If tens integer is 1, i.e. 10, then add 10 to units integer */
          if( ints[1] === 1 ) {
              ints[0] += 10;
          }

          /* Add scale word if chunk is not zero and array item exists */
          if( ( word = scales[i] ) ) {
              words.push( word );
          }

          /* Add unit word if array item exists */
          if( ( word = units[ ints[0] ] ) ) {
              words.push( word );
          }

          /* Add tens word if array item exists */
          if( ( word = tens[ ints[1] ] ) ) {
              words.push( word );
          }

          /* Add hundreds word if array item exists */
          if( ( word = units[ ints[2] ] ) ) {
              words.push( word + ' hundred' );
          }

      }

  }

  return words.reverse().join( ' ' );
}
