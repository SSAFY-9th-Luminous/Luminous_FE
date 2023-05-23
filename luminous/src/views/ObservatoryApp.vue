<template>
  <b-container class="bv-example-row mt-3 text-center">
    <div class="float-right">
      <router-link :to="{ name: 'observatory' }" class="m-2 link newcolor btn btn-primary" @click.native="cheangeTilteToObservatory">
        <b-icon icon="moon"></b-icon>천문대
      </router-link>

      <router-link :to="{ name: 'camping' }" class="m-2 link newcolor btn btn-primary" @click.native="cheangeTilteToCamping">
        <b-icon icon="tree"></b-icon>캠핑장
      </router-link>

    </div>
    <h3 class="underline-green">
      <div class="title" v-if="this.title == 'observatory'">
        <b-icon icon='moon'></b-icon> 천문대
      </div>
      <div class="title" v-else-if="this.title == 'camping'">
        <b-icon icon='tree'></b-icon> 캠핑장
      </div>
    </h3>

    <router-view></router-view>
    
  </b-container>
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
.underline-green {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(56, 233, 40, 0.3) 30%
  );
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