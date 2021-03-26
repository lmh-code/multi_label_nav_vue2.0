<style scoped lang="less">
  .tags-wrapper {
    padding-right: 36px;
    box-sizing: border-box;
    .tags-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      line-height: 38px;
      color: @colorSubBlack;
      .title-wrap {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        padding: 0 12px;
        position: relative;
      }
      .title-wrap::before {
        content: '';
        height: 8px;
        border-radius: 50%;
        margin-right: 6px;
        background-color: @colorMain;
      }
      &.active > .title-wrap::before {
        width: 8px;
      }
      span {
        display: flex;
      }
      span.close {
        width: 16px;
        height: 16px;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin-left: 5px;
      }
      span.close.bg {
        background-color: @colorGrey;
      }
    }
    .tags-item::before {
      content: "";
      height: 18px;
      width: 1px;
      background-color: @colorSplit;
      position: absolute;
      top: 10px;
      left: 0;
    }
    .tags-item.active {
      background-color: @colorWhite;
      color: @colorMain;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .tags-item:hover {
      background-color: @colorMainGrey;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .tags-item:first-child::before, .tags-item.active::before, .tags-item:hover::before {
      width: 0;
    }
    .tags-item.active+a::before, .tags-item:hover+a::before {
      width: 0;
    }

    .setting-wraper {
      width: 32px;
      position: absolute;
      right: 0;
      top: 2px;
      text-align: center;
      line-height: 32px;
      font-size: 16px;
      color: @colorMain;
      cursor: pointer;
      border-left: 1px solid #ececec;
      transform: rotate(90deg);
    }
    .setting-wraper:hover {
      background-color: #fafafa;
      border-radius: 50%;
    }
  }
</style>
<template>
  <scroll-pane ref="scrollPane" class="tags-wrapper">
    <draggable 
      v-model="visitedViews"
      @update="datadragEnd" 
      @start="datadragStart">
      <router-link
        v-for="(tag, index) in visitedViews" 
        :key="index" 
        ref="tag"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath, params: tag.params}"
        tag="a"
        class="tags-item"
        @mouseenter.native="currentIndex = index"
        @mouseleave.native="currentIndex = -1"
        @dblclick.native="handleCommand(3)"
        :class="isFixedRoute(tag) ? 'active' : null" >
        <div class="title-wrap" @click="goAddress(tag)">
          <span>{{ tag.title }}</span>
          <span 
            @mouseenter="closeBtnBg = true"
            @mouseleave="closeBtnBg = false"
            :class="closeBtnBg && currentIndex === index ? 'close bg' : 'close'"
            @click.prevent.stop="closeSelectedTag(tag, index)">
            <i class="el-icon-close"></i>
          </span>
        </div>
      </router-link>
    </draggable>
    <el-dropdown
      class="setting-wraper"
      @command="handleCommand">
      <i class="el-icon-more"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item 
        v-for="item in tagsOptionsList"
        :key="item.value" 
        :command="item.value">
          {{item.lable}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </scroll-pane>
</template>
<script>
  import Draggable from 'vuedraggable'
  import {mapState, mapGetters} from 'vuex'
  import ScrollPane from './ScrollPane'
  import {refreshPage} from '@/utils/route'
  import config from "@/utils/config"
  import {isBoomCreated} from '../../utils'
  export default {
    data() {
      return {
        currentIndex: -1,
        tagsOptionsList: [
          {
            lable: '刷新当前标签',
            value: 3
          },
          {
            lable: '关闭其他标签',
            value: 1
          },
          {
            lable: '关闭所有标签',
            value: 2
          }
        ],
        visitedViews: [],
        closeBtnBg: false
      }
    },
    components: { ScrollPane, Draggable },
    computed: {
      ...mapGetters('tagsView', {
        'menuTagsList': 'GET_VISIT_VIEWS'
      })
    },
    mounted() {
      this.addTag(this.$route)
      this.$nextTick(this.moveToCurrentTag)
      // 初始化visitedViews的值
      this.setVisitedViews(this.menuTagsList)
    },
    watch: {
      $route(to, from) {
        this.addTag(to)
        this.$nextTick(this.moveToCurrentTag)
        this.$loading.hide()
        // 路由发生变化设置visitedViews的值
        this.setVisitedViews(this.menuTagsList)
      },
      menuTagsList: {
        deep: true,
        handler: function(newVal, oldVal) {
          // menuTagsList发生变化设置visitedViews的值
          this.setVisitedViews(newVal)
        }
      }
    },
    methods: {
      isFixedRoute(tag) {
        if(tag.path.startsWith('/mixReport')) {
          let pathSplit = this.$route.path.split('/')
          return tag.path === `/${pathSplit[1]}/${pathSplit[2]}` ? true : false
        }else {
          return tag.path === this.$route.path ? true : false
        }
      },
      setVisitedViews(views) {
        this.visitedViews = views && views[config.clientId] && views[config.clientId].length ? views[config.clientId] : []
      },
      moveToCurrentTag() {
        const tags = this.$refs.tag || []
        this.$nextTick(() => {
          for(let tag of tags) {
            if(this.$route.path === tag.to.path) {
              this.$refs.scrollPane.moveToCurrentTag(tag)
            }
          }
        })
      },
      addTag(to) {
        if(isBoomCreated(to.path)) return
        // 非通用报表生成的页面主动添加tab标签
        if(to.meta && typeof(to.meta.keepAlive) === 'boolean' && to.meta.keepAlive === false) {
          to.meta && to.meta.title && this.$store.commit('tagsView/ADD_TAG_ONLY', to)
        }else {
          to.meta && to.meta.title && this.$store.dispatch('tagsView/ADD_TAG_AND_CACHE', to)
        }
      },
      closeSelectedTag(tag, index) {
        if(this.isFixedRoute(tag)) {
          if(this.visitedViews[index-1] && this.visitedViews[index-1].path) {
            this.$router.push({
              path: this.visitedViews[index-1].path,
              params: this.visitedViews[index-1].params,
              query: this.visitedViews[index-1].query
            })
          }else if(this.visitedViews[index+1] && this.visitedViews[index+1].path) {
            this.$router.push({
              path: this.visitedViews[index+1].path,
              params: this.visitedViews[index+1].params,
              query: this.visitedViews[index+1].query
            })
          }else {
            this.$router.push('/index')
          }
        }
        this.currentIndex = -1
        this.$store.dispatch('tagsView/DEL_TAG_AND_CACHE', tag)
      },
      handleCommand(command) {
        this.currentIndex = -1
        if(command === 1) {
          this.$store.dispatch('tagsView/DEL_OTHER_TAG_AND_CACHE', this.$route)
        }else if(command === 2) {
          this.$router.push('/index')
          this.$store.dispatch('tagsView/DEL_ALL_TAG_AND_CACHE')
        }else if(command === 3) {
          this.$store.commit('tagsView/DEL_CACHE_ONLY', this.$route)
          this.$nextTick(() => refreshPage(this.$route))
        }
      },
      datadragStart() {
        if(this.visitedViews.length === 0) return
      },
      datadragEnd() {
        this.$store.commit('tagsView/SET_VISITED_VIEWS', this.visitedViews)
      },
      goAddress(route) {
        // 通用报表生成的页面跳转调用生成tab方法
        if(!isBoomCreated(route.path)) return
        route.meta && route.meta.title && this.$store.dispatch('tagsView/ADD_TAG_AND_CACHE', route)
      }
    }
  }
</script>