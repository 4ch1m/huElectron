![huElectron](https://raw.githubusercontent.com/4ch1m/huElectron/master/huelectron.png)

# huElectron

> An open-source and cross-platform app for the [Hue Lighting System](https://www2.meethue.com) from _Philips_ - built on [Electron](https://electronjs.org).

Branch | Status | Dependencies
:------: | :------: | :------:
master | [![Build Status](https://travis-ci.org/4ch1m/huElectron.svg?branch=master)](https://travis-ci.org/4ch1m/huElectron) | ![Dependencies](https://img.shields.io/librariesio/github/4ch1m/huElectron)
development | [![Build Status](https://travis-ci.org/4ch1m/huElectron.svg?branch=development)](https://travis-ci.org/4ch1m/huElectron) | n/a

## Screenshots

![screenshots](https://raw.githubusercontent.com/4ch1m/huElectron/master/screenshots/screenshots.gif)

## Motivation

While there are many mobile-apps available for the lighting system from _Philips_, only few "traditional" desktop-apps can be found.

Since most of these desktop-apps are closed-source and only available for _Windows_ / _Mac_, I've decided to create an open-source app which will run on all popular systems; including Linux.

Also this is my first _Electron_-app; so it served as some kind of playground for me. :wink:

## Features

The current feature-set includes:

* easy management of ...
  * bridges
  * users
  * lights
  * groups
  * (scenes)
  * (sensors)
* quick-actions (set state/color/brightness with one mouse-click) 
* show detailed information about each light/group

## TODO

__huElectron__ is still at an early development stage; the following features will be implemented in future releases:

* manage schedules
* manage rules
* manage portal services
* implement discovery of new lights
* implement discovery of new new sensors
* enhance bridge-management (zigbeeChannel, proxyPort, timeZone, etc.)
* enhance sensor-management (type, virtual sensor creation, etc.)
* enhance scene-management

Oh, and although I've tried to make the app look somewhat decent by extensively using [Bootstrap](https://getbootstrap.com), of course there's always room for improvement/beautification.
So any help/contribution from web-design-wizards is highly welcome. :smiley:

## Binaries

Prebuilt binaries for all target platforms can be found in the [releases](https://github.com/4ch1m/huElectron/releases)-section of this repository.

## Build It Yourself

* Clone the repository:
  ```
  git clone https://github.com/4ch1m/huElectron.git
  ```

* Change directory:
  ```
  cd huElectron
  ```

* Install dependencies:
  ```
  npm install
  ```

* Now either ...
   * build/package the app for Linux, Mac, and Windows:
	   ```
	   npm run package
	   ```
	 (The freshly compiled binaries can then be found in the _dist_-folder.)
	   
   * or just start it right away:
	   ```
	   npm start
	   ```

## Author

:email: [Achim Seufert](mailto:contact@huelectron.achimonline.de)

## License

Please read the [license](license) file.

---

<a href="http://www.jetbrains.com/idea/" style="position: relative;display:block; width:88px; height:31px; border:0; margin:0;padding:0;text-decoration:none;text-indent:0;"><span style="margin: 0;padding: 0;position: absolute;top: 0;left: 4px;font-size: 10px; line-height: 12px;cursor:pointer; background-image:none;border:0;color: #acc4f9; font-family: trebuchet ms,arial,sans-serif;font-weight: normal;text-align:left;">Developed with&nbsp;</span><img src="http://www.jetbrains.com/idea/opensource/img/all/banners/idea88x31_blue.gif" alt="The best Java IDE" border="0"/></a>
