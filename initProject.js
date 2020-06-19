/**
 * base on parcel.js 自動建立基本專案結構
 * require 💿
 * ======================
 * node.js [v11.15.0 ⬆️]
 * yarn [v1.22.4 ⬆️]
 * parcel [v1.12.4 ⬆️]
 * ======================
 *
 * 04/24/2020 by *** Jim Xie ***
 * 04/27/2020 [update] 
 * initPackage() => initPackage({dep: string[], dev: string[]}) 可以帶參數安裝所需package
 * initPackage() => initConstruct({exist?: boolean, type: 'file' | 'folder', name: string}[]) 可以帶參數建立 檔案｜資料夾
 * 
 */
const { existsSync, writeFileSync, readdirSync } = require('fs');
const { execSync } = require('child_process');
const os = require('os');
const target = './package.json';

/**
 * 初始化專案 安裝初始所需的packages
 *
 * 判斷 sass & autoprefixer 是否有安裝
 * 安裝 sass & autoprefixer
 * @typedef {{dep: string[], dev: string[]}} pack
 * @param {pack} packages
 */
const initPackage = (
  packages = {
    dep: [],
    dev: []
  }
) => {
  let { dep, dev } = packages;
  if (!dep) dep = [];
  if (!dev) dev = [];
  const defaultDev = [
    'sass',
    '@babel/core',
    '@babel/plugin-transform-runtime',
    '@babel/preset-env'
  ];
  dev = [...dev, ...defaultDev];
  const node_modules = existsSync('node_modules');
  let depCommand = '';
  let devCommand = '';
  /**
   * 安裝packages
   *
   * @param {string} command 安裝packages命令
   * @param {boolean} isDev 是否為dev依賴
   */
  const installPackages = (command = '', isDev = false) => {
    console.warn('show command', command);
    if (!command) return;
    if (isDev) {
      execSync(
        `yarn add ${command} -D`,
        {
          stdio: 'inherit'
        },
        (err, stdout, stderr) => {
          if (err) return console.log(err);
          if (stdout) return console.log(stdout);
          if (stderr) return console.log(stderr);
        }
      );
    } else {
      execSync(
        `yarn add ${command}`,
        {
          stdio: 'inherit'
        },
        (err, stdout, stderr) => {
          if (err) return console.log(err);
          if (stdout) return console.log(stdout);
          if (stderr) return console.log(stderr);
        }
      );
    }
  };
  if (node_modules) {
    const allFolder = readdirSync('node_modules');
    // dep
    for (let each in dep) {
      if (allFolder.indexOf(dep[each]) < 0) depCommand += `${dep[each]} `;
    }
    installPackages(depCommand);
    // dev
    for (let each in dev) {
      if (allFolder.indexOf(dev[each]) < 0) devCommand += `${dev[each]} `;
    }
    installPackages(devCommand, true);
  } else {
    // dep
    for (let each in dep) {
      depCommand += `${dep[each]} `;
    }
    installPackages(depCommand);

    // dev
    for (let each in dev) {
      devCommand += `${dev[each]} `;
    }
    installPackages(devCommand, true);
  }
};

/**
 * 初始化專案 建立基礎專案結構
 *
 * 判斷 index.html index.js /script /style 是否存在
 * 新建 index.html index.js /script /style
 * @typedef {{exist?: boolean, type: 'file' | 'folder', name: string}} constructItem
 * @param {constructItem[]} item
 */
const initConstruct = (item = null) => {
  const defaultItem = [
    {
      exist: existsSync('index.html'),
      type: 'file',
      name: 'index.html'
    },
    {
      exist: existsSync('index.js'),
      type: 'file',
      name: 'index.js'
    },
    {
      exist: existsSync('script'),
      type: 'folder',
      name: 'script'
    },
    {
      exist: existsSync('style'),
      type: 'folder',
      name: 'style'
    }
  ];
  let cearteFileCMD = (()=> {
    switch(os.platform()){
      case 'win32':
        return 'echo nul > ';
      case 'darwin':
        return 'touch'
    }
  })();
  let scriptCommand = '';
  
  if (!item || !Array.isArray(item) || item.length < 1) {
    item = defaultItem;
  } else {
    item = item.map((item) => ({
      exist: existsSync(item.name),
      ...item
    }));
  }
  item.forEach((i, index) => {
    const { type, name } = i;
    if (i && i.exist === false) {
      if (index === item.length - 1) {
        if (type === 'file') scriptCommand += `${cearteFileCMD} ${name}`;
        if (type === 'folder') scriptCommand += `mkdir ${name}`;
      } else {
        if (type === 'file') scriptCommand += `${cearteFileCMD} ${name} && `;
        if (type === 'folder') scriptCommand += `mkdir ${name} && `;
      }
    }
  });
  if (scriptCommand)
    execSync(
      scriptCommand,
      {
        stdio: 'inherit'
      },
      (err, stdout, stderr) => {
        if (err) return console.log(err);
        if (stdout) return console.log(stdout);
        if (stderr) return console.log(stderr);
      }
    );
};

/**
 * 建立|修改 package.json設定
 *
 * @typedef {{name?: string, main?: string, port?: string|number, buildSrc?: string}} opt
 * @param {opt} option
 */
const initJson = (option = null) => {
  const isExist = existsSync('package.json');
  console.log(isExist ? '有package.json' : '無package.json');
  if (isExist) {
    const loadFile = require(target);
    // name
    loadFile.name = option && option.name ? option.name : loadFile.name;
    // main
    loadFile.main = option && option.main ? option.main : loadFile.main;
    // script
    loadFile.scripts = {
      start:
        option && option.port
          ? `parcel index.html --port ${option.port} --open`
          : 'parcel index.html --port 6090 --open',
      build:
        option && option.buildSrc
          ? `parcel build index.html --public-url ${option.buildSrc}`
          : 'parcel build index.html --public-url ./'
    };
    // babel
    loadFile.babel = {
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime']
    };
    // postcss
    loadFile.postcss = {
      plugins: {
        autoprefixer: {
          overrideBrowserslist: ['> 1%', 'last 2 versions', 'not ie < 10'],
          grid: true
        }
      }
    };
    console.log(loadFile);
    return loadFile;
  } else {
    return {
      name: option && option.name ? option.name : 'project',
      version: '1.0.0',
      main: option && option.main ? option.main : 'index.js',
      license: 'MIT',
      private: true,
      scripts: {
        start:
          option && option.port
            ? `parcel index.html --port ${option.port} --open`
            : 'parcel index.html --port 6090 --open',
        build:
          option && option.buildSrc
            ? `parcel build index.html --public-url ${option.buildSrc}`
            : 'parcel build index.html --public-url ./',
        test: 'echo "Error: no test specified" && exit 1'
      },
      babel: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime']
      },
      postcss: {
        plugins: {
          autoprefixer: {
            overrideBrowserslist: ['> 1%', 'last 2 versions', 'not ie < 10'],
            grid: true
          }
        }
      }
    };
  }
};

//
const json = initJson({
  port: 9922
});
const packageList = {
  dep: ['sweetalert2', 'reset-css']
};
writeFileSync(target, JSON.stringify(json));
initPackage(packageList);
initConstruct();
