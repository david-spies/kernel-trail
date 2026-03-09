import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// QUESTION DATABASE - 400 Linux + 100 Bonus IT History
// ============================================================

const LINUX_QUESTIONS = [
  // ── LEVEL 1-5: ROOT INITIATIVE ── (Q1-50, Easy)
  { id:"L001", cmd:"alias", scenario:"You're exhausted from typing `ls -la` a hundred times today. Create a shortcut `ll` that runs it for you.", answer:"alias ll='ls -la'", hint:"alias name='command'", difficulty:1, chapter:1 },
  { id:"L002", cmd:"apt", scenario:"The bridge-utils package is missing. Install it using the Debian package manager.", answer:"apt install bridge-utils", hint:"apt install <package>", difficulty:1, chapter:1 },
  { id:"L003", cmd:"cat", scenario:"A mysterious file `note.txt` sits in the current directory. Display its contents to the terminal.", answer:"cat note.txt", hint:"cat <filename>", difficulty:1, chapter:1 },
  { id:"L004", cmd:"cd", scenario:"You're at `/home/user`. Move up one directory level to `/home`.", answer:"cd ..", hint:"Use two dots to go up", difficulty:1, chapter:1 },
  { id:"L005", cmd:"cp", scenario:"Back up `config` before editing it. Create a copy named `config.bak`.", answer:"cp config config.bak", hint:"cp <source> <dest>", difficulty:1, chapter:1 },
  { id:"L006", cmd:"date", scenario:"The system clock may be drifting. Display the current system date and time.", answer:"date", hint:"Single word command", difficulty:1, chapter:1 },
  { id:"L007", cmd:"df", scenario:"Your terminal's storage feels bloated. Show available disk space in human-readable format.", answer:"df -h", hint:"df with human-readable flag", difficulty:1, chapter:1 },
  { id:"L008", cmd:"echo", scenario:"Append the word DONE to the end of `log.txt`.", answer:'echo "DONE" >> log.txt', hint:"echo with append operator >>", difficulty:1, chapter:1 },
  { id:"L009", cmd:"exit", scenario:"You need to close this terminal session cleanly. What single command do you type?", answer:"exit", hint:"Single word command", difficulty:1, chapter:1 },
  { id:"L010", cmd:"find", scenario:"Locate all files named `*.log` in the current directory and subdirectories.", answer:"find . -name '*.log'", hint:"find <path> -name <pattern>", difficulty:1, chapter:1 },
  { id:"L011", cmd:"grep", scenario:"Search for the word 'ERROR' inside the file `system.log`.", answer:"grep 'ERROR' system.log", hint:"grep '<pattern>' <file>", difficulty:1, chapter:2 },
  { id:"L012", cmd:"head", scenario:"Preview just the first 10 lines of a massive `data.csv` file.", answer:"head data.csv", hint:"head <filename>", difficulty:1, chapter:2 },
  { id:"L013", cmd:"history", scenario:"You forgot a complex command you ran an hour ago. Display your command history.", answer:"history", hint:"Single word command", difficulty:1, chapter:2 },
  { id:"L014", cmd:"hostname", scenario:"You've jacked into an unknown terminal. Find out this machine's hostname.", answer:"hostname", hint:"Single word command", difficulty:1, chapter:2 },
  { id:"L015", cmd:"id", scenario:"Which user are you running as? Display your user and group information.", answer:"id", hint:"Single word command", difficulty:1, chapter:2 },
  { id:"L016", cmd:"kill", scenario:"A rogue process with PID 1337 is draining your power cells. Terminate it.", answer:"kill 1337", hint:"kill <PID>", difficulty:1, chapter:2 },
  { id:"L017", cmd:"less", scenario:"View `manual.txt` one screen at a time so you can scroll through it.", answer:"less manual.txt", hint:"less <filename>", difficulty:1, chapter:2 },
  { id:"L018", cmd:"ls", scenario:"List all files in the current directory, including hidden files.", answer:"ls -a", hint:"ls with flag for all files", difficulty:1, chapter:2 },
  { id:"L019", cmd:"man", scenario:"You forgot the flags for `tar`. Pull up its manual page.", answer:"man tar", hint:"man <command>", difficulty:1, chapter:2 },
  { id:"L020", cmd:"mkdir", scenario:"Create a new directory named `recovered_data`.", answer:"mkdir recovered_data", hint:"mkdir <dirname>", difficulty:1, chapter:2 },
  { id:"L021", cmd:"mv", scenario:"Rename the file `old_config` to `config_v2`.", answer:"mv old_config config_v2", hint:"mv <source> <dest>", difficulty:2, chapter:3 },
  { id:"L022", cmd:"nano", scenario:"Quickly edit `notes.txt` in a beginner-friendly terminal text editor.", answer:"nano notes.txt", hint:"nano <filename>", difficulty:2, chapter:3 },
  { id:"L023", cmd:"passwd", scenario:"Your current password is compromised. Change it now.", answer:"passwd", hint:"Single word command", difficulty:2, chapter:3 },
  { id:"L024", cmd:"ping", scenario:"Test network connectivity to the server at `192.168.1.1`.", answer:"ping 192.168.1.1", hint:"ping <host>", difficulty:2, chapter:3 },
  { id:"L025", cmd:"ps", scenario:"List all running processes on the system with full details.", answer:"ps aux", hint:"ps with aux flags", difficulty:2, chapter:3 },
  { id:"L026", cmd:"pwd", scenario:"You're lost in the filesystem. Print your current working directory.", answer:"pwd", hint:"Single word command", difficulty:2, chapter:3 },
  { id:"L027", cmd:"reboot", scenario:"After applying a kernel patch, the system needs a restart. Execute it.", answer:"reboot", hint:"Single word command", difficulty:2, chapter:3 },
  { id:"L028", cmd:"rm", scenario:"Delete the file `trash.tmp` permanently.", answer:"rm trash.tmp", hint:"rm <filename>", difficulty:2, chapter:3 },
  { id:"L029", cmd:"rmdir", scenario:"Remove the empty directory `old_logs`.", answer:"rmdir old_logs", hint:"rmdir <dirname>", difficulty:2, chapter:3 },
  { id:"L030", cmd:"sort", scenario:"Sort the contents of `names.txt` alphabetically and display to stdout.", answer:"sort names.txt", hint:"sort <filename>", difficulty:2, chapter:3 },
  { id:"L031", cmd:"ssh", scenario:"Connect to remote server `10.0.0.5` as user `admin` via secure shell.", answer:"ssh admin@10.0.0.5", hint:"ssh user@host", difficulty:2, chapter:4 },
  { id:"L032", cmd:"su", scenario:"Switch to the root user to gain elevated privileges.", answer:"su -", hint:"su with dash for full login", difficulty:2, chapter:4 },
  { id:"L033", cmd:"sudo", scenario:"Run the command `apt update` with superuser privileges.", answer:"sudo apt update", hint:"sudo <command>", difficulty:2, chapter:4 },
  { id:"L034", cmd:"tail", scenario:"Monitor a live log file `access.log` in real-time as new entries are written.", answer:"tail -f access.log", hint:"tail -f for follow mode", difficulty:2, chapter:4 },
  { id:"L035", cmd:"tar", scenario:"Extract the archive `backup.tar.gz` into the current directory.", answer:"tar -xzf backup.tar.gz", hint:"tar -xzf <file>", difficulty:2, chapter:4 },
  { id:"L036", cmd:"touch", scenario:"Create an empty placeholder file named `lock.pid`.", answer:"touch lock.pid", hint:"touch <filename>", difficulty:2, chapter:4 },
  { id:"L037", cmd:"top", scenario:"Launch an interactive real-time process monitor.", answer:"top", hint:"Single word command", difficulty:2, chapter:4 },
  { id:"L038", cmd:"uname", scenario:"Display all system information including kernel version and architecture.", answer:"uname -a", hint:"uname with all flag", difficulty:2, chapter:4 },
  { id:"L039", cmd:"unzip", scenario:"Extract `archive.zip` into the current directory.", answer:"unzip archive.zip", hint:"unzip <file>", difficulty:2, chapter:4 },
  { id:"L040", cmd:"uptime", scenario:"Check how long this system has been running without a reboot.", answer:"uptime", hint:"Single word command", difficulty:2, chapter:4 },
  { id:"L041", cmd:"useradd", scenario:"Create a new system user named `scavenger`.", answer:"useradd scavenger", hint:"useradd <username>", difficulty:2, chapter:5 },
  { id:"L042", cmd:"vi", scenario:"Open `config.conf` in the classic vi editor.", answer:"vi config.conf", hint:"vi <filename>", difficulty:2, chapter:5 },
  { id:"L043", cmd:"w", scenario:"See who is currently logged in and what they are doing.", answer:"w", hint:"Single character command", difficulty:2, chapter:5 },
  { id:"L044", cmd:"wc", scenario:"Count the number of lines in `report.txt`.", answer:"wc -l report.txt", hint:"wc -l <file>", difficulty:2, chapter:5 },
  { id:"L045", cmd:"wget", scenario:"Download the file at `http://archive.net/data.tar.gz` to the current directory.", answer:"wget http://archive.net/data.tar.gz", hint:"wget <URL>", difficulty:2, chapter:5 },
  { id:"L046", cmd:"which", scenario:"Find the full path of the `python3` executable on this system.", answer:"which python3", hint:"which <command>", difficulty:2, chapter:5 },
  { id:"L047", cmd:"who", scenario:"Display a simple list of currently logged-in users.", answer:"who", hint:"Single word command", difficulty:2, chapter:5 },
  { id:"L048", cmd:"xargs", scenario:"Pipe the output of `find . -name '*.tmp'` into `xargs` to delete all found files.", answer:"find . -name '*.tmp' | xargs rm", hint:"command | xargs <action>", difficulty:2, chapter:5 },
  { id:"L049", cmd:"yes", scenario:"Auto-confirm every prompt in a destructive script by piping `yes` into it.", answer:"yes | ./cleanup.sh", hint:"yes | <script>", difficulty:2, chapter:5 },
  { id:"L050", cmd:"zip", scenario:"Compress the directory `logs/` into `logs.zip`.", answer:"zip -r logs.zip logs/", hint:"zip -r <dest> <source>", difficulty:2, chapter:5 },

  // ── LEVEL 6-15: BASH NOMAD ── (Q51-150, Medium)
  { id:"L051", cmd:"awk", scenario:"Parse `/etc/passwd` and print only the usernames (field 1, delimiter `:`).", answer:"awk -F: '{print $1}' /etc/passwd", hint:"awk -F: '{print $1}' <file>", difficulty:3, chapter:6 },
  { id:"L052", cmd:"at", scenario:"Schedule the command `shutdown -h now` to run at 03:00 AM.", answer:"at 03:00", hint:"at <time>", difficulty:3, chapter:6 },
  { id:"L053", cmd:"bash", scenario:"Execute the shell script `deploy.sh` using the Bash interpreter explicitly.", answer:"bash deploy.sh", hint:"bash <script>", difficulty:3, chapter:6 },
  { id:"L054", cmd:"bg", scenario:"A process was suspended with Ctrl+Z. Resume it in the background.", answer:"bg", hint:"Single word command", difficulty:3, chapter:6 },
  { id:"L055", cmd:"bzip2", scenario:"Compress `archive.log` using bzip2 for superior compression.", answer:"bzip2 archive.log", hint:"bzip2 <file>", difficulty:3, chapter:6 },
  { id:"L056", cmd:"chattr", scenario:"Make the file `immutable.conf` undeleteable and unmodifiable, even by root.", answer:"chattr +i immutable.conf", hint:"chattr +i <file>", difficulty:3, chapter:6 },
  { id:"L057", cmd:"chmod", scenario:"Give the owner execute, the group read, and others nothing on `script.sh`. Use octal.", answer:"chmod 740 script.sh", hint:"chmod <octal> <file>", difficulty:3, chapter:7 },
  { id:"L058", cmd:"chown", scenario:"Change the owner of `data.db` to user `root` and group `admin`.", answer:"chown root:admin data.db", hint:"chown user:group <file>", difficulty:3, chapter:7 },
  { id:"L059", cmd:"cron", scenario:"Your crontab entry should run `backup.sh` every day at midnight. Write the cron expression.", answer:"0 0 * * * /scripts/backup.sh", hint:"min hour day month weekday command", difficulty:3, chapter:7 },
  { id:"L060", cmd:"crontab", scenario:"List all current scheduled cron jobs for this user.", answer:"crontab -l", hint:"crontab -l", difficulty:3, chapter:7 },
  { id:"L061", cmd:"curl", scenario:"Send a POST request to `http://api.local/data` with JSON body `{\"key\":\"val\"}`.", answer:'curl -X POST -H "Content-Type: application/json" -d \'{"key":"val"}\' http://api.local/data', hint:"curl -X POST -H ... -d ... <url>", difficulty:3, chapter:7 },
  { id:"L062", cmd:"cut", scenario:"Extract the 2nd field from `data.csv` (comma-delimited).", answer:"cut -d',' -f2 data.csv", hint:"cut -d',' -f<n> <file>", difficulty:3, chapter:7 },
  { id:"L063", cmd:"dd", scenario:"Create a 1GB blank disk image named `blank.img` using /dev/zero.", answer:"dd if=/dev/zero of=blank.img bs=1M count=1024", hint:"dd if=/dev/zero of=<file> bs=<size> count=<n>", difficulty:3, chapter:8 },
  { id:"L064", cmd:"diff", scenario:"Show the differences between `config_old` and `config_new` in unified format.", answer:"diff -u config_old config_new", hint:"diff -u <file1> <file2>", difficulty:3, chapter:8 },
  { id:"L065", cmd:"dig", scenario:"Query the DNS A record for `neo-portland.net`.", answer:"dig A neo-portland.net", hint:"dig <type> <domain>", difficulty:3, chapter:8 },
  { id:"L066", cmd:"dmesg", scenario:"View the kernel ring buffer messages to debug a hardware issue.", answer:"dmesg", hint:"Single word command", difficulty:3, chapter:8 },
  { id:"L067", cmd:"du", scenario:"Show the disk usage of the `/var/log` directory in human-readable form.", answer:"du -sh /var/log", hint:"du -sh <path>", difficulty:3, chapter:8 },
  { id:"L068", cmd:"env", scenario:"Display all current environment variables.", answer:"env", hint:"Single word command", difficulty:3, chapter:8 },
  { id:"L069", cmd:"export", scenario:"Set an environment variable `NODE_ENV` to `production` for child processes.", answer:"export NODE_ENV=production", hint:"export VAR=value", difficulty:3, chapter:9 },
  { id:"L070", cmd:"fg", scenario:"Bring the most recently backgrounded job back to the foreground.", answer:"fg", hint:"Single word command", difficulty:3, chapter:9 },
  { id:"L071", cmd:"file", scenario:"Determine the type of an unknown binary named `mystery`.", answer:"file mystery", hint:"file <filename>", difficulty:3, chapter:9 },
  { id:"L072", cmd:"find", scenario:"Find all files larger than 100MB under `/var` and list them.", answer:"find /var -size +100M -type f", hint:"find <path> -size +<n>M -type f", difficulty:3, chapter:9 },
  { id:"L073", cmd:"free", scenario:"Check the system's available RAM in human-readable format.", answer:"free -h", hint:"free -h", difficulty:3, chapter:9 },
  { id:"L074", cmd:"fsck", scenario:"Check and repair the filesystem on device `/dev/sdb1` (unmounted).", answer:"fsck /dev/sdb1", hint:"fsck <device>", difficulty:3, chapter:9 },
  { id:"L075", cmd:"ftp", scenario:"Connect to FTP server at `192.168.1.50` to retrieve files.", answer:"ftp 192.168.1.50", hint:"ftp <host>", difficulty:3, chapter:9 },
  { id:"L076", cmd:"gzip", scenario:"Compress `report.txt` with gzip and keep the original file.", answer:"gzip -k report.txt", hint:"gzip -k <file>", difficulty:3, chapter:10 },
  { id:"L077", cmd:"grep", scenario:"Search recursively for 'FATAL' in all `.log` files under `/var/log`, show line numbers.", answer:"grep -rn 'FATAL' /var/log/*.log", hint:"grep -rn '<pattern>' <path>", difficulty:3, chapter:10 },
  { id:"L078", cmd:"groups", scenario:"Display all groups the current user belongs to.", answer:"groups", hint:"Single word command", difficulty:3, chapter:10 },
  { id:"L079", cmd:"htop", scenario:"Launch the interactive, colorful process viewer (more advanced than top).", answer:"htop", hint:"Single word command", difficulty:3, chapter:10 },
  { id:"L080", cmd:"ifconfig", scenario:"Display all network interfaces and their IP configurations.", answer:"ifconfig -a", hint:"ifconfig -a", difficulty:3, chapter:10 },
  { id:"L081", cmd:"ip", scenario:"Show all network interfaces using the modern `ip` command suite.", answer:"ip addr show", hint:"ip addr show", difficulty:3, chapter:11 },
  { id:"L082", cmd:"iptables", scenario:"List all current firewall rules on the system.", answer:"iptables -L", hint:"iptables -L", difficulty:3, chapter:11 },
  { id:"L083", cmd:"jobs", scenario:"List all active background jobs in the current shell session.", answer:"jobs", hint:"Single word command", difficulty:3, chapter:11 },
  { id:"L084", cmd:"join", scenario:"Join two sorted files `users.txt` and `data.txt` on their first field.", answer:"join users.txt data.txt", hint:"join <file1> <file2>", difficulty:3, chapter:11 },
  { id:"L085", cmd:"journalctl", scenario:"View the last 50 lines of systemd's journal logs.", answer:"journalctl -n 50", hint:"journalctl -n <lines>", difficulty:3, chapter:11 },
  { id:"L086", cmd:"kill", scenario:"A zombie process with PID 9999 won't die. Send it the SIGKILL signal.", answer:"kill -9 9999", hint:"kill -9 <PID>", difficulty:3, chapter:11 },
  { id:"L087", cmd:"killall", scenario:"Kill all processes named `python3` in one command.", answer:"killall python3", hint:"killall <name>", difficulty:3, chapter:11 },
  { id:"L088", cmd:"ln", scenario:"Create a symbolic link named `current` pointing to `v2.3.1/app`.", answer:"ln -s v2.3.1/app current", hint:"ln -s <target> <linkname>", difficulty:3, chapter:12 },
  { id:"L089", cmd:"locate", scenario:"Quickly find all files named `shadow` anywhere on the system.", answer:"locate shadow", hint:"locate <filename>", difficulty:3, chapter:12 },
  { id:"L090", cmd:"logrotate", scenario:"Manually force log rotation using the config at `/etc/logrotate.conf`.", answer:"logrotate -f /etc/logrotate.conf", hint:"logrotate -f <config>", difficulty:3, chapter:12 },
  { id:"L091", cmd:"lsblk", scenario:"List all block devices (disks, partitions, USB drives) in a tree view.", answer:"lsblk", hint:"Single word command", difficulty:3, chapter:12 },
  { id:"L092", cmd:"lsof", scenario:"List all open files and the processes using them.", answer:"lsof", hint:"Single word command", difficulty:3, chapter:12 },
  { id:"L093", cmd:"lspci", scenario:"List all PCI devices connected to this machine.", answer:"lspci", hint:"Single word command", difficulty:3, chapter:12 },
  { id:"L094", cmd:"lsusb", scenario:"List all USB devices currently connected.", answer:"lsusb", hint:"Single word command", difficulty:3, chapter:12 },
  { id:"L095", cmd:"md5sum", scenario:"Generate the MD5 checksum of `firmware.bin` to verify its integrity.", answer:"md5sum firmware.bin", hint:"md5sum <file>", difficulty:3, chapter:13 },
  { id:"L096", cmd:"mkfs", scenario:"Format the partition `/dev/sdb1` with the ext4 filesystem.", answer:"mkfs.ext4 /dev/sdb1", hint:"mkfs.ext4 <device>", difficulty:3, chapter:13 },
  { id:"L097", cmd:"modprobe", scenario:"Load the kernel module `usbhid` to enable USB HID devices.", answer:"modprobe usbhid", hint:"modprobe <module>", difficulty:3, chapter:13 },
  { id:"L098", cmd:"mount", scenario:"Mount the device `/dev/sdb1` to the directory `/mnt/external`.", answer:"mount /dev/sdb1 /mnt/external", hint:"mount <device> <mountpoint>", difficulty:3, chapter:13 },
  { id:"L099", cmd:"netstat", scenario:"Display all active TCP connections with process IDs.", answer:"netstat -tp", hint:"netstat -tp", difficulty:3, chapter:13 },
  { id:"L100", cmd:"nmap", scenario:"Scan all ports on the host `192.168.1.1` for open services.", answer:"nmap -p- 192.168.1.1", hint:"nmap -p- <host>", difficulty:3, chapter:13 },
  { id:"L101", cmd:"nohup", scenario:"Run `./long_task.sh` so it continues after you close this terminal.", answer:"nohup ./long_task.sh &", hint:"nohup <command> &", difficulty:3, chapter:14 },
  { id:"L102", cmd:"openssl", scenario:"Generate a self-signed SSL certificate valid for 365 days.", answer:"openssl req -x509 -newkey rsa:4096 -days 365 -nodes -keyout key.pem -out cert.pem", hint:"openssl req -x509 ...", difficulty:3, chapter:14 },
  { id:"L103", cmd:"passwd", scenario:"Lock the user account `olduser` to prevent login.", answer:"passwd -l olduser", hint:"passwd -l <user>", difficulty:3, chapter:14 },
  { id:"L104", cmd:"pgrep", scenario:"Find the PID of any process named `nginx`.", answer:"pgrep nginx", hint:"pgrep <name>", difficulty:3, chapter:14 },
  { id:"L105", cmd:"pipe", scenario:"Count the number of running processes using `ps` and `wc`.", answer:"ps aux | wc -l", hint:"ps aux | wc -l", difficulty:3, chapter:14 },
  { id:"L106", cmd:"pkill", scenario:"Kill all processes belonging to user `daemon`.", answer:"pkill -u daemon", hint:"pkill -u <user>", difficulty:3, chapter:14 },
  { id:"L107", cmd:"printenv", scenario:"Display the value of the `PATH` environment variable.", answer:"printenv PATH", hint:"printenv <VAR>", difficulty:3, chapter:14 },
  { id:"L108", cmd:"ps", scenario:"Show a process tree of all running processes.", answer:"ps auxf", hint:"ps auxf", difficulty:3, chapter:15 },
  { id:"L109", cmd:"pstree", scenario:"Display running processes as a visual tree starting from PID 1.", answer:"pstree -p 1", hint:"pstree -p <PID>", difficulty:3, chapter:15 },
  { id:"L110", cmd:"quota", scenario:"Check the disk quota usage for user `alice`.", answer:"quota alice", hint:"quota <user>", difficulty:3, chapter:15 },
  { id:"L111", cmd:"read", scenario:"Write a bash one-liner that prompts `Enter name:` and stores the input in variable `NAME`.", answer:"read -p 'Enter name: ' NAME", hint:"read -p 'prompt' VAR", difficulty:3, chapter:15 },
  { id:"L112", cmd:"realpath", scenario:"Resolve and print the absolute canonical path of `../../etc/passwd`.", answer:"realpath ../../etc/passwd", hint:"realpath <path>", difficulty:3, chapter:15 },
  { id:"L113", cmd:"rename", scenario:"Rename all `.htm` files to `.html` in the current directory.", answer:"rename 's/.htm$/.html/' *.htm", hint:"rename 's/old/new/' <files>", difficulty:3, chapter:15 },
  { id:"L114", cmd:"rsync", scenario:"Sync the local directory `backup/` to remote `admin@10.0.0.2:/backups/` over SSH.", answer:"rsync -avz backup/ admin@10.0.0.2:/backups/", hint:"rsync -avz <src> <dest>", difficulty:3, chapter:15 },
  { id:"L115", cmd:"runlevel", scenario:"Display the current and previous runlevel of the system.", answer:"runlevel", hint:"Single word command", difficulty:3, chapter:15 },
  { id:"L116", cmd:"scp", scenario:"Securely copy `data.tar.gz` from local to `user@remote.server:/opt/`.", answer:"scp data.tar.gz user@remote.server:/opt/", hint:"scp <src> user@host:<dest>", difficulty:3, chapter:16 },
  { id:"L117", cmd:"screen", scenario:"Start a persistent terminal session named `main` using GNU Screen.", answer:"screen -S main", hint:"screen -S <name>", difficulty:3, chapter:16 },
  { id:"L118", cmd:"sed", scenario:"Replace all occurrences of 'foo' with 'bar' in `file.txt` in-place.", answer:"sed -i 's/foo/bar/g' file.txt", hint:"sed -i 's/old/new/g' <file>", difficulty:3, chapter:16 },
  { id:"L119", cmd:"setuid", scenario:"Set the SUID bit on the executable `secure_app` so it runs as its owner.", answer:"chmod u+s secure_app", hint:"chmod u+s <file>", difficulty:3, chapter:16 },
  { id:"L120", cmd:"shred", scenario:"Securely overwrite and delete sensitive file `keys.pem`.", answer:"shred -uz keys.pem", hint:"shred -uz <file>", difficulty:3, chapter:16 },
  { id:"L121", cmd:"shutdown", scenario:"Schedule the system to shut down in 30 minutes with a warning message.", answer:"shutdown -h +30 'Maintenance'", hint:"shutdown -h +<mins> '<msg>'", difficulty:3, chapter:17 },
  { id:"L122", cmd:"sleep", scenario:"Pause execution for 5 seconds inside a bash script.", answer:"sleep 5", hint:"sleep <seconds>", difficulty:3, chapter:17 },
  { id:"L123", cmd:"split", scenario:"Split `large.log` into 100MB chunks prefixed with `chunk_`.", answer:"split -b 100M large.log chunk_", hint:"split -b <size> <file> <prefix>", difficulty:3, chapter:17 },
  { id:"L124", cmd:"ss", scenario:"Display all listening TCP sockets and their PIDs (modern replacement for netstat).", answer:"ss -tlnp", hint:"ss -tlnp", difficulty:3, chapter:17 },
  { id:"L125", cmd:"stat", scenario:"Display detailed metadata (permissions, timestamps, inode) of `config.yaml`.", answer:"stat config.yaml", hint:"stat <file>", difficulty:3, chapter:17 },
  { id:"L126", cmd:"strings", scenario:"Extract all printable strings from the binary file `malware.bin`.", answer:"strings malware.bin", hint:"strings <file>", difficulty:3, chapter:17 },
  { id:"L127", cmd:"strace", scenario:"Trace all system calls made by the process with PID 2048.", answer:"strace -p 2048", hint:"strace -p <PID>", difficulty:3, chapter:17 },
  { id:"L128", cmd:"su", scenario:"Switch to user `deploy` and load their full environment.", answer:"su - deploy", hint:"su - <user>", difficulty:3, chapter:18 },
  { id:"L129", cmd:"sysctl", scenario:"Display the current kernel network parameter `net.ipv4.ip_forward`.", answer:"sysctl net.ipv4.ip_forward", hint:"sysctl <parameter>", difficulty:3, chapter:18 },
  { id:"L130", cmd:"systemctl", scenario:"Enable the `nginx` service to start automatically on boot.", answer:"systemctl enable nginx", hint:"systemctl enable <service>", difficulty:3, chapter:18 },
  { id:"L131", cmd:"systemctl", scenario:"Check the current status of the `sshd` service.", answer:"systemctl status sshd", hint:"systemctl status <service>", difficulty:3, chapter:18 },
  { id:"L132", cmd:"tee", scenario:"Run `ls -la` and send output to both screen and `listing.txt` simultaneously.", answer:"ls -la | tee listing.txt", hint:"command | tee <file>", difficulty:3, chapter:18 },
  { id:"L133", cmd:"telnet", scenario:"Connect to the Telnet service at `10.0.0.1` on port 23.", answer:"telnet 10.0.0.1 23", hint:"telnet <host> <port>", difficulty:3, chapter:18 },
  { id:"L134", cmd:"test", scenario:"In a bash script, write the condition to check if file `data.db` exists.", answer:"[ -f data.db ]", hint:"[ -f <file> ]", difficulty:3, chapter:18 },
  { id:"L135", cmd:"time", scenario:"Measure how long `./build.sh` takes to execute.", answer:"time ./build.sh", hint:"time <command>", difficulty:3, chapter:18 },
  { id:"L136", cmd:"tmux", scenario:"Start a new tmux session and split the window horizontally.", answer:"tmux new-session \\; split-window -h", hint:"tmux new-session", difficulty:3, chapter:19 },
  { id:"L137", cmd:"tr", scenario:"Convert all lowercase letters in `input.txt` to uppercase.", answer:"tr 'a-z' 'A-Z' < input.txt", hint:"tr 'a-z' 'A-Z' < <file>", difficulty:3, chapter:19 },
  { id:"L138", cmd:"traceroute", scenario:"Trace the network route to `google.com`.", answer:"traceroute google.com", hint:"traceroute <host>", difficulty:3, chapter:19 },
  { id:"L139", cmd:"umount", scenario:"Unmount the filesystem mounted at `/mnt/external`.", answer:"umount /mnt/external", hint:"umount <mountpoint>", difficulty:3, chapter:19 },
  { id:"L140", cmd:"uniq", scenario:"Remove duplicate consecutive lines from sorted file `data.txt`.", answer:"uniq data.txt", hint:"uniq <file>", difficulty:3, chapter:19 },
  { id:"L141", cmd:"update-alternatives", scenario:"Set `python3` as the default when `python` is called.", answer:"update-alternatives --install /usr/bin/python python /usr/bin/python3 1", hint:"update-alternatives --install ...", difficulty:3, chapter:19 },
  { id:"L142", cmd:"uptime", scenario:"Check how many users are logged in and the system load averages.", answer:"uptime", hint:"Single word command", difficulty:3, chapter:19 },
  { id:"L143", cmd:"userdel", scenario:"Remove user `olduser` and their home directory.", answer:"userdel -r olduser", hint:"userdel -r <user>", difficulty:3, chapter:20 },
  { id:"L144", cmd:"usermod", scenario:"Add user `alice` to the `sudo` group.", answer:"usermod -aG sudo alice", hint:"usermod -aG <group> <user>", difficulty:3, chapter:20 },
  { id:"L145", cmd:"vmstat", scenario:"Report virtual memory statistics with a 1-second interval, 5 times.", answer:"vmstat 1 5", hint:"vmstat <interval> <count>", difficulty:3, chapter:20 },
  { id:"L146", cmd:"watch", scenario:"Run `df -h` every 2 seconds to monitor disk usage changes.", answer:"watch -n 2 df -h", hint:"watch -n <secs> <command>", difficulty:3, chapter:20 },
  { id:"L147", cmd:"wget", scenario:"Download a file recursively from `http://docs.site/` saving all HTML pages.", answer:"wget -r http://docs.site/", hint:"wget -r <url>", difficulty:3, chapter:20 },
  { id:"L148", cmd:"whoami", scenario:"Print the username of the currently logged-in user.", answer:"whoami", hint:"Single word command", difficulty:3, chapter:20 },
  { id:"L149", cmd:"xz", scenario:"Compress `kernel.tar` using xz compression (highest compression ratio).", answer:"xz -z kernel.tar", hint:"xz -z <file>", difficulty:3, chapter:20 },
  { id:"L150", cmd:"zcat", scenario:"View the contents of `archive.gz` without decompressing it to disk.", answer:"zcat archive.gz", hint:"zcat <file.gz>", difficulty:3, chapter:20 },

  // ── LEVEL 16-30: SUDO SENTINEL ── (Q151-250, Hard)
  { id:"L151", cmd:"awk", scenario:"Calculate the sum of column 3 in a space-delimited file `stats.txt`.", answer:"awk '{sum+=$3} END{print sum}' stats.txt", hint:"awk '{sum+=$N} END{print sum}' <file>", difficulty:4, chapter:21 },
  { id:"L152", cmd:"bash", scenario:"Write a one-liner bash loop that echoes numbers 1 through 10.", answer:"for i in {1..10}; do echo $i; done", hint:"for i in {1..10}; do echo $i; done", difficulty:4, chapter:21 },
  { id:"L153", cmd:"chroot", scenario:"Change root to the directory `/mnt/recovery` to repair a broken system.", answer:"chroot /mnt/recovery", hint:"chroot <path>", difficulty:4, chapter:21 },
  { id:"L154", cmd:"cgroups", scenario:"To limit a process to 2 CPUs using cgroups v2, what file do you write to?", answer:"cpuset.cpus", hint:"cgroup v2 CPU affinity file", difficulty:4, chapter:21 },
  { id:"L155", cmd:"compgen", scenario:"List all available bash shell builtins.", answer:"compgen -b", hint:"compgen -b", difficulty:4, chapter:21 },
  { id:"L156", cmd:"curl", scenario:"Test if a web server is alive: send a HEAD request to `http://10.0.0.1/` silently.", answer:"curl -sI http://10.0.0.1/", hint:"curl -sI <url>", difficulty:4, chapter:22 },
  { id:"L157", cmd:"dd", scenario:"Create a bootable ISO copy of `/dev/cdrom` to `bootable.iso`.", answer:"dd if=/dev/cdrom of=bootable.iso", hint:"dd if=<src> of=<dest>", difficulty:4, chapter:22 },
  { id:"L158", cmd:"debconf", scenario:"Reconfigure a package non-interactively — what flag to `dpkg-reconfigure` prevents prompts?", answer:"-f noninteractive", hint:"-f noninteractive", difficulty:4, chapter:22 },
  { id:"L159", cmd:"declare", scenario:"In bash, declare an integer variable `count` initialized to 0.", answer:"declare -i count=0", hint:"declare -i var=value", difficulty:4, chapter:22 },
  { id:"L160", cmd:"depmod", scenario:"Generate modules.dep file after installing a new kernel module.", answer:"depmod -a", hint:"depmod -a", difficulty:4, chapter:22 },
  { id:"L161", cmd:"env", scenario:"Run the command `python3 script.py` with `HOME` explicitly set to `/tmp`.", answer:"env HOME=/tmp python3 script.py", hint:"env VAR=val <command>", difficulty:4, chapter:23 },
  { id:"L162", cmd:"exec", scenario:"Replace the current shell process with `python3` (no subprocess fork).", answer:"exec python3", hint:"exec <command>", difficulty:4, chapter:23 },
  { id:"L163", cmd:"fallocate", scenario:"Pre-allocate a 2GB file named `swap.img` instantly.", answer:"fallocate -l 2G swap.img", hint:"fallocate -l <size> <file>", difficulty:4, chapter:23 },
  { id:"L164", cmd:"fdisk", scenario:"Launch the interactive partition editor on disk `/dev/sda`.", answer:"fdisk /dev/sda", hint:"fdisk <device>", difficulty:4, chapter:23 },
  { id:"L165", cmd:"find", scenario:"Find files modified in the last 24 hours under `/home`, owned by `alice`.", answer:"find /home -mtime -1 -user alice", hint:"find <path> -mtime -1 -user <user>", difficulty:4, chapter:23 },
  { id:"L166", cmd:"fuser", scenario:"Find which process is using port 80.", answer:"fuser 80/tcp", hint:"fuser <port>/tcp", difficulty:4, chapter:24 },
  { id:"L167", cmd:"getfacl", scenario:"Display the Access Control List for `secret.txt`.", answer:"getfacl secret.txt", hint:"getfacl <file>", difficulty:4, chapter:24 },
  { id:"L168", cmd:"grub", scenario:"After updating GRUB config, what command installs/updates GRUB to the MBR?", answer:"grub-install /dev/sda", hint:"grub-install <device>", difficulty:4, chapter:24 },
  { id:"L169", cmd:"hexdump", scenario:"Display the hex and ASCII content of the first 64 bytes of `binary.dat`.", answer:"hexdump -C -n 64 binary.dat", hint:"hexdump -C -n <bytes> <file>", difficulty:4, chapter:24 },
  { id:"L170", cmd:"inotifywait", scenario:"Monitor `/etc` directory for any file modifications in real-time.", answer:"inotifywait -m /etc", hint:"inotifywait -m <path>", difficulty:4, chapter:24 },
  { id:"L171", cmd:"iotop", scenario:"Monitor real-time disk I/O per process.", answer:"iotop", hint:"Single word command", difficulty:4, chapter:25 },
  { id:"L172", cmd:"ip", scenario:"Add a static route to `10.10.10.0/24` via gateway `192.168.1.1`.", answer:"ip route add 10.10.10.0/24 via 192.168.1.1", hint:"ip route add <network> via <gw>", difficulty:4, chapter:25 },
  { id:"L173", cmd:"iptables", scenario:"Block all incoming traffic from IP `1.2.3.4`.", answer:"iptables -A INPUT -s 1.2.3.4 -j DROP", hint:"iptables -A INPUT -s <ip> -j DROP", difficulty:4, chapter:25 },
  { id:"L174", cmd:"journalctl", scenario:"Filter journal logs from the last 2 hours and show only error-level entries.", answer:"journalctl --since '2 hours ago' -p err", hint:"journalctl --since '<time>' -p err", difficulty:4, chapter:25 },
  { id:"L175", cmd:"kmod", scenario:"Display information about the loaded kernel module `ext4`.", answer:"modinfo ext4", hint:"modinfo <module>", difficulty:4, chapter:25 },
  { id:"L176", cmd:"ldconfig", scenario:"After installing a new library to `/usr/local/lib`, update the linker cache.", answer:"ldconfig", hint:"Single word command", difficulty:4, chapter:26 },
  { id:"L177", cmd:"ldd", scenario:"Show which shared libraries the binary `/usr/bin/ls` depends on.", answer:"ldd /usr/bin/ls", hint:"ldd <binary>", difficulty:4, chapter:26 },
  { id:"L178", cmd:"lsmod", scenario:"List all currently loaded kernel modules.", answer:"lsmod", hint:"Single word command", difficulty:4, chapter:26 },
  { id:"L179", cmd:"ltrace", scenario:"Trace all library calls made by the program `./app`.", answer:"ltrace ./app", hint:"ltrace <program>", difficulty:4, chapter:26 },
  { id:"L180", cmd:"lvm", scenario:"Create a logical volume named `data_lv` of 10GB from volume group `vg0`.", answer:"lvcreate -L 10G -n data_lv vg0", hint:"lvcreate -L <size> -n <name> <vg>", difficulty:4, chapter:26 },
  { id:"L181", cmd:"make", scenario:"Compile a program from source: first configure, then what two commands run the build?", answer:"make && make install", hint:"make && make install", difficulty:4, chapter:27 },
  { id:"L182", cmd:"mkswap", scenario:"Initialize the swap partition `/dev/sda2` for use as swap space.", answer:"mkswap /dev/sda2", hint:"mkswap <device>", difficulty:4, chapter:27 },
  { id:"L183", cmd:"mtr", scenario:"Run a continuous network path diagnostic to `8.8.8.8` showing both traceroute and ping.", answer:"mtr 8.8.8.8", hint:"mtr <host>", difficulty:4, chapter:27 },
  { id:"L184", cmd:"nc", scenario:"Set up a basic TCP listener on port 4444 using netcat.", answer:"nc -lvp 4444", hint:"nc -lvp <port>", difficulty:4, chapter:27 },
  { id:"L185", cmd:"nfs", scenario:"Export the `/shared` directory to all hosts on the `192.168.1.0/24` network via NFS.", answer:"/shared 192.168.1.0/24(rw,sync)", hint:"Add to /etc/exports", difficulty:4, chapter:27 },
  { id:"L186", cmd:"nice", scenario:"Start `./cpu_task` with the lowest CPU priority (niceness 19).", answer:"nice -n 19 ./cpu_task", hint:"nice -n 19 <command>", difficulty:4, chapter:28 },
  { id:"L187", cmd:"nohup", scenario:"Run a script as a daemon, redirect all output to `daemon.log`.", answer:"nohup ./script.sh > daemon.log 2>&1 &", hint:"nohup <cmd> > <log> 2>&1 &", difficulty:4, chapter:28 },
  { id:"L188", cmd:"objdump", scenario:"Disassemble the binary `program` and show the assembly code.", answer:"objdump -d program", hint:"objdump -d <binary>", difficulty:4, chapter:28 },
  { id:"L189", cmd:"openssl", scenario:"Calculate the SHA256 hash of `firmware.bin` using openssl.", answer:"openssl dgst -sha256 firmware.bin", hint:"openssl dgst -sha256 <file>", difficulty:4, chapter:28 },
  { id:"L190", cmd:"parted", scenario:"Create a new GPT partition table on `/dev/sdb`.", answer:"parted /dev/sdb mklabel gpt", hint:"parted <dev> mklabel gpt", difficulty:4, chapter:28 },
  { id:"L191", cmd:"perf", scenario:"Profile CPU performance events for the command `./benchmark` for 5 seconds.", answer:"perf stat ./benchmark", hint:"perf stat <command>", difficulty:4, chapter:29 },
  { id:"L192", cmd:"pidstat", scenario:"Monitor CPU usage by process every 2 seconds.", answer:"pidstat 2", hint:"pidstat <interval>", difficulty:4, chapter:29 },
  { id:"L193", cmd:"ping", scenario:"Send exactly 4 ICMP packets to `8.8.8.8` and then stop.", answer:"ping -c 4 8.8.8.8", hint:"ping -c 4 <host>", difficulty:4, chapter:29 },
  { id:"L194", cmd:"pkexec", scenario:"Run a graphical application `synaptic` as root via PolicyKit.", answer:"pkexec synaptic", hint:"pkexec <app>", difficulty:4, chapter:29 },
  { id:"L195", cmd:"printf", scenario:"Print formatted output: the string 'Score: 42' to stdout using printf.", answer:"printf 'Score: %d\\n' 42", hint:"printf 'text: %d\\n' <value>", difficulty:4, chapter:29 },
  { id:"L196", cmd:"proc", scenario:"Which file in /proc contains the command-line arguments of PID 1234?", answer:"/proc/1234/cmdline", hint:"/proc/<PID>/cmdline", difficulty:4, chapter:30 },
  { id:"L197", cmd:"quota", scenario:"Set a hard disk quota of 1GB for user `bob` on filesystem `/dev/sda1`.", answer:"edquota -u bob", hint:"edquota -u <user>", difficulty:4, chapter:30 },
  { id:"L198", cmd:"readelf", scenario:"Display the ELF header of `binary.elf` to examine its architecture.", answer:"readelf -h binary.elf", hint:"readelf -h <file>", difficulty:4, chapter:30 },
  { id:"L199", cmd:"renice", scenario:"Change the priority of running process PID 555 to niceness level -5.", answer:"renice -5 555", hint:"renice <nice> <PID>", difficulty:4, chapter:30 },
  { id:"L200", cmd:"resize2fs", scenario:"Resize the ext4 filesystem on `/dev/sda1` to use all available partition space.", answer:"resize2fs /dev/sda1", hint:"resize2fs <device>", difficulty:4, chapter:30 },

  // ── LEVEL 31-50: KERNEL ARCHITECT ── (Q201-400, Expert)
  { id:"L201", cmd:"sar", scenario:"Collect CPU utilization data at 5-second intervals, 12 times.", answer:"sar -u 5 12", hint:"sar -u <interval> <count>", difficulty:5, chapter:31 },
  { id:"L202", cmd:"semanage", scenario:"List all SELinux file context rules for `/var/www`.", answer:"semanage fcontext -l | grep /var/www", hint:"semanage fcontext -l | grep <path>", difficulty:5, chapter:31 },
  { id:"L203", cmd:"set", scenario:"Enable bash strict mode: exit on error, unset variables, pipe failures.", answer:"set -euo pipefail", hint:"set -euo pipefail", difficulty:5, chapter:31 },
  { id:"L204", cmd:"setfacl", scenario:"Grant user `bob` read and write access to `shared.txt` via ACL.", answer:"setfacl -m u:bob:rw shared.txt", hint:"setfacl -m u:<user>:<perms> <file>", difficulty:5, chapter:31 },
  { id:"L205", cmd:"sftp", scenario:"Use SFTP to interactively connect to `backup@10.0.0.5`.", answer:"sftp backup@10.0.0.5", hint:"sftp user@host", difficulty:5, chapter:31 },
  { id:"L206", cmd:"sha256sum", scenario:"Verify a downloaded ISO by comparing it against `checksums.txt`.", answer:"sha256sum -c checksums.txt", hint:"sha256sum -c <checkfile>", difficulty:5, chapter:32 },
  { id:"L207", cmd:"signal", scenario:"What bash command sends SIGUSR1 (signal 10) to PID 7777?", answer:"kill -10 7777", hint:"kill -<signal> <PID>", difficulty:5, chapter:32 },
  { id:"L208", cmd:"socat", scenario:"Create a TCP relay: listen on port 8080, forward to `10.0.0.1:80`.", answer:"socat TCP-LISTEN:8080,fork TCP:10.0.0.1:80", hint:"socat TCP-LISTEN:<port>,fork TCP:<host>:<port>", difficulty:5, chapter:32 },
  { id:"L209", cmd:"sort", scenario:"Sort `data.txt` numerically by the 3rd field in reverse order.", answer:"sort -t' ' -k3 -rn data.txt", hint:"sort -t' ' -k<n> -rn <file>", difficulty:5, chapter:32 },
  { id:"L210", cmd:"ssh", scenario:"Create a reverse SSH tunnel from remote port 8080 to local port 80.", answer:"ssh -R 8080:localhost:80 user@remote.server", hint:"ssh -R <remote>:localhost:<local> user@host", difficulty:5, chapter:32 },
  { id:"L211", cmd:"ssh-keygen", scenario:"Generate a 4096-bit RSA SSH key pair, saving to `~/.ssh/id_rsa_deploy`.", answer:"ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa_deploy", hint:"ssh-keygen -t rsa -b 4096 -f <path>", difficulty:5, chapter:33 },
  { id:"L212", cmd:"ssh-copy-id", scenario:"Install your public key on remote server `deploy@10.0.0.2`.", answer:"ssh-copy-id deploy@10.0.0.2", hint:"ssh-copy-id user@host", difficulty:5, chapter:33 },
  { id:"L213", cmd:"strace", scenario:"Trace file-access syscalls of process `./app` and save output to `trace.log`.", answer:"strace -e trace=file ./app -o trace.log", hint:"strace -e trace=file <cmd> -o <log>", difficulty:5, chapter:33 },
  { id:"L214", cmd:"swapon", scenario:"Activate the swap space defined in `/etc/fstab` and show current swap usage.", answer:"swapon -a && swapon --show", hint:"swapon -a && swapon --show", difficulty:5, chapter:33 },
  { id:"L215", cmd:"syslog", scenario:"What facility.severity pair in rsyslog captures all kernel messages?", answer:"kern.*", hint:"kern.*", difficulty:5, chapter:33 },
  { id:"L216", cmd:"tc", scenario:"Apply a 100ms network delay to interface `eth0` for testing.", answer:"tc qdisc add dev eth0 root netem delay 100ms", hint:"tc qdisc add dev <if> root netem delay <ms>", difficulty:5, chapter:34 },
  { id:"L217", cmd:"tcpdump", scenario:"Capture HTTP traffic on interface `eth0` and save to `capture.pcap`.", answer:"tcpdump -i eth0 port 80 -w capture.pcap", hint:"tcpdump -i <if> port <n> -w <file>", difficulty:5, chapter:34 },
  { id:"L218", cmd:"tmux", scenario:"Attach to an existing tmux session named `production`.", answer:"tmux attach -t production", hint:"tmux attach -t <name>", difficulty:5, chapter:34 },
  { id:"L219", cmd:"tr", scenario:"Delete all digits from the string `abc123def456` using `tr`.", answer:"echo 'abc123def456' | tr -d '0-9'", hint:"echo <str> | tr -d '0-9'", difficulty:5, chapter:34 },
  { id:"L220", cmd:"tune2fs", scenario:"Set the maximum number of mounts before forced fsck to 50 on `/dev/sda1`.", answer:"tune2fs -c 50 /dev/sda1", hint:"tune2fs -c <count> <device>", difficulty:5, chapter:34 },
  { id:"L221", cmd:"ulimit", scenario:"Set the maximum number of open files for this shell session to 65535.", answer:"ulimit -n 65535", hint:"ulimit -n <value>", difficulty:5, chapter:35 },
  { id:"L222", cmd:"unshare", scenario:"Create a new network namespace and run a shell in it.", answer:"unshare --net /bin/bash", hint:"unshare --net <shell>", difficulty:5, chapter:35 },
  { id:"L223", cmd:"update-grub", scenario:"After editing `/etc/default/grub`, apply changes to the GRUB config file.", answer:"update-grub", hint:"Single word command", difficulty:5, chapter:35 },
  { id:"L224", cmd:"useradd", scenario:"Create system user `nginx` with no home directory and shell `/sbin/nologin`.", answer:"useradd -r -s /sbin/nologin -M nginx", hint:"useradd -r -s /sbin/nologin -M <user>", difficulty:5, chapter:35 },
  { id:"L225", cmd:"vgcreate", scenario:"Create an LVM volume group `vg_data` from physical volumes `/dev/sdb` and `/dev/sdc`.", answer:"vgcreate vg_data /dev/sdb /dev/sdc", hint:"vgcreate <name> <dev1> <dev2>", difficulty:5, chapter:35 },
  { id:"L226", cmd:"visudo", scenario:"Safely edit the sudoers file to avoid syntax errors.", answer:"visudo", hint:"Single word command", difficulty:5, chapter:36 },
  { id:"L227", cmd:"vmstat", scenario:"Display statistics showing memory, I/O, and CPU usage continuously every second.", answer:"vmstat 1", hint:"vmstat <interval>", difficulty:5, chapter:36 },
  { id:"L228", cmd:"vncserver", scenario:"Start VNC server on display :2 for remote desktop access.", answer:"vncserver :2", hint:"vncserver :<display>", difficulty:5, chapter:36 },
  { id:"L229", cmd:"wall", scenario:"Broadcast the message 'System going down in 5 min' to all logged-in users.", answer:"wall 'System going down in 5 min'", hint:"wall '<message>'", difficulty:5, chapter:36 },
  { id:"L230", cmd:"watch", scenario:"Execute `ss -s` every second and highlight differences between refreshes.", answer:"watch -n 1 -d ss -s", hint:"watch -n 1 -d <command>", difficulty:5, chapter:36 },
  { id:"L231", cmd:"xargs", scenario:"Find all `.pyc` files and delete them, handling spaces in filenames safely.", answer:"find . -name '*.pyc' -print0 | xargs -0 rm -f", hint:"find ... -print0 | xargs -0 rm -f", difficulty:5, chapter:37 },
  { id:"L232", cmd:"xxd", scenario:"Create a hex dump of `data.bin` and reverse it back from hex to binary.", answer:"xxd data.bin > data.hex && xxd -r data.hex > data2.bin", hint:"xxd <file> and xxd -r <hexfile>", difficulty:5, chapter:37 },
  { id:"L233", cmd:"yum", scenario:"Install the package group 'Development Tools' on RHEL/CentOS.", answer:"yum groupinstall 'Development Tools'", hint:"yum groupinstall '<group>'", difficulty:5, chapter:37 },
  { id:"L234", cmd:"zfs", scenario:"Create a ZFS pool named `datapool` using disks `/dev/sdb` and `/dev/sdc` as a mirror.", answer:"zpool create datapool mirror /dev/sdb /dev/sdc", hint:"zpool create <name> mirror <dev1> <dev2>", difficulty:5, chapter:37 },
  { id:"L235", cmd:"zip", scenario:"Add files to an existing zip archive `archive.zip` with maximum compression.", answer:"zip -9 archive.zip files/", hint:"zip -9 <archive> <files>", difficulty:5, chapter:37 },
  { id:"L236", cmd:"awk", scenario:"Print lines from `log.txt` where field 4 is greater than 1000.", answer:"awk '$4 > 1000' log.txt", hint:"awk '$N > value' <file>", difficulty:5, chapter:38 },
  { id:"L237", cmd:"bash", scenario:"Write a bash function named `log()` that echoes a timestamped message.", answer:"log() { echo \"[$(date '+%T')] $*\"; }", hint:"funcname() { echo \"[$(date)] $*\"; }", difficulty:5, chapter:38 },
  { id:"L238", cmd:"bpftrace", scenario:"Trace all calls to `open()` syscall on the system in real-time.", answer:"bpftrace -e 'tracepoint:syscalls:sys_enter_open { printf(\"%s\\n\", comm); }'", hint:"bpftrace -e 'tracepoint:syscalls:sys_enter_open ...'", difficulty:5, chapter:38 },
  { id:"L239", cmd:"cgexec", scenario:"Run process `./app` inside the cgroup `mygroup` under CPU subsystem.", answer:"cgexec -g cpu:mygroup ./app", hint:"cgexec -g cpu:<group> <command>", difficulty:5, chapter:38 },
  { id:"L240", cmd:"column", scenario:"Format the output of `mount` into aligned columns.", answer:"mount | column -t", hint:"command | column -t", difficulty:5, chapter:38 },
  { id:"L241", cmd:"compilekernel", scenario:"After extracting kernel source, what command generates a config based on current system hardware?", answer:"make localmodconfig", hint:"make localmodconfig", difficulty:5, chapter:39 },
  { id:"L242", cmd:"container", scenario:"Using `nsenter`, enter the network namespace of container process PID 1234.", answer:"nsenter -t 1234 -n /bin/bash", hint:"nsenter -t <PID> -n <shell>", difficulty:5, chapter:39 },
  { id:"L243", cmd:"cpio", scenario:"Create a cpio archive of all `.conf` files in the current directory.", answer:"find . -name '*.conf' | cpio -ov > config.cpio", hint:"find ... | cpio -ov > <archive>", difficulty:5, chapter:39 },
  { id:"L244", cmd:"cryptsetup", scenario:"Open the LUKS-encrypted device `/dev/sdb1` and map it as `secure_vol`.", answer:"cryptsetup luksOpen /dev/sdb1 secure_vol", hint:"cryptsetup luksOpen <device> <name>", difficulty:5, chapter:39 },
  { id:"L245", cmd:"curl", scenario:"Download a file only if it's newer than local `file.tar.gz`, resuming if interrupted.", answer:"curl -C - -z file.tar.gz -O http://example.com/file.tar.gz", hint:"curl -C - -z <local> -O <url>", difficulty:5, chapter:39 },
  { id:"L246", cmd:"dbus-send", scenario:"List all services registered on the system D-Bus.", answer:"dbus-send --print-reply --dest=org.freedesktop.DBus /org/freedesktop/DBus org.freedesktop.DBus.ListNames", hint:"dbus-send --dest=org.freedesktop.DBus ... ListNames", difficulty:5, chapter:40 },
  { id:"L247", cmd:"debugfs", scenario:"Open the ext4 filesystem on `/dev/sda1` in read-only debug mode.", answer:"debugfs -R 'ls' /dev/sda1", hint:"debugfs -R 'ls' <device>", difficulty:5, chapter:40 },
  { id:"L248", cmd:"diff", scenario:"Create a patch file from differences between `original/` and `modified/` directories.", answer:"diff -ruN original/ modified/ > changes.patch", hint:"diff -ruN <old/> <new/> > <patch>", difficulty:5, chapter:40 },
  { id:"L249", cmd:"dmidecode", scenario:"Extract the system's serial number from DMI/BIOS information.", answer:"dmidecode -s system-serial-number", hint:"dmidecode -s system-serial-number", difficulty:5, chapter:40 },
  { id:"L250", cmd:"dnf", scenario:"Search for all packages related to 'nginx' on Fedora/RHEL systems.", answer:"dnf search nginx", hint:"dnf search <package>", difficulty:5, chapter:40 },
  { id:"L251", cmd:"dracut", scenario:"Rebuild the initramfs for the current running kernel.", answer:"dracut --force", hint:"dracut --force", difficulty:5, chapter:41 },
  { id:"L252", cmd:"dtrace", scenario:"List all available DTrace probes matching the pattern `syscall::*open*`.", answer:"dtrace -l -n 'syscall::*open*'", hint:"dtrace -l -n '<pattern>'", difficulty:5, chapter:41 },
  { id:"L253", cmd:"e2fsck", scenario:"Force a full check of the ext4 filesystem on `/dev/sdb1`, even if it appears clean.", answer:"e2fsck -f /dev/sdb1", hint:"e2fsck -f <device>", difficulty:5, chapter:41 },
  { id:"L254", cmd:"ebpf", scenario:"What kernel feature lets you run sandboxed programs in the kernel for tracing and networking?", answer:"eBPF", hint:"Extended Berkeley Packet Filter", difficulty:5, chapter:41 },
  { id:"L255", cmd:"ethtool", scenario:"Show detailed information about the network interface `eth0` speed and duplex.", answer:"ethtool eth0", hint:"ethtool <interface>", difficulty:5, chapter:41 },
  { id:"L256", cmd:"expand", scenario:"Convert all tab characters in `code.py` to 4-space indentation.", answer:"expand -t 4 code.py", hint:"expand -t <n> <file>", difficulty:5, chapter:42 },
  { id:"L257", cmd:"firejail", scenario:"Run `firefox` in a sandboxed environment with `firejail`.", answer:"firejail firefox", hint:"firejail <application>", difficulty:5, chapter:42 },
  { id:"L258", cmd:"fmt", scenario:"Reformat `essay.txt` to have a maximum line width of 80 characters.", answer:"fmt -w 80 essay.txt", hint:"fmt -w <n> <file>", difficulty:5, chapter:42 },
  { id:"L259", cmd:"fold", scenario:"Wrap lines in `long_line.txt` at exactly 72 characters.", answer:"fold -w 72 long_line.txt", hint:"fold -w <n> <file>", difficulty:5, chapter:42 },
  { id:"L260", cmd:"gdb", scenario:"Start GDB to debug the binary `app` with a core dump file `core`.", answer:"gdb app core", hint:"gdb <binary> <corefile>", difficulty:5, chapter:42 },
  { id:"L261", cmd:"git", scenario:"Clone a repository from `https://github.com/user/repo.git` shallowly (depth 1).", answer:"git clone --depth 1 https://github.com/user/repo.git", hint:"git clone --depth 1 <url>", difficulty:5, chapter:43 },
  { id:"L262", cmd:"gpg", scenario:"Encrypt `secret.txt` for recipient `alice@example.com` using GPG.", answer:"gpg --encrypt --recipient alice@example.com secret.txt", hint:"gpg --encrypt --recipient <email> <file>", difficulty:5, chapter:43 },
  { id:"L263", cmd:"grep", scenario:"Show context: print 3 lines before and after each match of 'PANIC' in `kern.log`.", answer:"grep -B3 -A3 'PANIC' kern.log", hint:"grep -B<n> -A<n> '<pattern>' <file>", difficulty:5, chapter:43 },
  { id:"L264", cmd:"groupadd", scenario:"Create a new system group named `docker` with a specific GID of 999.", answer:"groupadd -g 999 docker", hint:"groupadd -g <GID> <name>", difficulty:5, chapter:43 },
  { id:"L265", cmd:"growpart", scenario:"Extend partition 1 on `/dev/sda` to use all remaining space.", answer:"growpart /dev/sda 1", hint:"growpart <device> <partition_number>", difficulty:5, chapter:43 },
  { id:"L266", cmd:"hdparm", scenario:"Measure the read speed of disk `/dev/sda` using hdparm.", answer:"hdparm -tT /dev/sda", hint:"hdparm -tT <device>", difficulty:5, chapter:44 },
  { id:"L267", cmd:"iconv", scenario:"Convert `file.txt` from ISO-8859-1 encoding to UTF-8.", answer:"iconv -f ISO-8859-1 -t UTF-8 file.txt > file_utf8.txt", hint:"iconv -f <from> -t <to> <file>", difficulty:5, chapter:44 },
  { id:"L268", cmd:"ifup", scenario:"Bring up the network interface `eth0`.", answer:"ifup eth0", hint:"ifup <interface>", difficulty:5, chapter:44 },
  { id:"L269", cmd:"init", scenario:"Switch the system to runlevel 3 (multi-user without GUI) using SysV init.", answer:"init 3", hint:"init <runlevel>", difficulty:5, chapter:44 },
  { id:"L270", cmd:"insmod", scenario:"Manually insert the kernel module `mydriver.ko` from current directory.", answer:"insmod ./mydriver.ko", hint:"insmod <module.ko>", difficulty:5, chapter:44 },
  { id:"L271", cmd:"ip6tables", scenario:"Block all incoming IPv6 traffic from the network `2001:db8::/32`.", answer:"ip6tables -A INPUT -s 2001:db8::/32 -j DROP", hint:"ip6tables -A INPUT -s <network> -j DROP", difficulty:5, chapter:45 },
  { id:"L272", cmd:"ipset", scenario:"Create an IP set named `blacklist` of type `hash:ip` for firewall use.", answer:"ipset create blacklist hash:ip", hint:"ipset create <name> hash:ip", difficulty:5, chapter:45 },
  { id:"L273", cmd:"ipvsadm", scenario:"Add a virtual service at `10.0.0.1:80` using round-robin LVS load balancing.", answer:"ipvsadm -A -t 10.0.0.1:80 -s rr", hint:"ipvsadm -A -t <vip>:<port> -s rr", difficulty:5, chapter:45 },
  { id:"L274", cmd:"iscsiadm", scenario:"Discover iSCSI targets on the server at `192.168.1.100`.", answer:"iscsiadm -m discovery -t st -p 192.168.1.100", hint:"iscsiadm -m discovery -t st -p <host>", difficulty:5, chapter:45 },
  { id:"L275", cmd:"jq", scenario:"Parse `data.json` and print the value of the key `status` from the root object.", answer:"jq '.status' data.json", hint:"jq '.<key>' <file>", difficulty:5, chapter:45 },
  { id:"L276", cmd:"kdump", scenario:"What is the kernel configuration option that enables kernel crash dumps?", answer:"CONFIG_KEXEC", hint:"CONFIG_KEXEC", difficulty:5, chapter:46 },
  { id:"L277", cmd:"kexec", scenario:"Load a new kernel `vmlinuz-new` for immediate reboot without BIOS POST.", answer:"kexec -l /boot/vmlinuz-new --initrd=/boot/initrd.img-new --reuse-cmdline", hint:"kexec -l <kernel> --initrd=<initrd> --reuse-cmdline", difficulty:5, chapter:46 },
  { id:"L278", cmd:"keyctl", scenario:"List all keyrings in the current kernel keyring session.", answer:"keyctl list @s", hint:"keyctl list @s", difficulty:5, chapter:46 },
  { id:"L279", cmd:"last", scenario:"Show the 20 most recent login records.", answer:"last -n 20", hint:"last -n <count>", difficulty:5, chapter:46 },
  { id:"L280", cmd:"lastb", scenario:"Show the last 10 failed login attempts.", answer:"lastb -n 10", hint:"lastb -n <count>", difficulty:5, chapter:46 },
  { id:"L281", cmd:"ldap", scenario:"Search LDAP directory at `ldap.local` for all users in `ou=people`.", answer:"ldapsearch -H ldap://ldap.local -b 'ou=people,dc=local,dc=com' '(objectClass=person)'", hint:"ldapsearch -H <url> -b '<base>' '<filter>'", difficulty:5, chapter:47 },
  { id:"L282", cmd:"less", scenario:"Open `large.log` and jump to the end immediately.", answer:"less +G large.log", hint:"less +G <file>", difficulty:5, chapter:47 },
  { id:"L283", cmd:"lsattr", scenario:"List the extended attributes of all files in `/etc/` to find immutable ones.", answer:"lsattr /etc/", hint:"lsattr <directory>", difficulty:5, chapter:47 },
  { id:"L284", cmd:"lscpu", scenario:"Display detailed CPU architecture and topology information.", answer:"lscpu", hint:"Single word command", difficulty:5, chapter:47 },
  { id:"L285", cmd:"lsmem", scenario:"Display the memory ranges and their online/offline status.", answer:"lsmem", hint:"Single word command", difficulty:5, chapter:47 },
  { id:"L286", cmd:"lz4", scenario:"Compress `bigfile.tar` using lz4 for extremely fast compression.", answer:"lz4 bigfile.tar bigfile.tar.lz4", hint:"lz4 <source> <dest>", difficulty:5, chapter:48 },
  { id:"L287", cmd:"mknod", scenario:"Create a named pipe (FIFO) named `queue.pipe` in `/tmp`.", answer:"mknod /tmp/queue.pipe p", hint:"mknod <path> p", difficulty:5, chapter:48 },
  { id:"L288", cmd:"modinfo", scenario:"Show the parameters accepted by the kernel module `usbcore`.", answer:"modinfo -p usbcore", hint:"modinfo -p <module>", difficulty:5, chapter:48 },
  { id:"L289", cmd:"mount", scenario:"Mount an NFS share `server:/exports/data` to `/mnt/nfs` with read-only and hard mount options.", answer:"mount -o ro,hard server:/exports/data /mnt/nfs", hint:"mount -o ro,hard <nfs_path> <mountpoint>", difficulty:5, chapter:48 },
  { id:"L290", cmd:"mpstat", scenario:"Report CPU statistics for each individual core every 2 seconds.", answer:"mpstat -P ALL 2", hint:"mpstat -P ALL <interval>", difficulty:5, chapter:48 },
  { id:"L291", cmd:"nc", scenario:"Transfer `data.tar.gz` from machine A to machine B using netcat on port 9000.", answer:"nc -l 9000 > data.tar.gz  (receiver) / nc 10.0.0.2 9000 < data.tar.gz (sender)", hint:"nc -l <port> > file / nc <host> <port> < file", difficulty:5, chapter:49 },
  { id:"L292", cmd:"nethogs", scenario:"Monitor network bandwidth per process in real-time.", answer:"nethogs", hint:"Single word command", difficulty:5, chapter:49 },
  { id:"L293", cmd:"networkctl", scenario:"Show detailed status of all network links using systemd-networkd.", answer:"networkctl status", hint:"networkctl status", difficulty:5, chapter:49 },
  { id:"L294", cmd:"nft", scenario:"Using nftables, list all current rules in all tables.", answer:"nft list ruleset", hint:"nft list ruleset", difficulty:5, chapter:49 },
  { id:"L295", cmd:"nmcli", scenario:"Connect to WiFi network `CryptoNet` with password `p4ssw0rd` using NetworkManager.", answer:"nmcli dev wifi connect 'CryptoNet' password 'p4ssw0rd'", hint:"nmcli dev wifi connect '<ssid>' password '<pass>'", difficulty:5, chapter:49 },
  { id:"L296", cmd:"nsenter", scenario:"Enter all namespaces of container process PID 5000 and get a shell.", answer:"nsenter -t 5000 -m -u -i -n -p /bin/bash", hint:"nsenter -t <PID> -m -u -i -n -p <shell>", difficulty:5, chapter:50 },
  { id:"L297", cmd:"numactl", scenario:"Run `./app` constraining memory allocation to NUMA node 0.", answer:"numactl --membind=0 ./app", hint:"numactl --membind=<node> <command>", difficulty:5, chapter:50 },
  { id:"L298", cmd:"od", scenario:"Display `binary.dat` as hexadecimal bytes with byte offset.", answer:"od -A x -t x1z binary.dat", hint:"od -A x -t x1z <file>", difficulty:5, chapter:50 },
  { id:"L299", cmd:"pam", scenario:"Which PAM module in `/etc/pam.d/sshd` enforces password complexity rules?", answer:"pam_pwquality.so", hint:"pam_pwquality.so", difficulty:5, chapter:50 },
  { id:"L300", cmd:"patch", scenario:"Apply the patch file `changes.patch` to update source code.", answer:"patch -p1 < changes.patch", hint:"patch -p1 < <patchfile>", difficulty:5, chapter:50 },
  // Continue with more expert questions
  { id:"L301", cmd:"perf", scenario:"Record a CPU flame graph for `./server` for 10 seconds.", answer:"perf record -g -a sleep 10 && perf report", hint:"perf record -g -a sleep <n>", difficulty:5, chapter:51 },
  { id:"L302", cmd:"pivot_root", scenario:"What syscall switches the root filesystem during early boot init?", answer:"pivot_root", hint:"pivot_root", difficulty:5, chapter:51 },
  { id:"L303", cmd:"pkg-config", scenario:"Get the compiler flags needed to build against the `openssl` library.", answer:"pkg-config --cflags --libs openssl", hint:"pkg-config --cflags --libs <lib>", difficulty:5, chapter:51 },
  { id:"L304", cmd:"pmap", scenario:"Show the memory map of process PID 2345.", answer:"pmap 2345", hint:"pmap <PID>", difficulty:5, chapter:51 },
  { id:"L305", cmd:"postfix", scenario:"What command reloads postfix mail server configuration without restart?", answer:"postfix reload", hint:"postfix reload", difficulty:5, chapter:51 },
  { id:"L306", cmd:"pvs", scenario:"Display all physical volumes in an LVM setup.", answer:"pvs", hint:"Single word command", difficulty:5, chapter:52 },
  { id:"L307", cmd:"qemu", scenario:"Boot an x86_64 VM with 2GB RAM from ISO `linux.iso` using KVM acceleration.", answer:"qemu-system-x86_64 -m 2048 -enable-kvm -cdrom linux.iso", hint:"qemu-system-x86_64 -m <ram> -enable-kvm -cdrom <iso>", difficulty:5, chapter:52 },
  { id:"L308", cmd:"quota", scenario:"Enable quota on `/dev/sda1` by adding which two mount options in `/etc/fstab`?", answer:"usrquota,grpquota", hint:"usrquota,grpquota", difficulty:5, chapter:52 },
  { id:"L309", cmd:"rclone", scenario:"Sync local directory `~/data` to S3 bucket `s3:mybucket/data`.", answer:"rclone sync ~/data s3:mybucket/data", hint:"rclone sync <src> <dest>", difficulty:5, chapter:52 },
  { id:"L310", cmd:"rdiff-backup", scenario:"Create an incremental backup of `/home` to `/backups/home`.", answer:"rdiff-backup /home /backups/home", hint:"rdiff-backup <src> <dest>", difficulty:5, chapter:52 },
  { id:"L311", cmd:"regex", scenario:"Write a grep regex that matches lines starting with an IP address pattern.", answer:"grep -E '^([0-9]{1,3}\\.){3}[0-9]{1,3}' file.txt", hint:"grep -E '^([0-9]{1,3}\\.){3}[0-9]{1,3}' <file>", difficulty:5, chapter:53 },
  { id:"L312", cmd:"resolvectl", scenario:"Flush the systemd-resolved DNS cache.", answer:"resolvectl flush-caches", hint:"resolvectl flush-caches", difficulty:5, chapter:53 },
  { id:"L313", cmd:"restorecon", scenario:"Restore the SELinux context of `/var/www/html` recursively.", answer:"restorecon -Rv /var/www/html", hint:"restorecon -Rv <path>", difficulty:5, chapter:53 },
  { id:"L314", cmd:"rfkill", scenario:"Unblock all wireless interfaces that are software-blocked.", answer:"rfkill unblock all", hint:"rfkill unblock all", difficulty:5, chapter:53 },
  { id:"L315", cmd:"route", scenario:"Add a default gateway of `192.168.1.254` to the routing table.", answer:"route add default gw 192.168.1.254", hint:"route add default gw <IP>", difficulty:5, chapter:53 },
  { id:"L316", cmd:"rpm", scenario:"Query which package owns the file `/usr/bin/python3`.", answer:"rpm -qf /usr/bin/python3", hint:"rpm -qf <file>", difficulty:5, chapter:54 },
  { id:"L317", cmd:"rsync", scenario:"Mirror `/var/www` to remote, deleting files on remote that no longer exist locally.", answer:"rsync -avz --delete /var/www/ user@remote:/var/www/", hint:"rsync -avz --delete <src> <dest>", difficulty:5, chapter:54 },
  { id:"L318", cmd:"runcon", scenario:"Run `./app` under SELinux context `unconfined_u:unconfined_r:unconfined_t:s0`.", answer:"runcon 'unconfined_u:unconfined_r:unconfined_t:s0' ./app", hint:"runcon '<context>' <command>", difficulty:5, chapter:54 },
  { id:"L319", cmd:"sadf", scenario:"Display historical CPU data collected by sar in JSON format.", answer:"sadf -j -- -u", hint:"sadf -j -- -u", difficulty:5, chapter:54 },
  { id:"L320", cmd:"salt", scenario:"Using SaltStack, apply all state files to a minion `web01`.", answer:"salt 'web01' state.apply", hint:"salt '<minion>' state.apply", difficulty:5, chapter:54 },
  { id:"L321", cmd:"screen", scenario:"Reconnect to a detached screen session with ID 12345.", answer:"screen -r 12345", hint:"screen -r <id>", difficulty:5, chapter:55 },
  { id:"L322", cmd:"seccomp", scenario:"What system call installs a seccomp filter to restrict available syscalls?", answer:"prctl(PR_SET_SECCOMP, SECCOMP_MODE_FILTER, ...)", hint:"prctl with PR_SET_SECCOMP", difficulty:5, chapter:55 },
  { id:"L323", cmd:"sed", scenario:"Delete all blank lines from `file.txt` in-place.", answer:"sed -i '/^$/d' file.txt", hint:"sed -i '/^$/d' <file>", difficulty:5, chapter:55 },
  { id:"L324", cmd:"sendmail", scenario:"Send a test email from CLI to `test@example.com` piped from echo.", answer:"echo 'Test body' | sendmail test@example.com", hint:"echo '<body>' | sendmail <email>", difficulty:5, chapter:55 },
  { id:"L325", cmd:"setpriv", scenario:"Run `./app` with only the `CAP_NET_BIND_SERVICE` Linux capability.", answer:"setpriv --inh-caps +net_bind_service --ambient-caps +net_bind_service ./app", hint:"setpriv --inh-caps +net_bind_service ...", difficulty:5, chapter:55 },
  { id:"L326", cmd:"sfdisk", scenario:"Script partition layout from `disk.layout` to `/dev/sdb` non-interactively.", answer:"sfdisk /dev/sdb < disk.layout", hint:"sfdisk <device> < <layout>", difficulty:5, chapter:56 },
  { id:"L327", cmd:"sgdisk", scenario:"Convert MBR partition table on `/dev/sdb` to GPT.", answer:"sgdisk -g /dev/sdb", hint:"sgdisk -g <device>", difficulty:5, chapter:56 },
  { id:"L328", cmd:"skill", scenario:"Send SIGSTOP to all processes owned by user `tom`.", answer:"skill -STOP -u tom", hint:"skill -STOP -u <user>", difficulty:5, chapter:56 },
  { id:"L329", cmd:"skopeo", scenario:"Copy a Docker image from `docker.io/nginx` to a local OCI directory.", answer:"skopeo copy docker://nginx oci:./nginx-local", hint:"skopeo copy docker://<img> oci:<dest>", difficulty:5, chapter:56 },
  { id:"L330", cmd:"snap", scenario:"Install `code` (VS Code) from the snap store.", answer:"snap install code --classic", hint:"snap install <package> --classic", difficulty:5, chapter:56 },
  { id:"L331", cmd:"socat", scenario:"Create a bidirectional relay between two Unix domain sockets.", answer:"socat UNIX-LISTEN:/tmp/sock1,fork UNIX-CONNECT:/tmp/sock2", hint:"socat UNIX-LISTEN:<path>,fork UNIX-CONNECT:<path>", difficulty:5, chapter:57 },
  { id:"L332", cmd:"spec", scenario:"In an RPM spec file, which section defines how to build the software?", answer:"%build", hint:"%build", difficulty:5, chapter:57 },
  { id:"L333", cmd:"ssh", scenario:"Set up a SOCKS5 proxy on local port 1080 via SSH to `jump.server`.", answer:"ssh -D 1080 -f -C -q -N user@jump.server", hint:"ssh -D 1080 -f -C -q -N user@host", difficulty:5, chapter:57 },
  { id:"L334", cmd:"stap", scenario:"Write a SystemTap one-liner to trace all `open` syscalls.", answer:"stap -e 'probe syscall.open { printf(\"%s %s\\n\", execname(), filename) }'", hint:"stap -e 'probe syscall.open { ... }'", difficulty:5, chapter:57 },
  { id:"L335", cmd:"strings", scenario:"Extract strings of at least 8 characters from suspicious binary `payload.bin`.", answer:"strings -n 8 payload.bin", hint:"strings -n <min_len> <file>", difficulty:5, chapter:57 },
  { id:"L336", cmd:"stunnel", scenario:"What config directive in stunnel.conf specifies the service certificate?", answer:"cert = /path/to/cert.pem", hint:"cert = <path>", difficulty:5, chapter:58 },
  { id:"L337", cmd:"sudo", scenario:"Run `visudo` as root while preserving your current environment variables.", answer:"sudo -E visudo", hint:"sudo -E <command>", difficulty:5, chapter:58 },
  { id:"L338", cmd:"swapoff", scenario:"Disable all active swap partitions on the system.", answer:"swapoff -a", hint:"swapoff -a", difficulty:5, chapter:58 },
  { id:"L339", cmd:"switch_root", scenario:"In an initramfs environment, what command transfers control to the real root filesystem?", answer:"switch_root /newroot /sbin/init", hint:"switch_root <newroot> <init>", difficulty:5, chapter:58 },
  { id:"L340", cmd:"sync", scenario:"Flush all pending disk writes to ensure data integrity before unmounting.", answer:"sync", hint:"Single word command", difficulty:5, chapter:58 },
  { id:"L341", cmd:"systemd-analyze", scenario:"Show how long each service took to start during the last boot.", answer:"systemd-analyze blame", hint:"systemd-analyze blame", difficulty:5, chapter:59 },
  { id:"L342", cmd:"systemd-cgls", scenario:"Show the systemd cgroup hierarchy as a tree.", answer:"systemd-cgls", hint:"Single word command", difficulty:5, chapter:59 },
  { id:"L343", cmd:"systemd-nspawn", scenario:"Boot a systemd-nspawn container from the directory `/var/lib/machines/mycontainer`.", answer:"systemd-nspawn -bD /var/lib/machines/mycontainer", hint:"systemd-nspawn -bD <path>", difficulty:5, chapter:59 },
  { id:"L344", cmd:"systemd-resolve", scenario:"Show the DNS resolution of `example.com` with full DNSSEC info.", answer:"systemd-resolve --status example.com", hint:"systemd-resolve --status <domain>", difficulty:5, chapter:59 },
  { id:"L345", cmd:"taskset", scenario:"Pin process PID 9000 to run only on CPU cores 0 and 1.", answer:"taskset -cp 0,1 9000", hint:"taskset -cp <cores> <PID>", difficulty:5, chapter:59 },
  { id:"L346", cmd:"tcpflow", scenario:"Capture and reconstruct a TCP stream on port 443.", answer:"tcpflow -c -i eth0 port 443", hint:"tcpflow -c -i <if> port <n>", difficulty:5, chapter:60 },
  { id:"L347", cmd:"tpm2", scenario:"Get a random 32-byte value from the hardware TPM chip.", answer:"tpm2_getrandom 32", hint:"tpm2_getrandom <bytes>", difficulty:5, chapter:60 },
  { id:"L348", cmd:"trace-cmd", scenario:"Record all kernel events for 5 seconds and save to `trace.dat`.", answer:"trace-cmd record -a sleep 5", hint:"trace-cmd record -a sleep <n>", difficulty:5, chapter:60 },
  { id:"L349", cmd:"tshark", scenario:"Capture 100 packets on `eth0` and save to `capture.pcapng`.", answer:"tshark -i eth0 -c 100 -w capture.pcapng", hint:"tshark -i <if> -c <n> -w <file>", difficulty:5, chapter:60 },
  { id:"L350", cmd:"tune2fs", scenario:"Enable journaling on an ext2 filesystem at `/dev/sdb1` converting it to ext3.", answer:"tune2fs -j /dev/sdb1", hint:"tune2fs -j <device>", difficulty:5, chapter:60 },
  { id:"L351", cmd:"udevadm", scenario:"Monitor udev events in real-time as devices are plugged/unplugged.", answer:"udevadm monitor", hint:"udevadm monitor", difficulty:5, chapter:61 },
  { id:"L352", cmd:"ulimit", scenario:"Set the core dump size to unlimited for debugging crashes.", answer:"ulimit -c unlimited", hint:"ulimit -c unlimited", difficulty:5, chapter:61 },
  { id:"L353", cmd:"umask", scenario:"Set the default permission mask so new files are created with `640` permissions.", answer:"umask 027", hint:"umask <value>", difficulty:5, chapter:61 },
  { id:"L354", cmd:"unshare", scenario:"Create a new PID namespace and mount a fresh `/proc` for isolation.", answer:"unshare --pid --mount-proc /bin/bash", hint:"unshare --pid --mount-proc <shell>", difficulty:5, chapter:61 },
  { id:"L355", cmd:"update-rc.d", scenario:"Remove the `apache2` SysV init script from all runlevel startup.", answer:"update-rc.d apache2 remove", hint:"update-rc.d <service> remove", difficulty:5, chapter:61 },
  { id:"L356", cmd:"valgrind", scenario:"Run `./app` under Valgrind to detect memory leaks.", answer:"valgrind --leak-check=full ./app", hint:"valgrind --leak-check=full <binary>", difficulty:5, chapter:62 },
  { id:"L357", cmd:"vconfig", scenario:"Create VLAN interface `eth0.100` for VLAN ID 100.", answer:"vconfig add eth0 100", hint:"vconfig add <iface> <vlan_id>", difficulty:5, chapter:62 },
  { id:"L358", cmd:"vgextend", scenario:"Add physical volume `/dev/sdc` to the volume group `vg_data`.", answer:"vgextend vg_data /dev/sdc", hint:"vgextend <vg> <device>", difficulty:5, chapter:62 },
  { id:"L359", cmd:"vim", scenario:"In Vim, execute a shell command `ls -la` without leaving the editor.", answer:":!ls -la", hint:":!<command>", difficulty:5, chapter:62 },
  { id:"L360", cmd:"virsh", scenario:"List all running KVM/libvirt virtual machines.", answer:"virsh list", hint:"virsh list", difficulty:5, chapter:62 },
  { id:"L361", cmd:"wg", scenario:"Display the current WireGuard VPN interface status and peers.", answer:"wg show", hint:"wg show", difficulty:5, chapter:63 },
  { id:"L362", cmd:"wipefs", scenario:"Erase all filesystem signatures from `/dev/sdb` before repartitioning.", answer:"wipefs -a /dev/sdb", hint:"wipefs -a <device>", difficulty:5, chapter:63 },
  { id:"L363", cmd:"x86_64-linux-gnu-gcc", scenario:"Cross-compile `main.c` for x86_64 Linux on an ARM host.", answer:"x86_64-linux-gnu-gcc -o main main.c", hint:"x86_64-linux-gnu-gcc -o <out> <src>", difficulty:5, chapter:63 },
  { id:"L364", cmd:"xattr", scenario:"List extended attributes of `document.pdf`.", answer:"xattr -l document.pdf", hint:"xattr -l <file>", difficulty:5, chapter:63 },
  { id:"L365", cmd:"xdotool", scenario:"Simulate pressing Ctrl+C using xdotool to kill a frozen GUI app.", answer:"xdotool key ctrl+c", hint:"xdotool key <keycombo>", difficulty:5, chapter:63 },
  { id:"L366", cmd:"xl", scenario:"Using Xen hypervisor, list all running VMs.", answer:"xl list", hint:"xl list", difficulty:5, chapter:64 },
  { id:"L367", cmd:"xmllint", scenario:"Validate `config.xml` against its schema `config.xsd`.", answer:"xmllint --schema config.xsd config.xml", hint:"xmllint --schema <xsd> <xml>", difficulty:5, chapter:64 },
  { id:"L368", cmd:"xz", scenario:"Decompress a `.tar.xz` archive named `source.tar.xz`.", answer:"tar -xJf source.tar.xz", hint:"tar -xJf <file.tar.xz>", difficulty:5, chapter:64 },
  { id:"L369", cmd:"yum", scenario:"List all packages that provide the file `/usr/bin/vim` on RHEL.", answer:"yum provides /usr/bin/vim", hint:"yum provides <file>", difficulty:5, chapter:64 },
  { id:"L370", cmd:"zabbix_sender", scenario:"Send a custom metric `system.load` with value `0.42` to Zabbix server.", answer:"zabbix_sender -z 127.0.0.1 -s 'myhost' -k system.load -o 0.42", hint:"zabbix_sender -z <host> -s <src> -k <key> -o <val>", difficulty:5, chapter:64 },
  { id:"L371", cmd:"zfs", scenario:"Take a ZFS snapshot of dataset `datapool/home` named `snap_20991231`.", answer:"zfs snapshot datapool/home@snap_20991231", hint:"zfs snapshot <dataset>@<name>", difficulty:5, chapter:65 },
  { id:"L372", cmd:"zsh", scenario:"In Zsh, what built-in command lists all available completion functions?", answer:"compdef", hint:"compdef", difficulty:5, chapter:65 },
  { id:"L373", cmd:"zypper", scenario:"Install `htop` on openSUSE using zypper.", answer:"zypper install htop", hint:"zypper install <package>", difficulty:5, chapter:65 },
  { id:"L374", cmd:"ansible", scenario:"Run an Ansible playbook `deploy.yml` against inventory `hosts.ini`.", answer:"ansible-playbook -i hosts.ini deploy.yml", hint:"ansible-playbook -i <inventory> <playbook>", difficulty:5, chapter:65 },
  { id:"L375", cmd:"docker", scenario:"Build a Docker image from `Dockerfile` in the current directory, tagged `myapp:v1`.", answer:"docker build -t myapp:v1 .", hint:"docker build -t <tag> .", difficulty:5, chapter:65 },
  { id:"L376", cmd:"kubectl", scenario:"Get all pods in namespace `production` showing their node assignments.", answer:"kubectl get pods -n production -o wide", hint:"kubectl get pods -n <ns> -o wide", difficulty:5, chapter:66 },
  { id:"L377", cmd:"terraform", scenario:"Initialize a Terraform working directory and download providers.", answer:"terraform init", hint:"terraform init", difficulty:5, chapter:66 },
  { id:"L378", cmd:"helm", scenario:"Install a Helm chart `nginx` from the `stable` repository into namespace `web`.", answer:"helm install nginx stable/nginx -n web", hint:"helm install <name> <chart> -n <ns>", difficulty:5, chapter:66 },
  { id:"L379", cmd:"podman", scenario:"Run container `nginx:latest` detached and map host port 8080 to container port 80.", answer:"podman run -d -p 8080:80 nginx:latest", hint:"podman run -d -p <host>:<cont> <image>", difficulty:5, chapter:66 },
  { id:"L380", cmd:"systemctl", scenario:"Create a transient systemd service named `test.service` that runs `echo hello` once.", answer:"systemd-run --unit=test echo hello", hint:"systemd-run --unit=<name> <cmd>", difficulty:5, chapter:66 },
  { id:"L381", cmd:"auditctl", scenario:"Add an audit rule to log all execve() calls by user `root`.", answer:"auditctl -a always,exit -F arch=b64 -S execve -F uid=0", hint:"auditctl -a always,exit -F arch=b64 -S execve -F uid=0", difficulty:5, chapter:67 },
  { id:"L382", cmd:"ausearch", scenario:"Search the audit log for all failed login attempts.", answer:"ausearch --message USER_AUTH --success no", hint:"ausearch --message USER_AUTH --success no", difficulty:5, chapter:67 },
  { id:"L383", cmd:"bindmount", scenario:"Bind mount `/opt/app` to `/srv/app` so both paths access the same data.", answer:"mount --bind /opt/app /srv/app", hint:"mount --bind <src> <dest>", difficulty:5, chapter:67 },
  { id:"L384", cmd:"btrfs", scenario:"Create a Btrfs subvolume at `/data/subvol1`.", answer:"btrfs subvolume create /data/subvol1", hint:"btrfs subvolume create <path>", difficulty:5, chapter:67 },
  { id:"L385", cmd:"capsh", scenario:"Print the current capabilities of the running shell.", answer:"capsh --print", hint:"capsh --print", difficulty:5, chapter:67 },
  { id:"L386", cmd:"containerd", scenario:"What CLI tool is used to manage containerd directly for debugging?", answer:"ctr", hint:"ctr", difficulty:5, chapter:68 },
  { id:"L387", cmd:"criu", scenario:"Checkpoint (dump) a running process with PID 4000 to directory `/tmp/checkpoint`.", answer:"criu dump -t 4000 -D /tmp/checkpoint", hint:"criu dump -t <PID> -D <dir>", difficulty:5, chapter:68 },
  { id:"L388", cmd:"cryptmount", scenario:"Mount a cryptmount-managed volume named `private` to its configured path.", answer:"cryptmount private", hint:"cryptmount <volume>", difficulty:5, chapter:68 },
  { id:"L389", cmd:"eBPF", scenario:"What kernel version introduced the BPF Type Format (BTF) for portable eBPF programs?", answer:"5.2", hint:"Linux 5.2", difficulty:5, chapter:68 },
  { id:"L390", cmd:"fio", scenario:"Run a random read performance test on `/dev/sdb` using fio.", answer:"fio --name=rand-read --ioengine=libaio --rw=randread --bs=4k --filename=/dev/sdb --direct=1", hint:"fio --name=... --rw=randread ...", difficulty:5, chapter:68 },
  { id:"L391", cmd:"getenforce", scenario:"Check the current SELinux enforcement mode.", answer:"getenforce", hint:"Single word command", difficulty:5, chapter:69 },
  { id:"L392", cmd:"ipmitool", scenario:"Display the system's hardware power status via IPMI.", answer:"ipmitool chassis power status", hint:"ipmitool chassis power status", difficulty:5, chapter:69 },
  { id:"L393", cmd:"lvm", scenario:"Extend logical volume `data_lv` by 5GB while the filesystem is mounted.", answer:"lvextend -L +5G /dev/vg0/data_lv && resize2fs /dev/vg0/data_lv", hint:"lvextend -L +<size> <lv> && resize2fs <lv>", difficulty:5, chapter:69 },
  { id:"L394", cmd:"mdadm", scenario:"Create a RAID5 array `/dev/md0` from three drives `/dev/sdb`, `/dev/sdc`, `/dev/sdd`.", answer:"mdadm --create /dev/md0 --level=5 --raid-devices=3 /dev/sdb /dev/sdc /dev/sdd", hint:"mdadm --create <md> --level=5 --raid-devices=3 <devs>", difficulty:5, chapter:69 },
  { id:"L395", cmd:"mkosi", scenario:"What is the name of the tool that builds OS images from configuration files, developed by systemd team?", answer:"mkosi", hint:"mkosi", difficulty:5, chapter:69 },
  { id:"L396", cmd:"nixos", scenario:"In NixOS, what command applies the system configuration in `/etc/nixos/configuration.nix`?", answer:"nixos-rebuild switch", hint:"nixos-rebuild switch", difficulty:5, chapter:70 },
  { id:"L397", cmd:"ostree", scenario:"Pull an OSTree commit from a remote named `origin`.", answer:"ostree pull origin", hint:"ostree pull <remote>", difficulty:5, chapter:70 },
  { id:"L398", cmd:"sbctl", scenario:"Enroll your custom Secure Boot keys using sbctl.", answer:"sbctl enroll-keys", hint:"sbctl enroll-keys", difficulty:5, chapter:70 },
  { id:"L399", cmd:"systemd-boot", scenario:"Install systemd-boot (bootctl) to the EFI partition.", answer:"bootctl install", hint:"bootctl install", difficulty:5, chapter:70 },
  { id:"L400", cmd:"zfs", scenario:"Enable ZFS ARC (Adaptive Replacement Cache) compression on dataset `tank/data`.", answer:"zfs set compression=lz4 tank/data", hint:"zfs set compression=lz4 <dataset>", difficulty:5, chapter:70 },
];

