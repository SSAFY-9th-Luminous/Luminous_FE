<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글수정</h3></b-alert>
      </b-col>
    </b-row>
    <place-input-item type="modify" />
  </b-container>
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
