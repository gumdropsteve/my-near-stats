<template>
  <div class="flow-root">
    <ul v-if="isLoading" class="-mb-8">
      <li v-for="i in 3" :key="i">
        <div class="relative pb-8">
          <span
            v-if="i < 2"
            class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
          <TransactionAction
            :account="''"
            :transaction="{}"
            :isLoading="true"
          />
        </div>
      </li>
    </ul>
    <ul v-else class="-mb-8">
      <li
        v-for="(transaction, i) in transactions"
        :key="
          transaction.transaction_hash + '-' + transaction.index_in_transaction
        "
      >
        <div class="relative pb-8">
          <span
            v-if="i !== transactions.length - 1"
            class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
          <TransactionAction :account="account" :transaction="transaction" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { UnifiedTransactionAction } from '@/services/near/types';
import { nearContext } from '@/utils/near';
import { defineComponent } from 'vue';
import TransactionAction from './TransactionAction.vue';

export default defineComponent({
  components: {
    TransactionAction,
  },
  props: {
    transactions: {
      type: Array as () => UnifiedTransactionAction[],
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { account } = nearContext();

    return {
      account,
    };
  },
});
</script>
