<template>
  <div>

      <div id="category-container" class="mb-5">
        <b-container id="sub-container">
        <div id="sub-menu" class="float-left">
          <router-link :to="{ name: 'observatory' }" id="link" class="m-2 text-secondary" @click.native="cheangeTilteToObservatory">
            <b-icon icon="moon"></b-icon>천문대
          </router-link>

          <router-link :to="{ name: 'camping' }" id="link" class="m-2 text-secondary" @click.native="cheangeTilteToCamping">
            <b-icon icon="tree"></b-icon>캠핑장
          </router-link>
        </div>
        </b-container>
      </div>

    <b-container class="bv-example-row text-center">

      <div id="main-container">
        <h3 class="underline">
          <div class="title" v-if="this.title == 'observatory'">
            <b-icon icon='moon'></b-icon> 천문대
          </div>
          <div class="title" v-else-if="this.title == 'camping'">
            <b-icon icon='tree'></b-icon> 캠핑장
          </div>
        </h3>

        
        
      </div>

      <router-view></router-view>

    </b-container>
  </div>
</template>

<script>
export default {
  name: "ObservatoryApp",
  data() {
    return {
      title: "observatory"
    }
  },
  methods: {
    cheangeTilteToCamping() {
      this.title = "camping"
    },
    cheangeTilteToObservatory() {
      this.title = "observatory"
    }
  }
};
</script>

<style scoped>
#link {
  display: flex;
  align-content: flex-end;
  flex-wrap: wrap;
}

#sub-container {
  height: 50px;
  display: flex;
  justify-content: left;
}

#sub-menu {
  display: flex;
  justify-content: center;
}

#category-container {
  height: 50px;
  width: 100%;  
  background-color: #ccc;
  box-shadow: 5px 1px 10px 3px gray;
}

#main-container {
  display: flex;
  flex-direction: column;
}

.underline{
  display: inline-block;
  background: rgba(255, 255, 255, 0);
}
.container{
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}


</style>