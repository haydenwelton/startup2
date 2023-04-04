#!/bin/bash

# Step 1 - Copy all files found in the current directory.
printf "\n----> Copy the home page files to the target.\n"
scp -r -i "$key" * ubuntu@buildaburger.click:public_html/
