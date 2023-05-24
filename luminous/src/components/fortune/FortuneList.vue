<template>
    <div class="container" v-if=" fortuneList.length!==0 && fortuneList[0].contentsName">
        <div v-for="j in 4" :key="j" class="row flip-boxes">
            <div v-for="i in 3" :key="i" class="col-md-3 col-sm-4 col-8 flip-box " >
                <div v-if="(j-1)*3+i==userInfo.constellation12Id" class="front neon_back"
                  :style="{'background-image':' url('+require('@/assets/img/constellation12/' + fortuneList[(j-1)*3+i -1].img + '')+')'}">
                    <div class="content text-center title">
                        {{fortuneList[(j-1)*3+i -1 ].contentsName}}<br>
                        <span class="click-for-more">
                        </span>
                    </div>
                </div>
                <div v-else class="front shadow"
                  :style="{'background-image':' url('+require('@/assets/img/constellation12/' + fortuneList[(j-1)*3+i -1].img + '')+')'}">
                    <div class="content text-center title">
                        {{fortuneList[(j-1)*3+i -1 ].contentsName}}<br>
                        <span class="click-for-more">
                        </span>
                    </div>
                </div>
                <div class="back">
                    <div class="content">
                        {{ fortuneList[(j-1)*3+i -1].description }}
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

const memberStore = "memberStore";
import { listFortune } from "@/api/fortune";
export default {
name: 'FortuneList',
data() {
    return {
      fortuneList :[
      ],
    
    };
},
computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
created() { 
  
  listFortune(
    ({data})=>{
      this.fortuneList = data.result;
      console.log(this.fortuneList)
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
  background-color: #2c3246;
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
  -webkit-transform: translateZ(40px);
  transform: translateZ(40px);
  text-shadow: 0px 0px 2px black;
}
.flip-box .title{
  position: absolute;
  top : 8px;
}

.shadow {
  
  filter: drop-shadow(0 0px 0.4rem #000000); 
}
.neon_back {
  
  filter: drop-shadow(0 -5px 2rem #211c6d); 
}

</style>
