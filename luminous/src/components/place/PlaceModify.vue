<template>
  <div>
    <b-row>
      <b-col>
        <b-alert show><h3>글수정</h3></b-alert>
      </b-col>
    </b-row>
    <place-input-item type="modify" />
  </div>
</template>

<script>
import PlaceInputItem from "@/components/place/item/PlaceInputItem";

export default {
  name: "placeModify",
  components: {
    PlaceInputItem,
  },
};
</script>

<style></style>
