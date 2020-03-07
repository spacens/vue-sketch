<template>
  <div class="mt-5 p-5">
    <mdb-container fluid grid-list-xl>
      <mdb-row>
        <mdb-col col="4"></mdb-col>
        <mdb-col col="4">
          <form>
            <p class="h4 text-center mb-4">Signup</p>
            <div class="grey-text">
              <mdb-input
                v-model="fullname"
                label="Full name"
                icon="user"
                type="text"
              />
              <mdb-input
                v-model="email"
                label="Your email"
                icon="envelope"
                type="email"
              />
              <mdb-input
                v-model="password"
                label="Password"
                icon="lock"
                type="password"
              />
              <mdb-input
                v-model="pwdConfirm"
                label="Confirm password"
                icon="lock"
                type="password"
              />
            </div>
            <div class="text-center">
              <mdb-btn @click.native.prevent="signup">Signup</mdb-btn>
            </div>
          </form>
          <p v-if="signupError !== ''">
            {{ signupError }}
          </p>
        </mdb-col>
        <mdb-col col="4"></mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbInput, mdbBtn } from "mdbvue";
import { mapState } from "vuex";

export default {
  name: "signup",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbInput
  },
  data() {
    return {
      fullname: "",
      email: "",
      password: "",
      pwdConfirm: "",
    };
  },
  computed: {
    ...mapState(["signupError"])
  },
  methods: {
    signup() {
      this.$store.dispatch("signup", {
        name: this.fullname,
        email: this.email,
        password1: this.password,
        password2: this.pwdConfirm,
      });
    }
  }
};
</script>
