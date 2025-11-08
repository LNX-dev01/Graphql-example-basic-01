import { EmployeeModel } from "../models/employee.schema";
import { RoleModel } from "../models/role.schema";
import { ProductModel } from "../models/product.schema";
import { SaleModel } from "../models/sale.schema";

export const resolvers = {
  Query: {
    employees: () => EmployeeModel.find().populate("roles, roleType").lean().exec(),
    roles: () => RoleModel.find().lean().exec(),
    products: () => ProductModel.find().exec(),
    sales: () =>
      SaleModel.find()
        .populate({
          path: "employees",
          populate: { path: "roles" }, // <- populate anidado
        })
        .populate("products")
        .lean()
        .exec(),
  },

  Role: {
    roleId: (root: any) => root._id.toString(), //any must be a entityDocument
  },
  Employee: {
    employeeId: (root: any) => root._id.toString(),
  },
  Product: {
    productId: (root: any) => root._id.toString(),
  },
  Sale: {
    saleId: (root: any) => root._id.toString(),
  },

  Mutation: {
    /********************💻Register☺️✅********************* */
    addEmployee: async (_: any, { name, email, roleIds }: { name: string; email: string; roleIds: string[] }) => {
      const newEmployee = await EmployeeModel.create({ name, email, roles: roleIds });
      return newEmployee.populate("roles");
    },

    addRole: async (_: any, { roleType, shiftType }: { roleType: string; shiftType: string }) => {
      const role = await RoleModel.create({ roleType, shiftType });
      return {
        roleId: role._id.toString(),
        roleType: role.roleType,
        shiftType: role.shiftType,
      };
    },

    addProduct: async (_: any, { name, description }: { name: string; description: string }) => {
      return ProductModel.create({ name, description });
    },

    addSale: async (_: any, { employeeIds, productIds }: { employeeIds: string[]; productIds: string[] }) => {
      const newSale = await SaleModel.create({
        employees: employeeIds,
        products: productIds,
      });
      return newSale.populate("employees products");
    },

    /********************💻Update✨🫡********************** */
    updateEmployee: async (_: any, { employeeId, name, email, roleIds }) => {
      const employee = await EmployeeModel.findById(employeeId);
      if (!employee) return null;

      if (name) employee.name = name;
      if (email) employee.email = email;
      if (roleIds) employee.roles = roleIds;

      await employee.save();
      return employee.populate("roles");
    },

    updateRole: async (_: any, { roleId, roleType, shiftType }) => {
      return RoleModel.findByIdAndUpdate(roleId, { roleType, shiftType }, { new: true });
    },

    updateProduct: async (_: any, { productId, name, description }) => {
      return ProductModel.findByIdAndUpdate(productId, { name, description }, { new: true });
    },

    updateSale: async (_: any, { saleId, employeeIds, productIds }) => {
      return SaleModel.findByIdAndUpdate(
        saleId,
        { employees: employeeIds, products: productIds },
        { new: true }
      ).populate("employees products");
    },

    /********************💻Delete☹️⛔********************** */
    deleteEmployee: async (_: any, { employeeId }) => {
      await EmployeeModel.findByIdAndDelete(employeeId);
      return { success: true, message: `Deleted Employee: ${employeeId}` };
    },

    deleteRole: async (_: any, { roleId }) => {
      await RoleModel.findByIdAndDelete(roleId);
      return { success: true, message: `Deleted Role: ${roleId}` };
    },

    deleteProduct: async (_: any, { productId }) => {
      await ProductModel.findByIdAndDelete(productId);
      return { success: true, message: `Deleted Product: ${productId}` };
    },

    deleteSale: async (_: any, { saleId }) => {
      await SaleModel.findByIdAndDelete(saleId);
      return { success: true, message: `Deleted Sale: ${saleId}` };
    },
  },
};
