<template>
  <div class="content">
    <div class="content-wrapper">
      <div class="content-header">
        <h3 class="content-title">Manage Reports</h3>
      </div>
      <div class="content-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Reports Table</h4>
            <p class="card-description">Total: <span>3</span> reports</p>
            <div class="card-table">
              <table class="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Reporter</th>
                    <th>Content</th>
                    <th>Blog</th>
                    <th>Created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>53275531</td>
                    <td>Jacob@gmail.com</td>
                    <td>This is bullshift</td>
                    <td>How I plan to kill my husband</td>
                    <td>12 May 2017</td>
                    <td>
                      <icon class="icon" name="square" title="Mark as solved"></icon>
                      <icon class="icon icon-delete" name="trash"></icon>
                    </td>
                  </tr>
                  <tr>
                    <td>53275531</td>
                    <td>Jacob@gmail.com</td>
                    <td>This is bullshift</td>
                    <td>How I plan to kill my husband</td>
                    <td>12 May 2017</td>
                    <td>
                      <icon class="icon icon-success" name="check" title="Solved"></icon>
                      <icon class="icon icon-delete" name="trash"></icon>
                    </td>
                  </tr>
                  <tr>
                    <td>53275531</td>
                    <td>Jacob@gmail.com</td>
                    <td>This is bullshift</td>
                    <td>How I plan to kill my husband</td>
                    <td>12 May 2017</td>
                    <td>
                      <icon class="icon" name="square" title="Mark as solved"></icon>
                      <icon class="icon icon-delete" name="trash"></icon>
                    </td>
                  </tr>
                  <tr>
                    <td>53275531</td>
                    <td>Jacob@gmail.com</td>
                    <td>This is bullshift</td>
                    <td>How I plan to kill my husband</td>
                    <td>12 May 2017</td>
                    <td>
                      <icon class="icon" name="square" title="Mark as solved"></icon>
                      <icon class="icon icon-delete" name="trash"></icon>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reports',
};
</script>

<style lang="scss" scoped>
@import 'admin';
</style>
