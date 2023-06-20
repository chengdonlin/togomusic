<template>
  <div>
      <div>
        关注
      </div>
    <router-link to="/login/focus/singer"></router-link>
    <router-link to="/login/focus/user"></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'FocusComponent'
  }
</script>

<style scoped>

</style>
