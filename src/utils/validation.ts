import { z } from "zod";

/**
 * Validates data against a Zod schema. Returns the typed data, or throws formatted errors.
 */
export function validateData<T>(schema: z.Schema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues
        .map((err: z.ZodIssue) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(`Validation failed: ${issues}`);
    }
    throw error;
  }
}

/**
 * Safely parses and validates a JSON string (e.g. from an LLM response) against a Zod schema.
 * Handles cleanup of markdown-fenced code blocks which are frequently returned by generative models.
 */
export function validateLLMJson<T>(schema: z.Schema<T>, jsonString: string): T {
  try {
    const cleanedString = jsonString
      .replace(/^```json\s*/i, "")
      .replace(/```$/, "")
      .trim();

    const parsed = JSON.parse(cleanedString);
    return validateData(schema, parsed);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`LLM output is not valid JSON: ${error.message}`);
    }
    throw error;
  }
}

export const ticketIdSchema = z
  .string()
  .regex(/^TKT-[0-9]{6}-[A-Z0-9]{4}$/, "Ticket number must match format TKT-XXXXXX-XXXX");

export const coordinateSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});
