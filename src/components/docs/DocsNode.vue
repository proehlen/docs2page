<template>
  <docs-emphasis v-if="node.type === 'emphasis'" :node="node"/>
  <docs-inline-code v-else-if="node.type === 'inlineCode'" :node="node"/>
  <docs-link v-else-if="node.type === 'link'" :node="node"/>
  <docs-list v-else-if="node.type === 'list'" :node="node"/>
  <docs-list-item v-else-if="node.type === 'listItem'" :node="node"/>
  <docs-paragraph v-else-if="node.type === 'paragraph'" :node="node"/>
  <docs-text v-else-if="node.type === 'text'" :node="node"/>
  <span v-else class="tag is-danger has-text-weight-bold">Error parsing '{{ node.type }}'</span>
</template>

<script>
import DocsEmphasis from './DocsEmphasis.vue';
import DocsInlineCode from './DocsInlineCode.vue';
import DocsLink from './DocsLink.vue';
import DocsList from './DocsList.vue';
import DocsListItem from './DocsListItem.vue';
import DocsParagraph from './DocsParagraph.vue';
import DocsText from './DocsText.vue';

export default {
  name: 'docs-node',
  props: {
    node: {
      required: true,
    },
  },
  components: {
    'docs-emphasis': DocsEmphasis,
    'docs-inline-code': DocsInlineCode,
    'docs-link': DocsLink,
    'docs-list': DocsList,
    'docs-list-item': DocsListItem,
    'docs-paragraph': DocsParagraph,
    'docs-text': DocsText,
  },
};
</script>

