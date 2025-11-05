import { v4 as uuidv4 } from "uuid";

const roles = [
  { roleId: "R1", roleType: "Receptionist", shiftType: "morning" },
  { roleId: "R2", roleType: "Receptionist", shiftType: "evening" },
];

const employees = [{ employeeId: "E1", name: "Jacob", email: "jb@gmail.com", roles: [] }];

const products = [{ productId: "P1", name: "bottle of water", description: "500 ml." }];

const sales = [{ saleId: "S1", employees: [], products: [] }];

function getRandomRoles(num: number) {
  const shuffled = [...roles].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}
function getRandomEmployees(num: number) {
  const shuffled = [...employees].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}
function getRandomProducts(num: number) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

employees.forEach((e) => (e.roles = getRandomRoles(1)));
sales.forEach((s) => {
  s.employees = getRandomEmployees(1);
  s.products = getRandomProducts(1);
});

export const resolvers = {
  Query: {
    employees: () => employees,
    products: () => products,
    roles: () => roles,
    sales: () => sales,
  },
  Mutation: {
    /********************💻Register☺️✅********************* */
    addEmployee: (_: any, { name, email, roleIds }: { name: string; email: string; roleIds: string[] }) => {
      const employeeRoles = roleIds ? roles.filter((r) => roleIds.includes(r.roleId)) : [];
      const newEmployee = { employeeId: uuidv4(), name, email, roles: employeeRoles };
      employees.push(newEmployee);
      return newEmployee;
    },
    addRole: (_: any, { roleType, shiftType }: { roleType: string; shiftType: string }) => {
      const newRole = { roleId: uuidv4(), roleType, shiftType };
      roles.push(newRole);
      return newRole;
    },
    addProduct: (_: any, { name, description }: { name: string; description: string }) => {
      const newProduct = { productId: uuidv4(), name, description };
      products.push(newProduct);
      return newProduct;
    },
    addSale: (_: any, { employeeIds, productIds }: { employeeIds: string[]; productIds: string[] }) => {
      const saleEmployees = employeeIds ? employees.filter((e) => employeeIds.includes(e.employeeId)) : [];
      const saleProducts = productIds ? products.filter((p) => productIds.includes(p.productId)) : [];
      const newSale = { saleId: uuidv4(), employees: saleEmployees, products: saleProducts };
      sales.push(newSale);
      return newSale;
    },
    /********************💻Update✨🫡********************** */
    updateEmployee: (
      _: any,
      { employeeId, name, email, roleIds }: { employeeId: string; name?: string; email?: string; roleIds?: string[] }
    ) => {
      const employee = employees.find((e) => e.employeeId === employeeId);
      if (!employee) return null;

      if (name) employee.name = name;
      if (email) employee.email = email;

      if (roleIds) {
        const employeeRoles = roles.filter((r) => roleIds.includes(r.roleId));
        employee.roles = employeeRoles;
      }

      return employee;
    },
    updateRole: (_: any, { roleId, roleType, shiftType }: { roleId: string; roleType: string; shiftType: string }) => {
      const role = roles.find((e) => e.roleId === roleId);
      if (!role) return null;

      if (roleType) role.roleType = roleType;
      if (shiftType) role.shiftType = shiftType;

      return role;
    },
    updateProduct: (
      _: any,
      { productId, name, description }: { productId: string; name?: string; description?: string }
    ) => {
      const product = products.find((e) => e.productId === productId);
      if (!product) return null;

      if (name) product.name = name;
      if (description) product.description = description;

      return product;
    },
    updateSale: (
      _: any,
      { saleId, employeeIds, productIds }: { saleId: string; employeeIds?: string[]; productIds?: string[] }
    ) => {
      const sale = sales.find((s) => s.saleId === saleId);
      if (!sale) return null;

      // Actualizar empleados asociados
      if (employeeIds) {
        const saleEmployees = employees.filter((e) => employeeIds.includes(e.employeeId));
        sale.employees = saleEmployees;
      }

      // Actualizar productos asociados
      if (productIds) {
        const saleProducts = products.filter((p) => productIds.includes(p.productId));
        sale.products = saleProducts;
      }

      return sale;
    },

    /********************💻Delete☹️⛔********************** */
    deleteEmployee: (_: any, { employeeId }: { employeeId: string }) => {
      const index = employees.findIndex((e) => e.employeeId === employeeId);
      if (index === -1) return false;

      employees.splice(index, 1);
      return { succes: true, message: `Deleted Employee: ${employeeId}` };
    },
    deleteRole: (_: any, { roleId }: { roleId: string }) => {
      const index = roles.findIndex((e) => e.roleId === roleId);
      if (index === -1) return false;

      roles.splice(index, 1);
      return { succes: true, message: `Deleted Role: ${roleId}` };
    },
    deleteProduct: (_: any, { productId }: { productId: string }) => {
      const index = products.findIndex((e) => e.productId === productId);
      if (index === -1) return false;

      products.splice(index, 1);
      return { succes: true, message: `Deleted Product: ${productId}` };
    },
    deleteSale: (_: any, { saleId }: { saleId: string }) => {
      const index = sales.findIndex((e) => e.saleId === saleId);
      if (index === -1) return { succes: false, message: `Can not deleted Sale: ${saleId}` };

      sales.splice(index, 1);
      return { succes: true, message: `Deleted Sale: ${saleId}` };
    },
  },
};
