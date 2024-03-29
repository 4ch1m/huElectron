![huElectron](https://raw.githubusercontent.com/4ch1m/huElectron/master/huelectron.png)

# huElectron

> An open-source and cross-platform app for the [Hue Lighting System](https://www2.meethue.com) from _Philips_ - built on [Electron](https://electronjs.org).

## Table of Contents

* [Screenshots](#screenshots)
* [Motivation](#motivation)
* [Features](#features)
* [ToDo](#todo)
* [Binaries](#binaries)
* [Build It Yourself](#build-it-yourself)
* [Resources](#resources)
* [License](#license)

## Screenshots

![screenshots](screenshots/screenshots.gif)

## Motivation

While there are many mobile-apps available for the lighting system from _Philips_, only few "traditional" desktop-apps can be found.

Since most of these desktop-apps are closed-source and only available for _Windows_ / _Mac_, I've decided to create an open-source app which will run on all popular systems; including _Linux_.

Also, this is my first _Electron_-app; so it served as some kind of playground for me. :wink:

## Features

The current feature-set includes:

* easy management of ...
  * bridges
  * users
  * lights
  * groups
  * (scenes)
  * (sensors)
  * (schedules)
  * (rules)
* quick-actions (set state/color/brightness with one mouse-click) 
* show detailed information about each light, group, etc.

## ToDo

_huElectron_ is still at an early development stage; the following features will be implemented in future releases:

* manage portal services
* implement discovery of new lights/sensors
* enhance management of bridges, sensors, scenes, schedules, and rules

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
  * build and **package** the app for Linux, Mac, and Windows with ...
      ```
      npm run package
      ```
    (The freshly compiled binaries can then be found in the _dist_-folder.)
  * or just **start** it right away with ...
      ```
      npm start
      ```

## Resources

hue product icons (mostly) taken from (or based on) the official _Icon Pack_:  
* [https://developers.meethue.com/develop/application-design-guidance/icon-pack](https://developers.meethue.com/develop/application-design-guidance/icon-pack) (login needed)

Unfortunately this resource doesn't get updated by _Philips_ anymore (the latest release is from 2019). :worried:

Additional icons pulled from:
* [hass-hue-icons](https://github.com/arallsopp/hass-hue-icons)

## License

Please read the [license](license) file.
