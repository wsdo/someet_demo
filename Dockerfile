FROM node:0.12.7-wheezy

ADD http://npmjs.org/install.sh /npmjs.install.sh

RUN apt-get update \
  # install nodejs ruby and some dev packages
  && apt-get install -y --no-install-recommends libmcrypt-dev libpng12-dev libxslt-dev libtidy-dev bzip2 libbz2-dev libssl-dev curl nodejs ruby ruby-dev \
  && ls /usr/bin/node || ln -s /usr/bin/nodejs /usr/bin/node \
  # install bower gulp
  && cat /npmjs.install.sh | sh \
  && npm install -g bower gulp gulp-cli \
  && rm -rf /npmjs.install.sh \
  && rm -rf /var/lib/apt/lists/*

COPY . /var/www/html

# install bower
RUN npm install
RUN bower install --allow-root --config.interactive=false
RUN gulp dist

# Expose everything under /var/www (vendor + html)
# This is only required for the nginx setup
VOLUME ["/var/www"]
