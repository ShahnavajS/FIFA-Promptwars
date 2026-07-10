import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  QueryConstraint,
  DocumentData,
  WithFieldValue,
  UpdateData,
} from "firebase/firestore";

export abstract class BaseRepository<T extends DocumentData> {
  protected constructor(protected readonly collectionName: string) {}

  protected getCollectionRef() {
    return collection(db, this.collectionName);
  }

  protected getDocRef(id: string) {
    return doc(db, this.collectionName, id);
  }

  async getById(id: string): Promise<T | null> {
    const docSnap = await getDoc(this.getDocRef(id));
    if (docSnap.exists()) {
      return docSnap.data() as T;
    }
    return null;
  }

  async getAll(): Promise<T[]> {
    const querySnapshot = await getDocs(this.getCollectionRef());
    return querySnapshot.docs.map((doc) => doc.data() as T);
  }

  async query(constraints: QueryConstraint[]): Promise<T[]> {
    const q = query(this.getCollectionRef(), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as T);
  }

  async create(id: string, data: WithFieldValue<T>): Promise<void> {
    await setDoc(this.getDocRef(id), data);
  }

  async update(id: string, data: UpdateData<T>): Promise<void> {
    await updateDoc(this.getDocRef(id), data);
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(this.getDocRef(id));
  }
}
