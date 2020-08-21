# vue-audioplayers

## Intro

---

This is an audio player for Vue，It provides two custom styles.

normal: 
![image](https://github.com/Aimee616/vue-audioplayers/docImg/style-music.jpg)                   
music: 
![image](https://github.com/Aimee616/vue-audioplayers/blob/master/docImg/style-music.jpg)

## Installation

---

`npm install vue-audioplayers -D`

## Usage

---

```// main.js

import AudioPlayer from 'vue-audioplayers'
import 'vue-audioplayers/dist/vue-audioplayer.min.css'

Vue.use(AudioPlayer)

// components
<audio-player
      audioStyle="music"      // optional, default value is 'normal'
      src=""                  // required, the file url
      theme="yellowgreen"     // optional, setting player main color,default is "yellowgreen"
      :loop="false"           // optional, loop playback,default value is true
/>

```

At last，If there is any problems in using, please send E-mail to **1428925451@qq.com**, thank you so much！