const BONUS_QUESTIONS = [
  { id:"H001", era:"1943", scenario:"Built at Bletchley Park to crack Nazi High Command codes, what was the world's first programmable digital electronic computer?", answer:"Colossus", hint:"It was named after a mythical giant structure" },
  { id:"H002", era:"1945", scenario:"ENIAC, the first general-purpose electronic computer, was primarily built to calculate what for the US Army?", answer:"Ballistic Tables", hint:"Calculations for artillery trajectories" },
  { id:"H003", era:"1947", scenario:"This invention at Bell Labs replaced vacuum tubes and paved the way for miniaturized circuits. What was it?", answer:"Transistor", hint:"A semiconductor device for switching/amplifying" },
  { id:"H004", era:"1952", scenario:"Which computer famously predicted Eisenhower's landslide victory on live television?", answer:"UNIVAC I", hint:"Universal Automatic Computer, first gen" },
  { id:"H005", era:"1956", scenario:"IBM's 350 disk storage drive held 5MB on 50 platters and introduced what revolutionary storage concept?", answer:"Random Access Storage", hint:"Non-sequential data retrieval from magnetic disks" },
  { id:"H006", era:"1957", scenario:"This foundational programming language, developed by Grace Hopper's team, was the first for business data processing.", answer:"COBOL", hint:"Common Business-Oriented Language" },
  { id:"H007", era:"1958", scenario:"Jack Kilby at Texas Instruments created the first working version of what foundational electronic component?", answer:"Integrated Circuit", hint:"Multiple transistors on a single semiconductor chip" },
  { id:"H008", era:"1960", scenario:"This early time-sharing OS developed at MIT demonstrated that multiple users could share a computer simultaneously.", answer:"CTSS", hint:"Compatible Time-Sharing System" },
  { id:"H009", era:"1964", scenario:"Developed by IBM, this was the first family of computers designed to share the same architecture and software.", answer:"System/360", hint:"IBM's revolutionary compatible computer family" },
  { id:"H010", era:"1965", scenario:"Gordon Moore predicted transistor density on chips would double approximately every two years. What is this called?", answer:"Moore's Law", hint:"Famous semiconductor scaling prediction" },
  { id:"H011", era:"1969", scenario:"Before the Internet, this US Department of Defense packet-switched network enabled computers to communicate. Name it.", answer:"ARPANET", hint:"Advanced Research Projects Agency Network" },
  { id:"H012", era:"1969", scenario:"Ken Thompson and Dennis Ritchie created this operating system at Bell Labs, which became the foundation of Linux.", answer:"Unix", hint:"Multi-tasking, multi-user OS from Bell Labs" },
  { id:"H013", era:"1970", scenario:"Edgar Codd published a landmark paper that introduced what foundational database model still dominant today?", answer:"Relational Database", hint:"Tables, rows, columns, and SQL queries" },
  { id:"H014", era:"1971", scenario:"The first commercial microprocessor was released by Intel. What was its numerical designation?", answer:"4004", hint:"Intel's 4-bit CPU on a single chip" },
  { id:"H015", era:"1972", scenario:"Dennis Ritchie created this foundational programming language at Bell Labs, used to rewrite Unix.", answer:"C", hint:"Procedural language, predecessor of C++" },
  { id:"H016", era:"1973", scenario:"Xerox PARC developed the Alto computer which introduced this revolutionary input device to personal computing.", answer:"Mouse", hint:"Point-and-click input peripheral" },
  { id:"H017", era:"1974", scenario:"Vint Cerf and Bob Kahn published a paper describing what protocol that became the backbone of the Internet?", answer:"TCP/IP", hint:"Transmission Control Protocol / Internet Protocol" },
  { id:"H018", era:"1975", scenario:"This 'do-it-yourself' computer kit featured on Popular Electronics inspired Bill Gates to start Microsoft.", answer:"Altair 8800", hint:"MITS personal computer kit" },
  { id:"H019", era:"1976", scenario:"Steve Jobs and Steve Wozniak founded what company in a garage in Cupertino, California?", answer:"Apple", hint:"Named after a fruit Jobs worked on a farm" },
  { id:"H020", era:"1977", scenario:"The '1977 Trinity' brought PCs to the masses. Name the Apple computer from this trio.", answer:"Apple II", hint:"The rainbow-logo computer for homes and schools" },
  { id:"H021", era:"1979", scenario:"Dan Bricklin and Bob Frankston created the first spreadsheet program for Apple II. What was it called?", answer:"VisiCalc", hint:"Visible Calculator - killer app for the Apple II" },
  { id:"H022", era:"1980", scenario:"What IBM standard later became the dominant PC bus architecture before PCI replaced it?", answer:"ISA", hint:"Industry Standard Architecture bus" },
  { id:"H023", era:"1981", scenario:"IBM released its first Personal Computer. What processor powered the original IBM PC?", answer:"Intel 8088", hint:"8-bit external bus version of the 8086" },
  { id:"H024", era:"1981", scenario:"Microsoft licensed this operating system from Seattle Computer Products and sold it to IBM as PC-DOS.", answer:"MS-DOS", hint:"Microsoft Disk Operating System" },
  { id:"H025", era:"1983", scenario:"The Internet officially switched to this protocol suite on January 1, 1983, known as 'Flag Day'.", answer:"TCP/IP", hint:"The protocol stack now universally used" },
  { id:"H026", era:"1983", scenario:"Richard Stallman announced this project to create a free Unix-compatible operating system.", answer:"GNU Project", hint:"GNU's Not Unix - free software foundation" },
  { id:"H027", era:"1984", scenario:"Apple's iconic Super Bowl commercial introduced this computer to the world.", answer:"Macintosh", hint:"The first Mac with a graphical user interface" },
  { id:"H028", era:"1984", scenario:"The Domain Name System (DNS) was created. Which RFC document defined it?", answer:"RFC 882", hint:"RFC 882 and 883 by Paul Mockapetris" },
  { id:"H029", era:"1985", scenario:"What Microsoft product, released in November 1985, was a graphical interface shell for MS-DOS?", answer:"Windows 1.0", hint:"Microsoft's first windowed OS environment" },
  { id:"H030", era:"1985", scenario:"Richard Stallman published this foundational document outlining the philosophy of free software.", answer:"GNU Manifesto", hint:"Stallman's philosophical foundation for free software" },
  { id:"H031", era:"1986", scenario:"The first internet worm was released by Robert Morris, causing widespread damage. What exploit type did it use?", answer:"Buffer Overflow", hint:"Writing beyond allocated memory boundaries" },
  { id:"H032", era:"1989", scenario:"Tim Berners-Lee proposed an information management system at CERN. This became what technology?", answer:"World Wide Web", hint:"WWW - HTTP and HTML hyperlinked system" },
  { id:"H033", era:"1990", scenario:"Which search and retrieval protocol predated the web and allowed users to browse menus of internet content?", answer:"Gopher", hint:"Named after the University of Minnesota mascot" },
  { id:"H034", era:"1991", scenario:"Linus Torvalds announced his free kernel project on a Usenet newsgroup. What was the kernel named?", answer:"Linux", hint:"Linus's UNIX-like kernel" },
  { id:"H035", era:"1991", scenario:"The first version of the Linux kernel released to the public was version what?", answer:"0.01", hint:"Version 0.0.1 or 0.01 - the very first public release" },
  { id:"H036", era:"1992", scenario:"The World Wide Web became publicly available. What markup language was used to create web pages?", answer:"HTML", hint:"HyperText Markup Language" },
  { id:"H037", era:"1993", scenario:"The first graphical web browser, which made the internet accessible to regular users, was named what?", answer:"Mosaic", hint:"NCSA Mosaic - developed at University of Illinois" },
  { id:"H038", era:"1994", scenario:"The first version of what web server software, developed by the Apache Group, was released in 1995?", answer:"Apache", hint:"World's most popular web server for decades" },
  { id:"H039", era:"1994", scenario:"Jeff Bezos founded this company from his garage, initially as an online bookstore.", answer:"Amazon", hint:"Named after Earth's largest river" },
  { id:"H040", era:"1994", scenario:"The first widely-used internet browser derived from Mosaic was released. What was it called?", answer:"Netscape Navigator", hint:"Navigator - the browser that started the browser wars" },
  { id:"H041", era:"1995", scenario:"Sun Microsystems released this programming language with the slogan 'Write once, run anywhere'.", answer:"Java", hint:"Named after a coffee variety" },
  { id:"H042", era:"1995", scenario:"What scripting language was created by Brendan Eich in just 10 days to make web pages interactive?", answer:"JavaScript", hint:"Despite the name, unrelated to Java" },
  { id:"H043", era:"1995", scenario:"Microsoft released this operating system which dominated personal computing for a decade.", answer:"Windows 95", hint:"Introduced the Start button and taskbar" },
  { id:"H044", era:"1996", scenario:"Larry Page and Sergey Brin began developing a search engine at Stanford that would become what company?", answer:"Google", hint:"A misspelling of 'googol' (10^100)" },
  { id:"H045", era:"1998", scenario:"Linus Torvalds moved Linux kernel version tracking to this distributed version control system (predecessor to Git).", answer:"CVS", hint:"Concurrent Versions System" },
  { id:"H046", era:"1998", scenario:"The Open Source Initiative was founded to promote a specific term for free software. What term was popularized?", answer:"Open Source", hint:"The term coined by Christine Peterson" },
  { id:"H047", era:"1999", scenario:"Linux kernel 2.2 was released. What major feature enabled Linux to scale to SMP systems with many CPUs?", answer:"SMP Support", hint:"Symmetric Multi-Processing support" },
  { id:"H048", era:"2000", scenario:"The dot-com bubble burst after this period of massive speculation in internet companies. Name the decade.", answer:"1990s", hint:"The decade of irrational exuberance in tech" },
  { id:"H049", era:"2001", scenario:"Apple released OS X, which was built on this Unix-like open source operating system foundation.", answer:"BSD", hint:"Berkeley Software Distribution" },
  { id:"H050", era:"2001", scenario:"Wikipedia was launched as a free, collaborative online encyclopedia. Who co-founded it with Jimmy Wales?", answer:"Larry Sanger", hint:"He coined the name 'Wikipedia'" },
  { id:"H051", era:"2002", scenario:"What open source virtualization technology allowed Linux to run multiple isolated systems on one machine?", answer:"Xen", hint:"Paravirtualization hypervisor from Cambridge" },
  { id:"H052", era:"2003", scenario:"AMD released this 64-bit extension to the x86 architecture that became the standard for modern PCs.", answer:"AMD64", hint:"x86-64 / x64 - compatible with 32-bit software" },
  { id:"H053", era:"2003", scenario:"The SCO Group filed a lawsuit claiming ownership of Linux code. This case ultimately vindicated Linux how?", answer:"SCO Lost", hint:"Courts ruled SCO had no valid copyright claims" },
  { id:"H054", era:"2004", scenario:"Mark Zuckerberg launched this social network from his Harvard dorm room.", answer:"Facebook", hint:"Originally 'The Facebook', for college students" },
  { id:"H055", era:"2005", scenario:"Linus Torvalds created a new version control system to replace BitKeeper for Linux kernel development.", answer:"Git", hint:"Distributed VCS - 'stupid content tracker'" },
  { id:"H056", era:"2005", scenario:"What virtualization technique, introduced in Intel and AMD CPUs, enabled full hardware virtualization?", answer:"Hardware-assisted virtualization", hint:"Intel VT-x and AMD-V extensions" },
  { id:"H057", era:"2006", scenario:"Amazon Web Services launched this service that allowed renting virtual machines by the hour.", answer:"EC2", hint:"Elastic Compute Cloud" },
  { id:"H058", era:"2007", scenario:"Apple released the first iPhone, fundamentally changing mobile computing. What mobile OS did it run?", answer:"iPhone OS", hint:"Later renamed iOS" },
  { id:"H059", era:"2008", scenario:"Google released this open source mobile operating system built on the Linux kernel.", answer:"Android", hint:"Based on Linux, now world's most popular mobile OS" },
  { id:"H060", era:"2008", scenario:"The concept of Infrastructure as Code was popularized by what cloud provisioning tool?", answer:"Chef", hint:"One of the early configuration management tools" },
  { id:"H061", era:"2009", scenario:"Ryan Dahl introduced this server-side JavaScript runtime built on Chrome's V8 engine.", answer:"Node.js", hint:"Asynchronous I/O JavaScript on the server" },
  { id:"H062", era:"2010", scenario:"What hypervisor-based Linux container technology was introduced that became Docker's early foundation?", answer:"LXC", hint:"Linux Containers - cgroups + namespaces" },
  { id:"H063", era:"2011", scenario:"GNOME 3 was released, controversially replacing the classic desktop metaphor. What major feature was removed?", answer:"Desktop Icons", hint:"Or: the traditional taskbar/panels layout" },
  { id:"H064", era:"2012", scenario:"The Raspberry Pi single-board computer was released, running Linux. What CPU architecture did the first model use?", answer:"ARM", hint:"Advanced RISC Machine architecture" },
  { id:"H065", era:"2013", scenario:"Solomon Hykes demonstrated Docker at PyCon, introducing what revolutionary container deployment concept?", answer:"Docker", hint:"Containerization using Linux namespaces/cgroups" },
  { id:"H066", era:"2014", scenario:"What critical vulnerability in the Bash shell allowed attackers to execute arbitrary commands via environment variables?", answer:"Shellshock", hint:"CVE-2014-6271 - affected bash before 4.3" },
  { id:"H067", era:"2014", scenario:"Microsoft CEO Satya Nadella famously said 'Microsoft loves Linux'. What year did they join the Linux Foundation?", answer:"2016", hint:"Two years after Nadella's famous statement" },
  { id:"H068", era:"2015", scenario:"Google open-sourced this container orchestration system that became the industry standard.", answer:"Kubernetes", hint:"Greek for 'helmsman' - k8s" },
  { id:"H069", era:"2016", scenario:"What programming language, developed at Mozilla, achieved memory safety without garbage collection?", answer:"Rust", hint:"Now used in the Linux kernel itself" },
  { id:"H070", era:"2016", scenario:"Linux kernel 4.9 merged what new networking technology that improved performance for containers?", answer:"eBPF", hint:"Extended Berkeley Packet Filter improvements" },
  { id:"H071", era:"2017", scenario:"The WannaCry ransomware attack exploited what NSA-developed exploit leaked by the Shadow Brokers?", answer:"EternalBlue", hint:"SMBv1 vulnerability in Windows" },
  { id:"H072", era:"2018", scenario:"CPU vulnerabilities affecting nearly all modern processors were disclosed. Name the two main vulnerabilities.", answer:"Spectre and Meltdown", hint:"Two side-channel attacks against speculative execution" },
  { id:"H073", era:"2018", scenario:"Linux kernel 5.x series introduced what new I/O interface for high-performance async I/O?", answer:"io_uring", hint:"Ring buffer-based async I/O by Jens Axboe" },
  { id:"H074", era:"2019", scenario:"What programming language did Google create that combines simplicity with performance for system programming?", answer:"Go", hint:"Golang - developed by Rob Pike, Ken Thompson" },
  { id:"H075", era:"2019", scenario:"Microsoft released this Linux distribution running on Windows called Windows Subsystem for Linux 2. What kernel ran it?", answer:"Linux kernel", hint:"WSL2 uses an actual Linux kernel" },
  { id:"H076", era:"2020", scenario:"The SolarWinds supply chain attack compromised thousands of networks via a software update. What malware was planted?", answer:"SUNBURST", hint:"Malicious code hidden in Orion software updates" },
  { id:"H077", era:"2020", scenario:"Rust was proposed for inclusion in the Linux kernel. What year was the first Rust code merged into the kernel?", answer:"2022", hint:"Linux 6.1 - December 2022" },
  { id:"H078", era:"2021", scenario:"The Log4Shell vulnerability shocked the tech world. Which logging library was affected?", answer:"Log4j", hint:"Java logging framework - CVE-2021-44228" },
  { id:"H079", era:"2022", scenario:"Linux reached 30 years old. Linus Torvalds posted the original announcement in 1991 to what newsgroup?", answer:"comp.os.minix", hint:"He said it was just a hobby project" },
  { id:"H080", era:"2022", scenario:"What container runtime replaced Docker as the default in Kubernetes?", answer:"containerd", hint:"CNCF project, also used by Docker itself" },
  { id:"H081", era:"2023", scenario:"What AI chip maker surpassed all tech companies to become the world's most valuable company briefly?", answer:"NVIDIA", hint:"GPU maker now dominates AI training infrastructure" },
  { id:"H082", era:"2023", scenario:"Linux kernel 6.2 added support for Rust as a second language. Who proposed this addition years earlier?", answer:"Miguel Ojeda", hint:"The main driver behind Rust for Linux project" },
  { id:"H083", era:"2024", scenario:"A malicious backdoor was inserted into what Linux compression utility, affecting systemd login authentication?", answer:"XZ Utils", hint:"CVE-2024-3094 - discovered by Andres Freund" },
  { id:"H084", era:"1954", scenario:"IBM introduced this programming language in 1957, the first widely used high-level language.", answer:"FORTRAN", hint:"FORmula TRANslation - for scientific computing" },
  { id:"H085", era:"1960", scenario:"John McCarthy at MIT created what programming language that pioneered functional and AI programming?", answer:"LISP", hint:"LISt Processing - still used in AI today" },
  { id:"H086", era:"1968", scenario:"Edsger Dijkstra published his famous letter titled 'Go To Statement Considered Harmful'. What did he argue?", answer:"GOTO causes unstructured code", hint:"Structured programming is better than GOTO jumps" },
  { id:"H087", era:"1971", scenario:"Ray Tomlinson sent the first networked email and chose what symbol to separate user from host in addresses?", answer:"@", hint:"The 'at' symbol in email addresses" },
  { id:"H088", era:"1976", scenario:"Whitfield Diffie and Martin Hellman published a breakthrough paper introducing what cryptographic concept?", answer:"Public Key Cryptography", hint:"Asymmetric encryption - RSA is based on this" },
  { id:"H089", era:"1983", scenario:"The C++ programming language was created by Bjarne Stroustrup. What was it originally called?", answer:"C with Classes", hint:"Before it was renamed to C++" },
  { id:"H090", era:"1987", scenario:"Larry Wall released this practical text-processing language that became a staple for Unix sysadmins.", answer:"Perl", hint:"Practical Extraction and Report Language" },
  { id:"H091", era:"1990", scenario:"The first web server and browser were created by Tim Berners-Lee. What was the first browser called?", answer:"WorldWideWeb", hint:"Also the name of the first web server, confusingly" },
  { id:"H092", era:"1993", scenario:"What was the first widely-deployed internet search engine, preceding Google by five years?", answer:"WebCrawler", hint:"Or Archie/Veronica for FTP/Gopher" },
  { id:"H093", era:"1997", scenario:"Deep Blue, an IBM computer, defeated world chess champion Garry Kasparov. How many games did it win in the match?", answer:"3.5", hint:"It won the 6-game match 3.5 to 2.5" },
  { id:"H094", era:"1999", scenario:"The IEEE 802.11b standard was ratified, enabling wireless networking. What is this technology commonly called?", answer:"Wi-Fi", hint:"Wireless Fidelity - the 2.4GHz standard" },
  { id:"H095", era:"2001", scenario:"Wikipedia launched and BitTorrent was created. What P2P protocol also emerged, revolutionizing file sharing?", answer:"BitTorrent", hint:"Distributed file sharing using swarms of peers" },
  { id:"H096", era:"2004", scenario:"What open source version control system was widely used before Git, developed by CollabNet?", answer:"Subversion", hint:"SVN - centralized version control" },
  { id:"H097", era:"2009", scenario:"Satoshi Nakamoto's Bitcoin launched as the first cryptocurrency. What consensus mechanism does it use?", answer:"Proof of Work", hint:"Computational puzzle-solving to validate transactions" },
  { id:"H098", era:"2012", scenario:"The ITU standardized what data compression format that reduced video file sizes by 50% vs H.264?", answer:"H.265", hint:"HEVC - High Efficiency Video Coding" },
  { id:"H099", era:"2015", scenario:"OpenAI was founded. What was its stated mission?", answer:"Ensure AI benefits all humanity", hint:"Beneficial AGI for all of humanity" },
  { id:"H100", era:"2023", scenario:"The Unicode Standard reached version 15.1. How many total characters does Unicode 15.1 define?", answer:"149813", hint:"Over 149,000 characters across 161 scripts" },
];

