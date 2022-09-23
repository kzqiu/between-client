<template>
  <router-view/>
</template>

<style>
/* #app {
  margin-top: 3.5em;
} */
html {
  box-sizing: border-box;
  font-size: 100%;
  height: 100%;
}
* {
  box-sizing: inherit;
}
body {
  min-height: 100%;
}
.map-container {
  display: flex;
  flex-direction: row;
}
.left {
  flex: 1 1 25%;
  padding: 25px;
}
.bottom {
  position: absolute;
  bottom: 0;
  font-size: 75%
}
#map {
  min-height: 100%;
  height: 100vh;
  width: 100%;
  flex: 3 1 75%;
}
.error {
  color: rgb(243, 75, 75);
  font-weight: 700;
}
</style>
