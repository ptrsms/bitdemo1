"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@angular/compiler");

require("@angular/compiler-cli");

require("@angular/core");

require("ng-packagr");

require("typescript");

require("tslib");

require("tsickle");

var _path = _interopRequireDefault(require("path"));

var _execa = _interopRequireDefault(require("execa"));

var _recursiveReaddir = _interopRequireDefault(require("recursive-readdir"));

var _vinyl = _interopRequireDefault(require("vinyl"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var os = require('os');

var tsconfig = require(_path["default"].join(__dirname, './tsconfig.json'));

var FILE_NAME = 'public_api';
var DEBUG_FLAG = 'NG_DEBUG';

function print(msg) {
  process.env[DEBUG_FLAG] && console.log(msg);
}

var compile =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_files, distPath, api) {
    var _ref2, res, directory, context, results;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return isolate(api);

          case 2:
            _ref2 = _context.sent;
            res = _ref2.res;
            directory = _ref2.directory;
            _context.next = 7;
            return createContext(res, directory, distPath);

          case 7:
            context = _context.sent;

            if (~context.dependencies.indexOf('@angular/core')) {
              _context.next = 11;
              break;
            }

            _context.next = 11;
            return res.installPackages(['@angular/core', 'rxjs', 'zone.js']);

          case 11:
            _context.next = 13;
            return adjustFileSystem(context);

          case 13:
            _context.next = 15;
            return _compile(context);

          case 15:
            results = _context.sent;

            if (process.env[DEBUG_FLAG]) {
              _context.next = 19;
              break;
            }

            _context.next = 19;
            return context.capsule.destroy();

          case 19:
            return _context.abrupt("return", results);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function compile(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function _compile(_x4) {
  return _compile2.apply(this, arguments);
}

function _compile2() {
  _compile2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(context) {
    var dists, packageJson, main;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return runNGPackagr(context);

          case 2:
            _context2.next = 4;
            return collectDistFiles(context);

          case 4:
            dists = _context2.sent;
            packageJson = getPackageJsonObject(dists, context.name);
            main = packageJson.main;
            delete packageJson.main;
            print('main is: ', main);
            return _context2.abrupt("return", {
              mainFile: main,
              dists: dists,
              packageJson: packageJson
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _compile2.apply(this, arguments);
}

function createContext(_x5, _x6, _x7) {
  return _createContext.apply(this, arguments);
}

function _createContext() {
  _createContext = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(res, directory, distPath) {
    var componentObject;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            componentObject = res.componentWithDependencies.component.toObject();
            return _context3.abrupt("return", {
              main: componentObject.mainFile,
              dist: distPath,
              name: componentObject.name,
              dependencies: getCustomDependencies(directory),
              capsule: res.capsule,
              directory: directory
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _createContext.apply(this, arguments);
}

function isolate(_x8) {
  return _isolate.apply(this, arguments);
}

function _isolate() {
  _isolate = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(api) {
    var uuidHack, targetDir, componentName, res;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            uuidHack = "capsule-".concat(Date.now().toString().slice(-5));
            targetDir = _path["default"].join(os.tmpdir(), 'bit', uuidHack);
            componentName = api.componentObject.name;
            print("\n building ".concat(componentName, " on directory ").concat(targetDir));
            _context4.next = 6;
            return api.isolate({
              targetDir: targetDir,
              shouldBuildDependencies: true
            });

          case 6:
            res = _context4.sent;
            return _context4.abrupt("return", {
              res: res,
              directory: targetDir
            });

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _isolate.apply(this, arguments);
}

function collectDistFiles(_x9) {
  return _collectDistFiles.apply(this, arguments);
}

function _collectDistFiles() {
  _collectDistFiles = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(context) {
    var capsuleDir, compDistDir, files, readFiles;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            capsuleDir = context.directory;
            compDistDir = _path["default"].resolve(capsuleDir, 'dist');
            _context5.next = 4;
            return (0, _recursiveReaddir["default"])(compDistDir);

          case 4:
            files = _context5.sent;
            _context5.next = 7;
            return Promise.all(files.map(function (file) {
              return _fs.promises.readFile(file);
            }));

          case 7:
            readFiles = _context5.sent;
            return _context5.abrupt("return", files.map(function (file, index) {
              return new _vinyl["default"]({
                path: _path["default"].join(context.name, file.split(_path["default"].join(capsuleDir, 'dist'))[1]),
                contents: readFiles[index]
              });
            }));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _collectDistFiles.apply(this, arguments);
}

function runNGPackagr(_x10) {
  return _runNGPackagr.apply(this, arguments);
}

function _runNGPackagr() {
  _runNGPackagr = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(context) {
    var result, scriptFile, cwd;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            result = null;
            scriptFile = _path["default"].resolve(require.resolve('ng-packagr/cli/main'));
            cwd = process.cwd();
            _context6.prev = 3;
            process.chdir(context.directory);
            _context6.next = 7;
            return (0, _execa["default"])("node", [scriptFile, "-p", "ng-package.json", "-c", "tsconfig.json"]);

          case 7:
            result = _context6.sent;
            _context6.next = 14;
            break;

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](3);
            process.chdir(cwd);
            throw _context6.t0;

          case 14:
            process.chdir(cwd);
            return _context6.abrupt("return", result);

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 10]]);
  }));
  return _runNGPackagr.apply(this, arguments);
}

function adjustFileSystem(_x11) {
  return _adjustFileSystem.apply(this, arguments);
}

function _adjustFileSystem() {
  _adjustFileSystem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(context) {
    var ngPackge;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return createPackagrFile(context);

          case 2:
            ngPackge = _context7.sent;
            _context7.next = 5;
            return createPublicAPIFile(context);

          case 5:
            _context7.next = 7;
            return createTSConfig(context);

          case 7:
            return _context7.abrupt("return", ngPackge);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _adjustFileSystem.apply(this, arguments);
}

function createPackagrFile(_x12) {
  return _createPackagrFile.apply(this, arguments);
}

function _createPackagrFile() {
  _createPackagrFile = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(context) {
    var compDir, content, filePath;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            compDir = context.directory;
            content = "{\n        \"$schema\": \"https://raw.githubusercontent.com/ng-packagr/ng-packagr/master/src/ng-package.schema.json\",\n        \"dest\": \"dist\",\n        \"lib\": {\n            \"entryFile\": \"".concat(FILE_NAME, "\"\n        },\n        \"whitelistedNonPeerDependencies\":[").concat(context.dependencies.map(function (val) {
              return "\"".concat(val, "\"");
            }).concat(["\"@angular/core\""]), "]\n    }");
            filePath = _path["default"].resolve(_path["default"].join(compDir, 'ng-package.json'));
            _context8.next = 5;
            return _fs.promises.writeFile(filePath, content);

          case 5:
            return _context8.abrupt("return", filePath);

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _createPackagrFile.apply(this, arguments);
}

function getTSConfigPath(context) {
  return _path["default"].join(context.directory, 'tsconfig.json');
}

function createTSConfig(context) {
  var pathToConfig = getTSConfigPath(context);
  var content = tsconfig;
  return _fs.promises.writeFile(pathToConfig, JSON.stringify(content, null, 4));
}

function getPackageJsonObject(dists, name) {
  var pkgJsonRaw = dists.find(function (e) {
    return e.basename === 'package.json';
  });
  var pkgJson = JSON.parse(pkgJsonRaw.contents.toString());
  var keysToTransform = ['es2015', 'esm5', 'esm2015', 'fesm5', 'fesm2015', 'main', 'module', 'typings'];
  return keysToTransform.reduce(function (acc, key) {
    // Special case for main to remove the dist, since bit will add it himself
    if (key === 'main') {
      acc[key] = pkgJson[key].startsWith('dist') ? pkgJson[key].replace(/^dist/g, name) : _path["default"].join(name, pkgJson[key]);
    } else {
      acc[key] = pkgJson[key].startsWith('dist') ? pkgJson[key].replace(/^dist/g, _path["default"].join('dist', name)) : _path["default"].join('dist', name, pkgJson[key]);
    }

    return acc;
  }, {});
}

function createPublicAPIFile(context) {
  debugger;

  var pathToPublicAPI = _path["default"].resolve(context.directory, FILE_NAME);

  if ((0, _fs.existsSync)("".concat(pathToPublicAPI, ".ts"))) {
    return;
  }

  var relativePathContent = _path["default"].relative(context.directory, _path["default"].join(context.directory, context.main.split('.ts')[0]));

  var content = "export * from './".concat(relativePathContent, "'");
  return _fs.promises.writeFile("".concat(pathToPublicAPI, ".ts"), content);
}

function getCustomDependencies(dir) {
  return Object.keys(require("".concat(dir, "/package.json")).dependencies || {});
}

var _default = {
  compile: compile
};
exports["default"] = _default;

//# sourceMappingURL=angular.js.map