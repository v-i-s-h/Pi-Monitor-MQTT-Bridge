# Setup file for bridge
npm install

# Add auto start
echo "[Unit]
Description=Pi Monitor MQTT Bridge
After=network.target
Requires=network.target

[Service] 
Type=idle
RemainAfterExit=no 
StartLimitInterval=0 
ExecStart=`which node` `pwd`
Restart=on-failure 
RestartSec=5

[Install] 
WantedBy=multi-user.target" > /lib/systemd/system/pi-monitor.service

sudo chmod 644 /lib/systemd/system/pi-monitor.service
sudo systemctl daemon-reload
sudo systemctl enable pi-monitor.service
sudo systemctl start pi-monitor.service
