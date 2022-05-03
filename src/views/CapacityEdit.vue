<template>
  <div :class='$style.root'>
    <h1 class='h1 text-center '>
      {{ id ? 'Редактирование записи' : 'Создание записи' }}
    </h1>
    <div :class='$style.form'>
      <VForm
        class='mt-7'
        ref='form'
        lazy-validation
      >

        <VTextField
          v-model='form.hours'
          :rules='hoursRules'
          label='Кол-во часов'
          required
        />

        <v-select
          v-model='form.lessonId'
          :items="lessonsId"
          label="id предмета"
          required
        ></v-select>

        <v-select
          v-model='form.teacherId'
          :items="teachersId"
          label="id преподавателя"
          required
        ></v-select>

        <v-select
          v-model='form.groupId'
          :items="groupsId"
          label="id группы"
          required
        ></v-select>

        <VBtn
          depressed
          color='primary'
          class='mt-7'
          :disabled='!isValid'
          @click='onSubmit'
        >
          Сохранить
        </VBtn>

        <RouterLink tag='button' class='ml-5' :to="{ name: 'TeachersList' }">
          <VBtn
            depressed
            color='warning'
            class='mt-7'
          >
            Все группы
          </VBtn>
        </RouterLink>
      </VForm>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { map } from 'lodash';

export default {
  props: {
    id: { type: String }
  },

  data() {
    return {
      form: {
        id: '',
        hours: '',
        lessonId: '',
        teacherId: '',
        groupId: '',
      },

      postIdRules: [v => !!v || 'Обязательное поле'],
      degreeIdRules: [v => !!v || 'Обязательное поле'],
      patronymicRules: [v => !!v || 'Обязательное поле'],
      hoursRules: [
        v => !!v || 'Обязательное поле',
        v => !!+v || 'Можно использовать только числа'
      ],
    };
  },

  computed: {
    isValid: function() {
      return (
        this.form.hours &&
        this.form.lessonId &&
        this.form.teacherId &&
        this.form.groupId);
    },

    capacity: function() {
      return this.itemById[this.id];
    },

    ...mapGetters({
      'itemById': 'teachers/itemById',
      'lessons': 'lessons/items',
      'teachers': 'teachers/items',
      'groups': 'groups/items',
    }),

    lessonsId: function() {
      return map(this.lessons, ({ id }) => id)
    },

    teachersId: function() {
      return map(this.teachers, ({ id }) => id)
    },

    groupsId: function() {
      return map(this.groups, ({ id }) => id)
    }
  },
  watch: {
    capacity: function() {
      Object.keys(this.capacity).forEach(key => {
        this.form[key] = this.capacity[key];
      });
    }
  },
  methods: {
    onSubmit: function() {
      const capacity = {
        id: this.form.id,
        hours: this.form.hours,
        lessonId: this.form.lessonId,
        teacherId: this.form.teacherId,
        groupId: this.form.groupId,
      };
      this.id ?
        this.$store.dispatch('capacities/updateItem', capacity) :
        this.$store.dispatch('capacities/createItem', capacity);

      this.$router.push({ name: 'CapacitiesList' });
    }
  },

  created() {
    this.$store.dispatch('teachers/fetchItems');
    this.$store.dispatch('lessons/fetchItems');
    this.$store.dispatch('groups/fetchItems');
  }
};
</script>

<style module lang='scss'>
.root {
  .form {
    max-width: 390px;
  }
}
</style>
