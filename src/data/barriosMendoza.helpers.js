import barriosMendoza from './barriosMendoza';

export const getBarrioById = (neighborhoodId) => {
  for (const department in barriosMendoza) {
    const found = barriosMendoza[department].find(
      (b) => b.id === neighborhoodId
    );
    if (found) return found;
  }
  return null;
};

export const getBarriosByDepartment = (departmentId) => {
  return barriosMendoza[departmentId] || [];
};