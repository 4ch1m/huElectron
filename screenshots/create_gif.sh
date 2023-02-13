#!/bin/bash

SCRIPT=$(readlink -f $0)
SCRIPTPATH=`dirname ${SCRIPT}`

IMAGES+="${SCRIPTPATH}/quickactions.png "
IMAGES+="${SCRIPTPATH}/bridges.png "
IMAGES+="${SCRIPTPATH}/users.png "
IMAGES+="${SCRIPTPATH}/lights1.png "
IMAGES+="${SCRIPTPATH}/lights2.png "
IMAGES+="${SCRIPTPATH}/lights3.png "
IMAGES+="${SCRIPTPATH}/lights4.png "
IMAGES+="${SCRIPTPATH}/lights5.png "
IMAGES+="${SCRIPTPATH}/groups1.png "
IMAGES+="${SCRIPTPATH}/groups2.png "
IMAGES+="${SCRIPTPATH}/groups3.png "
IMAGES+="${SCRIPTPATH}/scenes.png "
IMAGES+="${SCRIPTPATH}/sensors.png "

convert \
  -delay 300 \
  -loop 0 \
  ${IMAGES} \
  screenshots.gif