// ============================================================
// LEVEL SYSTEM
// ============================================================
const LEVELS = [
  { min:0, max:50, num:1, title:"Root Initiate", icon:"⬡", color:"#586e75", badge:"[ ⬡ ] ROOT INITIATE" },
  { min:51, max:100, num:2, title:"Bash Nomad", icon:"⚡", color:"#859900", badge:"[ ⚡ ] BASH NOMAD" },
  { min:101, max:150, num:3, title:"Sudo Sentinel", icon:"🛡", color:"#268bd2", badge:"[ 🛡 ] SUDO SENTINEL" },
  { min:151, max:200, num:4, title:"Pipe Architect", icon:"⊞", color:"#2aa198", badge:"[ ⊞ ] PIPE ARCHITECT" },
  { min:201, max:250, num:5, title:"Kernel Nomad", icon:"◈", color:"#d33682", badge:"[ ◈ ] KERNEL NOMAD" },
  { min:251, max:300, num:6, title:"Signal Master", icon:"◉", color:"#cb4b16", badge:"[ ◉ ] SIGNAL MASTER" },
  { min:301, max:350, num:7, title:"Daemon Wrangler", icon:"⊗", color:"#6c71c4", badge:"[ ⊗ ] DAEMON WRANGLER" },
  { min:351, max:400, num:8, title:"Kernel Architect", icon:"🧬", color:"#859900", badge:"[ 🧬 ] KERNEL ARCHITECT" },
];

