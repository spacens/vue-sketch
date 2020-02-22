<template>
  <mdb-navbar
    position="top"
    color="orange"
    scrolling
    class="navbar-light lighten-5"
  >
    <mdb-navbar-brand href="" target="_blank">
      Sketch
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav center color="blue-grey">
        <mdb-nav-item :to="{ name: 'home' }" waves-fixed active class="active"
          >Home</mdb-nav-item
        >
        <mdb-nav-item :to="{ name: 'about' }" waves-fixed active class="active"
          >About</mdb-nav-item
        >
      </mdb-navbar-nav>
      <mdb-navbar-nav right color="blue-grey">
        <div v-if="!loggedIn" class="nav-items">
          <mdb-nav-item :to="{ name: 'login' }">
            Login
          </mdb-nav-item>
          <mdb-nav-item :to="{ name: 'signup' }">
            Signup
          </mdb-nav-item>
        </div>
        <div v-else>
          <a @click="logout">Logout</a>
        </div>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavItem,
  mdbNavbarNav,
  mdbNavbarToggler
} from "mdbvue";

export default {
  name: "Header",
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler
  },
  computed: {
    loggedIn: function() {
      return this.$store.getters.loggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
.nav-items {
  display: flex;
}

.nav-item {
  margin-right: 10px;
}
</style>
