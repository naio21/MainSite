<template>
  <div id="app">
    <nav>
      <div class="nav-container">
        <router-link to="/" class="logo-link">
          <img src="../../src/assets/logo.png" alt="Company Logo" class="logo">
        </router-link>
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/auth">Watch SR</router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
