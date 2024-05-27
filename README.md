# weather-eda-kafka-heroku-node

This project demonstrates basic consumer/producer interactions when connecting with a Kafka cluster.

## Step 1: Clone this repository

After cloning, make sure dependencies are installed:

```
npm install
```


## Step 2: Create a Heroku app

```
heroku login
heroku create
```

## Step 3: Create an addon for Apache Kafka on Heroku

Make sure you have the plugin install for the Heroku CLI
```
heroku plugins:install heroku-kafka
```

Add the Apache Kafka for Heroku addon:

```
heroku addons:create heroku-kafka:basic-0
heroku kafka:wait
```

## Step 4: Get Kafka credentials

Heroku will create config variables for your Heroku app baseed on the Kafka addon setup. You can see these with:

```
heroku config
```

You will need these values as environment variables set in `.env`. In the project root folder, do this:

```
heroku config > .env
```

Then, edit the `.env` file so that variables are set with this format: `KEY="VALUE"`. There are some multi-line certificates/keys in the `heroku config`, so that is why you will need to put env var values in quotation marks. The `.env.template` file gives you an idea of what this should look like.

## Step 5: Prepare Kafka (topic and consumer group)

```
heroku kafka:topics:create weather-data
heroku kafka:consumer-groups:create weather-consumers
```

## Step 6: Push your code repo to Heroku

```
git push heroku main
```

## Step 7: Scale your dynos

This project does not have a web application, but instead has 2 background process worker dynos: `consumer_worker` and `producer_worker`. Scale your dynos accordingly:

```
heroku ps:scale web=0 consumer_worker=1 producer_worker=1
```

## Step 8: Tail the logs

With that, your consumer worker will run, listening for events on the topic, and the producer worker will run, publishing messages every few seconds. When the consumer, who is subscribed to the topic, is notified of a new event, it logs it.

```
heroku logs --tail
```
