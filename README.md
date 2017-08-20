# Pi System MQTT Bridge

A MQTT client to send pi system status periodically through MQTT. The following
system stats are published:

1. CPU Temparature
2. GPU Temparature
3. Voltages: Core, SDRAM_C, SDRAM_I, SDRAM_P

## How to use?
1. Clone this repository.
2. Open `config.json` and set the broker options.
3. In `config.json`, change `topic.base` to the first part of the of topic, common to all published message topics.
4. Optinally you can edit `topic.*` to customize the topic to which you want to publish

## Update configurations online
You can also update the configurations online by sending messages to specific topics. The following configurations can be updated online:

| Setting         | Topic           | Example Payload  |
| :-------------: |:---------------:| :---------------:|
| Update Interval | `topic.base+"/config/interval"` | Send `10` to set update interval to 10 seconds |



## How to auto-start?
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