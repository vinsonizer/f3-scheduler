# F3 Scheduler
This project is a Serverless AWS Application to manage scheduling of F3 workouts.

The main goals of the project are to facilitate the scheduling and notification of leaders for small community workouts in order to reinvigorate male community leadership.

The key features for this project are:
 - Ability to manage an F3 Region, including contact information and links to region specific sites
 - Ability to manage all AO's (Areas of Operation) for a Region
 - Ability for Site Q's to schedule men to create leadership opportunities
 - Ability for scheduled leaders (Q's) to be notified and to confirm their assignments
 - Ability to find substitute leaders as needed in an intuitive fashion

## Setup
 - Install npm (https://nodejs.org/en/)
 - AWS CLI installed and configured
 - AWS Account with proper policies (TODO: create AWS policy template)

Open command line and execute:

    npm -g install serverless
    serverless deploy

The command line output should list urls that point to all services and the (pending) web application link that can be used for development and ultimately rollout to production use.
