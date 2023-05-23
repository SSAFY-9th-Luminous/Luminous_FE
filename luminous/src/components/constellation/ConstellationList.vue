<template>
        <div class="container">
          <carousel-3d>
            <slide :index="0">
            </slide>
            <slide :index="1">
            </slide>
            <slide :index="2">
            </slide>
          </carousel-3d>
            <div v-for="j in 4" :key="j" class="row flip-boxes">
                <div v-for="i in 3" :key="i" class="col-md-3 col-sm-4 col-8 flip-box">
                    <div class="front"
                      :style="{'background-image':' url('+require('@/assets/img/star.png')+')'}">
                        <div class="content text-center">
                            {{constellation12List[(j-1)*3+i -1 ].contentsName}}<br>
                            <span class="click-for-more">
                            </span>
                        </div>
                    </div>
                    <div class="back">
                        <div class="content">
                            {{ constellation12List[(j-1)*3+i -1].contentsDescription }}
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
</template>

<script>
import { listConstellation12 } from "@/api/constellation12";
import {Carousel3d, Slide} from 'vue-carousel-3d';
export default {
    name: 'ConstellationList',
    components: {
      Carousel3d,
      Slide
    },
    data() {
        return {
          constellation12List :[],
        };
    },
    created() { 
      listConstellation12(
        ({data})=>{
          this.constellation12List = data.result;
          console.log(this.constellation12List)
        },
        (error)=>{
          console.log(error);
        }
      );
    },
    methods: {},
};
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  
}

.flip-boxes {
  justify-content: center;
  
}

.flip-box {
  display: flex;
  align-content: stretch;
  min-height: 340px;
  
  min-width: 280px;
  flex-wrap: wrap;
  position: relative;
  border: 35px solid transparent;
  padding: 0;
  border-top: 400;
  -webkit-perspective: 1000;
  perspective: 1000;
}
.flip-box:hover .back {
  transform: rotateY(0deg);
  z-index: 10;
}
.flip-box:hover .front {
  transform: rotateY(180deg);
  z-index: -1;
}
.flip-box .back,
.flip-box .front {
  position: relative;
  background-color: #1b2d61;
  color: white;
  display: flex;
  justify-content: center;
  align-content: center;
  flex: 0 0 100%;
  -webkit-transition: all 1s cubic-bezier(0.5, 1, 0.5, 1);
  transition: all 1s cubic-bezier(0.5, 1.3, 0.5, 1.3);
  transform-style: preserve-3d;
  background-size: cover;
  border-radius: 10px;
  background-position: center;
}
.flip-box .back {
  background-color: #cecece;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: -1;
  transform: rotateY(-180deg);
}
.flip-box .back:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 30px;
}
.flip-box .front {
  z-index: 10;
}
.flip-box .front .content {
  font-size: 2rem;
}
.flip-box .front:after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  
}
.flip-box .content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  -webkit-transform: translateZ(50px);
  transform: translateZ(50px);
  text-shadow: 0px 0px 2px black;
}
</style>
