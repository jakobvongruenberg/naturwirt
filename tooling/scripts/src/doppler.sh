#!/bin/bash

#
# doppler.sh
#
# This script is used to manage Doppler configurations.
#
# Usage:
#   doppler.sh <upload|download>
#
# Description:
#   - upload: Uploads the local configuration to the Doppler project.
#   - download: Downloads the remote configuration to the local machine.

# Function to check if Doppler and jq are installed and Doppler is logged in
check_dependencies() {
    if ! command -v doppler &> /dev/null; then
        echo "Doppler is not installed. Please install Doppler (brew install dopplerhq/cli/doppler) and try again."
        exit 1
    fi

    if ! command -v jq &> /dev/null; then
        echo "jq is not installed. Please install jq (brew install jq) and try again."
        exit 1
    fi

    if ! doppler configs --json > /dev/null 2>&1; then
        echo "Doppler is not logged in. Please run 'doppler login' and try again."
        exit 1
    else
        echo "Doppler is logged in."
    fi
}

# Function to download configurations
download_configs() {
    local configs
    configs=$(doppler configs --json | jq -r '.[].name')
    
    for config in $configs; do
        local env_file=".env.${config}"
        local backup_file="${env_file}.backup"

        echo "Downloading config $config"

        # Create a backup if the file exists
        if [ -f "$env_file" ]; then
            echo "Creating backup of existing $env_file"
            mv "$env_file" "$backup_file"
        fi

        # Download the new configuration
        if doppler secrets download --no-file --format env --config "$config" > "$env_file"; then
            echo "Successfully downloaded $config to $env_file"
        else
            echo "Failed to download $config"
            # Restore the backup if it exists and the download failed
            if [ -f "$backup_file" ]; then
                echo "Restoring backup for $env_file"
                mv "$backup_file" "$env_file"
            fi
        fi
    done
}

# Function to upload configurations
upload_configs() {
    local configs
    configs=$(doppler configs --json | jq -r '.[].name')

    for config in $configs; do
        local env_file=".env.${config}"
        local backup_file="${env_file}.backup"

        if [ ! -f "$env_file" ]; then
            echo "Warning: $env_file does not exist. Skipping upload for $config."
            continue
        fi

        echo "Uploading config $config from $env_file"

        # Create a backup of the current Doppler config
        echo "Creating backup of current Doppler config for $config"
        if ! doppler secrets download --no-file --format env --config "$config" > "$backup_file"; then
            echo "Failed to create backup for $config. Skipping upload."
            continue
        fi
        echo "Backup created at $backup_file"

        # Upload the new configuration
        if doppler secrets upload "$env_file" --config "$config" --silent; then
            echo "Successfully uploaded $env_file to $config"
        else
            echo "Failed to upload $env_file to $config"
            echo "Restoring previous configuration from backup"
            if doppler secrets upload "$backup_file" --config "$config"; then
                echo "Successfully restored previous configuration for $config"
            else
                echo "Failed to restore previous configuration for $config"
            fi
        fi

        # Remove the backup file
        rm "$backup_file"
    done
}

# Main script logic
if [ -z "$1" ]; then
    echo "Please specify an action (upload or download)."
    exit 1
fi

check_dependencies

if [ "$1" == "download" ]; then
    download_configs
elif [ "$1" == "upload" ]; then
    upload_configs
else
    echo "Invalid action. Please use 'upload' or 'download'."
    exit 1
fi