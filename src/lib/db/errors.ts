export const isUniqueConstraintError = (e: any) => {
	return e.toString().includes('UNIQUE constraint failed');
};
