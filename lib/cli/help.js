'use strict';

/*
 truwrap (v0.1.26-alpha.3) : Smart word wrap
 Command line help
 */
var _24bit, _iTerm, _truwrap, clr, img, page;

_truwrap = require('../..');

_24bit = (process.env.TERM_COLOR === '16m') || process.env.fish_term24bit;

_iTerm = process.env.ITERM_SESSION_ID && (process.env.TERM_PROGRAM === 'iTerm.app');

if (_24bit) {
  clr = {
    example: "\x1b[38;2;178;98;255m",
    command: "\x1b[38;2;65;135;215m",
    argument: "\x1b[38;2;0;175;255m",
    option: "\x1b[38;2;175;175;45m",
    operator: "\x1b[38;2;255;255;255m",
    grey: "\x1b[38;2;100;100;100m",
    normal: "\x1b[30m\x1b[m\x1b[38;2;240;240;240m",
    cc: "\x1b[38;2;128;196;126m"
  };
} else {
  clr = {
    example: "\x1b[38;5;93m",
    command: "\x1b[38;5;68m",
    argument: "\x1b[38;5;39m",
    option: "\x1b[38;5;142m",
    operator: "\x1b[38;5;231m",
    grey: "\x1b[38;5;247m",
    normal: "\x1b[30m\x1b[m",
    cc: "\x1b[38;5;114m"
  };
}

if (_24bit && _iTerm) {
  img = {
    space: "\t",
    cc: new _truwrap.Image({
      name: 'logo',
      file: __dirname + '/../../media/CCLogo.png',
      height: 3
    })
  };
} else {
  img = {
    space: "",
    cc: {
      render: function() {
        return "";
      }
    }
  };
}

page = {
  header: "\n" + img.space + clr.command + (_truwrap.getName()) + " " + clr.grey + "v" + (_truwrap.getVersion()) + clr.normal + "\n\n",
  usage: "Reads unformatted text from stdin and typographically applies paragraph wrapping it for the currently active tty.\n\nCLI Usage:\n" + clr.example + "Text stream (i.e cat or echo) " + clr.operator + "| " + clr.command + (_truwrap.getName()) + " " + clr.option + "[OPTIONS]" + clr.normal,
  epilogue: "" + clr.cc + (_truwrap.getName()) + clr.normal + " is an open source component of CryptoComposite\'s toolset.\n" + clr.cc + "© 2015 CryptoComposite. " + clr.grey + "Released under the MIT License." + clr.normal + "\n"
};

module.exports = function(yargs_) {
  var container, contentWidth, renderer;
  container = _truwrap({
    mode: 'container',
    outStream: process.stderr
  });
  renderer = _truwrap({
    left: 2,
    right: -2,
    mode: 'soft',
    outStream: process.stderr
  });
  contentWidth = renderer.getWidth();
  yargs_.usage(page.usage);
  yargs_.epilogue(page.epilogue);
  yargs_.wrap(contentWidth);
  container.write(img.cc.render({
    nobreak: false,
    align: 2
  }));
  container.write(page.header);
  renderer["break"]();
  renderer.write(yargs_.help());
  return renderer.clear();
};
