<template>
<div>
    <b-row>
      <b-col>
        <b-alert show><h3>글작성</h3></b-alert>
      </b-col>
    </b-row>
    <place-input-item type="register" />
</div>
</template>

<script>
import PlaceInputItem from "@/components/place/item/PlaceInputItem";

export default {
  name: "PlaceWrite",
  components: {
    PlaceInputItem,
  },
};
</script>

<style></style>
