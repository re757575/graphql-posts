const graphql = require('graphql');
const Post = require('../models/post');
const User = require('../models/User');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// 自訂型別
const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'A Post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    context: { type: GraphQLString },
    userId: { type: GraphQLID },
    user: {
      type: UserType,
      resolve(parent, args) {
        const { userId } = parent;
        return User.findById(userId);
      },
    },
  }),
});

// 自訂型別
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({ userId: parent.id });
      },
    },
  }),
});

// 查詢
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'RootQuery',
  fields: {
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const { id } = args;
        return Post.findById(id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      args: {},
      resolve(parent, args) {
        return Post.find({});
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const { id } = args;
        return User.findById(id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      args: {},
      resolve(parent, args) {
        return User.find({});
      },
    },
  },
});

// 新增修改刪除
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation',
  fields: {
    // 新增 post
    addPost: {
      type: PostType,
      description: '新增 post',
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
        },
        context: {
          type: new GraphQLNonNull(GraphQLString),
        },
        userId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        const post = new Post({
          title: args.title,
          context: args.context,
          name: args.name,
          userId: args.userId,
        });
        return post.save();
      },
    },
    // 新增
    addUser: {
      type: UserType,
      description: '新增 user',
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        const user = new User({
          name: args.name,
        });
        return user.save();
      },
    },
  },
});

// 建立 schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
