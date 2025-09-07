import crypto from "crypto";

// Configuration
const ALGORITHM = "aes-256-gcm";
const KEY_LENGTH = 32; // 256 bits
const IV_LENGTH = 16; // 128 bits
const AUTH_TAG_LENGTH = 16; // 128 bits

// Interface pour les données chiffrées
interface EncryptedData {
  iv: string;
  authTag: string;
  encrypted: string;
  combined: string; // Format: iv:authTag:encrypted
}

// Interface pour la paire de clés
interface KeyPair {
  publicKey: string;
  privateKey: string;
}

/**
 * Génère une clé de chiffrement aléatoire
 */
export function generateEncryptionKey(): string {
  return crypto.randomBytes(KEY_LENGTH).toString("hex");
}

/**
 * Génère une paire de clés publique/privée pour le chiffrement asymétrique
 */
export function generateKeyPair(): KeyPair {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  return {
    publicKey,
    privateKey,
  };
}

/**
 * Récupère la clé publique depuis une clé privée
 */
export function getPublicKeyFromPrivate(privateKey: string): string {
  const keyObject = crypto.createPrivateKey(privateKey);
  const publicKey = crypto.createPublicKey(keyObject);

  return publicKey.export({
    type: "spki",
    format: "pem",
  }) as string;
}

/**
 * Chiffre des données avec une clé symétrique (AES-256-GCM)
 */
export function encrypt(data: string, key: string): EncryptedData {
  try {
    const keyBuffer = Buffer.from(key, "hex");
    if (keyBuffer.length !== KEY_LENGTH) {
      throw new Error(
        `Key must be ${KEY_LENGTH} bytes (${KEY_LENGTH * 2} hex characters)`
      );
    }

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipherGCM(ALGORITHM, keyBuffer);
    cipher.setIV(iv);

    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    const result = {
      iv: iv.toString("hex"),
      authTag: authTag.toString("hex"),
      encrypted: encrypted,
      combined: `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`,
    };

    return result;
  } catch (error) {
    throw new Error(
      `Encryption failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Déchiffre des données avec une clé symétrique (AES-256-GCM)
 */
export function decrypt(
  encryptedData: string | EncryptedData,
  key: string
): string {
  try {
    const keyBuffer = Buffer.from(key, "hex");
    if (keyBuffer.length !== KEY_LENGTH) {
      throw new Error(
        `Key must be ${KEY_LENGTH} bytes (${KEY_LENGTH * 2} hex characters)`
      );
    }

    let iv: Buffer, authTag: Buffer, encrypted: Buffer;

    if (typeof encryptedData === "string") {
      // Format combiné: "iv:authTag:encrypted"
      const parts = encryptedData.split(":");
      if (parts.length !== 3) {
        throw new Error(
          "Invalid encrypted data format. Expected format: iv:authTag:encrypted"
        );
      }

      iv = Buffer.from(parts[0], "hex");
      authTag = Buffer.from(parts[1], "hex");
      encrypted = Buffer.from(parts[2], "hex");
    } else {
      // Format objet
      iv = Buffer.from(encryptedData.iv, "hex");
      authTag = Buffer.from(encryptedData.authTag, "hex");
      encrypted = Buffer.from(encryptedData.encrypted, "hex");
    }

    const decipher = crypto.createDecipherGCM(ALGORITHM, keyBuffer);
    decipher.setIV(iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, undefined, "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    throw new Error(
      `Decryption failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Chiffre des données avec une clé publique (RSA)
 */
export function encryptWithPublicKey(data: string, publicKey: string): string {
  try {
    const encrypted = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(data, "utf8")
    );

    return encrypted.toString("base64");
  } catch (error) {
    throw new Error(
      `Public key encryption failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Déchiffre des données avec une clé privée (RSA)
 */
export function decryptWithPrivateKey(
  encryptedData: string,
  privateKey: string
): string {
  try {
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(encryptedData, "base64")
    );

    return decrypted.toString("utf8");
  } catch (error) {
    throw new Error(
      `Private key decryption failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Crée un hash sécurisé d'une donnée
 */
export function createHash(data: string, algorithm: string = "sha256"): string {
  return crypto.createHash(algorithm).update(data).digest("hex");
}

/**
 * Vérifie l'intégrité des données avec un hash
 */
export function verifyHash(
  data: string,
  expectedHash: string,
  algorithm: string = "sha256"
): boolean {
  const actualHash = createHash(data, algorithm);
  return crypto.timingSafeEqual(
    Buffer.from(actualHash),
    Buffer.from(expectedHash)
  );
}

/**
 * Génère un token aléatoire
 */
export function generateRandomToken(length: number = 32): string {
  return crypto.randomBytes(length).toString("hex");
}

// Exemple d'utilisation
export function exampleUsage() {
  console.log("=== Exemple d'utilisation ===\n");

  // 1. Chiffrement symétrique
  console.log("1. Chiffrement symétrique (AES-256-GCM):");
  const symmetricKey = generateEncryptionKey();
  console.log("Clé générée:", symmetricKey);

  const message = "Hello, this is a secret message!";
  const encrypted = encrypt(message, symmetricKey);
  console.log("Message chiffré:", encrypted.combined);

  const decrypted = decrypt(encrypted.combined, symmetricKey);
  console.log("Message déchiffré:", decrypted);
  console.log("✓ Match:", message === decrypted);
  console.log();

  // 2. Chiffrement asymétrique
  console.log("2. Chiffrement asymétrique (RSA):");
  const keyPair = generateKeyPair();
  console.log("Clé publique générée");

  const secretData = "This is confidential data";
  const rsaEncrypted = encryptWithPublicKey(secretData, keyPair.publicKey);
  console.log("Données chiffrées avec clé publique");

  const rsaDecrypted = decryptWithPrivateKey(rsaEncrypted, keyPair.privateKey);
  console.log("Données déchiffrées:", rsaDecrypted);
  console.log("✓ Match:", secretData === rsaDecrypted);
  console.log();

  // 3. Hash et vérification
  console.log("3. Hash et vérification:");
  const dataToHash = "Important data to verify";
  const hash = createHash(dataToHash);
  console.log("Hash:", hash);
  console.log("✓ Vérification:", verifyHash(dataToHash, hash));
  console.log();

  // 4. Token aléatoire
  console.log("4. Token aléatoire:");
  const token = generateRandomToken();
  console.log("Token généré:", token);
}

// Décommentez pour tester
// exampleUsage();
