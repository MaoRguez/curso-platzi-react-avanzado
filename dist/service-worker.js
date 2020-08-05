/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-99319794'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "/0.app.bundle.js",
    "revision": "f72101e46d3c793405a65013384db5bb"
  }, {
    "url": "/1.app.bundle.js",
    "revision": "4ca3b4a24b6e37c7b880551ce6f9ed4a"
  }, {
    "url": "/icon_1024x1024.22c9f3b2f9c3ca126a8669dc94e8a4ef.png",
    "revision": "22c9f3b2f9c3ca126a8669dc94e8a4ef"
  }, {
    "url": "/icon_128x128.6604c172e8ce4af7fbfa57c27d021c51.png",
    "revision": "6604c172e8ce4af7fbfa57c27d021c51"
  }, {
    "url": "/icon_192x192.90b0066825ca5de6736df558ac2e3d28.png",
    "revision": "90b0066825ca5de6736df558ac2e3d28"
  }, {
    "url": "/icon_256x256.ec379c2f555469a2eae002ecb797de61.png",
    "revision": "ec379c2f555469a2eae002ecb797de61"
  }, {
    "url": "/icon_384x384.1b3dd1daeb0fae568378c939c236d79b.png",
    "revision": "1b3dd1daeb0fae568378c939c236d79b"
  }, {
    "url": "/icon_512x512.6347ff3bd381b29aff5d609e848eb7d9.png",
    "revision": "6347ff3bd381b29aff5d609e848eb7d9"
  }, {
    "url": "/icon_96x96.ea8ccf240813799ababb948f696bab65.png",
    "revision": "ea8ccf240813799ababb948f696bab65"
  }, {
    "url": "/index.html",
    "revision": "477f9a3764f9b75db222c0e638649858"
  }, {
    "url": "/manifest.f5ca2b22204cb442a0da1ea5938ff8a4.json",
    "revision": "f5ca2b22204cb442a0da1ea5938ff8a4"
  }], {});
  workbox.registerRoute(/https:\/\/(res.cloudinary.com|images.unsplash.com)/, new workbox.CacheFirst({
    "cacheName": "images",
    plugins: []
  }), 'GET');
  workbox.registerRoute(/https:\/\/petgram-server.javierfuentesm.now.sh/, new workbox.NetworkFirst({
    "cacheName": "api",
    plugins: []
  }), 'GET');

});
//# sourceMappingURL=service-worker.js.map
