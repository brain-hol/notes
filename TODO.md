# TODO

- [ ] Make a better way to templatize a snippets file.

---
tags:
  - work
---
Brian's requirements:

- repo name should be the same as the built artifact
- package specifier is important. most should be com.trivir.\<client>
- AM config is breaking if it requires an accompanying DUSP/AM update in a non-backwards compatible change.

---

2025-09-11
- [ ] Hotfix for UAT release 2535.
- [ ] Release
- [ ] Update jenkins for builds
- [ ] deployment
- [ ] Q2 call
- [ ] talk with huston/jeremiah about 5 tenant env

---

- [ ] Create Frodo tasks for Preston
- [ ]  Logout URL matrix
- [ ]  Redirect URI, validation service matrix
- [ ] @Sarah - Ensure that Q2 enrollment will be good to go in Prod.
- [ ] Kim Brown said that OTP is not auto-filling for the login on Q2 Pilot
- [ ] **PIN change page.**
- [ ] **Complete profile on first login.**

---

- [ ] Look at Dynatrace potential example that Brandon sent over.
- [ ] Plan how the transition all users that will need the `needsQ2Enrollment` flag.
- [ ] Documentation for how to mark users as needs Q2 migration for AFCU
- [ ] Finish E-Statements Doc
- [ ] Finish Feature Flags Doc
- [ ] Look into what API Sarah is talking about for the usernames of authorized users.
- [ ] List of questions/topics for a Dynatrace training.
- [ ] Tune CTS/Reaper
- [ ] Allow app owners to opt-in to having Subaccounts with Account Numbers
- [ ] How to handle the last recorded sign-on method/platform
- [ ] Federation Doc/List
- [ ] TriVir Specific host Call
- [ ] Write up my Frodo wants
- [ ] Add tags to tests (`host:requestType`, `ds:attrName`, etc.)
- [ ] New client for Q2 username validation.
- [ ] Remove virtual:uniqueId everywhere after migration.

---

Long outstanding:

- [ ] Figure out what is wrong with MX Persistent Session with WebView. (Email in AFCU from Tyler Groesbeck titled "Persistent Web View Session ID")
- [ ] Verosint in charge of their own AIC Marketplace nodes (Email in Internal from Jay Parsons titled "ForgeRock integration docs")
- [ ] IdmUnit <-> JSON tool (Email from Patrick Monkelban titled the same in Internal)
- [ ] Ask Huston about Push to Mobile for AFCU
- [ ] Ask Huston about Zero Trust at AFCU

---

Personal

- [ ] 401K updates

---

- [x] Reach out to AFCU about the log collector zip playbook
- [x] NameID Format Fallback for username migration
- [x] Ask Brandon on Q2 call about the MX identifiers testing.
- [x] PR for Frodo
- [x] AFCU Testing
- [x] Learning DS
- [x] Talk about recovery codes being tied to devices or on account.
	- Sarah is okay with it being just a different MFA method. (Not tied to passkeys/authenticator app)
- [x] Look into the session validate endpoint for Q2
	- [x] `json is not valid. {"valid":false}`
- [x] Test MX Identifiers on Test Deployment Call.
- [x] IDVerse for DUSP
- [x] **q2**: Follow up about the logout button issue.
- [x] OpenAir pull custom project fields
- [x] OpenAir PRs
- [x] OpenAir Custom Fields Export
- [x] Enable pre-logon for production
- [x] Release Notes / Documentation for E-Statements.
- [x] Research into how to send the MX identifiers to Q2.
- [x] Make changes to e-statements node to always check for pending e-statements flag.
- [x] Update readme for `entryuuid` to `uid` tool.
- [x] Run username migration tool.
- [x] Ask Q2 about Dynatrace integration.
- [x] Get URLs for `frame-ancestors`.
- [x] Get feature flags how we want them.
- [x] Timesheets
- [x] Test Q2 Enrollment
- [x] Test E-Statements Flag
- [x] Test Q2 Prelogon
- [x] Modify Verosint nodes to not user transaction ID.
- [x] Archive the am-external repo in AFCU project
- [x] Update AFCU with information about Q2. (We should be okay on the PrimaryCIF uniqueness and the Complete Profile page. Also the logout issue they need to look into more.)
- [x] Lunch and Learn
- [x] Take note of how I fixed the line endings on Git.
- [x] ClickUp ticket for clicking the AFCU logo on Member Identity Pages would go back to.
- [x] Postman/REST Lab
- [x] Follow up with Sarah about the Locked Out Account still accessing Q2
- [x] Prep for Q2 Training
