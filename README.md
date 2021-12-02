# js-tablet-gui-basic
The basics for an electron tablet settings gui app.

[ Things To Install Before Running ]
-

```bash
libwacom xf86-input-wacom 
```

(your wacom tablet should work without needing the extra steps bellow after restarting)

(huion tablets will need these too

```bash
digimend-kernel-drivers-dkms-git and linux-headers
```

This Guide can help figuring out the proper line of code -> https://github.com/DIGImend/digimend-kernel-drivers

open a terminal and run " lsusb " without quotes to get your tablets ID number then

for huion tablets enter the next few lines of text here

```bash
sudo gedit /etc/X11/xorg.conf.d/50-tablet.conf
```

```bash
Section "InputClass"
    Identifier "Tablet"
    Driver "wacom"
    MatchDevicePath "/dev/input/event*"
    MatchUSBID "<VID>:<PID>"
EndSection
```

save and reboot, your huion tablet should now work

### How to Play / Install
* install npm ( https://docs.npmjs.com/downloading-and-installing-node-js-and-npm )
* clone js-tablet-gui-basic-main files, then extract, and navigate to that folder
* open a terminal, powershell, or Visual Studio Code, then run this command to install

```js
npm i
```
* and this command to play

```js
npm start
```

( if you'd prefer to make a stand alone game instead run install electron-builder )

```js
npm i -g electron-builder
```

* Then run this command to build executable

```js
electron-builder build
```

( you'll find the executable / AppImage in the "dist" folder )
![js_tablet_gui_Basic](https://user-images.githubusercontent.com/11281480/144343054-d36b3d0e-87bb-4913-a966-83b87dcac6a3.png)

[ Helpful Links ]
-

(a list of wacom commands I found to be useful) https://github.com/Mainman002/Wacom-Bamboo-Settings-Gui/blob/master/xsetwacom%20Commands.txt

(Arch Wiki)
-
https://wiki.archlinux.org/index.php/wacom_tablet

(Tablet Configuration 1)
-
https://github.com/linuxwacom/xf86-input-wacom/wiki/Tablet-Configuration-1:-xsetwacom-and-xorg.conf

(Tablet Button Example Scripts)
-
https://github.com/linuxwacom/xf86-input-wacom/wiki/Tablet-Configuration-2:-Example-scripts

(Possibly Useful Later Huion Tablet Setup Video)
-
https://www.youtube.com/watch?v=ymZaexs3rac&t=0s

(Bamboo Pen And Touch)
-
https://ubuntuforums.org/showthread.php?t=1515562

(linux driver workaround for Huion H950p)
-
https://github.com/mhdchehade/pinspiroy-950

(tips on installing linux headers)
-
https://bbs.archlinux.org/viewtopic.php?id=210378

(xsetwacom keyboard keys)
-
https://github.com/lubosz/wacom-utility/blob/master/keymap.txt




