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
          v-model='form.surname'
          :rules='surnameRules'
          label='Фамилиия'
          required
        />

        <VTextField
          v-model='form.name'
          :rules='nameRules'
          label='Имя'
          required
        />

        <VTextField
          v-model='form.patronymic'
          :rules='patronymicRules'
          label='Отчество'
          required
        />

        <VTextField
          v-model='form.rate'
          :rules='rateRules'
          label='Ставка'
          required
        />

        <VTextField
          v-model='form.totalHours'
          :rules='totalHoursRules'
          label='Общее кол-во часов'
          required
        />

        <v-select
          v-model='form.postId'
          :items="postsId"
          label="id должности"
          required
        ></v-select>

        <v-select
          v-model='form.degreeId'
          :items="degreesId"
          label="id ученой степени"
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
            Все преподаватели
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
        surname: '',
        name: '',
        patronymic: '',
        rate: '',
        totalHours: '',
        postId: '',
        degreeId: '',
      },

      nameRules: [v => !!v || 'Обязательное поле'],
      surnameRules: [v => !!v || 'Обязательное поле'],
      postIdRules: [v => !!v || 'Обязательное поле'],
      degreeIdRules: [v => !!v || 'Обязательное поле'],
      patronymicRules: [v => !!v || 'Обязательное поле'],
      totalHoursRules: [
        v => !!v || 'Обязательное поле',
        v => !!+v || 'Можно использовать только числа'
      ],
      rateRules: [
        v => !!v || 'Обязательное поле',
        v => !!+v || 'Можно использовать только числа'
      ],
    };
  },

  computed: {
    isValid: function() {
      return (
        this.form.name &&
        this.form.surname &&
        this.form.patronymic &&
        this.form.rate &&
        this.form.totalHours &&
        this.form.postId &&
        this.form.degreeId
      );
    },

    teacher: function() {
      return this.itemById[this.id];
    },

    ...mapGetters({
      'itemById': 'teachers/itemById',
      'degrees': 'degrees/items',
      'posts': 'posts/items',
    }),

    degreesId: function() {
      return map(this.degrees, ({ id }) => id)
    },

    postsId: function() {
      return map(this.posts, ({ id }) => id)
    }
  },
  watch: {
    teacher: function() {
      Object.keys(this.teacher).forEach(key => {
        this.form[key] = this.teacher[key];
      });
    }
  },
  methods: {
    onSubmit: function() {
      const teacher = {
        id: this.form.id,
        surname: this.form.surname,
        name: this.form.name,
        patronymic: this.form.patronymic,
        rate: this.form.rate,
        totalHours: this.form.totalHours,
        postId: this.form.postId,
        degreeId: this.form.degreeId,
      };
      this.id ?
        this.$store.dispatch('teachers/updateItem', teacher) :
        this.$store.dispatch('teachers/createItem', teacher);

      this.$router.push({ name: 'TeachersList' });
    }
  },

  created() {
    this.$store.dispatch('teachers/fetchItems');
    this.$store.dispatch('degrees/fetchItems');
    this.$store.dispatch('posts/fetchItems');
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
