<template>
 <div>
   <div class='mt-8'>
     <VTextarea
       outlined
       name="input-7-4"
       label="Консоль запросов"
       @keydown.enter='submit'
     ></VTextarea>
     <div class='mt-8'>
       <div v-if='info'>
         <VAlert
           dense
           outlined
           dismissible
           :type="info.status || 'info'"
         >
            <strong>{{ info.result.info || info.result }}</strong>
         </VAlert>
       </div>
       <div v-if='items.length'>
         <VDataTable
           :headers="headers"
           :items='items'
           :items-per-page='5'
         >
         </VDataTable>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import api from '@/api/index';
import { keys, map } from 'lodash';
export default {
  data() {
    return {
      items: [],
      headers: [],
      info: '',
    }
  },

  methods: {
    submit: async function ({ target }) {
      this.items = [];
      this.info = '';
      this.header = [];
      const Api = new api();
      const query = target.value;
      const req = await Api.query({ query });
      const res = await req.json();
      if (res.result instanceof Array) {
        this.headers = map(keys(res.result[0]), (value) => {
          return {
            text: value,
            value,
          }
        })
        this.items = res.result;

      } else {
        this.info = res;
      }
    }
  }

}
</script>

