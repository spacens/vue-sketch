<template>
  <div class="mt-5 p-5">
    <mdb-container fluid grid-list-xl>
      <mdb-row>
        <mdb-col col="4"></mdb-col>
        <mdb-col col="4">
          <form>
            <p class="h4 text-center mb-4">Profile</p>
            <div class="grey-text">
              <mdb-input v-model="user.name" label="Full name" type="text" />
              <mdb-input
                v-model="user.date_of_birth"
                label="Birthday"
                type="text"
              />
              <mdb-input v-model="user.phone" label="phone" type="text" />
            </div>
            <div class="text-center">
              <mdb-btn @click.native.prevent="save">Save</mdb-btn>
              <mdb-btn @click.native.prevent="cancel">Cancel</mdb-btn>
            </div>
          </form>
          <p v-if="updateError">
            {{ updateError }}
          </p>
        </mdb-col>
        <mdb-col col="4"></mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbInput,
  mdbBtn
} from "mdbvue";
import { mapState } from "vuex";
import router from "../router";

export default {
  name: "profileEdit",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbInput
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
  computed: {
    ...mapState(["updateError"])
  },
  methods: {
    save() {
      console.log("user: ", this.user);
      this.$store.dispatch("updateProfile", {
        profile: this.user,
        callback: () => {
          router.push("/profile");
        }
      });
    },
    cancel() {
      router.push("/profile");
    }
  }
};
</script>
