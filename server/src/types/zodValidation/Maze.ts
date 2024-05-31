import {z} from "zod";

const bodyArrayValidator = (body: number[][], width: number, length: number) => {
    // Check if each subarray's length matches the width
    if (body.some(subarray => subarray.length !== width)) {
      return false;
    }
  
    // Check if body array length matches the length
    if (body.length !== length) {
      return false;
    }
  
    // Flatten the body array to a single array for easier counting
    const flatBody = body.flat();
  
    // Count occurrences of each number
    const counts: Record<number, number> = {};
    flatBody.forEach(num => {
      counts[num] = (counts[num] || 0) + 1;
    });
  
    // Validate the counts
    const requiredCounts:{[key:string]:{min:number, max?:number}} = {
      '-1': { min: 1 },  // At least one -1
      '1': { min: 0 },   // At least one 1
      '0': { min: 0 },   // At least one 0
      '1000': { min: 1, max: 1 },  // Exactly one 1000
      '10': { min: 1, max: 1 },    // Exactly one 10
      '11': { min: 1, max: 1 },    // Exactly one 11
    };
  
    // Check required counts
    for (const [num, { min, max }] of Object.entries(requiredCounts)) {
      const count = counts[Number(num)] || 0;
      if (count < min || (max !== undefined && count > max)) {
        return false;
      }
    }
  
    // Check for unique two-digit numbers
    const twoDigitNumbers = flatBody.filter(num => num >= 10 && num < 100);
    const uniqueTwoDigitNumbers = new Set(twoDigitNumbers);
    if (twoDigitNumbers.length !== uniqueTwoDigitNumbers.size) {
      return false;
    }
  
    return true;
};
  
export const mazeSchema = z.object({
    width: z.number().int().positive(),
    length: z.number().int().positive(),
    body: z.array(z.array(z.number().int())),
}).refine(data => bodyArrayValidator(data.body, data.width, data.length), {
    message: 'Invalid body array',
});