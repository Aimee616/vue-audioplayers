# vue-simple-lazyimg

## Intro

---

This is an audio player for Vue，It provides two custom styles.


## Installation

---

`npm install vue-simple-lazyimg --save`

## Usage

---

```// main.js

import lazyimg from 'vue-simple-lazyimg'

const options = {  
 loading: '', // image loading url  
 error: '' // image onerror url
}

// Optional, we provide default image for error and loading.  
Vue.use(lazyimg, options)

// components  
<img v-lazyimg="imgUrl" />

<script>
  export default {
    data () {
      return {
        imgUrl: '',
      }
    }
  }
</script>
```

At last，If there is any problems in using, please send E-mail to **1428925451@qq.com**, thank you so much！
