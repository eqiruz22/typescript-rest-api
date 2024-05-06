import { DataTypes,Model,Optional } from "sequelize";
import connection from '../../config/connection'

interface UserAttribute {
    id?:number,
    name?:string | null,
    email?:string | null,
    roleId?:number | null,
    password?:string | null,
    accessToken?:string | null,
    verified?:boolean | null,
    active?:boolean | null,
    createdAt?:Date,
    updatedAt?:Date
  }
  
  export interface UserInput extends Optional<UserAttribute, 'id'>{}
  export interface UserOutput extends Required<UserAttribute>{}
  
  class User extends Model<UserAttribute,UserInput> implements UserAttribute {
    public id?:number
    public name!:string
    public email!:string
    public roleId!:number
    public password!:string
    public accessToken!:string
    public verified!:boolean
    public active!:boolean
    public readonly createdAt!:Date
    public readonly updatedAt!:Date
  }

  User.init({
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.BIGINT
    },
    name:{
        allowNull:false,
        type:DataTypes.STRING
    },
    email:{
        allowNull:false,
        unique:true,
        type:DataTypes.STRING
    },
    roleId:{
        allowNull:false,
        type:DataTypes.BIGINT
    },
    password:{
        allowNull:false,
        type:DataTypes.STRING
    },
    accessToken:{
        allowNull:true,
        type:DataTypes.STRING
    },
    verified:{
        allowNull:true,
        type:DataTypes.BOOLEAN
    },
    active:{
        allowNull:true,
        type:DataTypes.BOOLEAN
    }
  },{
    timestamps:true,
    sequelize:connection,
    underscored:false
  })
  
  export default User