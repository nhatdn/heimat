<template>
  <div class="navbar-dropdown" >
    <h6 class="navbar-dropdown-title">Notifications</h6>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item">
      <div class="preview-thumbnail">
        <div class="preview-icon">
          <icon name="calendar" class="icon"></icon>
        </div>
      </div>
      <div class="preview-item-content">
        <p class="preview-subject">Event today</p>
        <p class="preview-subject-description">
          Just a reminder that you have an event today
        </p>
      </div>
    </a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item">
      <div class="preview-thumbnail">
        <div class="preview-icon">
          <icon name="hammer" class="icon"></icon>
        </div>
      </div>
      <div class="preview-item-content">
        <p class="preview-subject">Settings</p>
        <p class="preview-subject-description">Update dashboard</p>
      </div>
    </a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item preview-item">
      <div class="preview-thumbnail">
        <div class="preview-icon">
          <icon name="link" class="icon"></icon>
        </div>
      </div>
      <div class="preview-item-content">
        <p class="preview-subject">Launch Admin</p>
        <p class="preview-subject-description">New admin wow!</p>
      </div>
    </a>
    <div class="dropdown-divider"></div>
    <p class="dropdown-navigating">See all notifications</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../Header";
</style>

