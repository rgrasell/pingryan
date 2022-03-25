# Overview
QmApi is the majority of the backend. It processes incoming emails and serves client API requests on the same workers.
### Background processing
QmApi reads incoming emails from PubSub. Any emails with valid recipients are saved to Firestore.
### Client API
QmApi serves client requests (get emails, create new address, etc).
