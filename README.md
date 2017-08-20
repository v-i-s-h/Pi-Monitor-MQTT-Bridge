# Pi System MQTT Bridge

A MQTT Client to send pi system status periodically through MQTT.

#### How to use?
TODO



#### How to auto-start?
You can use systemd to start this node program.

1. Create a systemd file by
```
sudo nano /lib/systemd/system/pisystem-bridge.service
```
2. Put the contents as
```
[Unit]
Description=Pi System Monitor Bridge Service
After=multi-user.target

[Service]
Type=idle
ExecStart=/usr/local/bin/node <path-to-this-folder>

[Install]
WantedBy=multi-user.target
```
3. Execute the following commands
```
sudo chmod 644 /lib/systemd/system/pisystem-bridge.service 
sudo systemctl daemon-reload
sudo systemctl enable pisystem-bridge.service 
```
4. Reboot your system/raspberry pi.
5. To check status
```
systemctl status pisystem-bridge.service 
```