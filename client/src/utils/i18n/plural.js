export default function(key, val){
  let postfix = '_other';

  const a = (val % 10 === 1);
  const b = (val % 100 !== 11);
  if( a && b ){ postfix = '_one' }

  const c = [2, 3, 4].indexOf(val % 10) !== -1;
  const d = [12, 13, 14].indexOf(val % 100) === -1;
  if( c && d ){ postfix = '_few' }

  const e = val % 10 === 0;
  const f = [5, 6, 7, 8, 9].indexOf(val % 10) !== -1;
  const g = [11, 12, 13, 14].indexOf(val % 100) !== -1;
  if( e || f || g ){ postfix = '_many' }

  return key + postfix;
}