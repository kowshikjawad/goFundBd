import prisma from "../../config/database";

export const createCategoryService = async (name: string) => {
  return await prisma.category.create({ data: { name } });
};

export const getCategoryService = async () => {
  return await prisma.category.findMany();
};

export const getCategoryByIdService = async (id: string) => {
  return await prisma.category.findUnique({ where: { category_id: id } });
};

export const updateCategoryService = async (id: string, name: string) => {
  return await prisma.category.update({
    where: { category_id: id },
    data: { name },
  });
};

export const deleteCategoryService = async (id: string) => {
  return await prisma.category.delete({ where: { category_id: id } });
};

const categoryService = {
  createCategoryService,
  getCategoryService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
};

export default categoryService;
