```yaml
- name: Ensure rotated systemd credential
  hosts: all
  become: true
  vars:
    cred_name: db_password
    cred_path: /etc/systemd/credentials/db_password.cred
    cred_user: appuser
    cred_secret: "{{ vault_db_password }}"
    hash_path: /etc/systemd/credentials/.db_password.sha256

  tasks:
    - name: Compute hash of desired secret
      ansible.builtin.set_fact:
        desired_hash: "{{ cred_secret | hash('sha256') }}"
      no_log: true

    - name: Read existing hash (if any)
      ansible.builtin.slurp:
        src: "{{ hash_path }}"
      register: existing_hash
      ignore_errors: true

    - name: Decide whether rotation is needed
      ansible.builtin.set_fact:
        rotate: >-
          {{ existing_hash is failed or
             (existing_hash.content | b64decode) != desired_hash }}
      no_log: true

    - name: Encrypt credential
      systemd_creds_encrypt:
        name: "{{ cred_name }}"
        secret: "{{ cred_secret }}"
        user: "{{ cred_user }}"
      register: encrypted
      when: rotate

    - name: Write encrypted credential
      ansible.builtin.copy:
        content: "{{ encrypted.value }}"
        dest: "{{ cred_path }}"
        owner: root
        group: root
        mode: "0400"
      when: rotate

    - name: Persist hash for next run
      ansible.builtin.copy:
        content: "{{ desired_hash }}"
        dest: "{{ hash_path }}"
        owner: root
        group: root
        mode: "0400"
      when: rotate

```
