# Cryptography

### **1. Cipher**

- **Definition:** A cipher is an algorithm for **encrypting and decrypting data**.
- **Purpose:** Transform readable data (plaintext) into an unreadable format (ciphertext) and back.
- **Types:**
    - **Symmetric cipher:** Same key for encryption and decryption (e.g., AES, ChaCha20)
    - **Asymmetric cipher:** Different keys for encryption and decryption (public/private key) (e.g., RSA, ECC)

### **2. Digest (Hash)**

- **Definition:** A digest is the **output of a hash function**, a fixed-length representation of some data.
- **Purpose:** Verify data integrity, generate fingerprints, or store passwords securely.
- **Characteristics of a cryptographic hash:**
    1. Deterministic: Same input → same output.
    2. Fast to compute.
    3. Pre-image resistant: Hard to reverse (output → input).
    4. Collision-resistant: Hard to find two inputs with same output.
    5. Avalanche effect: Small change in input → large change in output.