const ACHIEVEMENTS = [
  { id:"first_blood", name:"First Blood", icon:"⚔", desc:"Answer your first question correctly", trigger:"q1" },
  { id:"vacuum_tube", name:"The Vacuum Tube", icon:"⌁", desc:"Survive 2 History Warp events", trigger:"bonus2" },
  { id:"silicon_alch", name:"Silicon Alchemist", icon:"⚗", desc:"Survive 5 History Warp events", trigger:"bonus5" },
  { id:"analog_ghost", name:"Analog Ghost", icon:"◌", desc:"Answer 10 History Warp questions", trigger:"bonus10" },
  { id:"overclocker", name:"Overclocker", icon:"⚡", desc:"Get 3 History Warps correct in a row", trigger:"warpstreak3" },
  { id:"no_mercy", name:"No Mercy", icon:"💀", desc:"Get 10 correct without hints", trigger:"nohint10" },
  { id:"permission_denied", name:"Permission Denied", icon:"⊘", desc:"Fail 5 questions in a row (learning the hard way)", trigger:"fail5" },
  { id:"bash_god", name:"Bash God", icon:"⊛", desc:"Complete the first 50 questions", trigger:"q50" },
  { id:"root_access", name:"Root Access", icon:"#", desc:"Complete 100 Linux questions", trigger:"q100" },
  { id:"kernel_panic", name:"Kernel Panic", icon:"☠", desc:"Lose all system integrity and survive", trigger:"panic" },
  { id:"neo_portland", name:"Neo-Portland Reached", icon:"🏁", desc:"Complete all 400 questions", trigger:"q400" },
  { id:"time_warden", name:"Time Warden", icon:"⧖", desc:"Answer a bonus question in under 10 seconds", trigger:"speed" },
];

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function getLevel(questionIdx) {
  for (const l of LEVELS) {
    if (questionIdx >= l.min && questionIdx <= l.max) return l;
  }
  return LEVELS[LEVELS.length-1];
}

