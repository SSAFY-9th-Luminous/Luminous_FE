<template>
  
<b-container class="bv-example-row mt-3 text-center">
      <h3 class="underline-steelblue"><b-icon icon="stars"></b-icon> 천문대 </h3>
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
};
</script>

<style scoped>

.underline-steelblue {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(72, 190, 233, 0.3) 30%);
}
#br {
    height: 1px;
    width: 100%;
    background-color: rgb(197, 135, 20);
}

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
  padding: 0px 15px;
}

.underline{
  display: inline-block;
  background: rgba(255, 255, 255, 0);
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