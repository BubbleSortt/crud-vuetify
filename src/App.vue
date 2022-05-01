<template>
  <v-app>
    <v-main>
      <div class='px-16 pt-6'>
        <div class='d-flex mx-n2 mb-4'>
          <div class='px-2'>
            <RouterLink tag='a' class='btn' :to="{ name: 'GroupsList' }">Группы</RouterLink>
          </div>
          <div class='px-2'>
            <RouterLink tag='a' class='btn' :to="{ name: 'PostsList' }">Должности</RouterLink>
          </div>
          <div class='px-2'>
            <RouterLink tag='a' class='btn' :to="{ name: 'LessonsList' }">Предметы</RouterLink>
          </div>
          <div class='px-2'>
            <RouterLink tag='a' class='btn' :to="{ name: 'DegreesList' }">Ученые степени</RouterLink>
          </div>
          <div class='px-2'>
            <RouterLink tag='a' class='btn' :to="{ name: 'CouplesList' }">Проведенные пары</RouterLink>
          </div>
          <div class='px-2'>
            <RouterLink tag='a' class='btn' :to="{ name: 'TeachersList' }">Преподаватели</RouterLink>
          </div>
        </div>
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>

.v-application .btn {
  text-decoration: none;
  color: black;
  border-radius: 4px;
  padding: 5px 10px;
  transition: 0.2s ease-in-out all;
}

.v-application .btn:hover {
  background-color: #9FA8DA;
  color: white;
}

.v-application .btn.router-link-active {
  background-color: #9FA8DA;
  color: white;
}
</style>
