'use strict'
const _ = require('lodash')

const spotsIndexArgs = {
  query: {
    latitude: {
      type: 'number'
    },
    longitude: {
      type: 'number'
    },
    radius: {
      type: 'number'
    },
    address: {
      type: 'string'
    }
  }
}

const spotsCreateAndUpdateArgs = {
  body: {
    description: {
      type: 'string'
    },
    latitude: {
      type: 'number',
      required: true
    },
    longitude: {
      type: 'number',
      required: true
    },
    upsert: {
      type: 'boolean'
    }
  }
}

module.exports = [
  {
    name: 'index',
    path: '/spots',
    controller: 'api/spots',
    methods: ['get'],
    action: 'index',
    args: spotsIndexArgs
  },
  {
    name: 'create',
    path: '/spots',
    controller: 'api/spots',
    methods: ['post'],
    action: 'create',
    args: spotsCreateAndUpdateArgs
  },
  {
    name: 'update',
    path: '/spots/:spot_name',
    controller: 'api/spots',
    methods: ['put'],
    action: 'update',
    args: _.merge({}, spotsCreateAndUpdateArgs, {
      params: {
        spot_name: {
          required: true,
          type: 'number'
        }
      }
    })
  },
  {
    name: 'delete',
    path: '/spots/:spot_name',
    controller: 'api/spots',
    methods: ['delete'],
    action: 'delete',
    args: {
      params: {
        spot_name: {
          required: true,
          type: 'number'
        }
      }
    }
  }
]
