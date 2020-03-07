<template>
  <div class="mt-5 p-5">
    <mdb-container fluid grid-list-xl>
      <mdb-row>
        <mdb-col col="4"></mdb-col>
        <mdb-col col="4">
          <form>
            <p class="h4 text-center mb-4">Profile</p>
            <div class="grey-text">
              <mdb-row class="mb-1">
                <mdb-col>Full name</mdb-col>
                <mdb-col>{{ user.name }}</mdb-col>
              </mdb-row>
              <mdb-row class="mb-1">
                <mdb-col>Birthday</mdb-col>
                <mdb-col>{{ user.date_of_birth }}</mdb-col>
              </mdb-row>
              <mdb-row class="mb-1">
                <mdb-col>Phone</mdb-col>
                <mdb-col>{{ user.phone }}</mdb-col>
              </mdb-row>
            </div>
            <div class="text-center">
              <mdb-btn @click.native.prevent="edit">Edit</mdb-btn>
            </div>
          </form>
        </mdb-col>
        <mdb-col col="4"></mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn } from "mdbvue";
import router from "../router";

export default {
  name: "profile",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn
  },
  data() {
    const { name, phone, date_of_birth } = this.$store.state.user;
    return {
      user: {
        name,
        phone,
        date_of_birth
      }
    };
  },
  methods: {
    edit() {
      router.push("/profile/edit");
    }
  }
};
</script>
