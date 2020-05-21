#!/bin/sh

if [ "$CIRCLE_BRANCH" = "release" ]; then
      git ftp push -u "$BT_FTP_ACCOUNT_RELEASE" -p "$BT_FTP_PASSWORD_RELEASE" ftp://"$BT_URL_RELEASE"
    echo "is release"

fi
