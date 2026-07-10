import "@testing-library/jest-dom";
import { vi, afterEach } from "vitest";

// Global mocks for Firebase Client SDK to prevent unit tests from trying to connect to real endpoints
vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn(() => []),
  getApp: vi.fn(),
}));

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
    onAuthStateChanged: vi.fn(),
  })),
}));

vi.mock("firebase/firestore", () => ({
  initializeFirestore: vi.fn(() => ({})),
  persistentLocalCache: vi.fn(),
  persistentMultipleTabManager: vi.fn(),
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(() => Promise.resolve({ docs: [] })),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  limit: vi.fn(),
}));

vi.mock("firebase/storage", () => ({
  getStorage: vi.fn(),
}));

vi.mock("firebase/analytics", () => ({
  getAnalytics: vi.fn(),
  isSupported: vi.fn(() => Promise.resolve(false)),
}));

afterEach(() => {
  vi.clearAllMocks();
});
