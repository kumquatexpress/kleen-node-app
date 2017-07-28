'use strict'

module.exports = [
  {
    name: 'index',
    path: '/spots',
    controller: 'api/spots',
    methods: ['get'],
    action: 'index'
  },
  {
    name: 'create',
    path: '/spots/create',
    controller: 'api/spots',
    methods: ['post'],
    action: 'create',
    body: ['name', 'latitude', 'longitude']
  }
]