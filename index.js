'use strict';

var request = require('request-json');

function FastSpring(api_username, api_password) {
    this.client = request.createClient('https://api.fastspring.com/');
    this.client.setBasicAuth(api_username, api_password);
}

FastSpring.prototype.getSubscriptionState = function (subscription_id, cb) {
    var url = this.supscriptionURL(subscription_id);
    this.getRequestHandler(url, function (err, subscription) {
        if (err) {
            return cb(err);
        }

        // "active", "overdue", "canceled", "deactivated", "trial"
        return cb(null, subscription.state);  // can be undefined
    });
};

FastSpring.prototype.getSubscription = function (subscription_id, cb) {
    var url = this.supscriptionURL(subscription_id);
    this.getRequestHandler(url, cb);
};

FastSpring.prototype.supscriptionURL = function (subscription_id) {
    return 'subscriptions/' + subscription_id;
};

FastSpring.prototype.getOrder = function (order_id, cb) {
    var url = this.orderURL(order_id);
    this.getRequestHandler(url, cb);
};

FastSpring.prototype.orderURL = function (order_id) {
    return 'orders/' + order_id;
};

FastSpring.prototype.cancelSubscription = function (subscription_id, cb) {
    var url = this.supscriptionURL(subscription_id);
    this.delRequestHandler(url, cb);
};


FastSpring.prototype.getRequestHandler = function (url, cb) {
    this.client.get(url, function (error, response, body) {
        if (error) {
            return cb(error);
        }
        return cb(null, body);
    });
};

FastSpring.prototype.delRequestHandler = function (url, cb) {
    this.client.delete(url, function (error, response, body) {
        if (error) {
            return cb(error);
        }
        return cb(null, body);
    });
};

module.exports = FastSpring;
