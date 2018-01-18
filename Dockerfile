FROM alpine

# Core dependencies
RUN apk add --update --no-cache nodejs cron && \
	rm -rf /var/cache/apk/*

# Basics
COPY / /opt/node/bws
WORKDIR /opt/node/bws
RUN npm install

# Create Cleanup
RUN touch /var/log/cron.log
RUN (crontab -l ; echo "*/1 * * * * find /opt/node/bws -mtime +3 -type f -delete >> /var/log/cron.log") | crontab
CMD cron 

# Expose ports
EXPOSE 8080

# UID to use when running the image and for CMD
USER 1001

# Run
CMD ["/usr/bin/node", "index.js"]
