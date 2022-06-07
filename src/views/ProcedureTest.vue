<template>
  <div :class='$style.root'>
    <div :class='$style.form'>
      <VForm
        class='mt-7'
        ref='form'
        lazy-validation
      >

        <v-select
          v-model='form.lessonId'
          :items="lessons"
          :rules='lessonIdRules'
          item-text="name"
          item-value="id"
          label="Предмет"
          required
        ></v-select>

        <v-select
          v-model='form.groupId'
          :items="groups"
          :rules='groupIdRules'
          item-text='speciality'
          item-value='id'
          label="Группа"
          required
        ></v-select>


        <VTextField
          v-model='form.hours'
          label="Кол-во часов"
          :rules='hoursRules'
          required
        />

        <VBtn
          depressed
          color='primary'
          class='mt-7'
          :disabled='!isValid'
          @click='onSubmit'
        >
          Создать
        </VBtn>

        <RouterLink tag='button' class='ml-5' :to="{ name: 'CapacitiesList' }">
          <VBtn
            depressed
            color='warning'
            class='mt-7'
          >
            Все нагрузки
          </VBtn>
        </RouterLink>
      </VForm>
    </div>
    <div class='mt-4' v-if='procedure.status'>
      <VAlert
        dense
        outlined
        dismissible
        :type="procedure.status || 'info'"
      >
        <strong>{{ procedure.result }}</strong>
      </VAlert>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Api from '@/store/capacities/api';

export default {
  data() {
    return {
      form: {
        lessonId: 0,
        groupId: 0,
        hours: 0,
      },
      procedure: {
        status: 0,
        result: '',
      },
      lessonIdRules: [v => !!v || 'Обязательное поле'],
      groupIdRules: [v => !!v || 'Обязательное поле'],
      hoursRules: [
        v => !!v || 'Обязательное поле',
        v => !!+v || 'Можно использовать только числа'
      ],
    }
  },
  computed: {
    isValid: function () {
      return (
        this.form.lessonId &&
        this.form.groupId &&
        this.form.hours
      )
    },
    ...mapGetters({
      'lessons': 'lessons/items',
      'groups': 'groups/items',
    })
  },
  methods: {
    onSubmit: async function () {
      const res = await Api.procedure({
        lessonId: this.form.lessonId,
        groupId: this.form.groupId,
        hours: this.form.hours,
      });
      const { status, result } = await res.json();

      this.procedure = {
        status,
        result,
      }
    },
  },
  created() {
    this.$store.dispatch('lessons/fetchItems');
    this.$store.dispatch('groups/fetchItems');
  }

}
</script>

<style lang='scss' module>
.root {
  .form {
    max-width: 390px;
  }
}
</style>
