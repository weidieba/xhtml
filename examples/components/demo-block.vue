<template>
  <div
    class="demo-block"
    :class="[blockClass, { 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <div class="description">
        <slot></slot>
    </div>
    <div class="demo-container">
        <slot name="source"></slot>
        <div class="meta">
            <slot name="highlight"></slot>
        </div>
    </div>
    <div class="demo-block-control" @click="isExpanded = !isExpanded">
        <transition name="text-slide">
            <span>{{ controlText }}</span>
        </transition>
    </div>
  </div>
</template>

<style>
  .demo-block {
    transition: .3s;
    code {
        font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }

    .demo-button {
        float: right;
    }

    .source {
        padding: 24px;
    }

    .demo-container {
        border: solid 1px #eaeefb;
        border-radius: 4px;
        border-bottom-width: 0;
        &.hover {
            box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
        }
    }

    .meta {
      background-color: #f9fafc;
      border-top: solid 1px #eaeefb;
      clear: both;
      overflow: hidden;
      height: 0;
      transition: height .3s;
    }

    .description {
      font-size: 14px;
      line-height: 1.8;
      color: #497089;
      word-break: break-word;

      p {
        margin: 0 0 12px;
      }

      code {
        color: #497089;
        background-color: #e6effb;
        margin: 0 4px;
        transform: translateY(-2px);
        display: inline-block;
        padding: 1px 5px;
        font-size: 12px;
        border-radius: 3px;
      }
    }

    .highlight {
      pre {
        margin: 0;
      }

      code.hljs {
        margin: 0;
        border: none;
        max-height: none;
        border-radius: 0;
        .hljs-name {
            color: #e06c75;
        }
        .hljs-attr {
            color: #d19a66;
        }
        .hljs-string {
            color: #98c379;
        }
        &::before {
          content: none;
        }
      }
    }

    .demo-block-control {
      border: solid 1px #eaeefb;
      height: 36px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      text-align: center;
      margin-top: -1px;
      color: #d3dce6;
      cursor: pointer;
      transition: .3s;
      position: relative;



      span { 
        font-size: 14px;
        line-height: 36px;
        display: inline-block;
      }

      &:hover {
        color: #20a0ff;
        background-color: #f9fafc;
      }

      & .text-slide-enter,
      & .text-slide-leave-active {
        opacity: 0;
        transform: translateX(10px);
      }
    }
  }
</style>

<script type="text/babel">
    import compoLang from '../i18n/component.json';
    export default {
        data() {
            return {
                hovering: false,
                isExpanded: false
            };
        },

        props: {
            jsfiddle: Object,
            default() {
                return {};
            }
        },

        methods: {
            goJsfiddle() {
                const {script, html, style} = this.jsfiddle;
                const resourcesTpl = '<scr' + 'ipt src="//unpkg.com/vue/dist/vue.js"></scr' + 'ipt>'
                + '\n<scr' + 'ipt src="//unpkg.com/element-ui/lib/index.js"></scr' + 'ipt>';
                let jsTpl = (script || '').replace(/export default/, 'var Main =').trim();
                let htmlTpl = `${resourcesTpl}\n<div id="app">\n${html.trim()}\n</div>`;
                let cssTpl = `@import url("//unpkg.com/element-ui/lib/theme-default/index.css");
                    \n${(style || '').trim()}\n`;
                jsTpl = jsTpl
                  ? jsTpl + '\nvar Ctor = Vue.extend(Main)\nnew Ctor().$mount(\'#app\')'
                  : 'new Vue().$mount(\'#app\')';
                const data = {
                    js: jsTpl,
                    css: cssTpl,
                    html: htmlTpl,
                    panel_js: 3,
                    panel_css: 1
                };
                const form = document.getElementById('fiddle-form') || document.createElement('form');
                form.innerHTML = '';
                const node = document.createElement('textarea');

                form.method = 'post';
                form.action = 'http://jsfiddle.net/api/post/library/pure/';
                form.target = '_blank';

                for (let name in data) {
                    if (data.hasOwnProperty(name)) {
                        node.name = name;
                        node.value = data[name].toString();
                        form.appendChild(node.cloneNode());
                    }
                }
                form.setAttribute('id', 'fiddle-form');
                form.style.display = 'none';
                document.body.appendChild(form);

                form.submit();
            }
        },

        computed: {
            lang() {
                return this.$route.path.split('/')[1];
            },

            langConfig() {
                return compoLang.filter(config => config.lang === this.lang)[0]['demo-block'];
            },

            blockClass() {
                return `demo-${ this.lang } demo-${ this.$router.currentRoute.path.split('/').pop() }`;
            },

            controlText() {
                return this.isExpanded ? this.langConfig['hide-text'] : this.langConfig['show-text'];
            },

            codeArea() {
                return this.$el.getElementsByClassName('meta')[0];
            },

            codeAreaHeight() {
                if (this.$el.getElementsByClassName('description').length > 0) {
                    return Math.max(this.$el.getElementsByClassName('description')[0].clientHeight,
                    this.$el.getElementsByClassName('highlight')[0].clientHeight);
                }
                return this.$el.getElementsByClassName('highlight')[0].clientHeight;
            }
        },

        watch: {
            isExpanded(val) {
                this.codeArea.style.height = val ? `${ this.codeAreaHeight + 1 }px` : '0';
            }
        },

        mounted() {
            this.$nextTick(() => {
                let highlight = this.$el.getElementsByClassName('highlight')[0];
                if (this.$el.getElementsByClassName('description').length === 0) {
                    highlight.style.width = '100%';
                    highlight.borderRight = 'none';
                }
            });
        }
    };
</script>
