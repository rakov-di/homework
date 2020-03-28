import React, { Component } from 'react';
import Card from '../components/Card/Card';
import Log from '../components/Log/Log';

class BuildDetails extends Component {
  render() {
    const data = {
      id: 1368,
        title: 'add documentation for postgres scaler',
      status: 'done',
      branch: 'master',
      commitHash: '9c9f0b9',
      author: 'Philip Kirkorov',
      date: '21 янв, 03:06',
      time: '1 ч 20 мин'
    };
    const log = `
> webpack --env=development --watch

        This is the Webpack mode: development

        webpack is watching the files…

        Hash: 5cb8bff98d649c596ee510ff8e644221a9239f8c
        Version: webpack 4.41.5
        Child desktop:
        Hash: 5cb8bff98d649c596ee5
        Time: 13146ms
        Built at: 03/07/2020 4:55:24 PM
        Asset      Size    Chunks             Chunk Names
        css/_desktop.css   372 KiB  _desktop  [emitted]  _desktop
        fonts/Roboto-Bold.eot   126 KiB            [emitted]
        fonts/Roboto-Bold.ttf   159 KiB            [emitted]
        fonts/Roboto-Bold.woff  87.5 KiB            [emitted]
        fonts/Roboto-Bold.woff2  62.6 KiB            [emitted]
        fonts/Roboto-Italic.eot   132 KiB            [emitted]
        fonts/Roboto-Italic.ttf   158 KiB            [emitted]
        fonts/Roboto-Italic.woff  92.6 KiB            [emitted]
        fonts/Roboto-Italic.woff2  69.3 KiB            [emitted]
        fonts/Roboto-Medium.eot   126 KiB            [emitted]
        fonts/Roboto-Medium.ttf   159 KiB            [emitted]
        fonts/Roboto-Medium.woff  87.7 KiB            [emitted]
        fonts/Roboto-Medium.woff2  63.5 KiB            [emitted]
        fonts/Roboto-Regular.eot   127 KiB            [emitted]
        fonts/Roboto-Regular.ttf   159 KiB            [emitted]
        fonts/Roboto-Regular.woff  87.6 KiB            [emitted]
        fonts/Roboto-Regular.woff2  63.3 KiB            [emitted]
        img/desktop/content-nav-archive.svg  1.55 KiB            [emitted]
        img/desktop/content-nav-expert.svg  1.97 KiB            [emitted]
        img/desktop/content-nav-live.svg  2.38 KiB            [emitted]
        img/desktop/content-nav-page.svg  1.27 KiB            [emitted]
        img/desktop/icons-desktop-300fdd16.svg   139 KiB            [emitted]
        img/mobile/icons-mobile-5564934a.svg  77.2 KiB            [emitted]
        js/_desktop.js  2.62 MiB  _desktop  [emitted]  _desktop
        Entrypoint _desktop = css/_desktop.css js/_desktop.js
        [./css/desktop/desktop.styl] 39 bytes {_desktop} [built]
        [./js/common/core/Storage.js] 24.9 KiB {_desktop} [built]
        [./js/common/core/UrlManager.js] 8.09 KiB {_desktop} [built]
        [./js/common/core/polyfills/closest.js] 333 bytes {_desktop} [built]
        [./js/common/core/polyfills/intersectionObserver.js] 24.2 KiB {_desktop} [built]
        [./js/common/core/store/InstanceTypes.js] 249 bytes {_desktop} [built]
        [./js/common/core/store/InstancesStore.js] 3.39 KiB {_desktop} [built]
        [./js/common/modules/HomelessButton.js] 1.17 KiB {_desktop} [built]
        [./js/common/modules/NumberField.js] 1.56 KiB {_desktop} [built]
        [./js/common/modules/myRubrics.js] 2.67 KiB {_desktop} [built]
        [./js/desktop/core/GlobalEvents.js] 9.25 KiB {_desktop} [built]
        [./js/desktop/core/polyfills/matches.js] 512 bytes {_desktop} [built]
        [./js/desktop/desktop.js] 3.99 KiB {_desktop} [built]
        [./js/desktop/modules/ContentNav.js] 1.42 KiB {_desktop} [built]
        [./js/desktop/modules/Header.js] 615 bytes {_desktop} [built]
        + 280 hidden modules
        Child mini-css-extract-plugin ../node_modules/css-loader/dist/cjs.js??ref--5-1!../node_modules/postcss-loader/src/index.js??ref--5-2!../node_modules/stylus-loader/index.js!css/desktop/desktop.styl:
        Entrypoint mini-css-extract-plugin = *
        [../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/stylus-loader/index.js!./css/desktop/desktop.styl] ../node_modules/css-loader/dist/cjs.js??ref--5-1!../node_modules/postcss-loader/src??ref--5-2!../node_modules/stylus-loader!./css/desktop/desktop.styl 144 KiB {mini-css-extract-plugin} [built]
        + 1 hidden module
        Child mobile:
        Hash: 10ff8e644221a9239f8c
        Time: 12871ms
        Built at: 03/07/2020 4:55:23 PM
        Asset      Size   Chunks             Chunk Names
        css/_mobile.css   269 KiB  _mobile  [emitted]  _mobile
        fonts/Roboto-Bold.eot   126 KiB           [emitted]
        fonts/Roboto-Bold.ttf   159 KiB           [emitted]
        fonts/Roboto-Bold.woff  87.5 KiB           [emitted]
        fonts/Roboto-Bold.woff2  62.6 KiB           [emitted]
        fonts/Roboto-Italic.eot   132 KiB           [emitted]
        fonts/Roboto-Italic.ttf   158 KiB           [emitted]
        fonts/Roboto-Italic.woff  92.6 KiB           [emitted]
        fonts/Roboto-Italic.woff2  69.3 KiB           [emitted]
        fonts/Roboto-Medium.eot   126 KiB           [emitted]
        fonts/Roboto-Medium.ttf   159 KiB           [emitted]
        fonts/Roboto-Medium.woff  87.7 KiB           [emitted]
        fonts/Roboto-Medium.woff2  63.5 KiB           [emitted]
        fonts/Roboto-Regular.eot   127 KiB           [emitted]
        fonts/Roboto-Regular.ttf   159 KiB           [emitted]
        fonts/Roboto-Regular.woff  87.6 KiB           [emitted]
        fonts/Roboto-Regular.woff2  63.3 KiB           [emitted]
        img/desktop/content-nav-archive.svg  1.55 KiB           [emitted]
        img/desktop/content-nav-expert.svg  1.97 KiB           [emitted]
        img/desktop/content-nav-live.svg  2.38 KiB           [emitted]
        img/desktop/content-nav-page.svg  1.27 KiB           [emitted]
        img/desktop/icons-desktop-300fdd16.svg   139 KiB           [emitted]
        img/mobile/icons-mobile-5564934a.svg  77.2 KiB           [emitted]
        js/_mobile.js  1.38 MiB  _mobile  [emitted]  _mobile
        Entrypoint _mobile = css/_mobile.css js/_mobile.js
        [./css/mobile/mobile.styl] 39 bytes {_mobile} [built]
        [./js/common/core/Storage.js] 21 KiB {_mobile} [built]
        [./js/common/core/UrlManager.js] 5.95 KiB {_mobile} [built]
        [./js/common/core/polyfills/closest.js] 333 bytes {_mobile} [built]
        [./js/common/core/polyfills/intersectionObserver.js] 23.3 KiB {_mobile} [built]
        [./js/common/core/store/InstanceTypes.js] 249 bytes {_mobile} [built]
        [./js/common/core/store/InstancesStore.js] 2.31 KiB {_mobile} [built]
        [./js/common/modules/HomelessButton.js] 1010 bytes {_mobile} [built]
        [./js/common/modules/favorite.js] 3.4 KiB {_mobile} [built]
        [./js/common/modules/listItem.js] 585 bytes {_mobile} [built]
        [./js/common/modules/myRubrics.js] 1.6 KiB {_mobile} [built]
        [./js/mobile/core/GlobalEvents.js] 11.5 KiB {_mobile} [built]
        [./js/mobile/core/innerStatistic.js] 5.48 KiB {_mobile} [built]
        [./js/mobile/mobile.js] 3.79 KiB {_mobile} [built]
        [./js/mobile/modules/PageSplitter.js] 695 bytes {_mobile} [built]
        + 99 hidden modules
        Child mini-css-extract-plugin ../node_modules/css-loader/dist/cjs.js??ref--5-1!../node_modules/postcss-loader/src/index.js??ref--5-2!../node_modules/stylus-loader/index.js!css/mobile/mobile.styl:
        Entrypoint mini-css-extract-plugin = *
        [../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/stylus-loader/index.js!./css/mobile/mobile.styl] ../node_modules/css-loader/dist/cjs.js??ref--5-1!../node_modules/postcss-loader/src??ref--5-2!../node_modules/stylus-loader!./css/mobile/mobile.styl 104 KiB {mini-css-extract-plugin} [built]
        + 1 hidden module
    `;
    return (
      <>
        <Card data={data} />
        <Log log={log} />
      </>
    )
  }
}

export default BuildDetails;

