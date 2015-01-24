# OfficeGuard

OfficeGuard is an open-source project built on top of [Tessels](https://tessel.io). It will monitor your office/room and sends alerts
to OpsGenie if something if not.

# Stuff needed

In order to build your own setup, you will need:

* a Tessel board
* an Ambient module
* a Climate module
* an Accelerometer module
* Node.js installed on your computer
* OpsGenie account

# Setup


Install Tessel

```
npm i tessel -g
```

Clone the repo:

```
git clone git@github.com:RisingStack/office-guard.git
cd office-guard
npm i
```

Connect your modules to the ports as defined in the `config.js` file. **(Be aware: you may change them,
but some weird things can happen, like modules conflicting with each other)**

# Deploying to the Tessel

```
tessel push index.js
```
