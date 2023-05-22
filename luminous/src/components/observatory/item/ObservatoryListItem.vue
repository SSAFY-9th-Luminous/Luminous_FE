<template>
  <b-tr>
    <b-td>{{ id }}</b-td>
    <b-th class="text-left">
      <router-link :to="{ name: 'observatoryView', params: { id: id } }">{{ subject }}</router-link>
    </b-th>
    <b-td>{{ hit }}</b-td>
    <b-td>{{ userid }}</b-td>
    <b-td>{{ regtime | dateFormat }}</b-td>
  </b-tr>
</template>

<script>
import moment from "moment";

export default {
  name: "ObservatoryListItem",
  props: {
    id: Number,
    userid: Object,
    subject: String,
    hit: Number,
    regtime: String,
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
};
</script>

<style></style>
