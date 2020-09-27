const CommonReport = () => import('@/components/Common/CommonReport')
const CompoundReport = () => import('@/components/Common/CommonReport/compoundReport')

const commonReportRoutersList = [
  {
    path: '/report/:id',
    name: '通用报表',
    meta: {
      title: '通用报表',
      scrollToTop: true,
      breadcrumbList: [
        {name: '首页', path: '/'},
        {name: '通用报表', path: ''}
      ]
    },
    component: CommonReport
  },
  {
    path: '/preview/:id',
    name: '通用报表预览',
    meta: {
      title: '通用报表预览',
      scrollToTop: true,
      cantCheck: true,
      breadcrumbList: [
        {name: '首页', path: '/'},
        {name: '通用报表预览', path: ''}
      ]
    },
    component: CommonReport
  },
  {
    path: '/mixReport/:pid',
    name: '复合报表',
    meta: {
      title: '复合报表',
      scrollToTop: true,
      breadcrumbList: [
        {name: '会员报表', path: '/'},
        {name: '复合报表', path: ''}
      ]
    },
    component: CompoundReport
  },
  {
    path: '/mixReport/:pid/:id',
    name: '复合报表',
    meta: {
      title: '复合报表',
      scrollToTop: true,
      breadcrumbList: [
        {name: '首页', path: '/'},
        {name: '复合报表', path: ''}
      ]
    },
    component: CompoundReport
  },
  {
    path: '/previewMix/:pid',
    name: '复合报表',
    meta: {
      title: '复合报表',
      scrollToTop: true,
      cantCheck: true,
      breadcrumbList: [
        {name: '会员报表', path: '/'},
        {name: '复合报表', path: ''}
      ]
    },
    component: CompoundReport
  },
  {
    path: '/previewMix/:pid/:id',
    name: '复合报表',
    meta: {
      title: '复合报表',
      scrollToTop: true,
      cantCheck: true,
      breadcrumbList: [
        {name: '会员报表', path: '/'},
        {name: '复合报表', path: ''}
      ]
    },
    component: CompoundReport
  }
]

export default {
  commonReportRoutersList
}

