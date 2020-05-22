#!/bin/sh

if [ "$CIRCLE_BRANCH" = "release/prod" ]; then
    git ftp init -u "$BT_FTP_ACCOUNT_RELEASE" -p "$BT_FTP_PASSWORD_RELEASE" ftp://"$BT_URL_RELEASE"
    echo "is release"

elif [ "$CIRCLE_BRANCH" = "release/dev" ]; then
    git ftp init -u "$BT_FTP_ACCOUNT_DEV" -p "$BT_FTP_PASSWORD_DEV" ftp://"$BT_URL_DEV"
    echo "is dev"

fi

