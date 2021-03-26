const MyMap = [
  {
    path: '/mymap',
    name: 'mymap',
    meta: {
      title: 'map',
      scrollToTop: true,
      breadcrumbList: [
        {name: '购销', path: ''},
      ]
    },
    component: () => import('@/module/views/Map/MyMap')
  }
]

export default MyMap;