function normalizeAnswer(str) {
  return str.trim().toLowerCase().replace(/\s+/g,' ').replace(/['"]/g,'').replace(/\\/g,'');
}

function checkAnswer(input, correct) {
  const inp = normalizeAnswer(input);
  const cor = normalizeAnswer(correct);
  if (inp === cor) return true;
  // Check if key parts match (for long commands)
  const corWords = cor.split(' ').filter(w => w.length > 2);
  const inpWords = inp.split(' ');
  if (corWords.length > 0) {
    const matches = corWords.filter(w => inpWords.includes(w));
    if (matches.length >= Math.min(corWords.length, 3) && matches.length/corWords.length >= 0.6) return true;
  }
  return false;
}

// ============================================================
// GLITCH TEXT COMPONENT
// ============================================================
function GlitchText({ text, className = "" }) {
  return (
    <span className={`relative inline-block ${className}`} style={{
      textShadow: '0 0 8px #859900, 0 0 20px #859900',
      animation: 'glow 2s ease-in-out infinite alternate'
    }}>
      {text}
    </span>
  );
}

// ============================================================
// SCANLINE OVERLAY
// ============================================================
function Scanlines() {
  return (
    <div style={{
      position:'fixed', inset:0, pointerEvents:'none', zIndex:9999,
      background:'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
    }} />
  );
}

// ============================================================
// ASCII PROGRESS BAR
// ============================================================
function ProgressBar({ value, max, color="#859900", label="" }) {
  const pct = Math.min(100, Math.round((value/max)*100));
  const filled = Math.round(pct/5);
  const empty = 20 - filled;
  return (
    <div style={{ fontFamily:'monospace', fontSize:'0.75rem' }}>
      <span style={{ color:'#586e75' }}>[</span>
      <span style={{ color }}>{Array(filled).fill('|').join('')}</span>
      <span style={{ color:'#073642' }}>{Array(empty).fill('-').join('')}</span>
      <span style={{ color:'#586e75' }}>]</span>
      <span style={{ color:'#93a1a1', marginLeft:'0.5rem' }}>{pct}% {label}</span>
    </div>
  );
}

// ============================================================
// ACHIEVEMENT TOAST
// ============================================================
function AchievementToast({ achievement, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div style={{
      position:'fixed', top:'1rem', right:'1rem', zIndex:10000,
      background:'#073642', border:'2px solid #859900',
      padding:'1rem 1.5rem', fontFamily:'monospace',
      animation:'slideIn 0.3s ease-out',
      boxShadow:'0 0 20px rgba(133,153,0,0.5)',
      maxWidth:'300px'
    }}>
      <div style={{ color:'#859900', fontSize:'0.7rem', marginBottom:'0.25rem' }}>// ACHIEVEMENT UNLOCKED</div>
      <div style={{ color:'#fdf6e3', fontSize:'1.2rem', marginBottom:'0.25rem' }}>
        {achievement.icon} {achievement.name}
      </div>
      <div style={{ color:'#586e75', fontSize:'0.75rem' }}>{achievement.desc}</div>
    </div>
  );
}

// ============================================================
// WARP SCREEN (Bonus Question Alert)
// ============================================================
function WarpScreen({ question, onAnswer, onSkip }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = () => {
    if (!input.trim()) return;
    const correct = checkAnswer(input, question.answer);
    setResult(correct);
    setTimeout(() => onAnswer(correct, input), 1500);
  };

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:1000,
      background:'rgba(0,0,0,0.95)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      fontFamily:'monospace',
      animation:'fadeIn 0.3s ease'
    }}>
      <div style={{
        border:'2px solid #b58900', padding:'2rem',
        maxWidth:'700px', width:'90%',
        boxShadow:'0 0 40px rgba(181,137,0,0.6)',
        background:'#050a0e'
      }}>
        <div style={{ color:'#b58900', textAlign:'center', fontSize:'0.75rem', letterSpacing:'0.3em', marginBottom:'0.5rem' }}>
          ⚠ HISTORY WARP DETECTED ⚠
        </div>
        <div style={{ color:'#b58900', textAlign:'center', fontSize:'1.5rem', marginBottom:'0.25rem' }}>
          {Array(40).fill('─').join('')}
        </div>
        <div style={{ color:'#586e75', textAlign:'center', fontSize:'0.75rem', marginBottom:'1rem' }}>
          ERA: {question.era} | RELIC ANOMALY DETECTED
        </div>
        <div style={{ color:'#fdf6e3', fontSize:'1rem', lineHeight:1.7, marginBottom:'1.5rem', textAlign:'center' }}>
          {question.scenario}
        </div>
        <div style={{ color:'#657b83', fontSize:'0.75rem', marginBottom:'0.5rem' }}>
          {'>'} Provide the correct historical data key to unlock OVERCLOCK mode:
        </div>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key==='Enter' && handleSubmit()}
          style={{
            background:'transparent', border:'none', borderBottom:'2px solid #b58900',
            color:'#b58900', fontFamily:'monospace', fontSize:'1rem',
            width:'100%', outline:'none', padding:'0.5rem 0', marginBottom:'1rem'
          }}
          placeholder="// enter historical key..."
        />
        {result !== null && (
          <div style={{
            color: result ? '#859900' : '#dc322f',
            textAlign:'center', fontSize:'1.1rem', marginBottom:'1rem',
            textShadow: result ? '0 0 10px #859900' : '0 0 10px #dc322f'
          }}>
            {result ? '✓ OVERCLOCK GRANTED — TIMELINE STABILIZED' : '✗ TEMPORAL DESYNC — INTEGRITY LOSS'}
          </div>
        )}
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center' }}>
          <button onClick={handleSubmit} style={{
            background:'transparent', border:'1px solid #b58900', color:'#b58900',
            fontFamily:'monospace', padding:'0.5rem 1.5rem', cursor:'pointer',
            fontSize:'0.85rem'
          }}>[ SUBMIT ]</button>
          <button onClick={onSkip} style={{
            background:'transparent', border:'1px solid #586e75', color:'#586e75',
            fontFamily:'monospace', padding:'0.5rem 1.5rem', cursor:'pointer',
            fontSize:'0.85rem'
          }}>[ SKIP WARP ]</button>
        </div>
        <div style={{ color:'#586e75', textAlign:'center', fontSize:'0.7rem', marginTop:'1rem' }}>
          Correct answer grants: +10 miles, +20 integrity, OVERCLOCK MODE (60s)
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN GAME COMPONENT
// ============================================================
export default function KernelTrail() {
  // Game state
  const [screen, setScreen] = useState('intro'); // intro | game | death | victory
  const [qIdx, setQIdx] = useState(0);
  const [bonusIdx, setBonusIdx] = useState(0);
  const [integrity, setIntegrity] = useState(100);
  const [powerCells, setPowerCells] = useState(50);
  const [miles, setMiles] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null); // null | 'correct' | 'wrong'
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showWarp, setShowWarp] = useState(false);
  const [warpQuestion, setWarpQuestion] = useState(null);
  const [overclock, setOverclock] = useState(false);
  const [overclockTimer, setOverclockTimer] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [toastAchievement, setToastAchievement] = useState(null);
  const [streak, setStreak] = useState(0);
  const [failStreak, setFailStreak] = useState(0);
  const [warpCount, setWarpCount] = useState(0);
  const [warpStreak, setWarpStreak] = useState(0);
  const [nohintStreak, setNohintStreak] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [shake, setShake] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [skipChapter, setSkipChapter] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);
  const [gameLog, setGameLog] = useState([]);
  const inputRef = useRef(null);
  const overclockRef = useRef(null);
  const [playerName, setPlayerName] = useState('');
  const [nameInput, setNameInput] = useState('');

  const currentQ = LINUX_QUESTIONS[Math.min(qIdx, LINUX_QUESTIONS.length-1)];
  const currentLevel = getLevel(qIdx);
  const totalMiles = 400;

  // Focus input after feedback clears
  useEffect(() => {
    if (screen === 'game' && !showWarp) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [screen, qIdx, feedback, showWarp]);

  // Overclock countdown
  useEffect(() => {
    if (overclock) {
      overclockRef.current = setInterval(() => {
        setOverclockTimer(t => {
          if (t <= 1) { setOverclock(false); clearInterval(overclockRef.current); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(overclockRef.current);
  }, [overclock]);

  // Check for History Warp trigger (every 10 miles)
  useEffect(() => {
    if (miles > 0 && miles % 10 === 0 && bonusIdx < BONUS_QUESTIONS.length && !showWarp && screen === 'game') {
      const t = setTimeout(() => {
        setWarpQuestion(BONUS_QUESTIONS[bonusIdx]);
        setShowWarp(true);
        setQuestionStartTime(Date.now());
      }, 800);
      return () => clearTimeout(t);
    }
  }, [miles]);

  // Check death/victory
  useEffect(() => {
    if (integrity <= 0 && screen === 'game') {
      unlockAchievement('kernel_panic');
      setScreen('death');
    }
    if (qIdx >= LINUX_QUESTIONS.length && screen === 'game') {
      unlockAchievement('neo_portland');
      setScreen('victory');
    }
  }, [integrity, qIdx, screen]);

  function unlockAchievement(id) {
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (ach && !achievements.includes(id)) {
      setAchievements(prev => [...prev, id]);
      setToastAchievement(ach);
    }
  }

  function checkAchievements(correct, questionNumber, warpCorrectCount, warpStreakCount, nohintCount, failCount) {
    if (questionNumber === 1) unlockAchievement('first_blood');
    if (questionNumber === 50) unlockAchievement('bash_god');
    if (questionNumber === 100) unlockAchievement('root_access');
    if (warpCorrectCount === 2) unlockAchievement('vacuum_tube');
    if (warpCorrectCount === 5) unlockAchievement('silicon_alch');
    if (warpCorrectCount === 10) unlockAchievement('analog_ghost');
    if (warpStreakCount >= 3) unlockAchievement('overclocker');
    if (nohintCount >= 10) unlockAchievement('no_mercy');
    if (failCount >= 5) unlockAchievement('permission_denied');
  }

  function triggerGlitch() {
    setIsGlitching(true); setShake(true);
    setTimeout(() => { setIsGlitching(false); setShake(false); }, 800);
  }

  function handleAnswer() {
    if (!input.trim()) return;
    const correct = checkAnswer(input, currentQ.answer);
    setFeedback(correct ? 'correct' : 'wrong');
    setInput('');
    setShowHint(false);

    if (correct) {
      const newCorrect = totalCorrect + 1;
      setTotalCorrect(newCorrect);
      setMiles(m => m + 1);
      setStreak(s => s + 1);
      setFailStreak(0);
      const newNohint = showHint ? 0 : nohintStreak + 1;
      setNohintStreak(newNohint);
      setPowerCells(p => Math.min(100, p + 2));
      setIntegrity(i => Math.min(100, i + (overclock ? 3 : 1)));
      setGameLog(l => [...l.slice(-20), `[+] ${currentQ.cmd}: CORRECT`]);
      checkAchievements(true, newCorrect, warpCount, warpStreak, newNohint, 0);
      setTimeout(() => {
        setFeedback(null);
        setQIdx(i => i + 1);
        setQuestionStartTime(Date.now());
      }, 800);
    } else {
      const newWrong = totalWrong + 1;
      setTotalWrong(newWrong);
      setStreak(0);
      const newFail = failStreak + 1;
      setFailStreak(newFail);
      setNohintStreak(0);
      const damage = currentQ.difficulty * (overclock ? 3 : 5);
      setIntegrity(i => Math.max(0, i - damage));
      setPowerCells(p => Math.max(0, p - 3));
      triggerGlitch();
      setGameLog(l => [...l.slice(-20), `[✗] ${currentQ.cmd}: ERROR`]);
      checkAchievements(false, totalCorrect, warpCount, warpStreak, nohintStreak, newFail);
      setTimeout(() => setFeedback(null), 1200);
    }
  }

  function handleWarpAnswer(correct, rawInput) {
    const elapsed = (Date.now() - questionStartTime) / 1000;
    setBonusIdx(b => b + 1);
    setShowWarp(false);
    setWarpQuestion(null);

    if (correct) {
      const newWarpCount = warpCount + 1;
      const newWarpStreak = warpStreak + 1;
      setWarpCount(newWarpCount);
      setWarpStreak(newWarpStreak);
      setMiles(m => m + 10);
      setIntegrity(i => Math.min(100, i + 20));
      setPowerCells(p => Math.min(100, p + 15));
      setOverclock(true);
      setOverclockTimer(60);
      setGameLog(l => [...l.slice(-20), `[⚡] HISTORY WARP: OVERCLOCK GRANTED`]);
      if (elapsed < 10) unlockAchievement('time_warden');
      checkAchievements(true, totalCorrect, newWarpCount, newWarpStreak, nohintStreak, 0);
      // Skip chapter: advance questions
      const skipCount = 5;
      setQIdx(i => Math.min(i + skipCount, LINUX_QUESTIONS.length - 1));
    } else {
      setWarpStreak(0);
      setIntegrity(i => Math.max(0, i - 15));
      setGameLog(l => [...l.slice(-20), `[✗] HISTORY WARP: TEMPORAL DESYNC`]);
      triggerGlitch();
    }
  }

  function handleWarpSkip() {
    setBonusIdx(b => b + 1);
    setShowWarp(false);
    setWarpQuestion(null);
    setWarpStreak(0);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAnswer();
  }

  const integrityColor = integrity > 60 ? '#859900' : integrity > 30 ? '#b58900' : '#dc322f';
  const levelInfo = currentLevel;

  // ─── INTRO SCREEN ────────────────────────────────────────
  if (screen === 'intro') {
    return (
      <div style={{
        minHeight:'100vh', background:'#020508',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        fontFamily:'monospace', position:'relative', overflow:'hidden'
      }}>
        <Scanlines />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&display=swap');
          @keyframes glow { from { text-shadow: 0 0 5px #859900; } to { text-shadow: 0 0 20px #859900, 0 0 40px #859900; } }
          @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
          @keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
          @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
          @keyframes shake { 0%,100% { transform:translateX(0); } 10%,30%,50%,70%,90% { transform:translateX(-4px); } 20%,40%,60%,80% { transform:translateX(4px); } }
          @keyframes scanline { from { top:-5%; } to { top:105%; } }
          @keyframes matrix { from { opacity:0.8; } to { opacity:0.2; } }
          @keyframes overclock { 0%,100% { box-shadow: 0 0 10px #fdf6e3; } 50% { box-shadow: 0 0 40px #fdf6e3, 0 0 80px #859900; } }
          * { box-sizing:border-box; }
          input::placeholder { color:#586e75; }
          ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:#073642; } ::-webkit-scrollbar-thumb { background:#586e75; }
        `}</style>

        {/* Matrix rain effect */}
        <div style={{ position:'fixed', inset:0, overflow:'hidden', opacity:0.15, zIndex:0 }}>
          {Array(20).fill(0).map((_,i) => (
            <div key={i} style={{
              position:'absolute', top:0, left:`${i*5}%`,
              color:'#859900', fontSize:'0.7rem', lineHeight:1.2,
              animation:`matrix ${1+Math.random()*2}s ease-in-out infinite alternate`,
              animationDelay:`${Math.random()*2}s`
            }}>
              {Array(30).fill(0).map((_,j) => (
                <div key={j}>{String.fromCharCode(0x30A0 + Math.random()*96)}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:'700px', padding:'2rem', animation:'fadeIn 1s ease' }}>
          <div style={{ color:'#586e75', fontSize:'0.75rem', letterSpacing:'0.4em', marginBottom:'0.5rem' }}>
            YEAR 2099 // NETWORK DEAD // LAST SERVER: NEO-PORTLAND
          </div>
          <div style={{
            fontSize:'clamp(2rem,8vw,5rem)',
            color:'#859900',
            fontFamily:'VT323, monospace',
            lineHeight:1,
            animation:'glow 2s ease-in-out infinite alternate',
            marginBottom:'0.5rem'
          }}>
            THE KERNEL TRAIL
          </div>
          <div style={{ color:'#268bd2', fontSize:'0.9rem', marginBottom:'2rem', letterSpacing:'0.15em' }}>
            // A DATA SCAVENGER'S JOURNEY ACROSS THE DEAD NETWORK
          </div>

          <div style={{
            background:'#073642', border:'1px solid #586e75',
            padding:'1.5rem', marginBottom:'2rem',
            textAlign:'left', fontSize:'0.85rem', color:'#839496', lineHeight:1.8
          }}>
            <div style={{ color:'#859900', marginBottom:'0.5rem' }}>{'>'} MISSION BRIEF:</div>
            The Cloud has collapsed. You are a <span style={{color:'#fdf6e3'}}>Data Scavenger</span> tasked with migrating humanity's
            last archive across the <span style={{color:'#fdf6e3'}}>Great Dead Network</span> to the surviving server farm in
            <span style={{color:'#268bd2'}}> Neo-Portland</span>.<br/><br/>
            Your weapon: a <span style={{color:'#859900'}}>Linux Terminal</span>. Your survival: your knowledge.<br/>
            <span style={{color:'#b58900'}}>400 Linux challenges</span> stand between you and salvation.
            History Warp anomalies will test your IT knowledge for shortcuts.
            <br/><br/>
            <span style={{color:'#dc322f'}}>⚠ Warning: Wrong answers damage System Integrity.</span>
          </div>

          <div style={{ marginBottom:'1.5rem' }}>
            <div style={{ color:'#586e75', fontSize:'0.75rem', marginBottom:'0.5rem' }}>{'>'} IDENTIFY SCAVENGER:</div>
            <input
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key==='Enter' && nameInput.trim() && (setPlayerName(nameInput.trim()), setScreen('game'))}
              placeholder="// enter callsign..."
              style={{
                background:'transparent', border:'none', borderBottom:'2px solid #859900',
                color:'#859900', fontFamily:'monospace', fontSize:'1rem',
                width:'100%', maxWidth:'300px', outline:'none', padding:'0.5rem 0',
                textAlign:'center'
              }}
              autoFocus
            />
          </div>

          <button
            onClick={() => { if(nameInput.trim()) { setPlayerName(nameInput.trim()); setScreen('game'); } else { setPlayerName('ANON'); setScreen('game'); } }}
            style={{
              background:'transparent', border:'2px solid #859900',
              color:'#859900', fontFamily:'monospace', fontSize:'1rem',
              padding:'0.75rem 3rem', cursor:'pointer', letterSpacing:'0.2em',
              animation:'glow 2s ease-in-out infinite alternate'
            }}
          >
            [ BOOT TERMINAL ]
          </button>

          <div style={{ color:'#586e75', fontSize:'0.7rem', marginTop:'1.5rem' }}>
            400 Linux Q + 100 IT History Bonus | 8 Achievement Tiers | OVERCLOCK MODE
          </div>
        </div>
      </div>
    );
  }

  // ─── DEATH SCREEN ─────────────────────────────────────────
  if (screen === 'death') {
    return (
      <div style={{
        minHeight:'100vh', background:'#1a0000',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        fontFamily:'monospace', color:'#dc322f'
      }}>
        <Scanlines />
        <style>{`@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap'); @keyframes glow { from { text-shadow: 0 0 5px #dc322f; } to { text-shadow: 0 0 20px #dc322f, 0 0 40px #dc322f; } }`}</style>
        <div style={{ fontFamily:'VT323, monospace', fontSize:'clamp(3rem,10vw,6rem)', animation:'glow 1s ease-in-out infinite alternate' }}>
          KERNEL PANIC
        </div>
        <div style={{ fontSize:'0.85rem', color:'#586e75', marginTop:'1rem', marginBottom:'2rem' }}>
          [ SYSTEM INTEGRITY: 0% ] // DATA CORRUPTION CRITICAL
        </div>
        <div style={{ color:'#839496', fontSize:'0.85rem', marginBottom:'0.5rem' }}>
          Scavenger <span style={{color:'#fdf6e3'}}>{playerName}</span> reached mile <span style={{color:'#b58900'}}>{miles}</span> of {totalMiles}
        </div>
        <div style={{ color:'#586e75', fontSize:'0.75rem', marginBottom:'2rem' }}>
          {qIdx} questions answered | {totalCorrect} correct | {totalWrong} wrong | {warpCount} warps survived
        </div>
        <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', justifyContent:'center' }}>
          <button onClick={() => {
            setQIdx(0); setIntegrity(100); setPowerCells(50); setMiles(0);
            setStreak(0); setFailStreak(0); setTotalCorrect(0); setTotalWrong(0);
            setWarpCount(0); setWarpStreak(0); setBonusIdx(0); setGameLog([]);
            setScreen('game');
          }} style={{
            background:'transparent', border:'2px solid #dc322f', color:'#dc322f',
            fontFamily:'monospace', padding:'0.75rem 2rem', cursor:'pointer', fontSize:'0.9rem'
          }}>[ REBOOT TERMINAL ]</button>
          <button onClick={() => setScreen('intro')} style={{
            background:'transparent', border:'1px solid #586e75', color:'#586e75',
            fontFamily:'monospace', padding:'0.75rem 2rem', cursor:'pointer', fontSize:'0.9rem'
          }}>[ MAIN MENU ]</button>
        </div>
      </div>
    );
  }

  // ─── VICTORY SCREEN ───────────────────────────────────────
  if (screen === 'victory') {
    return (
      <div style={{
        minHeight:'100vh', background:'#020508',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        fontFamily:'monospace', textAlign:'center', padding:'2rem'
      }}>
        <Scanlines />
        <style>{`@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap'); @keyframes glow { from { text-shadow: 0 0 10px #859900; } to { text-shadow: 0 0 30px #859900, 0 0 60px #268bd2; } }`}</style>
        <div style={{ color:'#859900', fontFamily:'VT323, monospace', fontSize:'clamp(2rem,8vw,4rem)', animation:'glow 2s ease-in-out infinite alternate' }}>
          NEO-PORTLAND REACHED
        </div>
        <div style={{ color:'#268bd2', fontSize:'0.9rem', letterSpacing:'0.2em', marginTop:'0.5rem', marginBottom:'1.5rem' }}>
          // ARCHIVE MIGRATION COMPLETE // DATA HUMANITY SAVED
        </div>
        <div style={{ color:'#fdf6e3', fontSize:'4rem', marginBottom:'1rem' }}>🏁</div>
        <div style={{ color:'#839496', marginBottom:'0.5rem' }}>
          Scavenger <span style={{color:'#fdf6e3'}}>{playerName}</span> has completed The Kernel Trail
        </div>
        <div style={{ color:'#b58900', marginBottom:'0.25rem' }}>Miles: {miles} / {totalMiles}</div>
        <div style={{ color:'#586e75', fontSize:'0.8rem', marginBottom:'0.5rem' }}>
          {totalCorrect} correct | {totalWrong} wrong | {warpCount} history warps | {achievements.length} achievements
        </div>
        <div style={{ color:'#586e75', fontSize:'0.75rem', marginBottom:'2rem' }}>
          Final Integrity: {integrity}% | Power Cells: {powerCells}%
        </div>
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', justifyContent:'center', marginBottom:'2rem' }}>
          {achievements.map(id => {
            const a = ACHIEVEMENTS.find(x => x.id===id);
            return a ? <span key={id} title={a.name} style={{ fontSize:'1.5rem', filter:'drop-shadow(0 0 5px #859900)' }}>{a.icon}</span> : null;
          })}
        </div>
        <button onClick={() => setScreen('intro')} style={{
          background:'transparent', border:'2px solid #859900', color:'#859900',
          fontFamily:'monospace', padding:'0.75rem 3rem', cursor:'pointer', fontSize:'1rem'
        }}>[ NEW JOURNEY ]</button>
      </div>
    );
  }

  // ─── MAIN GAME SCREEN ─────────────────────────────────────
  return (
    <div style={{
      minHeight:'100vh',
      background: overclock
        ? 'radial-gradient(ellipse at center, #002b36 0%, #000c10 100%)'
        : '#020508',
      fontFamily:'"Share Tech Mono", monospace',
      color:'#859900',
      position:'relative',
      animation: shake ? 'shake 0.5s ease' : 'none',
      overflow:'hidden'
    }}>
      <Scanlines />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&display=swap');
        @keyframes glow { from { text-shadow: 0 0 5px #859900; } to { text-shadow: 0 0 15px #859900, 0 0 30px #859900; } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes shake { 0%,100% { transform:translateX(0); } 10%,30%,50%,70%,90% { transform:translateX(-6px) rotate(-0.5deg); } 20%,40%,60%,80% { transform:translateX(6px) rotate(0.5deg); } }
        @keyframes overclock { 0%,100% { box-shadow: inset 0 0 10px rgba(253,246,227,0.1); } 50% { box-shadow: inset 0 0 30px rgba(253,246,227,0.2); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        * { box-sizing:border-box; }
        input::placeholder { color:#586e75; }
        ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:#073642; } ::-webkit-scrollbar-thumb { background:#586e75; }
      `}</style>

      {/* Overclock glow overlay */}
      {overclock && (
        <div style={{
          position:'fixed', inset:0, pointerEvents:'none', zIndex:1,
          boxShadow:'inset 0 0 80px rgba(253,246,227,0.15)',
          animation:'overclock 1s ease-in-out infinite'
        }} />
      )}

      {/* Glitch red overlay */}
      {isGlitching && (
        <div style={{
          position:'fixed', inset:0, pointerEvents:'none', zIndex:5,
          background:'rgba(220,50,47,0.15)',
        }} />
      )}

      {/* Achievement Toast */}
      {toastAchievement && <AchievementToast achievement={toastAchievement} onClose={() => setToastAchievement(null)} />}

      {/* History Warp Modal */}
      {showWarp && warpQuestion && (
        <WarpScreen
          question={warpQuestion}
          onAnswer={handleWarpAnswer}
          onSkip={handleWarpSkip}
        />
      )}

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'1rem', minHeight:'100vh', display:'flex', flexDirection:'column' }}>

        {/* ── TOP HUD ── */}
        <div style={{
          borderBottom:'1px solid #073642', paddingBottom:'0.75rem', marginBottom:'1rem',
          display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'0.5rem', alignItems:'center'
        }}>
          {/* Left: Player + Level */}
          <div>
            <div style={{ color:'#586e75', fontSize:'0.65rem' }}>SCAVENGER</div>
            <div style={{ color:'#fdf6e3', fontSize:'0.85rem' }}>{playerName || 'ANON'}</div>
            <div style={{
              color: overclock ? '#fdf6e3' : levelInfo.color,
              fontSize:'0.75rem',
              animation: overclock ? 'glow 0.5s ease-in-out infinite alternate' : 'none'
            }}>
              {levelInfo.badge}
            </div>
          </div>

          {/* Center: Progress */}
          <div style={{ textAlign:'center' }}>
            <div style={{ color:'#586e75', fontSize:'0.65rem', marginBottom:'0.25rem' }}>TRAIL PROGRESS</div>
            <ProgressBar value={qIdx} max={400} color="#268bd2" label="to Neo-Portland" />
            <div style={{ color:'#586e75', fontSize:'0.65rem', marginTop:'0.25rem' }}>
              Q{qIdx+1}/400 | Mile {miles}
              {overclock && <span style={{ color:'#fdf6e3', marginLeft:'0.5rem', animation:'pulse 0.5s infinite' }}>⚡ OVERCLOCK {overclockTimer}s</span>}
            </div>
          </div>

          {/* Right: Stats */}
          <div style={{ textAlign:'right' }}>
            <div style={{ marginBottom:'0.25rem' }}>
              <span style={{ color:'#586e75', fontSize:'0.65rem' }}>INTEGRITY </span>
              <span style={{ color:integrityColor, fontSize:'0.85rem' }}>{integrity}%</span>
            </div>
            <ProgressBar value={integrity} max={100} color={integrityColor} />
            <div style={{ marginTop:'0.25rem' }}>
              <span style={{ color:'#586e75', fontSize:'0.65rem' }}>PWR </span>
              <span style={{ color:'#b58900', fontSize:'0.8rem' }}>{powerCells}%</span>
              <span style={{ color:'#586e75', fontSize:'0.65rem', marginLeft:'0.75rem' }}>STREAK </span>
              <span style={{ color:'#859900', fontSize:'0.8rem' }}>{streak}</span>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT: SIDEBAR + TERMINAL ── */}
        <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:'1rem', flex:1 }}>

          {/* ── LEFT SIDEBAR ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>

            {/* Level info */}
            <div style={{ border:'1px solid #073642', padding:'0.75rem', background:'#050a0e' }}>
              <div style={{ color:'#586e75', fontSize:'0.65rem', marginBottom:'0.5rem' }}>// LEVEL STATUS</div>
              {LEVELS.map(l => (
                <div key={l.num} style={{
                  display:'flex', alignItems:'center', gap:'0.5rem',
                  padding:'0.2rem 0',
                  opacity: qIdx >= l.min ? 1 : 0.3,
                  color: currentLevel.num === l.num ? l.color : '#586e75',
                  fontSize:'0.7rem'
                }}>
                  <span>{qIdx >= l.min && qIdx > l.max ? '✓' : currentLevel.num === l.num ? '▶' : '○'}</span>
                  <span>{l.icon}</span>
                  <span style={{ fontSize:'0.65rem' }}>{l.title}</span>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div style={{ border:'1px solid #073642', padding:'0.75rem', background:'#050a0e', flex:1 }}>
              <div style={{ color:'#586e75', fontSize:'0.65rem', marginBottom:'0.5rem' }}>// ACHIEVEMENTS</div>
              {ACHIEVEMENTS.map(a => (
                <div key={a.id} style={{
                  display:'flex', alignItems:'center', gap:'0.5rem',
                  padding:'0.2rem 0', opacity: achievements.includes(a.id) ? 1 : 0.25,
                  color: achievements.includes(a.id) ? '#859900' : '#586e75',
                  fontSize:'0.7rem'
                }} title={a.desc}>
                  <span style={{ fontSize:'1rem' }}>{a.icon}</span>
                  <span style={{ fontSize:'0.65rem', lineHeight:1.2 }}>{a.name}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{ border:'1px solid #073642', padding:'0.75rem', background:'#050a0e', fontSize:'0.7rem' }}>
              <div style={{ color:'#586e75', fontSize:'0.65rem', marginBottom:'0.5rem' }}>// STATS</div>
              <div style={{ color:'#839496', marginBottom:'0.2rem' }}>✓ {totalCorrect} correct</div>
              <div style={{ color:'#839496', marginBottom:'0.2rem' }}>✗ {totalWrong} wrong</div>
              <div style={{ color:'#839496', marginBottom:'0.2rem' }}>⚡ {warpCount} warps</div>
              <div style={{ color:'#839496' }}>
                {totalCorrect+totalWrong > 0 ? Math.round(100*totalCorrect/(totalCorrect+totalWrong)) : 0}% acc
              </div>
            </div>
          </div>

          {/* ── TERMINAL ── */}
          <div style={{
            border:`1px solid ${overclock ? '#fdf6e3' : '#073642'}`,
            background:'#050a0e',
            display:'flex', flexDirection:'column',
            animation: overclock ? 'overclock 1s ease-in-out infinite' : 'none',
            transition:'border-color 0.3s'
          }}>
            {/* Terminal titlebar */}
            <div style={{
              background:'#073642', padding:'0.5rem 1rem',
              display:'flex', justifyContent:'space-between', alignItems:'center',
              borderBottom:`1px solid ${overclock ? '#fdf6e3' : '#073642'}`
            }}>
              <div style={{ display:'flex', gap:'0.4rem' }}>
                <div style={{ width:10, height:10, borderRadius:'50%', background:'#dc322f' }} />
                <div style={{ width:10, height:10, borderRadius:'50%', background:'#b58900' }} />
                <div style={{ width:10, height:10, borderRadius:'50%', background:'#859900' }} />
              </div>
              <div style={{ color:'#586e75', fontSize:'0.7rem' }}>
                kernel-trail@neo-portland ~ chapter_{currentQ?.chapter || 1}
              </div>
              <div style={{ color:overclock ? '#fdf6e3' : '#586e75', fontSize:'0.7rem' }}>
                {overclock ? '⚡ OVERCLOCK' : `diff: ${['','EASY','EASY','MEDIUM','HARD','EXPERT'][currentQ?.difficulty || 1]}`}
              </div>
            </div>

            {/* Terminal body */}
            <div style={{ flex:1, padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem' }}>

              {/* Scenario */}
              <div style={{ animation:'fadeIn 0.4s ease' }}>
                <div style={{ color:'#586e75', fontSize:'0.7rem', marginBottom:'0.5rem' }}>
                  {'>'} SCENARIO [{currentQ?.cmd?.toUpperCase()}] // {qIdx+1} of 400
                </div>
                <div style={{
                  color: overclock ? '#fdf6e3' : '#839496',
                  fontSize:'1rem', lineHeight:1.8,
                  background:'#073642', padding:'1rem',
                  borderLeft:`3px solid ${overclock ? '#fdf6e3' : '#268bd2'}`,
                  transition:'border-color 0.3s'
                }}>
                  {currentQ?.scenario}
                </div>
              </div>

              {/* Hint */}
              {showHint && (
                <div style={{
                  color:'#b58900', fontSize:'0.8rem',
                  background:'rgba(181,137,0,0.1)', padding:'0.75rem',
                  border:'1px solid rgba(181,137,0,0.3)',
                  animation:'fadeIn 0.3s ease'
                }}>
                  {'>'} HINT: {currentQ?.hint}
                </div>
              )}

              {/* Feedback */}
              {feedback && (
                <div style={{
                  textAlign:'center', fontSize:'1rem',
                  color: feedback==='correct' ? '#859900' : '#dc322f',
                  textShadow: feedback==='correct' ? '0 0 15px #859900' : '0 0 15px #dc322f',
                  animation:'fadeIn 0.2s ease',
                  padding:'0.5rem'
                }}>
                  {feedback==='correct'
                    ? `✓ COMMAND ACCEPTED // +1 MILE`
                    : `✗ SYSTEM ERROR: INVALID SYNTAX // -${currentQ?.difficulty * 5}% INTEGRITY`}
                </div>
              )}

              {/* Answer hint for wrong answers */}
              {feedback === 'wrong' && (
                <div style={{ color:'#586e75', fontSize:'0.75rem', textAlign:'center' }}>
                  Expected: <span style={{ color:'#fdf6e3' }}>{currentQ?.answer}</span>
                </div>
              )}

              {/* Input area */}
              <div style={{ marginTop:'auto' }}>
                <div style={{ color:'#586e75', fontSize:'0.7rem', marginBottom:'0.5rem' }}>
                  {'>'} {playerName || 'scavenger'}@kernel-trail:~$
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                  <span style={{ color: overclock ? '#fdf6e3' : '#859900', fontSize:'1rem' }}>$</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={feedback !== null}
                    placeholder="// type your command..."
                    style={{
                      flex:1, background:'transparent', border:'none',
                      borderBottom:`1px solid ${overclock ? '#fdf6e3' : '#859900'}`,
                      color: overclock ? '#fdf6e3' : '#859900',
                      fontFamily:'"Share Tech Mono", monospace',
                      fontSize:'1rem', outline:'none', padding:'0.5rem 0',
                      caretColor: overclock ? '#fdf6e3' : '#859900',
                      transition:'all 0.3s'
                    }}
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>

                <div style={{ display:'flex', gap:'1rem', marginTop:'0.75rem', flexWrap:'wrap' }}>
                  <button onClick={handleAnswer} style={{
                    background:'transparent', border:`1px solid ${overclock ? '#fdf6e3' : '#859900'}`,
                    color: overclock ? '#fdf6e3' : '#859900',
                    fontFamily:'monospace', padding:'0.4rem 1.5rem', cursor:'pointer', fontSize:'0.8rem'
                  }}>[ EXECUTE ]</button>
                  <button onClick={() => { setShowHint(!showHint); if(!showHint) setNohintStreak(0); }} style={{
                    background:'transparent', border:'1px solid #b58900',
                    color:'#b58900', fontFamily:'monospace', padding:'0.4rem 1rem',
                    cursor:'pointer', fontSize:'0.8rem'
                  }}>[ HINT ] ({hintsUsed})</button>
                  <button onClick={() => {
                    setFeedback('wrong');
                    const damage = currentQ.difficulty * 5;
                    setIntegrity(i => Math.max(0, i - damage));
                    setTotalWrong(t => t + 1);
                    triggerGlitch();
                    setTimeout(() => { setFeedback(null); setQIdx(i => i + 1); setInput(''); }, 1500);
                  }} style={{
                    background:'transparent', border:'1px solid #586e75',
                    color:'#586e75', fontFamily:'monospace', padding:'0.4rem 1rem',
                    cursor:'pointer', fontSize:'0.8rem'
                  }}>[ SKIP -5% ]</button>
                </div>
              </div>
            </div>

            {/* Terminal log */}
            <div style={{
              borderTop:'1px solid #073642', padding:'0.5rem 1rem',
              maxHeight:'80px', overflow:'hidden',
              background:'#020508'
            }}>
              {gameLog.slice(-3).map((line, i) => (
                <div key={i} style={{
                  color: line.includes('[+]') ? '#859900' : line.includes('[⚡]') ? '#b58900' : '#dc322f',
                  fontSize:'0.65rem', lineHeight:1.5
                }}>{line}</div>
              ))}
              {gameLog.length === 0 && (
                <div style={{ color:'#586e75', fontSize:'0.65rem' }}>// awaiting commands...</div>
              )}
            </div>
          </div>
        </div>

        {/* ── BOTTOM STATUS BAR ── */}
        <div style={{
          borderTop:'1px solid #073642', marginTop:'1rem', paddingTop:'0.5rem',
          display:'flex', justifyContent:'space-between', alignItems:'center',
          fontSize:'0.65rem', color:'#586e75'
        }}>
          <span>Chapter {currentQ?.chapter || 1}/70 | Command: {currentQ?.cmd}</span>
          <span style={{ color:'#073642' }}>{Array(20).fill('─').join('')}</span>
          <span>Bonus warps: {bonusIdx}/100 | Next warp at mile {Math.ceil((miles+1)/10)*10}</span>
        </div>
      </div>
    </div>
  );
}
