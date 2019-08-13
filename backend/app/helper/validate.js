empty = (mixedVar) => {
    let i; 
    let len;
    const emptyValues = ['undefined', null, false, 0, '', '0'];
    for (i = 0, len = emptyValues.length; i < len; i += 1) {
      if (mixedVar === emptyValues[i]) {
        return true;
      }
    }
    if (typeof mixedVar === 'object') {
      Object.keys(mixedVar).forEach(() => {
        return false;
      });
      return true;
    }
    return false;
  };