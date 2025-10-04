import { sql } from 'drizzle-orm';
import { db } from '../db';
import { funFacts } from '../db/schema';

export class FunFactsService {
  public async getRandomFunFact(): Promise<string> {
    const result = await db
      .select({ fact: funFacts.fact })
      .from(funFacts)
      .orderBy(sql`RANDOM()`)
      .limit(1);

    return result[0]?.fact || 'No fun facts available.';
  }
}

export const funFactsService = new FunFactsService();
