const CommonReport = () => import('@/components/Common/CommonReport')
const CompoundReport = () => import('@/components/Common/CommonReport/compoundReport')

const commonReportRoutersList = [
  // 普通报表
  {
    path: '/report/:id',
    name: 'reportId',
    meta: {
      title: '通用报表',
      scrollToTop: true,
      cantCheck: true,
      usePathKey: true,
      commonModule: '@/components/Common/CommonReport'
    },
    component: CommonReport
  },
  // 列表中点击按钮跳转使用[普通报表]
  {
    path: '/report/:id/b0bf68a/report',
    name: 'reportIdB0bf68aReport',
    meta: {
      title: '通用报表详情',
      scrollToTop: true,
      keepAlive: false,
      cantCheck: true,
      commonModule: '@/components/Common/CommonReport'
    },
    component: CommonReport
  },
  {
    path: '/preview/:id',
    meta: {
      title: '通用报表预览',
      scrollToTop: true,
      cantCheck: true,
      keepAlive: false
    },
    component: CommonReport
  },
  {
    path: '/preview/:id/:version',
    meta: {
      title: '通用报表预览',
      scrollToTop: true,
      cantCheck: true,
      keepAlive: false
    },
    component: CommonReport
  },

  // 复合报表
  {
    path: '/mixReport/:pid',
    name: 'mixReportPid',
    meta: {
      title: '复合报表',
      scrollToTop: true,
      cantCheck: true,
      usePathKey: true,
      commonModule: '@/components/Common/CommonReport/compoundReport'
    },
    component: CompoundReport
  },
  // 列表中点击按钮跳转使用[复合报表]
  {
    path: '/mixReport/:pid/b0bf68a/mix/report',
    name: 'mixReportPidB0bf68aMixReport',
    meta: {
      title: '复合报表详情',
      scrollToTop: true,
      keepAlive: false,
      cantCheck: true,
      commonModule: '@/components/Common/CommonReport/compoundReport'
    },
    component: CompoundReport
  },
  {
    path: '/mixReport/:pid/:id',
    name: 'mixReportPidId',
    meta: {
      title: '复合报表',
      scrollToTop: true,
      usePathKey: true,
      cantCheck: true,
      commonModule: '@/components/Common/CommonReport/compoundReport'
    },
    component: CompoundReport
  },
  // 列表中点击按钮跳转使用[复合报表]
  {
    path: '/mixReport/:pid/:id/b0bf68a/mix/report',
    name: 'mixReportPidIdB0bf68aMixReport',
    meta: {
      title: '复合报表详情',
      scrollToTop: true,
      usePathKey: true,
      cantCheck: true,
      keepAlive: false,
      commonModule: '@/components/Common/CommonReport/compoundReport'
    },
    component: CompoundReport
  },
  {
    path: '/previewMix/:pid',
    meta: {
      title: '复合报表',
      scrollToTop: true,
      cantCheck: true,
      keepAlive: false
    },
    component: CompoundReport
  },
  {
    path: '/previewMix/:pid/:id',
    meta: {
      title: '复合报表',
      scrollToTop: true,
      cantCheck: true,
      keepAlive: false
    },
    component: CompoundReport
  }
]

export default {
  commonReportRoutersList
}

