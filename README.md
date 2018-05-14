# Ghostbusters Testnet Instructions

### 1. Setup

`cd` to your `opt` folder.

```console
mkdir Ghostbusters
cd Ghostbusters
wget https://raw.githubusercontent.com/jchung00/Ghostbusters-Testnet/master/installGhostbusters.sh
```

### 2. Fill out info in install script

Edit the following information in the file:

```console
nano installGhostbusters.sh
```

***Will make a screenshot with inputs that need to be inserted in highlights***

### 3. Run the script

```console
sudo chmod u+x installGhostbusters.sh
./installGhostbusters.sh
```

### 4. Publish info.json

The `info.json` file should have been created in your directory. ***Need instructions on how we should publish this***

#### 4.1 Keybase.pub instructions

- Install keybase: https://keybase.io/docs/the_app/install_linux
 Ubuntu instructions
 ```console
# Install curl if required
sudo apt install curl

curl -O https://prerelease.keybase.io/keybase_amd64.deb
# if you see an error about missing `libappindicator1`
# from the next command, you can ignore it, as the
# subsequent command corrects it
sudo dpkg -i keybase_amd64.deb
sudo apt-get install -f
run_keybase
 ```
 - Login or signup:
 ```console
 # Login
 keybase login
 # Sign up
 keybase signup
 ```
 - Save on KBFS:
 ```console
 cd /keybase/public/username
 wget https://raw.githubusercontent.com/eosrio/bp-info-standard/master/bp_info.js
 nano bp_info.js
 # add your bp info and save it!
 ```
 - Verify file on `https://[username].keybase.pub/bp_info.js`

### 5. Check scripts

`cd` into your Ghostbusters testnet folder, which was created from the install script.
Try `cat config.ini`, and `cat cleos.sh` to check that all the information is correct.

### 6. Add peers

***Still need to define this step better with the web of trust idea. Should refer to launch status spreadsheet***