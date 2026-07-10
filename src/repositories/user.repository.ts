import { BaseRepository } from "./base.repository";
import { UserProfile } from "@/domain/user.entity";
import { where, limit } from "firebase/firestore";

export class UserRepository extends BaseRepository<UserProfile> {
  constructor() {
    super("users");
  }

  async getProfileByEmail(email: string): Promise<UserProfile | null> {
    const results = await this.query([
      where("email", "==", email),
      limit(1)
    ]);
    return results[0] || null;
  }
}
