export const typeDefs = `#graphql
  type Employee {
    employeeId: String
    name: String
    email: String
    roles: [Role]
  }

  type Role {
    roleId: String
    roleType: String
    shiftType: String
  }

  type Product {
    productId: String
    name: String
    description: String
  }

  type Sale {
    saleId: String
    employees: [Employee]
    products: [Product]
  }

  type Query {
    employees: [Employee]
    roles: [Role]
    products: [Product]
    sales: [Sale]
  }
  type ResponseMessage{
    succes:Boolean!
    message:String!
  }

  type Mutation {
    #Register✅
    addEmployee(name: String!, email: String!, roleIds: [String!]): Employee
    addRole(roleType: String!, shiftType: String!): Role
    addProduct(name: String!, description: String!): Product
    addSale(employeeIds: [String!], productIds: [String!]): Sale
    #Update💻
    updateEmployee(employeeId:String!, name:String, email:String, roleIds:[String!]):Employee
    updateRole(roleId:String!, roleType:String, shiftType:String):Role
    updateProduct(productId:String!, name:String, description:String,):Product
    updateSale(saleId:String!,employeeIds:[String!],productIds:[String!]):Sale
    #Delete⛔
    deleteEmployee(employeeId:String!):ResponseMessage
    deleteRole(roleId:String!):ResponseMessage
    deleteProduct(productId:String!):ResponseMessage
    deleteSale(saleId:String!):ResponseMessage
  }
`;
