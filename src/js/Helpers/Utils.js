function mapValue(x, in_min, in_max, out_min = 0, out_max = 1) {
  x = x < in_min? in_min : x;
  x = x > in_max? in_max : x;
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
export {mapValue};