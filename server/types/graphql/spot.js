const Spot = require('../../utils/models').spot
, _ = require('lodash')
, {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require('graphql')
, {
  resolver,
  attributeFields,
  defaultArgs,
  defaultListArgs,
  typeMapper
} = require('graphql-sequelize')
, Sequelize = require('sequelize')

const graphqlLocationTypeQuery = new GraphQLInputObjectType({
  name: `PointQueryType`,
  fields: {
    lat: { type: new GraphQLNonNull(GraphQLFloat) },
    lon: { type: new GraphQLNonNull(GraphQLFloat) },
    radius: { type: GraphQLFloat, defaultValue: 0 }
  }
})
, graphqlLocationType = new GraphQLObjectType({
  name: 'Point',
  description: 'A location point.',
  fields: {
    coordinates: { type: new GraphQLNonNull(
      new GraphQLList(GraphQLFloat)) },
    type: { type: GraphQLString }
  }
})

typeMapper.mapType((type) => {
   // map geometric points to object
   if (type instanceof Sequelize.GEOMETRY) {
     return graphqlLocationType
   }
   return false
})

const SpotType = new GraphQLObjectType({
  name: 'Spot',
  description: 'A spot.',
  fields: _.assign(attributeFields(Spot), {})
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: `SpotQueryType`,
    fields: {
      spot:{
        type: SpotType,
        args: _.assign(defaultArgs(Spot), {
          name: {
            type: GraphQLID,
            description: 'The name identifying the spot.'
          }
        }),
        resolve: resolver(Spot)
      },
      spotList: {
        type: new GraphQLList(SpotType),
        args: _.assign(defaultListArgs(), {
          location: {
            type: graphqlLocationTypeQuery,
            description: 'The lat/long and radius to search within.'
          }
        }),
        resolve: resolver(Spot, {
          before: (findOptions, args) => {
            const location = args.location
            if(location){
              findOptions.where = Sequelize.where(
                Sequelize.fn(
                  'Distance',
                  Sequelize.literal(
                    `Point(${location.lat}, ${location.lon})`
                  ),
                  Sequelize.col('location')
                ),
                '<',
                location.radius
              )
            }
            return findOptions
          }
        })
      }
    }
  })
})

module.exports = schema
