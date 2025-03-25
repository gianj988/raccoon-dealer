FROM node:lts-jod

RUN cd /

RUN mkdir raccoon-dealer | mkdir server

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
